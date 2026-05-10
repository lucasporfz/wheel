import React from 'react'
import type { Vocation, AllocationMap } from '../data/types'
import type { WheelState } from '../data/types'
import { WHEELS } from '../data/index'
import { canAllocate, canDeallocate } from '../engine/constraints'
import { encodeState, decodeState } from './state'
import WheelSvg from './WheelSvg'
import ControlPanel from './ControlPanel'
import PromptPanel from './PromptPanel'
import ManualPanel from './ManualPanel'

type Action =
  | { type: 'SET_VOCATION'; vocation: Vocation }
  | { type: 'SET_LEVEL'; level: number | null }
  | { type: 'SET_MANUAL_POINTS'; points: number | null }
  | { type: 'SET_MODE'; mode: 'manual' | 'prompt' }
  | { type: 'SET_PROMPT_TEXT'; text: string }
  | { type: 'ALLOCATE'; perkId: string; delta: 1 | -1 }
  | { type: 'APPLY_ALLOCATION'; allocation: AllocationMap; vocation: Vocation; level: number | null; points: number | null }
  | { type: 'RESET' }
  | { type: 'LOAD_STATE'; state: WheelState }

const INITIAL_STATE: WheelState = {
  vocation: null,
  level: null,
  manualPoints: null,
  allocation: {},
  promptText: '',
  mode: 'manual',
}

function reducer(state: WheelState, action: Action): WheelState {
  switch (action.type) {
    case 'SET_VOCATION':
      return { ...state, vocation: action.vocation, allocation: {} }
    case 'SET_LEVEL':
      return { ...state, level: action.level }
    case 'SET_MANUAL_POINTS':
      return { ...state, manualPoints: action.points }
    case 'SET_MODE':
      return { ...state, mode: action.mode }
    case 'SET_PROMPT_TEXT':
      return { ...state, promptText: action.text }
    case 'ALLOCATE': {
      if (!state.vocation) return state
      const wheel = WHEELS[state.vocation]
      if (!wheel) return state
      if (action.delta === 1 && !canAllocate(action.perkId, wheel, state.allocation)) return state
      if (action.delta === -1 && !canDeallocate(action.perkId, wheel, state.allocation)) return state
      const cur = state.allocation[action.perkId] ?? 0
      const next = cur + action.delta
      const alloc = { ...state.allocation }
      if (next <= 0) {
        delete alloc[action.perkId]
      } else {
        alloc[action.perkId] = next
      }
      return { ...state, allocation: alloc }
    }
    case 'APPLY_ALLOCATION':
      return {
        ...state,
        vocation: action.vocation,
        level: action.level ?? state.level,
        manualPoints: action.points ?? state.manualPoints,
        allocation: action.allocation,
        mode: 'manual',
      }
    case 'RESET':
      return { ...INITIAL_STATE }
    case 'LOAD_STATE':
      return action.state
    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE)

  React.useEffect(() => {
    const url = new URL(window.location.href)
    const stateParam = url.searchParams.get('state')
    if (stateParam) {
      const restored = decodeState(stateParam)
      if (restored) dispatch({ type: 'LOAD_STATE', state: restored })
    }
  }, [])

  React.useEffect(() => {
    const encoded = encodeState(state)
    const base = window.location.origin + window.location.pathname
    const url = base + '?state=' + encodeURIComponent(encoded)
    window.history.replaceState(null, '', url)
  }, [state])

  const wheel = state.vocation ? WHEELS[state.vocation] ?? null : null

  const shareUrl = React.useMemo(() => {
    const encoded = encodeState(state)
    return window.location.origin + window.location.pathname + '?state=' + encodeURIComponent(encoded)
  }, [state])

  return (
    <div className="app-layout">
      <div className="wheel-container">
        {wheel ? (
          <WheelSvg
            wheel={wheel}
            allocation={state.allocation}
            totalBudget={state.manualPoints ?? (state.level !== null ? Math.max(0, state.level - 50) : 0)}
            onPerkClick={(perkId, delta) => dispatch({ type: 'ALLOCATE', perkId, delta })}
          />
        ) : (
          <div className="wheel-placeholder">
            <div className="wheel-placeholder-inner">
              <div className="wheel-placeholder-title">Wheel of Destiny</div>
              <div className="wheel-placeholder-sub">Selecione uma vocação para começar</div>
            </div>
          </div>
        )}
      </div>

      <div className="side-panel">
        <ControlPanel
          vocation={state.vocation}
          level={state.level}
          manualPoints={state.manualPoints}
          allocation={state.allocation}
          wheel={wheel}
          mode={state.mode}
          shareUrl={shareUrl}
          onVocationChange={v => dispatch({ type: 'SET_VOCATION', vocation: v })}
          onLevelChange={n => dispatch({ type: 'SET_LEVEL', level: n })}
          onManualPointsChange={n => dispatch({ type: 'SET_MANUAL_POINTS', points: n })}
          onModeChange={m => dispatch({ type: 'SET_MODE', mode: m })}
          onReset={() => dispatch({ type: 'RESET' })}
        />

        {state.mode === 'prompt' && (
          <PromptPanel
            initialText={state.promptText}
            onApply={(allocation, vocation, level, points) =>
              dispatch({ type: 'APPLY_ALLOCATION', allocation, vocation, level, points })
            }
          />
        )}

        {state.mode === 'manual' && (
          <ManualPanel
            wheel={wheel}
            allocation={state.allocation}
            onPerkChange={(perkId, delta) => dispatch({ type: 'ALLOCATE', perkId, delta })}
          />
        )}
      </div>
    </div>
  )
}
