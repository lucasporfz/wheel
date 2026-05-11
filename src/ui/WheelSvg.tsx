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

const CX = 300
const CY = 300

// 5 concentric rings — rings 0-3 = dedication (1+2+3+2 slots/quadrant = 8),
// ring 4 = conviction (variable slots/quadrant)
const RING_INNER: number[] = [30, 82, 134, 186, 226]
const RING_OUTER: number[] = [80, 132, 184, 224, 256]
// Slots per quadrant for rings 0-3 (dedication): 1+2+3+2 = 8 dedication perks
const SLOTS_PER_DED_RING: number[] = [1, 2, 3, 2]

const MAIN_R = 258    // main circle outer radius
const REV_R = 24      // revelation corner inner circle radius
const REV_DECO_R = 30 // revelation corner outer decorative ring

// Domain start angles: each domain = 90° quadrant
const DOMAIN_STARTS: Record<DomainIndex, number> = {
  0: 270, // top-right
  1: 0,   // bottom-right
  2: 90,  // bottom-left
  3: 180, // top-left
}

// Revelation corner positions — diagonal outside main circle
// r=285 at 45°/135°/225°/315° from center (300,300)
const REV_CORNERS: [number, number][] = [
  [502, 98],  // domain 0: top-right
  [502, 502], // domain 1: bottom-right
  [98, 502],  // domain 2: bottom-left
  [98, 98],   // domain 3: top-left
]

function toRad(deg: number) { return (deg * Math.PI) / 180 }

function polar(r: number, deg: number): [number, number] {
  return [CX + r * Math.cos(toRad(deg)), CY + r * Math.sin(toRad(deg))]
}

function arcPath(r1: number, r2: number, startDeg: number, endDeg: number): string {
  const span = endDeg - startDeg
  const large = span > 180 ? 1 : 0
  const [ox1, oy1] = polar(r2, startDeg)
  const [ox2, oy2] = polar(r2, endDeg)
  const [ix2, iy2] = polar(r1, endDeg)
  const [ix1, iy1] = polar(r1, startDeg)
  return `M ${ox1} ${oy1} A ${r2} ${r2} 0 ${large} 1 ${ox2} ${oy2} L ${ix2} ${iy2} A ${r1} ${r1} 0 ${large} 0 ${ix1} ${iy1} Z`
}

type SliceState = 'locked' | 'available' | 'partial' | 'full'

function perkState(perk: Perk, wheel: VocationWheel, alloc: AllocationMap): SliceState {
  const pts = allocated(perk.id, alloc)
  if (pts >= perk.maxPoints) return 'full'
  if (pts > 0) return 'partial'
  if (canAllocate(perk.id, wheel, alloc)) return 'available'
  return 'locked'
}

function revState(perk: Perk, wheel: VocationWheel, alloc: AllocationMap): SliceState {
  const stage = revelationStage(perk.id, wheel, alloc)
  if (stage >= 3) return 'full'
  if (stage > 0) return 'partial'
  if (canAllocate(perk.id, wheel, alloc)) return 'available'
  return 'locked'
}

function fillColor(state: SliceState, baseColor: string): string {
  switch (state) {
    case 'full':      return baseColor
    case 'partial':   return baseColor.replace('hsl(', 'hsla(').replace(')', ', 0.65)')
    case 'available': return baseColor.replace('hsl(', 'hsla(').replace(')', ', 0.2)')
    case 'locked':    return 'hsl(220,14%,12%)'
  }
}

function strokeColor(state: SliceState, baseColor: string): string {
  if (state === 'locked') return '#1e2840'
  return baseColor.replace('hsl(', 'hsla(').replace(')', ', 0.38)')
}

export default function WheelSvg({ wheel, allocation, totalBudget, onPerkClick }: WheelSvgProps) {
  const [tooltip, setTooltip] = React.useState<TooltipInfo | null>(null)

  function handleClick(e: React.MouseEvent, perk: Perk) {
    e.preventDefault()
    const delta: 1 | -1 = e.button === 2 ? -1 : 1
    if (delta === 1 && canAllocate(perk.id, wheel, allocation)) onPerkClick(perk.id, 1)
    else if (delta === -1 && canDeallocate(perk.id, wheel, allocation)) onPerkClick(perk.id, -1)
  }

  function handleEnter(e: React.MouseEvent, perk: Perk) {
    const rect = (e.currentTarget.closest('svg') as SVGElement).getBoundingClientRect()
    const relX = e.clientX - rect.left
    const relY = e.clientY - rect.top
    setTooltip({
      perk,
      x: relX,
      y: relY,
      stage: perk.tier === 'revelation' ? revelationStage(perk.id, wheel, allocation) : 0,
      flip: relX > rect.width * 0.6,
    })
  }

  const totalSpent = Object.values(allocation).reduce((s, v) => s + v, 0)

  const elements: React.ReactNode[] = []
  const defs: React.ReactNode[] = []

  // Per-domain glow filters
  for (const domain of wheel.domains) {
    const hue = domain.color.match(/hsl\((\d+)/)?.[1] ?? '200'
    defs.push(
      <filter key={`gf${domain.index}`} id={`gf${domain.index}`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="b"/>
        <feFlood floodColor={`hsl(${hue},75%,55%)`} floodOpacity="0.9" result="c"/>
        <feComposite in="c" in2="b" operator="in" result="g"/>
        <feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    )
  }

  // Gold gradient for cross dividers
  defs.push(
    <linearGradient key="ggh" id="ggh" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#1A1005" stopOpacity="0.8"/>
      <stop offset="25%" stopColor="#C8A520"/>
      <stop offset="75%" stopColor="#C8A520"/>
      <stop offset="100%" stopColor="#1A1005" stopOpacity="0.8"/>
    </linearGradient>,
    <linearGradient key="ggv" id="ggv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#1A1005" stopOpacity="0.8"/>
      <stop offset="25%" stopColor="#C8A520"/>
      <stop offset="75%" stopColor="#C8A520"/>
      <stop offset="100%" stopColor="#1A1005" stopOpacity="0.8"/>
    </linearGradient>,
    <clipPath key="wclip" id="wclip">
      <circle cx={CX} cy={CY} r={MAIN_R}/>
    </clipPath>
  )

  // ── Render each domain ───────────────────────────────────────────────────────
  for (const domain of wheel.domains) {
    const ds = DOMAIN_STARTS[domain.index]
    const ded = domain.perks.filter(p => p.tier === 'dedication')
    const conv = domain.perks.filter(p => p.tier === 'conviction')
    const rev = domain.perks.filter(p => p.tier === 'revelation')

    // Rings 0-3: dedication perks (1+2+3+2 per quadrant = 8)
    let dedIdx = 0
    for (let ring = 0; ring < 4; ring++) {
      const slots = SLOTS_PER_DED_RING[ring]
      const span = 90 / slots
      const GAP = 1.2

      for (let slot = 0; slot < slots; slot++) {
        const perk = ded[dedIdx++]
        if (!perk) continue

        const s = ds + slot * span + GAP
        const e = ds + (slot + 1) * span - GAP
        const state = perkState(perk, wheel, allocation)
        const cur = allocated(perk.id, allocation)
        const midDeg = (s + e) / 2
        const midR = (RING_INNER[ring] + RING_OUTER[ring]) / 2
        const [mx, my] = polar(midR, midDeg)

        elements.push(
          <g key={perk.id}>
            <path
              d={arcPath(RING_INNER[ring], RING_OUTER[ring], s, e)}
              fill={fillColor(state, domain.color)}
              stroke={strokeColor(state, domain.color)}
              strokeWidth="1"
              filter={state === 'full' ? `url(#gf${domain.index})` : undefined}
              style={{ cursor: state === 'locked' ? 'default' : 'pointer' }}
              onClick={ev => handleClick({ ...ev, button: 0 } as React.MouseEvent, perk)}
              onContextMenu={ev => { ev.preventDefault(); handleClick({ ...ev, button: 2 } as React.MouseEvent, perk) }}
              onMouseEnter={ev => handleEnter(ev, perk)}
              onMouseLeave={() => setTooltip(null)}
            />
            {cur > 0 && (
              <text
                x={mx} y={my}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="9" fill="#d8e4f0"
                transform={`rotate(${midDeg + 90},${mx},${my})`}
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >{cur}</text>
            )}
          </g>
        )
      }
    }

    // Ring 4: conviction perks (variable, split 90° evenly)
    if (conv.length > 0) {
      const span = 90 / conv.length
      const GAP = 1.0
      conv.forEach((perk, idx) => {
        const s = ds + idx * span + GAP
        const e = ds + (idx + 1) * span - GAP
        const state = perkState(perk, wheel, allocation)
        const midDeg = (s + e) / 2
        const midR = (RING_INNER[4] + RING_OUTER[4]) / 2
        const [mx, my] = polar(midR, midDeg)
        // First letters of each word
        const abbr = perk.name.split(' ').map((w: string) => w[0] ?? '').join('').slice(0, 3).toUpperCase()

        elements.push(
          <g key={perk.id}>
            <path
              d={arcPath(RING_INNER[4], RING_OUTER[4], s, e)}
              fill={fillColor(state, domain.color)}
              stroke={strokeColor(state, domain.color)}
              strokeWidth="1"
              filter={state === 'full' ? `url(#gf${domain.index})` : undefined}
              style={{ cursor: state === 'locked' ? 'default' : 'pointer' }}
              onClick={ev => handleClick({ ...ev, button: 0 } as React.MouseEvent, perk)}
              onContextMenu={ev => { ev.preventDefault(); handleClick({ ...ev, button: 2 } as React.MouseEvent, perk) }}
              onMouseEnter={ev => handleEnter(ev, perk)}
              onMouseLeave={() => setTooltip(null)}
            />
            <text
              x={mx} y={my}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="8" fill={state === 'locked' ? '#364050' : '#d8e4f0'}
              transform={`rotate(${midDeg + 90},${mx},${my})`}
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            >{abbr}</text>
          </g>
        )
      })
    }

    // Revelation corner circle
    for (const perk of rev) {
      const [rcx, rcy] = REV_CORNERS[domain.index]
      const stage = revelationStage(perk.id, wheel, allocation)
      const state = revState(perk, wheel, allocation)
      const shortName = perk.name.split(' ')[0]

      elements.push(
        <g key={perk.id}>
          {/* Outer decorative bezel */}
          <circle cx={rcx} cy={rcy} r={REV_DECO_R} fill="#1C1408" stroke="#9B7B2A" strokeWidth={2.5}/>
          {/* Fill circle (state-based) */}
          <circle
            cx={rcx} cy={rcy} r={REV_R}
            fill={fillColor(state, domain.color)}
            filter={stage > 0 ? `url(#gf${domain.index})` : undefined}
            style={{ cursor: 'default' }}
            onMouseEnter={ev => handleEnter(ev, perk)}
            onMouseLeave={() => setTooltip(null)}
          />
          {/* Stage pips */}
          {[0, 1, 2].map(i => (
            <circle
              key={i}
              cx={rcx + (i - 1) * 7} cy={rcy + REV_R - 7} r={2.5}
              fill={i < stage ? domain.color : 'rgba(255,255,255,0.12)'}
              stroke={domain.color} strokeWidth={0.8}
              style={{ pointerEvents: 'none' }}
            />
          ))}
          {/* Short name */}
          <text
            x={rcx} y={rcy - 3}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="7" fontWeight="bold"
            fill={state === 'locked' ? '#364050' : '#e9eef7'}
            style={{ pointerEvents: 'none', userSelect: 'none' }}
          >{shortName}</text>
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
        <defs>{defs}</defs>

        {/* Drop shadow */}
        <circle cx={CX} cy={CY} r={MAIN_R + 22} fill="rgba(0,0,0,0.5)"/>

        {/* Outer decorative gold ring */}
        <circle cx={CX} cy={CY} r={MAIN_R + 5} fill="none" stroke="#9B7B2A" strokeWidth={5}/>
        <circle cx={CX} cy={CY} r={MAIN_R + 9} fill="none" stroke="#4A3010" strokeWidth={1.5}/>

        {/* Main dark background */}
        <circle cx={CX} cy={CY} r={MAIN_R} fill="#171208"/>

        {/* Golden cross dividers (clipped to circle) */}
        <g clipPath="url(#wclip)">
          <rect x="0" y={CY - 6} width="600" height="12" fill="url(#ggh)"/>
          <rect x={CX - 6} y="0" width="12" height="600" fill="url(#ggv)"/>
        </g>

        {/* Center disc (covers divider crossing) */}
        <circle cx={CX} cy={CY} r={28} fill="#0f0c08" stroke="#6A5018" strokeWidth={1.5}/>

        {/* All perk elements */}
        {elements}

        {/* Center text: vocation + pts */}
        <text
          x={CX} y={CY - 7}
          textAnchor="middle" fontSize="10" fill="#7cc7ff" fontWeight="bold"
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >{wheel.label}</text>
        <text
          x={CX} y={CY + 7}
          textAnchor="middle" fontSize="8" fill="#6b7a90"
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >{totalSpent}/{totalBudget}pts</text>
      </svg>

      {tooltip && <WheelTooltip info={tooltip} wheel={wheel} allocation={allocation}/>}
    </div>
  )
}

function WheelTooltip({
  info, wheel, allocation,
}: {
  info: TooltipInfo
  wheel: VocationWheel
  allocation: AllocationMap
}) {
  const { perk, x, y, stage, flip } = info
  const pts = allocated(perk.id, allocation)
  const domPts = domainPoints(perk.domain, wheel, allocation)
  const domain = wheel.domains[perk.domain]
  const canAdd = canAllocate(perk.id, wheel, allocation)
  const canRem = canDeallocate(perk.id, wheel, allocation)

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
      border: `1px solid ${domain.color}`,
      borderRadius: 8,
      padding: '10px 14px',
      maxWidth: 260,
      fontSize: 12,
      color: '#e9eef7',
      pointerEvents: 'none',
      zIndex: 100,
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
    }}>
      <div style={{ fontWeight: 'bold', color: domain.color, marginBottom: 4 }}>
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
        <div style={{ color: pts > 0 ? '#2ecc71' : '#6b7a90' }}>
          {pts > 0 ? '✓ Desbloqueado' : '○ Não desbloqueado'}
        </div>
      )}

      <div style={{ marginTop: 6, fontSize: 10, color: '#4a5a6a' }}>
        {canAdd ? 'Clique para +1 ponto' : canRem ? 'Clique direito para -1 ponto' : 'Não disponível'}
      </div>
    </div>
  )
}
