import type { DomainIndex, Perk, VocationWheel, AllocationMap } from '../data/types'

export function allPerks(wheel: VocationWheel): Perk[] {
  return wheel.domains.flatMap(d => d.perks)
}

export function getPerk(perkId: string, wheel: VocationWheel): Perk | undefined {
  return allPerks(wheel).find(p => p.id === perkId)
}

export function allocated(perkId: string, alloc: AllocationMap): number {
  return alloc[perkId] ?? 0
}

export function domainPoints(domain: DomainIndex, wheel: VocationWheel, alloc: AllocationMap): number {
  return wheel.domains[domain].perks.reduce((sum, p) => sum + allocated(p.id, alloc), 0)
}

export function totalSpent(alloc: AllocationMap): number {
  return Object.values(alloc).reduce((s, v) => s + v, 0)
}

// Returns active revelation stage for a revelation perk (0 = not unlocked, 1-3 = stage)
export function revelationStage(perkId: string, wheel: VocationWheel, alloc: AllocationMap): number {
  const perk = getPerk(perkId, wheel)
  if (!perk || perk.tier !== 'revelation' || !perk.stages) return 0
  const pts = domainPoints(perk.domain, wheel, alloc)
  let stage = 0
  for (const s of perk.stages) {
    if (pts >= s.points) stage++
  }
  return stage
}

// Returns true if all required perks are at maxPoints
function requirementsMet(perk: Perk, wheel: VocationWheel, alloc: AllocationMap): boolean {
  if (!perk.requires || perk.requires.length === 0) return true
  return perk.requires.every(reqId => {
    const req = getPerk(reqId, wheel)
    return req ? allocated(reqId, alloc) >= req.maxPoints : false
  })
}

export function canAllocate(perkId: string, wheel: VocationWheel, alloc: AllocationMap): boolean {
  const perk = getPerk(perkId, wheel)
  if (!perk) return false
  if (allocated(perkId, alloc) >= perk.maxPoints) return false
  if (perk.tier === 'revelation') {
    // Revelation perks need at least 250 domain points for stage 1
    const pts = domainPoints(perk.domain, wheel, alloc)
    return pts >= 250
  }
  if (perk.tier === 'conviction') {
    return requirementsMet(perk, wheel, alloc)
  }
  // dedication: always allocatable if not at max
  return true
}

export function canDeallocate(perkId: string, wheel: VocationWheel, alloc: AllocationMap): boolean {
  if (allocated(perkId, alloc) <= 0) return false
  const perk = getPerk(perkId, wheel)
  if (!perk) return false
  // Check if anything depends on this perk being at maxPoints
  const dependents = allPerks(wheel).filter(p =>
    p.requires?.includes(perkId) && allocated(p.id, alloc) > 0
  )
  if (dependents.length > 0) return false
  // For dedication perks: check if deallocating would drop a domain below an active revelation threshold
  if (perk.tier === 'dedication') {
    const currentDomainPts = domainPoints(perk.domain, wheel, alloc)
    const afterDomainPts = currentDomainPts - 1
    // Find active revelation perks in this domain
    const revPerks = wheel.domains[perk.domain].perks.filter(p => p.tier === 'revelation' && allocated(p.id, alloc) > 0)
    for (const revPerk of revPerks) {
      if (!revPerk.stages) continue
      // Active stage threshold
      const activeStage = revelationStage(revPerk.id, wheel, alloc)
      if (activeStage > 0) {
        const threshold = revPerk.stages[activeStage - 1].points
        if (afterDomainPts < threshold) return false
      }
    }
  }
  return true
}

// Estimate promotion points from character level
export function estimatePoints(level: number): number {
  // Characters gain 1 point per level starting at level 51 (Premium)
  return Math.max(0, level - 50)
}
