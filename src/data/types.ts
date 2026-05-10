export type Tier = 'dedication' | 'conviction' | 'revelation'
export type Vocation = 'paladin' | 'knight' | 'sorcerer' | 'druid' | 'monk'
export type DomainIndex = 0 | 1 | 2 | 3

export interface RevStage {
  points: number  // domain points required: 250 | 500 | 1000
  effect: string
}

export interface Perk {
  id: string
  name: string
  namePt: string       // Portuguese alias for NLU matching
  tier: Tier
  domain: DomainIndex
  // dedication: 1-N stackable points; conviction: 1 (can appear multiple times in wheel); revelation: 1
  maxPoints: number
  effect: string
  stages?: RevStage[]  // revelation perks only (3 stages)
  requires?: string[]  // perk IDs that must be fully allocated first (for conviction)
  // For conviction perks that appear multiple times (e.g. Gran Con ×2):
  // duplicate instances share the same base id but get suffix _b for second instance
}

export interface DomainConfig {
  index: DomainIndex
  name: string
  namePt: string
  color: string        // hsl() for SVG
  perks: Perk[]
}

export interface VocationWheel {
  vocation: Vocation
  label: string        // e.g. "Royal Paladin"
  labelPt: string      // e.g. "Paladino"
  domains: [DomainConfig, DomainConfig, DomainConfig, DomainConfig]
}

// perkId -> points currently allocated (0 to perk.maxPoints)
export type AllocationMap = Record<string, number>

export interface WheelState {
  vocation: Vocation | null
  level: number | null
  manualPoints: number | null  // override auto-computed points from level
  allocation: AllocationMap
  promptText: string
  mode: 'manual' | 'prompt'
}
