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
}

const CX = 300
const CY = 300
const R_DEDI_INNER = 58
const R_DEDI_OUTER = 125
const R_CONV_INNER = 130
const R_CONV_OUTER = 200
const R_REV_INNER = 205
const R_REV_OUTER = 272
const R_LABEL = 284
const GAP_DEG = 1.5  // gap between sub-arcs

// Domain start angles (clockwise from 3 o'clock in SVG coords)
// Each domain spans exactly 90 degrees
const DOMAIN_STARTS: Record<DomainIndex, number> = {
  0: 270,  // top-right
  1: 0,    // bottom-right
  2: 90,   // bottom-left
  3: 180,  // top-left
}

function toRad(deg: number) { return (deg * Math.PI) / 180 }

function polarToCart(cx: number, cy: number, r: number, deg: number) {
  return {
    x: cx + r * Math.cos(toRad(deg)),
    y: cy + r * Math.sin(toRad(deg)),
  }
}

function arcPath(
  cx: number, cy: number,
  r1: number, r2: number,
  startDeg: number, endDeg: number
): string {
  // All arcs here are ≤90°, so largeArc is always 0
  const largeArc = 0
  const o1 = polarToCart(cx, cy, r2, startDeg)
  const o2 = polarToCart(cx, cy, r2, endDeg)
  const i2 = polarToCart(cx, cy, r1, endDeg)
  const i1 = polarToCart(cx, cy, r1, startDeg)
  return [
    `M ${o1.x} ${o1.y}`,
    `A ${r2} ${r2} 0 ${largeArc} 1 ${o2.x} ${o2.y}`,
    `L ${i2.x} ${i2.y}`,
    `A ${r1} ${r1} 0 ${largeArc} 0 ${i1.x} ${i1.y}`,
    'Z',
  ].join(' ')
}

function midPoint(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const midDeg = (startDeg + endDeg) / 2
  return polarToCart(cx, cy, r, midDeg)
}

function sliceState(perk: Perk, wheel: VocationWheel, alloc: AllocationMap): 'locked' | 'available' | 'partial' | 'full' {
  const pts = allocated(perk.id, alloc)
  if (pts >= perk.maxPoints) return 'full'
  if (pts > 0) return 'partial'
  if (canAllocate(perk.id, wheel, alloc)) return 'available'
  return 'locked'
}

function stateAlpha(state: 'locked' | 'available' | 'partial' | 'full', baseColor: string): string {
  switch (state) {
    case 'full': return baseColor
    case 'partial': return baseColor.replace('hsl(', 'hsla(').replace(')', ', 0.6)')
    case 'available': return baseColor.replace('hsl(', 'hsla(').replace(')', ', 0.25)')
    case 'locked': return 'hsl(220, 15%, 14%)'
  }
}

function hslToHsla(color: string, alpha: number): string {
  if (color.startsWith('hsl(') && !color.includes('hsla')) {
    return color.replace('hsl(', 'hsla(').replace(')', `, ${alpha})`)
  }
  return color
}

export default function WheelSvg({ wheel, allocation, totalBudget, onPerkClick }: WheelSvgProps) {
  const [tooltip, setTooltip] = React.useState<TooltipInfo | null>(null)

  function handleClick(e: React.MouseEvent, perk: Perk) {
    e.preventDefault()
    const delta = e.button === 2 ? -1 : 1
    if (delta === 1 && canAllocate(perk.id, wheel, allocation)) {
      onPerkClick(perk.id, 1)
    } else if (delta === -1 && canDeallocate(perk.id, wheel, allocation)) {
      onPerkClick(perk.id, -1)
    }
  }

  function handleMouseEnter(e: React.MouseEvent, perk: Perk) {
    const svgRect = (e.currentTarget.closest('svg') as SVGElement).getBoundingClientRect()
    const stage = perk.tier === 'revelation' ? revelationStage(perk.id, wheel, allocation) : 0
    setTooltip({
      perk,
      x: e.clientX - svgRect.left,
      y: e.clientY - svgRect.top,
      stage,
    })
  }

  const domainTotals = wheel.domains.map((_, i) => domainPoints(i as DomainIndex, wheel, allocation))

  const paths: React.ReactNode[] = []
  const labels: React.ReactNode[] = []
  const defs: React.ReactNode[] = []

  // Build glow filters per domain
  for (const domain of wheel.domains) {
    const hue = domain.color.match(/hsl\((\d+)/)?.[1] ?? '200'
    defs.push(
      <filter key={`glow-${domain.index}`} id={`glow-d${domain.index}`} x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/>
        <feFlood floodColor={`hsl(${hue},70%,55%)`} floodOpacity="0.7" result="color"/>
        <feComposite in="color" in2="blur" operator="in" result="glow"/>
        <feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    )
  }

  for (const domain of wheel.domains) {
    const domStart = DOMAIN_STARTS[domain.index]
    const domEnd = domStart + 90

    const dedications = domain.perks.filter(p => p.tier === 'dedication')
    const convictions = domain.perks.filter(p => p.tier === 'conviction')
    const revelations = domain.perks.filter(p => p.tier === 'revelation')

    // ── Dedication ring ────────────────────────────────────────────────────
    const dediCount = dedications.length
    const dediSpan = (90 - GAP_DEG * (dediCount + 1)) / dediCount

    dedications.forEach((perk, idx) => {
      const s = domStart + GAP_DEG * (idx + 1) + dediSpan * idx
      const e = s + dediSpan
      const state = sliceState(perk, wheel, allocation)
      const fill = stateAlpha(state, domain.color)
      const filter = state === 'full' ? `url(#glow-d${domain.index})` : undefined
      const stroke = state === 'locked' ? '#1a2030' : hslToHsla(domain.color, 0.4)
      const d = arcPath(CX, CY, R_DEDI_INNER, R_DEDI_OUTER, s, e)
      const cur = allocated(perk.id, allocation)

      paths.push(
        <path
          key={perk.id}
          d={d}
          fill={fill}
          stroke={stroke}
          strokeWidth="1"
          filter={filter}
          style={{ cursor: state === 'locked' ? 'default' : 'pointer' }}
          onClick={ev => handleClick({ ...ev, button: 0 } as React.MouseEvent, perk)}
          onContextMenu={ev => { ev.preventDefault(); handleClick({ ...ev, button: 2 } as React.MouseEvent, perk) }}
          onMouseEnter={ev => handleMouseEnter(ev, perk)}
          onMouseLeave={() => setTooltip(null)}
        />
      )

      // Tiny text label if space allows
      if (dediSpan > 12) {
        const mid = midPoint(CX, CY, (R_DEDI_INNER + R_DEDI_OUTER) / 2, s, e)
        const midDeg = (s + e) / 2
        const abbr = cur > 0 ? `${cur}` : ''
        labels.push(
          <text
            key={`lbl-${perk.id}`}
            x={mid.x} y={mid.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="9"
            fill={state === 'locked' ? '#3a4a5a' : '#e9eef7'}
            style={{ pointerEvents: 'none', userSelect: 'none' }}
            transform={`rotate(${midDeg + 90}, ${mid.x}, ${mid.y})`}
          >
            {abbr}
          </text>
        )
      }
    })

    // ── Conviction ring ────────────────────────────────────────────────────
    const convCount = convictions.length || 1
    const convSpan = (90 - GAP_DEG * (convCount + 1)) / convCount

    convictions.forEach((perk, idx) => {
      const s = domStart + GAP_DEG * (idx + 1) + convSpan * idx
      const e = s + convSpan
      const state = sliceState(perk, wheel, allocation)
      const fill = stateAlpha(state, domain.color)
      const filter = state === 'full' ? `url(#glow-d${domain.index})` : undefined
      const stroke = state === 'locked' ? '#1a2030' : hslToHsla(domain.color, 0.4)
      const d = arcPath(CX, CY, R_CONV_INNER, R_CONV_OUTER, s, e)

      paths.push(
        <path
          key={perk.id}
          d={d}
          fill={fill}
          stroke={stroke}
          strokeWidth="1"
          filter={filter}
          style={{ cursor: state === 'locked' ? 'default' : 'pointer' }}
          onClick={ev => handleClick({ ...ev, button: 0 } as React.MouseEvent, perk)}
          onContextMenu={ev => { ev.preventDefault(); handleClick({ ...ev, button: 2 } as React.MouseEvent, perk) }}
          onMouseEnter={ev => handleMouseEnter(ev, perk)}
          onMouseLeave={() => setTooltip(null)}
        />
      )
    })

    // ── Revelation ring (full 90° arc per domain) ──────────────────────────
    for (const perk of revelations) {
      const s = domStart + GAP_DEG
      const e = domEnd - GAP_DEG
      const stage = revelationStage(perk.id, wheel, allocation)
      const state = stage > 0 ? 'full' : (canAllocate(perk.id, wheel, allocation) ? 'available' : 'locked')
      const fill = stateAlpha(state, domain.color)
      const filter = state === 'full' ? `url(#glow-d${domain.index})` : undefined
      const stroke = state === 'locked' ? '#1a2030' : hslToHsla(domain.color, 0.4)
      const d = arcPath(CX, CY, R_REV_INNER, R_REV_OUTER, s, e)
      const mid = midPoint(CX, CY, (R_REV_INNER + R_REV_OUTER) / 2, s, e)
      const midDeg = (s + e) / 2

      paths.push(
        <path
          key={perk.id}
          d={d}
          fill={fill}
          stroke={stroke}
          strokeWidth="1.5"
          filter={filter}
          style={{ cursor: 'default' }}
          onMouseEnter={ev => handleMouseEnter(ev, perk)}
          onMouseLeave={() => setTooltip(null)}
        />
      )

      // Stage indicator dots
      if (stage > 0) {
        for (let i = 0; i < 3; i++) {
          const dotDeg = midDeg - 8 + i * 8
          const dotPos = polarToCart(CX, CY, (R_REV_INNER + R_REV_OUTER) / 2 + 10, dotDeg)
          labels.push(
            <circle
              key={`dot-${perk.id}-${i}`}
              cx={dotPos.x} cy={dotPos.y} r="3"
              fill={i < stage ? domain.color : 'rgba(255,255,255,0.1)'}
              stroke={domain.color} strokeWidth="0.5"
              style={{ pointerEvents: 'none' }}
            />
          )
        }
      }

      // Short perk name label
      const words = perk.name.split(' ')
      const shortName = words.length > 2 ? words.slice(0, 2).join(' ') : perk.name
      labels.push(
        <text
          key={`lbl-rev-${perk.id}`}
          x={mid.x} y={mid.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="8"
          fill={state === 'locked' ? '#3a4a5a' : '#e9eef7'}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
          transform={`rotate(${midDeg + 90}, ${mid.x}, ${mid.y})`}
        >
          {shortName}
        </text>
      )
    }

    // ── Domain outer label ────────────────────────────────────────────────
    const midDomDeg = domStart + 45
    const labelPos = polarToCart(CX, CY, R_LABEL, midDomDeg)
    const domPts = domainTotals[domain.index]
    labels.push(
      <text
        key={`dom-lbl-${domain.index}`}
        x={labelPos.x} y={labelPos.y}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="9"
        fill={domain.color}
        fontWeight="bold"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
        transform={`rotate(${midDomDeg + 90}, ${labelPos.x}, ${labelPos.y})`}
      >
        {domain.name} {domPts}
      </text>
    )

    // Domain separator lines
    const sepPt = polarToCart(CX, CY, R_REV_OUTER + 10, domStart)
    const sepPt2 = polarToCart(CX, CY, R_DEDI_INNER - 5, domStart)
    paths.push(
      <line
        key={`sep-${domain.index}`}
        x1={sepPt2.x} y1={sepPt2.y}
        x2={sepPt.x} y2={sepPt.y}
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
        style={{ pointerEvents: 'none' }}
      />
    )
  }

  return (
    <div style={{ position: 'relative' }}>
      <svg
        viewBox="0 0 600 600"
        style={{ width: '100%', height: 'auto', maxWidth: 600, display: 'block' }}
        onContextMenu={e => e.preventDefault()}
      >
        <defs>{defs}</defs>

        {/* Background circle */}
        <circle cx={CX} cy={CY} r={R_REV_OUTER + 20} fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>

        {/* Inner center disc */}
        <circle cx={CX} cy={CY} r={R_DEDI_INNER - 4} fill="#0b0f14" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>

        {/* Vocation label in center */}
        <text x={CX} y={CY - 8} textAnchor="middle" fontSize="11" fill="#7cc7ff" fontWeight="bold">{wheel.label}</text>
        <text x={CX} y={CY + 6} textAnchor="middle" fontSize="9" fill="#6b7a90">{totalSpentDisplay(allocation)} / {totalBudget}pts</text>

        {/* Perk arcs */}
        {paths}

        {/* Labels on top */}
        {labels}
      </svg>

      {/* Tooltip */}
      {tooltip && <WheelTooltip info={tooltip} wheel={wheel} allocation={allocation} />}
    </div>
  )
}

function totalSpentDisplay(alloc: AllocationMap): number {
  return Object.values(alloc).reduce((s, v) => s + v, 0)
}

function WheelTooltip({ info, wheel, allocation }: { info: TooltipInfo; wheel: VocationWheel; allocation: AllocationMap }) {
  const { perk, x, y, stage } = info
  const pts = allocated(perk.id, allocation)
  const domPts = domainPoints(perk.domain, wheel, allocation)
  const domain = wheel.domains[perk.domain]
  const canAdd = canAllocate(perk.id, wheel, allocation)
  const canRem = canDeallocate(perk.id, wheel, allocation)

  let stageText = ''
  if (perk.tier === 'revelation' && perk.stages) {
    if (stage > 0) {
      stageText = perk.stages[stage - 1].effect
    } else {
      const nextThreshold = perk.stages[0].points
      stageText = `Precisa de ${nextThreshold} pts no domínio ${domain.namePt} (atual: ${domPts})`
    }
  }

  const left = x > 400 ? undefined : x + 12
  const right = x > 400 ? 600 - x + 12 : undefined

  return (
    <div style={{
      position: 'absolute',
      top: y - 10,
      left,
      right,
      background: 'rgba(10,14,22,0.97)',
      border: `1px solid ${domain.color}`,
      borderRadius: 8,
      padding: '10px 14px',
      maxWidth: 260,
      fontSize: 12,
      color: '#e9eef7',
      pointerEvents: 'none',
      zIndex: 100,
      boxShadow: `0 4px 20px rgba(0,0,0,0.5)`,
    }}>
      <div style={{ fontWeight: 'bold', color: domain.color, marginBottom: 4 }}>
        {perk.name}
        <span style={{ fontSize: 10, color: '#6b7a90', fontWeight: 'normal', marginLeft: 8 }}>
          [{perk.tier}]
        </span>
      </div>
      <div style={{ color: '#a0b0c0', marginBottom: 6, fontSize: 11 }}>{perk.effect}</div>

      {perk.tier === 'dedication' && (
        <div style={{ color: '#6b7a90' }}>
          {pts} / {perk.maxPoints} pts alocados
        </div>
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
        {canAdd && 'Clique para +1 ponto'}
        {!canAdd && canRem && 'Clique direito para -1 ponto'}
        {!canAdd && !canRem && 'Não disponível'}
      </div>
    </div>
  )
}
