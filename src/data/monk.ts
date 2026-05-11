import type { VocationWheel } from './types'

// Exalted Monk - Wheel of Destiny (added 2025)
// Revelation perks: Gift of Life, Spiritual Outburst, Ascetic, Avatar of Balance

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
        { id: 'em_d0_hp', name: 'Hit Points', namePt: 'pontos de vida', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+2 HP per point' },
        { id: 'em_d0_mana', name: 'Mana', namePt: 'mana', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+3 Mana per point' },
        { id: 'em_d0_capacity', name: 'Capacity', namePt: 'capacidade', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+3 Capacity per point' },
        { id: 'em_d0_hpregen', name: 'HP Regen Boost', namePt: 'recarga de vida', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+0.2% HP regen burst chance per point' },
        { id: 'em_d0_manaregen', name: 'Mana Regen Boost', namePt: 'recarga de mana', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+0.2% Mana regen burst chance per point' },
        { id: 'em_d0_familiar_exp', name: 'Familiar Expertise', namePt: 'expertise familiar', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+0.3% familiar HP, +0.1% familiar damage per point' },
        { id: 'em_d0_familiar_cd', name: 'Familiar Cooldown', namePt: 'cooldown familiar', tier: 'dedication', domain: 0, maxPoints: 3, effect: '-1s familiar cooldown per point' },
        { id: 'em_d0_mitigation', name: 'Mitigation', namePt: 'mitigação', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+0.03% mitigation multiplier per point' },
        // ── Conviction ──────────────────────────────────────────────────────
        { id: 'em_d0_aug_flurry_of_blows', name: 'Aug: Flurry of Blows', namePt: 'aug: rajada de golpes', tier: 'conviction', domain: 0, maxPoints: 1, effect: 'Augments Flurry of Blows', requires: ['em_d0_hp', 'em_d0_mana'], stages: [{ points: 50, effect: 'Aug I: Adds 5% life leech to this spell' }, { points: 625, effect: 'Aug II: +15% Base Damage' }] },
        { id: 'em_d0_aug_sweeping_takedown', name: 'Aug: Sweeping Takedown', namePt: 'aug: derrubada varrida', tier: 'conviction', domain: 0, maxPoints: 1, effect: 'Augments Sweeping Takedown', requires: ['em_d0_capacity'], stages: [{ points: 50, effect: 'Aug I: +3% mana leech on spell' }, { points: 625, effect: 'Aug II: +25% crit extra damage' }] },
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
        { id: 'em_d1_guiding_presence', name: 'Guiding Presence', namePt: 'presença guia', tier: 'conviction', domain: 1, maxPoints: 1, effect: 'Gain an aura that shares 50% of your mantra with members of your group.', requires: ['em_d1_hp', 'em_d1_mana'] },
        { id: 'em_d1_aug_mystic_repulse', name: 'Aug: Mystic Repulse', namePt: 'aug: repulsão mística', tier: 'conviction', domain: 1, maxPoints: 1, effect: 'Augments Mystic Repulse', requires: ['em_d1_capacity'], stages: [{ points: 225, effect: 'Aug I: -4s Cooldown' }, { points: 450, effect: 'Aug II: +40% Base Damage' }] },
        // ── Revelation ──────────────────────────────────────────────────────
        {
          id: 'em_d1_spiritual_outburst', name: 'Spiritual Outburst', namePt: 'explosão espiritual', tier: 'revelation', domain: 1, maxPoints: 1,
          effect: 'Spends all Harmony; first hit is immediate (stronger), second hit comes 1s later (reduced damage).',
          stages: [
            { points: 250, effect: 'Stage 1: moderate two-hit burst' },
            { points: 500, effect: 'Stage 2: increased damage' },
            { points: 1000, effect: 'Stage 3: maximum damage' },
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
        { id: 'em_d2_sanctuary', name: 'Sanctuary', namePt: 'santuário', tier: 'conviction', domain: 2, maxPoints: 1, effect: 'Using Harmony creates a 5s field; +2% damage/healing per Harmony point consumed', requires: ['em_d2_hp', 'em_d2_mana'] },
        { id: 'em_d2_aug_mass_spirit_mend', name: 'Aug: Mass Spirit Mend', namePt: 'aug: recuperação espiritual em massa', tier: 'conviction', domain: 2, maxPoints: 1, effect: 'Augments Mass Spirit Mend', requires: ['em_d2_capacity'], stages: [{ points: 225, effect: 'Aug I: +8% base heal' }, { points: 450, effect: 'Aug II: expand area by 1 sqm' }] },
        // ── Revelation ──────────────────────────────────────────────────────
        {
          id: 'em_d2_ascetic', name: 'Ascetic', namePt: 'asceta', tier: 'revelation', domain: 2, maxPoints: 1,
          effect: 'Passive Harmony bonus and auto attacks deal Mantra damage.',
          stages: [
            { points: 250, effect: 'Stage 1: +1% Harmony base bonus; auto-attacks deal 50% Mantra damage' },
            { points: 500, effect: 'Stage 2: +2% Harmony base bonus; auto-attacks deal 100% Mantra damage' },
            { points: 1000, effect: 'Stage 3: +3% Harmony base bonus; auto-attacks deal 150% Mantra damage' },
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
        { id: 'em_d3_aug_chained_penance', name: 'Aug: Chained Penance', namePt: 'aug: penitência encadeada', tier: 'conviction', domain: 3, maxPoints: 1, effect: 'Augments Chained Penance', requires: ['em_d3_hp', 'em_d3_mana'], stages: [{ points: 225, effect: 'Aug I: Jumps to +1 additional target' }, { points: 450, effect: 'Aug II: +18% Base Damage' }] },
        // ── Revelation ──────────────────────────────────────────────────────
        {
          id: 'em_d3_avatar_of_balance', name: 'Avatar of Balance', namePt: 'avatar do equilíbrio', tier: 'revelation', domain: 3, maxPoints: 1,
          effect: 'Transform into a balanced avatar for 11s with damage reduction and critical hit bonuses.',
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
