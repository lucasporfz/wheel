import type { Vocation, VocationWheel, AllocationMap, DomainIndex } from '../data/types'
import type { Spec } from '../nlu/parse'
import { allPerks, getPerk, domainPoints, totalSpent, estimatePoints } from './constraints'
import { WHEELS } from '../data/index'

export interface SolveResult {
  ok: boolean
  reason?: string
  allocation?: AllocationMap
  totalSpent?: number
  domainTotals?: [number, number, number, number]
  unresolved?: string[]  // wanted perk names that couldn't be found or satisfied
}

function getWheelForSpec(spec: Spec): VocationWheel | null {
  if (!spec.vocation) return null
  return WHEELS[spec.vocation] ?? null
}

function effectiveBudget(spec: Spec): number {
  if (spec.points !== null) return spec.points
  if (spec.level !== null) return estimatePoints(spec.level)
  return 0
}

// Find a perk in the wheel by matching against want key, name, or namePt
function findPerkByWant(key: string, wheel: VocationWheel) {
  const perks = allPerks(wheel)
  // Exact ID match first
  const byId = perks.find(p => p.id === key || p.id.includes(key))
  if (byId) return byId
  // Match by name or namePt (case-insensitive partial)
  const k = key.toLowerCase().replace(/_/g, ' ')
  return perks.find(p =>
    p.name.toLowerCase().includes(k) ||
    p.namePt.toLowerCase().includes(k) ||
    k.includes(p.name.toLowerCase()) ||
    k.includes(p.namePt.toLowerCase())
  )
}

// Allocate dedication points greedily to reach a target domain point total
function fillDomainTo(
  domain: DomainIndex,
  target: number,
  wheel: VocationWheel,
  alloc: AllocationMap,
  budget: number
): { alloc: AllocationMap; budget: number } {
  const a = { ...alloc }
  let b = budget
  const dedications = wheel.domains[domain].perks.filter(p => p.tier === 'dedication')
  let current = domainPoints(domain, wheel, a)

  while (current < target && b > 0) {
    let allocated = false
    for (const perk of dedications) {
      const cur = a[perk.id] ?? 0
      if (cur < perk.maxPoints) {
        a[perk.id] = cur + 1
        b--
        current++
        allocated = true
        if (current >= target || b <= 0) break
      }
    }
    if (!allocated) break  // all dedication slots full
  }

  return { alloc: a, budget: b }
}

export function solve(spec: Spec): SolveResult {
  const wheel = getWheelForSpec(spec)
  if (!wheel) {
    return { ok: false, reason: 'Informe a vocação (paladino, cavaleiro, druida, sorcerer ou monk).' }
  }

  const budget = effectiveBudget(spec)
  if (budget <= 0) {
    return { ok: false, reason: 'Informe o nível ou quantidade de pontos.' }
  }

  let alloc: AllocationMap = {}
  let remaining = budget
  const unresolved: string[] = []

  // Phase 1: Resolve revelation wants — find which domain each belongs to and compute minimum domain pts
  type RevWant = { perkId: string; domain: DomainIndex; stage: number; threshold: number }
  const revWants: RevWant[] = []

  for (const want of spec.wants) {
    const perk = findPerkByWant(want.key, wheel)
    if (!perk) {
      unresolved.push(want.label)
      continue
    }
    if (perk.tier === 'revelation') {
      const stage = Math.min(Math.max(want.stage, 1), 3)
      const threshold = stage === 1 ? 250 : stage === 2 ? 500 : 1000
      revWants.push({ perkId: perk.id, domain: perk.domain, stage, threshold })
    }
  }

  // Check if we have enough budget for all domain thresholds
  // Multiple revelations in same domain: take the maximum threshold for that domain
  const domainMin: Record<number, number> = {}
  for (const rw of revWants) {
    domainMin[rw.domain] = Math.max(domainMin[rw.domain] ?? 0, rw.threshold)
  }
  const totalMin = Object.values(domainMin).reduce((s, v) => s + v, 0)
  if (totalMin > budget) {
    return {
      ok: false,
      reason: `Pontos insuficientes. Para os perks desejados precisaria de ao menos ${totalMin} pts distribuídos nos domínios, mas você tem ${budget}.`,
    }
  }

  // Phase 2: Fill domains with dedication perks to reach revelation thresholds
  for (const [domStr, minPts] of Object.entries(domainMin)) {
    const dom = Number(domStr) as DomainIndex
    const result = fillDomainTo(dom, minPts, wheel, alloc, remaining)
    alloc = result.alloc
    remaining = result.budget
    // Mark the revelation perk as allocated
    for (const rw of revWants) {
      if (rw.domain === dom) {
        alloc[rw.perkId] = 1
        // Note: revelation perk allocation is "virtual" — it doesn't cost a point, it's unlocked by domain points
      }
    }
  }

  // Phase 3: Resolve conviction wants
  for (const want of spec.wants) {
    const perk = findPerkByWant(want.key, wheel)
    if (!perk || perk.tier !== 'conviction') continue

    // Handle "stage 2" for conviction perks that appear twice (e.g. Gran Con ×2)
    const stagesNeeded = want.stage >= 2 ? 2 : 1

    // Find all instances of this conviction perk (by name match)
    const instances = allPerks(wheel).filter(p =>
      p.tier === 'conviction' && (
        p.id === perk.id ||
        (p.name === perk.name && p.id !== perk.id)
      )
    )

    let unlocked = 0
    for (const inst of instances.slice(0, stagesNeeded)) {
      if (unlocked >= stagesNeeded) break
      // Ensure requirements are met first (recursively fill if needed)
      if (inst.requires) {
        for (const reqId of inst.requires) {
          const req = getPerk(reqId, wheel)
          if (!req) continue
          const needed = req.maxPoints - (alloc[reqId] ?? 0)
          if (needed > 0 && remaining >= needed) {
            // Fill prerequisite dedication perks
            const result = fillDomainTo(req.domain, domainPoints(req.domain, wheel, alloc) + needed, wheel, alloc, remaining)
            alloc = result.alloc
            remaining = result.budget
          }
        }
      }
      // Now try to allocate the conviction perk (it costs 0 extra points — unlocked by filling slices)
      alloc[inst.id] = 1
      unlocked++
    }
  }

  // Phase 4: Distribute remaining points optimally across all domains
  if (remaining > 0) {
    const domainOrder: DomainIndex[] = [0, 1, 2, 3]
    let rounds = 0
    while (remaining > 0 && rounds < 100) {
      let anyAllocated = false
      for (const dom of domainOrder) {
        if (remaining <= 0) break
        const dedications = wheel.domains[dom].perks.filter(p => p.tier === 'dedication')
        for (const perk of dedications) {
          if (remaining <= 0) break
          const cur = alloc[perk.id] ?? 0
          if (cur < perk.maxPoints) {
            alloc[perk.id] = cur + 1
            remaining--
            anyAllocated = true
          }
        }
      }
      if (!anyAllocated) break
      rounds++
    }
  }

  const domainTotals: [number, number, number, number] = [
    domainPoints(0, wheel, alloc),
    domainPoints(1, wheel, alloc),
    domainPoints(2, wheel, alloc),
    domainPoints(3, wheel, alloc),
  ]

  return {
    ok: true,
    allocation: alloc,
    totalSpent: totalSpent(alloc),
    domainTotals,
    unresolved: unresolved.length > 0 ? unresolved : undefined,
  }
}

export { getWheelForSpec, effectiveBudget }
