import React from 'react'
import type { Perk, VocationWheel, AllocationMap, DomainIndex } from '../data/types'
import { canAllocate, canDeallocate, domainPoints, revelationStage, allocated } from '../engine/constraints'

interface WheelSvgProps {
  wheel: VocationWheel
  allocation: AllocationMap
  totalBudget: number
  onPerkClick: (perkId: string, delta: 1 | -1) => void
}

interface TooltipInfo {
  perk: Perk
  x: number
  y: number
  stage: number
  flip: boolean
}

// ── Geometry helpers ──────────────────────────────────────────────────────────

function deg2rad(d: number) { return d * Math.PI / 180 }

function rotate2d(x: number, y: number, rad: number): [number, number] {
  const cos = Math.cos(rad), sin = Math.sin(rad)
  return [cos * x + sin * y, cos * y - sin * x]
}

// Arc starting at (radius,0), sweeping CCW by `segment` radians, with given width.
function createSVGArc(radius: number, width: number, segment: number): string {
  if (width <= 0) return ''
  const r2 = radius + width
  const [xi, yi] = rotate2d(radius, 0, segment)
  const [xo, yo] = rotate2d(r2, 0, segment)
  const big = segment > Math.PI ? 1 : 0
  return `M${radius} 0 L${r2} 0 A${r2} ${r2},0,${big},0,${xo.toFixed(3)},${yo.toFixed(3)} L${xi.toFixed(3)},${yi.toFixed(3)} A${radius} ${radius},0,${big},1,${radius},0`
}

// Midpoint of a slice in centered coords (inside translate(300,300) group).
// The slice is rendered via rotate(rotDeg) and spans actualSegDeg degrees CCW from that angle.
function arcMid(arcRadius: number, rotDeg: number, actualSegDeg: number): [number, number] {
  const angle = deg2rad(rotDeg - actualSegDeg / 2)
  const r = arcRadius + RING_W / 2
  return [r * Math.cos(angle), r * Math.sin(angle)]
}

// ── Layout constants ──────────────────────────────────────────────────────────

const RING_W = 50
const SLOTS_PER_RING = [1, 2, 3, 2] as const
const GAP_DEG = 1.0

const DOMAIN_STARTS: Record<DomainIndex, number> = { 0: 270, 1: 0, 2: 90, 3: 180 }

const COLORS = [
  { inner: '#b129a9', outer: '#7a2374' },
  { inner: '#29a178', outer: '#236f55' },
  { inner: '#587d24', outer: '#576b21' },
  { inner: '#b12a3d', outer: '#7a2430' },
]

// Revelation corner positions in centered coords (translate 300,300)
const REV_POS: Record<DomainIndex, [number, number]> = {
  0: [165, -165],
  1: [165, 165],
  2: [-165, 165],
  3: [-165, -165],
}
const REV_R = 28
const REV_DECO_R = 33

// ── Component ─────────────────────────────────────────────────────────────────

export default function WheelSvg({ wheel, allocation, totalBudget, onPerkClick }: WheelSvgProps) {
  const [tooltip, setTooltip] = React.useState<TooltipInfo | null>(null)
  const [hovered, setHovered] = React.useState<string | null>(null)

  function handleClick(e: React.MouseEvent, perk: Perk) {
    e.preventDefault()
    const delta: 1 | -1 = e.button === 2 ? -1 : 1
    if (delta === 1 && canAllocate(perk.id, wheel, allocation)) onPerkClick(perk.id, 1)
    else if (delta === -1 && canDeallocate(perk.id, wheel, allocation)) onPerkClick(perk.id, -1)
  }

  function handleEnter(e: React.MouseEvent, perk: Perk) {
    const rect = (e.currentTarget.closest('svg') as SVGElement).getBoundingClientRect()
    setTooltip({
      perk,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      stage: perk.tier === 'revelation' ? revelationStage(perk.id, wheel, allocation) : 0,
      flip: (e.clientX - rect.left) > rect.width * 0.6,
    })
    setHovered(perk.id)
  }

  function handleLeave() { setTooltip(null); setHovered(null) }

  const totalSpent = Object.values(allocation).reduce((s, v) => s + v, 0)

  const arcEls: React.ReactNode[] = []
  const labelEls: React.ReactNode[] = []

  for (const domain of wheel.domains) {
    const di = domain.index
    const c = COLORS[di]
    const ds = DOMAIN_STARTS[di]
    const ded = domain.perks.filter(p => p.tier === 'dedication')
    const conv = domain.perks.filter(p => p.tier === 'conviction')
    const rev = domain.perks.find(p => p.tier === 'revelation')

    // ── Dedication rings 0-3 ────────────────────────────────────────────────
    let dedIdx = 0
    for (let ring = 0; ring < 4; ring++) {
      const slots = SLOTS_PER_RING[ring]
      const slotDeg = 90 / slots
      const actualSegDeg = slotDeg - 2 * GAP_DEG
      const segRad = deg2rad(actualSegDeg)
      const arcRadius = ring * RING_W

      for (let slot = 0; slot < slots; slot++) {
        const perk = ded[dedIdx++]
        if (!perk) continue
        const rotDeg = ds + (slot + 1) * slotDeg
        const pts = allocated(perk.id, allocation)
        const isHov = hovered === perk.id
        const filledW = Math.round(RING_W * pts / perk.maxPoints)

        arcEls.push(
          <g key={perk.id} transform={`rotate(${rotDeg})`}>
            {filledW > 0 && (
              <path d={createSVGArc(arcRadius, filledW, segRad)}
                fill={c.inner} opacity={0.9}
                style={{ mixBlendMode: 'screen', pointerEvents: 'none' }} />
            )}
            {filledW < RING_W && (
              <path d={createSVGArc(arcRadius + filledW, RING_W - filledW, segRad)}
                fill={c.outer} opacity={0.4}
                style={{ mixBlendMode: 'screen', pointerEvents: 'none' }} />
            )}
            <path d={createSVGArc(arcRadius, RING_W, segRad)}
              fill={isHov ? 'rgba(255,255,255,0.12)' : 'transparent'}
              stroke={isHov ? 'rgba(255,255,255,0.5)' : 'none'}
              strokeWidth={isHov ? 1 : 0}
              style={{ cursor: 'pointer' }}
              onClick={ev => handleClick({ ...ev, button: 0 } as React.MouseEvent, perk)}
              onContextMenu={ev => { ev.preventDefault(); handleClick({ ...ev, button: 2 } as React.MouseEvent, perk) }}
              onMouseEnter={ev => handleEnter(ev, perk)}
              onMouseLeave={handleLeave}
            />
          </g>
        )

        if (pts > 0) {
          const [mx, my] = arcMid(arcRadius, rotDeg, actualSegDeg)
          labelEls.push(
            <text key={`${perk.id}L`} x={mx} y={my}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="9" fill="rgba(255,255,255,0.85)"
              style={{ pointerEvents: 'none', userSelect: 'none' }}>
              {pts}
            </text>
          )
        }
      }
    }

    // ── Conviction ring 4 ───────────────────────────────────────────────────
    if (conv.length > 0) {
      const arcRadius = 4 * RING_W
      const slotDeg = 90 / conv.length
      const actualSegDeg = slotDeg - 2 * GAP_DEG
      const segRad = deg2rad(actualSegDeg)

      conv.forEach((perk, idx) => {
        const rotDeg = ds + (idx + 1) * slotDeg
        const pts = allocated(perk.id, allocation)
        const isLocked = !canAllocate(perk.id, wheel, allocation) && pts === 0
        const isHov = hovered === perk.id

        arcEls.push(
          <g key={perk.id} transform={`rotate(${rotDeg})`}>
            {!isLocked && pts > 0 && (
              <path d={createSVGArc(arcRadius, RING_W, segRad)}
                fill={c.inner} opacity={0.9}
                style={{ mixBlendMode: 'screen', pointerEvents: 'none' }} />
            )}
            {!isLocked && pts === 0 && (
              <path d={createSVGArc(arcRadius, RING_W, segRad)}
                fill={c.outer} opacity={0.35}
                style={{ mixBlendMode: 'screen', pointerEvents: 'none' }} />
            )}
            <path d={createSVGArc(arcRadius, RING_W, segRad)}
              fill={isHov ? 'rgba(255,255,255,0.12)' : 'transparent'}
              stroke={isHov ? 'rgba(255,255,255,0.5)' : 'none'}
              strokeWidth={isHov ? 1 : 0}
              style={{ cursor: isLocked ? 'default' : 'pointer' }}
              onClick={ev => handleClick({ ...ev, button: 0 } as React.MouseEvent, perk)}
              onContextMenu={ev => { ev.preventDefault(); handleClick({ ...ev, button: 2 } as React.MouseEvent, perk) }}
              onMouseEnter={ev => handleEnter(ev, perk)}
              onMouseLeave={handleLeave}
            />
          </g>
        )

        const [mx, my] = arcMid(arcRadius, rotDeg, actualSegDeg)
        const words = perk.name.split(' ').filter(w => w !== 'Aug:')
        const abbr = words.map(w => w[0] ?? '').join('').slice(0, 3).toUpperCase()
        labelEls.push(
          <text key={`${perk.id}L`} x={mx} y={my}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="8" fontWeight="bold"
            fill={isLocked ? '#364050' : pts > 0 ? '#ffffff' : c.inner}
            style={{ pointerEvents: 'none', userSelect: 'none' }}>
            {abbr}
          </text>
        )
      })
    }

    // ── Revelation corner ───────────────────────────────────────────────────
    if (rev) {
      const [rcx, rcy] = REV_POS[di]
      const stage = revelationStage(rev.id, wheel, allocation)
      const isLocked = !canAllocate(rev.id, wheel, allocation) && stage === 0

      arcEls.push(
        <g key={rev.id}>
          <circle cx={rcx} cy={rcy} r={REV_DECO_R} fill="#1C1408" stroke="#9B7B2A" strokeWidth={2.5} />
          <circle cx={rcx} cy={rcy} r={REV_R}
            fill={stage > 0 ? c.inner : isLocked ? '#100d08' : '#201810'}
            opacity={stage > 0 ? 0.7 : 1}
            style={{ mixBlendMode: stage > 0 ? 'screen' : 'normal', cursor: 'default' } as React.CSSProperties}
            onMouseEnter={ev => handleEnter(ev, rev)}
            onMouseLeave={handleLeave}
          />
          {[0, 1, 2].map(i => (
            <circle key={i}
              cx={rcx + (i - 1) * 7} cy={rcy + REV_R - 6} r={2.5}
              fill={i < stage ? c.inner : 'rgba(255,255,255,0.10)'}
              stroke={c.inner} strokeWidth={0.8}
              style={{ pointerEvents: 'none' }}
            />
          ))}
          <text x={rcx} y={rcy - 5}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="7" fontWeight="bold"
            fill={isLocked ? '#364050' : '#e9eef7'}
            style={{ pointerEvents: 'none', userSelect: 'none' }}>
            {rev.name.split(' ').slice(0, 2).join(' ')}
          </text>
        </g>
      )
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <svg
        viewBox="0 0 600 600"
        style={{ width: '100%', height: 'auto', maxWidth: 600, display: 'block' }}
        onContextMenu={e => e.preventDefault()}
      >
        <defs>
          <linearGradient id="ggh" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1A1005" stopOpacity="0.8" />
            <stop offset="25%" stopColor="#C8A520" />
            <stop offset="75%" stopColor="#C8A520" />
            <stop offset="100%" stopColor="#1A1005" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="ggv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1A1005" stopOpacity="0.8" />
            <stop offset="25%" stopColor="#C8A520" />
            <stop offset="75%" stopColor="#C8A520" />
            <stop offset="100%" stopColor="#1A1005" stopOpacity="0.8" />
          </linearGradient>
          <clipPath id="wclip">
            <circle cx="300" cy="300" r="265" />
          </clipPath>
        </defs>

        {/* Drop shadow + background */}
        <circle cx="300" cy="300" r="290" fill="rgba(0,0,0,0.5)" />
        <circle cx="300" cy="300" r="265" fill="#171208" />

        {/* Golden cross */}
        <g clipPath="url(#wclip)">
          <rect x="0" y="294" width="600" height="12" fill="url(#ggh)" />
          <rect x="294" y="0" width="12" height="600" fill="url(#ggv)" />
        </g>

        {/* Outer gold ring */}
        <circle cx="300" cy="300" r="253" fill="none" stroke="#9B7B2A" strokeWidth={6} />

        {/* All perk elements, centered */}
        <g transform="translate(300,300)">
          {arcEls}
          {labelEls}
        </g>

        {/* Center disc */}
        <circle cx="300" cy="300" r="20" fill="#0f0c08" stroke="#6A5018" strokeWidth={1.5} />
        <text x="300" y="293" textAnchor="middle" fontSize="10" fill="#7cc7ff" fontWeight="bold"
          style={{ pointerEvents: 'none', userSelect: 'none' }}>{wheel.label}</text>
        <text x="300" y="307" textAnchor="middle" fontSize="8" fill="#6b7a90"
          style={{ pointerEvents: 'none', userSelect: 'none' }}>{totalSpent}/{totalBudget}pts</text>
      </svg>

      {tooltip && <WheelTooltip info={tooltip} wheel={wheel} allocation={allocation} />}
    </div>
  )
}

function WheelTooltip({ info, wheel, allocation }: { info: TooltipInfo; wheel: VocationWheel; allocation: AllocationMap }) {
  const { perk, x, y, stage, flip } = info
  const pts = allocated(perk.id, allocation)
  const domPts = domainPoints(perk.domain, wheel, allocation)
  const domain = wheel.domains[perk.domain]
  const canAdd = canAllocate(perk.id, wheel, allocation)
  const canRem = canDeallocate(perk.id, wheel, allocation)
  const borderColor = COLORS[perk.domain].inner

  let stageText = ''
  if (perk.tier === 'revelation' && perk.stages) {
    stageText = stage > 0
      ? perk.stages[stage - 1].effect
      : `Precisa de ${perk.stages[0].points} pts no domínio ${domain.namePt} (atual: ${domPts})`
  }

  return (
    <div style={{
      position: 'absolute',
      top: y - 10,
      left: flip ? undefined : x + 12,
      right: flip ? 600 - x + 12 : undefined,
      background: 'rgba(10,14,22,0.97)',
      border: `1px solid ${borderColor}`,
      borderRadius: 8,
      padding: '10px 14px',
      maxWidth: 260,
      fontSize: 12,
      color: '#e9eef7',
      pointerEvents: 'none',
      zIndex: 100,
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
    }}>
      <div style={{ fontWeight: 'bold', color: borderColor, marginBottom: 4 }}>
        {perk.name}
        <span style={{ fontSize: 10, color: '#6b7a90', fontWeight: 'normal', marginLeft: 8 }}>
          [{perk.tier}]
        </span>
      </div>
      <div style={{ color: '#a0b0c0', marginBottom: 6, fontSize: 11 }}>{perk.effect}</div>

      {perk.tier === 'dedication' && (
        <div style={{ color: '#6b7a90' }}>{pts} / {perk.maxPoints} pts alocados</div>
      )}
      {perk.tier === 'revelation' && (
        <>
          <div style={{ color: '#6b7a90', marginBottom: 4 }}>
            Estágio {stage} / 3 — Domínio: {domPts} pts
          </div>
          {stageText && <div style={{ color: '#a0b0c0', fontSize: 11 }}>{stageText}</div>}
        </>
      )}
      {perk.tier === 'conviction' && (
        <>
          <div style={{ color: pts > 0 ? '#2ecc71' : '#6b7a90' }}>
            {pts > 0 ? '✓ Desbloqueado' : '○ Não desbloqueado'}
          </div>
          {perk.stages && perk.stages.length > 0 && (
            <div style={{ marginTop: 6, borderTop: '1px solid #1e2840', paddingTop: 6 }}>
              {perk.stages.map((s, i) => (
                <div key={i} style={{ color: domPts >= s.points ? '#a0b0c0' : '#4a5a6a', fontSize: 10, marginBottom: 3 }}>
                  <span style={{ color: domPts >= s.points ? '#C8A520' : '#4a5a6a', fontWeight: 'bold' }}>
                    {s.points}pts:
                  </span>{' '}{s.effect}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <div style={{ marginTop: 6, fontSize: 10, color: '#4a5a6a' }}>
        {canAdd ? 'Clique para +1 ponto' : canRem ? 'Clique direito para -1 ponto' : 'Não disponível'}
      </div>
    </div>
  )
}
