import type { Vocation } from '../data/types'

export type Spec = {
  vocation: Vocation | null
  points: number | null
  level: number | null
  wants: Array<{ key: string; label: string; stage: number }>
  gemSlots: number
}

const VOC_MAP: Record<string, Vocation> = {
  paladino: 'paladin', paladin: 'paladin',
  'royal paladin': 'paladin', rp: 'paladin',
  cavaleiro: 'knight', knight: 'knight',
  'elite knight': 'knight', ek: 'knight',
  druida: 'druid', druid: 'druid',
  'elder druid': 'druid', ed: 'druid',
  feiticeiro: 'sorcerer', sorcerer: 'sorcerer', sorceress: 'sorcerer',
  'master sorcerer': 'sorcerer', ms: 'sorcerer',
  monk: 'monk', 'exalted monk': 'monk', monge: 'monk', em: 'monk',
}

const WANT_PATTERNS: Array<{ key: string; label: string; re: RegExp }> = [
  // ── Shared ────────────────────────────────────────────────────────────────
  { key: 'gift_of_life',         label: 'Gift of Life',         re: /gift\s*of\s*life/i },
  // ── Paladin ───────────────────────────────────────────────────────────────
  { key: 'gran_con',             label: 'Gran Con',             re: /gran\s*con\b/i },
  { key: 'ballistic_mastery',    label: 'Ballistic Mastery',    re: /ballistic\s*mastery|maestria\s*bal[íi]stica/i },
  { key: 'positional_tactics',   label: 'Positional Tactics',   re: /positional\s*tactics|t[áa]ticas\s*posicionais/i },
  { key: 'focus_mastery',        label: 'Focus Mastery',        re: /focus\s*mastery|maestria\s*de\s*foco/i },
  { key: 'sharpshooter',         label: 'Sharpshooter',         re: /sharpshooter|atirador\s*certeiro/i },
  { key: 'divine_empowerment',   label: 'Divine Empowerment',   re: /divine\s*empowerment|empoderamento\s*divino/i },
  { key: 'divine_grenade',       label: 'Divine Grenade',       re: /divine\s*grenade|granada\s*divina/i },
  { key: 'avatar_of_light',      label: 'Avatar of Light',      re: /avatar\s*of\s*light|avatar\s*d[ae]\s*luz/i },
  { key: 'mas_san',              label: 'Aug: Exori Mas San',   re: /mas\s*san|exori\s*mas\s*san/i },
  // ── Knight ────────────────────────────────────────────────────────────────
  { key: 'executioners_throw',   label: "Executioner's Throw",  re: /executioner.?s?\s*throw|arremesso\s*(do\s*)?executor/i },
  { key: 'combat_mastery',       label: 'Combat Mastery',       re: /combat\s*mastery|maestria\s*(de\s*)?combate/i },
  { key: 'avatar_of_steel',      label: 'Avatar of Steel',      re: /avatar\s*of\s*steel|avatar\s*d[eo]\s*a[çc]o/i },
  { key: 'battle_instinct',      label: 'Battle Instinct',      re: /battle\s*instinct|instinto\s*de\s*batalha/i },
  { key: 'battle_healing',       label: 'Battle Healing',       re: /battle\s*healing|cura\s*em\s*batalha/i },
  // ── Druid ────────────────────────────────────────────────────────────────
  { key: 'twin_bursts',          label: 'Twin Bursts',          re: /twin\s*bursts?|duplas?\s*explos[oõ]es?/i },
  { key: 'blessing_of_grove',    label: 'Blessing of the Grove', re: /blessing\s*of\s*(the\s*)?grove|b[êe]n[çc][aã]o\s*(do\s*)?bosque/i },
  { key: 'avatar_of_nature',     label: 'Avatar of Nature',     re: /avatar\s*of\s*nature|avatar\s*da\s*natureza/i },
  { key: 'healing_link',         label: 'Healing Link',         re: /healing\s*link|elo\s*de\s*cura/i },
  { key: 'runic_mastery',        label: 'Runic Mastery',        re: /runic\s*mastery|maestria\s*r[úu]nica/i },
  { key: 'lifegiver',            label: 'Lifegiver',            re: /lifegiver|doador\s*de\s*vida/i },
  { key: 'rejuvenation',         label: 'Rejuvenation',         re: /rejuvenation|rejuvenescimento/i },
  { key: 'shared_preservation',  label: 'Shared Preservation',  re: /shared\s*preservation|preserva[çc][aã]o\s*compartilhada/i },
  // ── Sorcerer ─────────────────────────────────────────────────────────────
  { key: 'beam_mastery',         label: 'Beam Mastery',         re: /beam\s*mastery|maestria\s*de\s*feixe/i },
  { key: 'drain_body',           label: 'Drain Body',           re: /drain\s*body|drenar\s*corpo/i },
  { key: 'avatar_of_storm',      label: 'Avatar of Storm',      re: /avatar\s*of\s*storm|avatar\s*da\s*tempestade/i },
  // ── Monk ─────────────────────────────────────────────────────────────────
  { key: 'spiritual_outburst',   label: 'Spiritual Outburst',   re: /spiritual\s*outburst|explos[aã]o\s*espiritual/i },
  { key: 'ascetic',              label: 'Ascetic',              re: /ascetic|asceta/i },
  { key: 'avatar_of_balance',    label: 'Avatar of Balance',    re: /avatar\s*of\s*balance|avatar\s*do\s*equil[íi]brio/i },
  { key: 'vessel_resonance',     label: 'Vessel Resonance',     re: /vessel\s*resonance|ressonância\s*do\s*recipiente/i },
  { key: 'guiding_presence',     label: 'Guiding Presence',     re: /guiding\s*presence|presen[çc]a\s*guia/i },
  { key: 'sanctuary',            label: 'Sanctuary',            re: /sanctuary|santu[áa]rio/i },
]

export function parseInput(text: string): Spec {
  const s = text.toLowerCase()

  // Level
  const mLevel = s.match(/n[íi]vel\s*(\d+)|level\s*(\d+)|lv\.?\s*(\d+)/i)
  const level = mLevel ? Number(mLevel[1] ?? mLevel[2] ?? mLevel[3]) : null

  // Points (explicit)
  const mPts = s.match(/(\d{2,5})\s*(pontos?|points?)/)
  const points = mPts ? Number(mPts[1]) : null

  // Vocation — try multi-word first, then single-word
  let vocation: Vocation | null = null
  for (const phrase of ['royal paladin', 'elite knight', 'elder druid', 'master sorcerer', 'exalted monk']) {
    if (s.includes(phrase)) {
      vocation = VOC_MAP[phrase]!
      break
    }
  }
  if (!vocation) {
    for (const k of Object.keys(VOC_MAP)) {
      if (new RegExp(`\\b${k}\\b`, 'i').test(s)) {
        vocation = VOC_MAP[k]!
        break
      }
    }
  }

  // Wants (perks and stages)
  const wants: Spec['wants'] = []
  for (const pat of WANT_PATTERNS) {
    // Try to find a stage number after the perk name
    const m = text.match(new RegExp(pat.re.source + '[^0-9]*([0-9])?', pat.re.flags))
    if (m) {
      const stage = m[1] ? Number(m[1]) : 1
      wants.push({ key: pat.key, label: pat.label, stage })
    }
  }

  // Gem slots
  const mGems = s.match(/(\d)\s*(slots?|espa[çc]os?)\s*(para\s*)?(greater|grandes?)\s*gem/i)
  const gemSlots = mGems ? Number(mGems[1]) : 0

  return { vocation, points, level, wants, gemSlots }
}
