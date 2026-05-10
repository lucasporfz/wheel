import React from 'react'
import type { Vocation, VocationWheel, AllocationMap, DomainIndex } from '../data/types'
import { VOCATION_OPTIONS } from '../data/index'
import { domainPoints, totalSpent, revelationStage } from '../engine/constraints'
import { estimatePoints } from '../engine/constraints'

interface ControlPanelProps {
  vocation: Vocation | null
  level: number | null
  manualPoints: number | null
  allocation: AllocationMap
  wheel: VocationWheel | null
  mode: 'manual' | 'prompt'
  shareUrl: string
  onVocationChange: (v: Vocation) => void
  onLevelChange: (n: number | null) => void
  onManualPointsChange: (n: number | null) => void
  onModeChange: (m: 'manual' | 'prompt') => void
  onReset: () => void
}

export default function ControlPanel({
  vocation, level, manualPoints, allocation, wheel, mode, shareUrl,
  onVocationChange, onLevelChange, onManualPointsChange, onModeChange, onReset,
}: ControlPanelProps) {
  const [copied, setCopied] = React.useState(false)
  const budget = manualPoints ?? (level !== null ? estimatePoints(level) : 0)
  const spent = totalSpent(allocation)
  const remaining = budget - spent

  async function copyShare() {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (_) {}
  }

  return (
    <div className="control-panel">
      {/* Vocation selector */}
      <div className="section">
        <div className="section-label">Vocação</div>
        <div className="voc-grid">
          {VOCATION_OPTIONS.map(v => (
            <button
              key={v.id}
              className={`voc-btn ${vocation === v.id ? 'active' : ''}`}
              onClick={() => onVocationChange(v.id)}
              title={v.label}
            >
              {v.labelPt}
            </button>
          ))}
        </div>
      </div>

      {/* Level & Points */}
      <div className="section">
        <div className="section-label">Nível / Pontos</div>
        <div className="row" style={{ gap: 8 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 2 }}>Nível</label>
            <input
              type="number"
              className="num-input"
              placeholder="ex: 1500"
              value={level ?? ''}
              onChange={e => onLevelChange(e.target.value ? Number(e.target.value) : null)}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 2 }}>Pontos (manual)</label>
            <input
              type="number"
              className="num-input"
              placeholder="override"
              value={manualPoints ?? ''}
              onChange={e => onManualPointsChange(e.target.value ? Number(e.target.value) : null)}
            />
          </div>
        </div>
        {budget > 0 && (
          <div className="budget-bar">
            <div className="budget-fill" style={{ width: `${Math.min(100, (spent / budget) * 100)}%` }} />
            <span className="budget-label">
              {spent} / {budget} pts
              {remaining > 0 && <span style={{ color: 'var(--muted)', marginLeft: 6 }}>({remaining} restantes)</span>}
              {remaining < 0 && <span style={{ color: 'var(--bad)', marginLeft: 6 }}>({-remaining} excedentes)</span>}
            </span>
          </div>
        )}
      </div>

      {/* Domain breakdown */}
      {wheel && (
        <div className="section">
          <div className="section-label">Domínios</div>
          {wheel.domains.map(domain => {
            const pts = domainPoints(domain.index, wheel, allocation)
            const stage1 = pts >= 250
            const stage2 = pts >= 500
            const stage3 = pts >= 1000
            const revPerk = domain.perks.find(p => p.tier === 'revelation')
            const revStage = revPerk ? revelationStage(revPerk.id, wheel, allocation) : 0

            return (
              <div key={domain.index} className="domain-row">
                <span className="domain-dot" style={{ background: domain.color }} />
                <span className="domain-name">{domain.name}</span>
                <span className="domain-pts">{pts} pts</span>
                <span className="domain-stages">
                  {[1,2,3].map(s => (
                    <span key={s} className={`stage-pip ${revStage >= s ? 'active' : ''}`}
                      style={{ background: revStage >= s ? domain.color : undefined }}
                    />
                  ))}
                </span>
                {revPerk && (
                  <span className="domain-rev" style={{ color: revStage > 0 ? domain.color : 'var(--muted)' }}>
                    {revPerk.name.split(' ').slice(0,2).join(' ')}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Mode tabs */}
      <div className="section">
        <div className="mode-tabs">
          <button
            className={`mode-tab ${mode === 'manual' ? 'active' : ''}`}
            onClick={() => onModeChange('manual')}
          >
            Manual
          </button>
          <button
            className={`mode-tab ${mode === 'prompt' ? 'active' : ''}`}
            onClick={() => onModeChange('prompt')}
          >
            Prompt IA
          </button>
        </div>
      </div>

      {/* Share + Reset */}
      <div className="section">
        <div className="row" style={{ gap: 8 }}>
          <button className="primary" onClick={copyShare} style={{ flex: 1, fontSize: 13 }}>
            {copied ? '✓ Copiado!' : '🔗 Compartilhar'}
          </button>
          <button onClick={onReset} style={{ fontSize: 13, color: 'var(--bad)' }}>
            Resetar
          </button>
        </div>
      </div>
    </div>
  )
}
