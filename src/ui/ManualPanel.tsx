import React from 'react'
import type { VocationWheel, AllocationMap } from '../data/types'
import { canAllocate, canDeallocate, allocated, revelationStage, domainPoints } from '../engine/constraints'

interface ManualPanelProps {
  wheel: VocationWheel | null
  allocation: AllocationMap
  onPerkChange: (perkId: string, delta: 1 | -1) => void
}

export default function ManualPanel({ wheel, allocation, onPerkChange }: ManualPanelProps) {
  if (!wheel) return null

  return (
    <div className="manual-panel">
      <div className="section-label" style={{ marginBottom: 8 }}>Alocação manual por domínio</div>
      {wheel.domains.map(domain => {
        const domPts = domainPoints(domain.index, wheel, allocation)
        const dedications = domain.perks.filter(p => p.tier === 'dedication')
        const convictions = domain.perks.filter(p => p.tier === 'conviction')
        const revelations = domain.perks.filter(p => p.tier === 'revelation')

        return (
          <div key={domain.index} className="domain-section">
            <div className="domain-header">
              <span className="domain-dot" style={{ background: domain.color }} />
              <span style={{ color: domain.color, fontWeight: 'bold', fontSize: 13 }}>
                {domain.name}
              </span>
              <span className="small" style={{ marginLeft: 'auto' }}>{domPts} pts</span>
            </div>

            {/* Revelation */}
            {revelations.map(perk => {
              const stage = revelationStage(perk.id, wheel, allocation)
              return (
                <div key={perk.id} className="perk-row revelation">
                  <div className="perk-info">
                    <span className="perk-name">{perk.name}</span>
                    <span className="perk-tier-badge rev">REV</span>
                    {stage > 0 && (
                      <span style={{ color: domain.color, fontSize: 11, marginLeft: 4 }}>
                        Estágio {stage}
                      </span>
                    )}
                    {stage === 0 && (
                      <span className="small" style={{ marginLeft: 4 }}>
                        Precisa {perk.stages?.[0]?.points ?? 250} pts no domínio
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {[1,2,3].map(s => (
                      <span key={s} className={`stage-pip ${stage >= s ? 'active' : ''}`}
                        style={{ background: stage >= s ? domain.color : undefined, width: 8, height: 8, borderRadius: '50%', border: `1px solid ${domain.color}`, display: 'inline-block' }}
                      />
                    ))}
                  </div>
                </div>
              )
            })}

            {/* Conviction */}
            {convictions.map(perk => {
              const pts = allocated(perk.id, allocation)
              const canAdd = canAllocate(perk.id, wheel, allocation)
              const canRem = canDeallocate(perk.id, wheel, allocation)

              return (
                <div key={perk.id} className="perk-row conviction">
                  <div className="perk-info">
                    <span className="perk-name">{perk.name}</span>
                    <span className="perk-tier-badge conv">CON</span>
                  </div>
                  <div className="perk-stepper">
                    <button
                      className="step-btn"
                      disabled={!canRem}
                      onClick={() => onPerkChange(perk.id, -1)}
                    >−</button>
                    <span className={`step-val ${pts > 0 ? 'allocated' : ''}`}>{pts}</span>
                    <button
                      className="step-btn"
                      disabled={!canAdd}
                      onClick={() => onPerkChange(perk.id, 1)}
                    >+</button>
                  </div>
                </div>
              )
            })}

            {/* Dedication */}
            {dedications.map(perk => {
              const pts = allocated(perk.id, allocation)
              const canAdd = canAllocate(perk.id, wheel, allocation)
              const canRem = canDeallocate(perk.id, wheel, allocation)

              return (
                <div key={perk.id} className="perk-row dedication">
                  <div className="perk-info">
                    <span className="perk-name" style={{ fontSize: 11 }}>{perk.name}</span>
                    <span className="perk-tier-badge ded">DED</span>
                  </div>
                  <div className="perk-stepper">
                    <button
                      className="step-btn"
                      disabled={!canRem}
                      onClick={() => onPerkChange(perk.id, -1)}
                    >−</button>
                    <span className={`step-val ${pts > 0 ? 'allocated' : ''}`}>{pts}/{perk.maxPoints}</span>
                    <button
                      className="step-btn"
                      disabled={!canAdd}
                      onClick={() => onPerkChange(perk.id, 1)}
                    >+</button>
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
