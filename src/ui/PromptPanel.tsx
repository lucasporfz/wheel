import React from 'react'
import type { Vocation, VocationWheel, AllocationMap } from '../data/types'
import { parseInput } from '../nlu/parse'
import { solve } from '../engine/solver'
import { WHEELS } from '../data/index'

interface PromptPanelProps {
  initialText?: string
  onApply: (allocation: AllocationMap, vocation: Vocation, level: number | null, points: number | null) => void
}

export default function PromptPanel({ initialText = '', onApply }: PromptPanelProps) {
  const [text, setText] = React.useState(initialText || 'sou paladino nível 1500, quero Gift of Life 3, Ballistic Mastery e Gran Con 2')
  const [result, setResult] = React.useState<ReturnType<typeof solve> | null>(null)
  const [spec, setSpec] = React.useState<ReturnType<typeof parseInput> | null>(null)
  const [wheel, setWheel] = React.useState<VocationWheel | null>(null)

  function onSolve() {
    const parsed = parseInput(text)
    setSpec(parsed)
    if (!parsed.vocation) {
      setResult({ ok: false, reason: 'Informe a vocação no texto.' })
      setWheel(null)
      return
    }
    const w = WHEELS[parsed.vocation]
    setWheel(w)
    const res = solve(parsed)
    setResult(res)
  }

  function onApplyClick() {
    if (!result?.ok || !result.allocation || !spec?.vocation) return
    onApply(result.allocation, spec.vocation, spec.level, spec.points)
  }

  const EXAMPLES = [
    'sou paladino nível 1500, quero Gift of Life 3 e Ballistic Mastery',
    'paladino lvl 800, quero Gran Con 2 e Gift of Life 1',
    'elite knight nível 600, quero Executioner\'s Throw 2 e Battle Instinct',
    'elder druid lvl 1000, quero Twin Bursts 2 e Blessing of the Grove 1',
    'master sorcerer nível 700, quero Beam Mastery 2',
    'monk nível 400, quero Ascetic 1 e Spiritual Outburst 1',
  ]

  return (
    <div className="prompt-panel">
      <div className="section-label" style={{ marginBottom: 8 }}>Prompt em linguagem natural</div>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="ex: sou paladino nível 1500, quero Gift of Life 3 e Ballistic Mastery..."
        style={{ minHeight: 100 }}
      />

      <div style={{ marginTop: 6, marginBottom: 8 }}>
        <div className="small" style={{ marginBottom: 4 }}>Exemplos:</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {EXAMPLES.map((ex, i) => (
            <button
              key={i}
              className="example-chip"
              onClick={() => setText(ex)}
              style={{ fontSize: 10 }}
            >
              {ex.substring(0, 35)}…
            </button>
          ))}
        </div>
      </div>

      <div className="row" style={{ gap: 8 }}>
        <button className="primary" onClick={onSolve} style={{ flex: 1 }}>
          Montar Roda
        </button>
        {result?.ok && (
          <button className="ok-btn" onClick={onApplyClick} style={{ flex: 1 }}>
            ✓ Aplicar na Roda
          </button>
        )}
      </div>

      {spec && (
        <div className="output" style={{ marginTop: 12 }}>
          <div className="small" style={{ marginBottom: 4 }}>Interpretado:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {spec.vocation && <span className="tag">{spec.vocation}</span>}
            {spec.level && <span className="tag">nível {spec.level}</span>}
            {spec.points && <span className="tag">{spec.points} pts</span>}
            {spec.wants.map(w => (
              <span key={w.key} className="tag">{w.label} {w.stage > 1 ? `T${w.stage}` : ''}</span>
            ))}
            {spec.gemSlots > 0 && <span className="tag">{spec.gemSlots} gem slots</span>}
          </div>
        </div>
      )}

      {result && (
        <div className={`output ${result.ok ? 'ok' : 'bad'}`} style={{ marginTop: 8 }}>
          {result.ok ? (
            <>
              <div><b>✓ Roda montada com sucesso!</b></div>
              <div className="small" style={{ marginTop: 4 }}>
                {result.totalSpent} pts alocados
                {result.domainTotals && (
                  <span style={{ marginLeft: 8 }}>
                    | Domínios: {result.domainTotals.join(' / ')} pts
                  </span>
                )}
              </div>
              {result.unresolved && result.unresolved.length > 0 && (
                <div className="small" style={{ color: '#f0a040', marginTop: 4 }}>
                  Não encontrado: {result.unresolved.join(', ')}
                </div>
              )}
            </>
          ) : (
            <div>{result.reason}</div>
          )}
        </div>
      )}
    </div>
  )
}
