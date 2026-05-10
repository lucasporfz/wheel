export type { Tier, Vocation, DomainIndex, RevStage, Perk, DomainConfig, VocationWheel, AllocationMap, WheelState } from './types'
export { PALADIN_WHEEL } from './paladin'
export { KNIGHT_WHEEL } from './knight'
export { DRUID_WHEEL } from './druid'
export { SORCERER_WHEEL } from './sorcerer'
export { MONK_WHEEL } from './monk'

import type { Vocation, VocationWheel } from './types'
import { PALADIN_WHEEL } from './paladin'
import { KNIGHT_WHEEL } from './knight'
import { DRUID_WHEEL } from './druid'
import { SORCERER_WHEEL } from './sorcerer'
import { MONK_WHEEL } from './monk'

export const WHEELS: Record<Vocation, VocationWheel> = {
  paladin: PALADIN_WHEEL,
  knight: KNIGHT_WHEEL,
  druid: DRUID_WHEEL,
  sorcerer: SORCERER_WHEEL,
  monk: MONK_WHEEL,
}

export const VOCATION_OPTIONS: Array<{ id: Vocation; label: string; labelPt: string }> = [
  { id: 'paladin', label: 'Royal Paladin', labelPt: 'Paladino' },
  { id: 'knight', label: 'Elite Knight', labelPt: 'Cavaleiro' },
  { id: 'druid', label: 'Elder Druid', labelPt: 'Druida' },
  { id: 'sorcerer', label: 'Master Sorcerer', labelPt: 'Sorcerer' },
  { id: 'monk', label: 'Exalted Monk', labelPt: 'Monk' },
]
