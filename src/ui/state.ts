import type { WheelState } from '../data/types'

export function encodeState(obj: WheelState): string {
  const json = JSON.stringify(obj)
  return btoa(unescape(encodeURIComponent(json)))
}

export function decodeState(b64: string): WheelState | null {
  try {
    const json = decodeURIComponent(escape(atob(b64)))
    const obj = JSON.parse(json)
    return validateWheelState(obj)
  } catch {
    return null
  }
}

export function validateWheelState(obj: unknown): WheelState | null {
  if (!obj || typeof obj !== 'object') return null
  const o = obj as Record<string, unknown>
  const vocations = ['paladin', 'knight', 'sorcerer', 'druid', 'monk']
  return {
    vocation: (vocations.includes(o.vocation as string) ? o.vocation : null) as WheelState['vocation'],
    level: typeof o.level === 'number' ? o.level : null,
    manualPoints: typeof o.manualPoints === 'number' ? o.manualPoints : null,
    allocation: (typeof o.allocation === 'object' && o.allocation !== null) ? o.allocation as Record<string, number> : {},
    promptText: typeof o.promptText === 'string' ? o.promptText : '',
    mode: o.mode === 'prompt' ? 'prompt' : 'manual',
  }
}
