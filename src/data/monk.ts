import type { VocationWheel } from './types'

// Exalted Monk - Wheel of Destiny (added 2025)
// Revelation perks: Gift of Life, Spiritual Outburst, Ascetic, Avatar of Balance
// New: Vessel Resonance conviction perk (one per domain)
// VERIFY: all domain assignments and perk details in-game

export const MONK_WHEEL: VocationWheel = {
  vocation: 'monk',
  label: 'Exalted Monk',
  labelPt: 'Monk',
  domains: [
    {
      index: 0,
      name: 'Green',
      namePt: 'Verde',
      color: 'hsl(130,60%,45%)',
      perks: [
        // ── Dedication ──────────────────────────────────────────────────────
        { id: 'em_d0_hp', name: 'Hit Points', namePt: 'pontos de vida', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+2 HP per point' },  // VERIFY
        { id: 'em_d0_mana', name: 'Mana', namePt: 'mana', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+3 Mana per point' },  // VERIFY
        { id: 'em_d0_capacity', name: 'Capacity', namePt: 'capacidade', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+3 Capacity per point' },  // VERIFY
        { id: 'em_d0_hpregen', name: 'HP Regen Boost', namePt: 'recarga de vida', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+0.2% HP regen burst chance per point' },
        { id: 'em_d0_manaregen', name: 'Mana Regen Boost', namePt: 'recarga de mana', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+0.2% Mana regen burst chance per point' },
        { id: 'em_d0_familiar_exp', name: 'Familiar Expertise', namePt: 'expertise familiar', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+0.3% familiar HP, +0.1% familiar damage per point' },
        { id: 'em_d0_familiar_cd', name: 'Familiar Cooldown', namePt: 'cooldown familiar', tier: 'dedication', domain: 0, maxPoints: 3, effect: '-1s familiar cooldown per point' },
        { id: 'em_d0_mitigation', name: 'Mitigation', namePt: 'mitigação', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+0.03% mitigation multiplier per point' },
        // ── Conviction ──────────────────────────────────────────────────────
        { id: 'em_d0_vessel_resonance', name: 'Vessel Resonance', namePt: 'ressonância do recipiente', tier: 'conviction', domain: 0, maxPoints: 1, effect: 'Enhances Vessel effects in this domain (VERIFY exact effect)', requires: ['em_d0_hp', 'em_d0_mana'] },
        { id: 'em_d0_life_leech', name: 'Life Leech', namePt: 'absorção de vida', tier: 'conviction', domain: 0, maxPoints: 1, effect: '+0.75% life leech chance', requires: ['em_d0_capacity'] },
        // ── Revelation ──────────────────────────────────────────────────────
        {
          id: 'em_d0_gift_of_life', name: 'Gift of Life', namePt: 'presente da vida', tier: 'revelation', domain: 0, maxPoints: 1,
          effect: 'If a lethal blow would kill you (overkill < 20/25/30% max HP), you first heal for that % and survive.',
          stages: [
            { points: 250, effect: 'Stage 1: survive if overkill < 20% max HP; heal 20% max HP; cooldown 30h' },
            { points: 500, effect: 'Stage 2: survive if overkill < 25% max HP; heal 25% max HP; cooldown 20h' },
            { points: 1000, effect: 'Stage 3: survive if overkill < 30% max HP; heal 30% max HP; cooldown 10h' },
          ]
        },
      ],
    },
    {
      index: 1,
      name: 'Yellow',
      namePt: 'Amarelo',
      color: 'hsl(45,80%,55%)',
      perks: [
        // ── Dedication ──────────────────────────────────────────────────────
        { id: 'em_d1_hp', name: 'Hit Points', namePt: 'pontos de vida', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+2 HP per point' },
        { id: 'em_d1_mana', name: 'Mana', namePt: 'mana', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+3 Mana per point' },
        { id: 'em_d1_capacity', name: 'Capacity', namePt: 'capacidade', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+3 Capacity per point' },
        { id: 'em_d1_hpregen', name: 'HP Regen Boost', namePt: 'recarga de vida', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+0.2% HP regen burst chance per point' },
        { id: 'em_d1_manaregen', name: 'Mana Regen Boost', namePt: 'recarga de mana', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+0.2% Mana regen burst chance per point' },
        { id: 'em_d1_familiar_exp', name: 'Familiar Expertise', namePt: 'expertise familiar', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+0.3% familiar HP, +0.1% familiar damage per point' },
        { id: 'em_d1_familiar_cd', name: 'Familiar Cooldown', namePt: 'cooldown familiar', tier: 'dedication', domain: 1, maxPoints: 3, effect: '-1s familiar cooldown per point' },
        { id: 'em_d1_mitigation', name: 'Mitigation', namePt: 'mitigação', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+0.03% mitigation multiplier per point' },
        // ── Conviction ──────────────────────────────────────────────────────
        { id: 'em_d1_vessel_resonance', name: 'Vessel Resonance', namePt: 'ressonância do recipiente', tier: 'conviction', domain: 1, maxPoints: 1, effect: 'Enhances Vessel effects in this domain (VERIFY exact effect)', requires: ['em_d1_hp', 'em_d1_mana'] },
        { id: 'em_d1_guiding_presence', name: 'Guiding Presence', namePt: 'presença guia', tier: 'conviction', domain: 1, maxPoints: 1, effect: 'Share 100% of your Mantra effect with nearby party members', requires: ['em_d1_capacity'] },
        // ── Revelation ──────────────────────────────────────────────────────
        {
          id: 'em_d1_spiritual_outburst', name: 'Spiritual Outburst', namePt: 'explosão espiritual', tier: 'revelation', domain: 1, maxPoints: 1,
          effect: 'Release a powerful spiritual burst dealing damage to nearby enemies. (VERIFY exact stages)',
          stages: [
            { points: 250, effect: 'Stage 1: spiritual burst — moderate damage' },
            { points: 500, effect: 'Stage 2: spiritual burst — increased damage' },
            { points: 1000, effect: 'Stage 3: spiritual burst — maximum damage' },
          ]
        },
      ],
    },
    {
      index: 2,
      name: 'Blue',
      namePt: 'Azul',
      color: 'hsl(200,70%,55%)',
      perks: [
        // ── Dedication ──────────────────────────────────────────────────────
        { id: 'em_d2_hp', name: 'Hit Points', namePt: 'pontos de vida', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+2 HP per point' },
        { id: 'em_d2_mana', name: 'Mana', namePt: 'mana', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+3 Mana per point' },
        { id: 'em_d2_capacity', name: 'Capacity', namePt: 'capacidade', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+3 Capacity per point' },
        { id: 'em_d2_hpregen', name: 'HP Regen Boost', namePt: 'recarga de vida', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+0.2% HP regen burst chance per point' },
        { id: 'em_d2_manaregen', name: 'Mana Regen Boost', namePt: 'recarga de mana', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+0.2% Mana regen burst chance per point' },
        { id: 'em_d2_familiar_exp', name: 'Familiar Expertise', namePt: 'expertise familiar', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+0.3% familiar HP, +0.1% familiar damage per point' },
        { id: 'em_d2_familiar_cd', name: 'Familiar Cooldown', namePt: 'cooldown familiar', tier: 'dedication', domain: 2, maxPoints: 3, effect: '-1s familiar cooldown per point' },
        { id: 'em_d2_mitigation', name: 'Mitigation', namePt: 'mitigação', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+0.03% mitigation multiplier per point' },
        // ── Conviction ──────────────────────────────────────────────────────
        { id: 'em_d2_vessel_resonance', name: 'Vessel Resonance', namePt: 'ressonância do recipiente', tier: 'conviction', domain: 2, maxPoints: 1, effect: 'Enhances Vessel effects in this domain (VERIFY exact effect)', requires: ['em_d2_hp', 'em_d2_mana'] },
        { id: 'em_d2_sanctuary', name: 'Sanctuary', namePt: 'santuário', tier: 'conviction', domain: 2, maxPoints: 1, effect: '+10% damage/healing to adjacent targets; creates Harmony field (2% per Harmony consumed)', requires: ['em_d2_capacity'] },
        // ── Revelation ──────────────────────────────────────────────────────
        {
          id: 'em_d2_ascetic', name: 'Ascetic', namePt: 'asceta', tier: 'revelation', domain: 2, maxPoints: 1,
          effect: 'Passive Harmony bonus and auto attacks deal Mantra damage.',
          stages: [
            { points: 250, effect: 'Stage 1: +1% Harmony base bonus; auto attacks deal 100% Mantra damage' },
            { points: 500, effect: 'Stage 2: +2% Harmony base bonus; auto attacks deal 200% Mantra damage' },
            { points: 1000, effect: 'Stage 3: +3% Harmony base bonus; auto attacks deal 300% Mantra damage' },
          ]
        },
      ],
    },
    {
      index: 3,
      name: 'Purple',
      namePt: 'Roxo',
      color: 'hsl(270,60%,55%)',
      perks: [
        // ── Dedication ──────────────────────────────────────────────────────
        { id: 'em_d3_hp', name: 'Hit Points', namePt: 'pontos de vida', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+2 HP per point' },
        { id: 'em_d3_mana', name: 'Mana', namePt: 'mana', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+3 Mana per point' },
        { id: 'em_d3_capacity', name: 'Capacity', namePt: 'capacidade', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+3 Capacity per point' },
        { id: 'em_d3_hpregen', name: 'HP Regen Boost', namePt: 'recarga de vida', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+0.2% HP regen burst chance per point' },
        { id: 'em_d3_manaregen', name: 'Mana Regen Boost', namePt: 'recarga de mana', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+0.2% Mana regen burst chance per point' },
        { id: 'em_d3_familiar_exp', name: 'Familiar Expertise', namePt: 'expertise familiar', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+0.3% familiar HP, +0.1% familiar damage per point' },
        { id: 'em_d3_familiar_cd', name: 'Familiar Cooldown', namePt: 'cooldown familiar', tier: 'dedication', domain: 3, maxPoints: 3, effect: '-1s familiar cooldown per point' },
        { id: 'em_d3_mitigation', name: 'Mitigation', namePt: 'mitigação', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+0.03% mitigation multiplier per point' },
        // ── Conviction ──────────────────────────────────────────────────────
        { id: 'em_d3_vessel_resonance', name: 'Vessel Resonance', namePt: 'ressonância do recipiente', tier: 'conviction', domain: 3, maxPoints: 1, effect: 'Enhances Vessel effects in this domain (VERIFY exact effect)', requires: ['em_d3_hp', 'em_d3_mana'] },
        { id: 'em_d3_mana_leech', name: 'Mana Leech', namePt: 'absorção de mana', tier: 'conviction', domain: 3, maxPoints: 1, effect: '+0.25% mana leech chance', requires: ['em_d3_capacity'] },
        // ── Revelation ──────────────────────────────────────────────────────
        {
          id: 'em_d3_avatar_of_balance', name: 'Avatar of Balance', namePt: 'avatar do equilíbrio', tier: 'revelation', domain: 3, maxPoints: 1,
          effect: 'Transform into a balanced avatar for 11s with damage reduction and critical hit bonuses. (VERIFY exact name and effects)',
          stages: [
            { points: 250, effect: 'Stage 1: 11s avatar; 5% damage reduction; all attacks critical (+5% extra); cooldown 120min' },
            { points: 500, effect: 'Stage 2: 11s avatar; 10% damage reduction; all attacks critical (+10% extra); cooldown 90min' },
            { points: 1000, effect: 'Stage 3: 11s avatar; 15% damage reduction; all attacks critical (+15% extra); cooldown 60min' },
          ]
        },
      ],
    },
  ],
}
