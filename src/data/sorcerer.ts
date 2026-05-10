import type { VocationWheel } from './types'

// Master Sorcerer - Wheel of Destiny
// Revelation perks: Gift of Life, Beam Mastery, Drain Body, Avatar of Storm
// VERIFY: exact domain-to-revelation mapping in-game

export const SORCERER_WHEEL: VocationWheel = {
  vocation: 'sorcerer',
  label: 'Master Sorcerer',
  labelPt: 'Sorcerer',
  domains: [
    {
      index: 0,
      name: 'Green',
      namePt: 'Verde',
      color: 'hsl(130,60%,45%)',
      perks: [
        // ── Dedication ──────────────────────────────────────────────────────
        { id: 'ms_d0_hp', name: 'Hit Points', namePt: 'pontos de vida', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+1 HP per point' },
        { id: 'ms_d0_mana', name: 'Mana', namePt: 'mana', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+6 Mana per point' },
        { id: 'ms_d0_capacity', name: 'Capacity', namePt: 'capacidade', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+2 Capacity per point' },
        { id: 'ms_d0_hpregen', name: 'HP Regen Boost', namePt: 'recarga de vida', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+0.2% HP regen burst chance per point' },
        { id: 'ms_d0_manaregen', name: 'Mana Regen Boost', namePt: 'recarga de mana', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+0.2% Mana regen burst chance per point' },
        { id: 'ms_d0_familiar_exp', name: 'Familiar Expertise', namePt: 'expertise familiar', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+0.3% familiar HP, +0.1% familiar damage per point' },
        { id: 'ms_d0_familiar_cd', name: 'Familiar Cooldown', namePt: 'cooldown familiar', tier: 'dedication', domain: 0, maxPoints: 3, effect: '-1s familiar cooldown per point' },
        { id: 'ms_d0_mitigation', name: 'Mitigation', namePt: 'mitigação', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+0.03% mitigation multiplier per point' },
        // ── Conviction ──────────────────────────────────────────────────────
        { id: 'ms_d0_life_leech', name: 'Life Leech', namePt: 'absorção de vida', tier: 'conviction', domain: 0, maxPoints: 1, effect: '+0.75% life leech chance', requires: ['ms_d0_hp', 'ms_d0_mana'] },
        { id: 'ms_d0_fire_res', name: 'Fire Resistance', namePt: 'resistência ao fogo', tier: 'conviction', domain: 0, maxPoints: 1, effect: '+2% fire resistance', requires: ['ms_d0_capacity'] },
        // ── Revelation ──────────────────────────────────────────────────────
        {
          id: 'ms_d0_gift_of_life', name: 'Gift of Life', namePt: 'presente da vida', tier: 'revelation', domain: 0, maxPoints: 1,
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
        { id: 'ms_d1_hp', name: 'Hit Points', namePt: 'pontos de vida', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+1 HP per point' },
        { id: 'ms_d1_mana', name: 'Mana', namePt: 'mana', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+6 Mana per point' },
        { id: 'ms_d1_capacity', name: 'Capacity', namePt: 'capacidade', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+2 Capacity per point' },
        { id: 'ms_d1_hpregen', name: 'HP Regen Boost', namePt: 'recarga de vida', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+0.2% HP regen burst chance per point' },
        { id: 'ms_d1_manaregen', name: 'Mana Regen Boost', namePt: 'recarga de mana', tier: 'dedication', domain: 1, maxPoints: 1, effect: '+0.2% Mana regen burst chance per point' },
        { id: 'ms_d1_familiar_exp', name: 'Familiar Expertise', namePt: 'expertise familiar', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+0.3% familiar HP, +0.1% familiar damage per point' },
        { id: 'ms_d1_familiar_cd', name: 'Familiar Cooldown', namePt: 'cooldown familiar', tier: 'dedication', domain: 1, maxPoints: 3, effect: '-1s familiar cooldown per point' },
        { id: 'ms_d1_mitigation', name: 'Mitigation', namePt: 'mitigação', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+0.03% mitigation multiplier per point' },
        // ── Conviction ──────────────────────────────────────────────────────
        { id: 'ms_d1_focus_mastery', name: 'Focus Mastery', namePt: 'maestria de foco', tier: 'conviction', domain: 1, maxPoints: 1, effect: 'Next damaging spell within 12s after a focus spell deals +25% damage', requires: ['ms_d1_hp', 'ms_d1_mana'] },
        { id: 'ms_d1_energy_res', name: 'Energy Resistance', namePt: 'resistência à energia', tier: 'conviction', domain: 1, maxPoints: 1, effect: '+2% energy resistance', requires: ['ms_d1_capacity'] },
        // ── Revelation ──────────────────────────────────────────────────────
        {
          id: 'ms_d1_beam_mastery', name: 'Beam Mastery', namePt: 'maestria de feixe', tier: 'revelation', domain: 1, maxPoints: 1,
          effect: 'Unlocks a powerful beam spell. Each target hit reduces other spell cooldowns by 1s (max 3s) and increases beam damage by 8/10/12%.',
          stages: [
            { points: 250, effect: 'Stage 1: +8% beam damage per target hit; -1s cooldown per target; max 24% bonus; cooldown 10s' },
            { points: 500, effect: 'Stage 2: +10% beam damage per target hit; max 30% bonus; cooldown 8s' },
            { points: 1000, effect: 'Stage 3: +12% beam damage per target hit; max 36% bonus; cooldown 6s' },
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
        { id: 'ms_d2_hp', name: 'Hit Points', namePt: 'pontos de vida', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+1 HP per point' },
        { id: 'ms_d2_mana', name: 'Mana', namePt: 'mana', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+6 Mana per point' },
        { id: 'ms_d2_capacity', name: 'Capacity', namePt: 'capacidade', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+2 Capacity per point' },
        { id: 'ms_d2_hpregen', name: 'HP Regen Boost', namePt: 'recarga de vida', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+0.2% HP regen burst chance per point' },
        { id: 'ms_d2_manaregen', name: 'Mana Regen Boost', namePt: 'recarga de mana', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+0.2% Mana regen burst chance per point' },
        { id: 'ms_d2_familiar_exp', name: 'Familiar Expertise', namePt: 'expertise familiar', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+0.3% familiar HP, +0.1% familiar damage per point' },
        { id: 'ms_d2_familiar_cd', name: 'Familiar Cooldown', namePt: 'cooldown familiar', tier: 'dedication', domain: 2, maxPoints: 3, effect: '-1s familiar cooldown per point' },
        { id: 'ms_d2_mitigation', name: 'Mitigation', namePt: 'mitigação', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+0.03% mitigation multiplier per point' },
        // ── Conviction ──────────────────────────────────────────────────────
        { id: 'ms_d2_mana_leech', name: 'Mana Leech', namePt: 'absorção de mana', tier: 'conviction', domain: 2, maxPoints: 1, effect: '+0.25% mana leech chance', requires: ['ms_d2_hp', 'ms_d2_mana'] },
        { id: 'ms_d2_ice_res', name: 'Ice Resistance', namePt: 'resistência ao gelo', tier: 'conviction', domain: 2, maxPoints: 1, effect: '+2% ice resistance', requires: ['ms_d2_capacity'] },
        // ── Revelation ──────────────────────────────────────────────────────
        {
          id: 'ms_d2_drain_body', name: 'Drain Body', namePt: 'drenar corpo', tier: 'revelation', domain: 2, maxPoints: 1,
          effect: 'Debuffs all creatures in an area for 16s; grants 1/1.25/1.5% mana leech and 3/3.75/4.5% life leech against debuffed creatures. Cooldown: 12s.',
          stages: [
            { points: 250, effect: 'Stage 1: 16s debuff; +1% mana leech, +3% life leech vs debuffed; cooldown 12s' },
            { points: 500, effect: 'Stage 2: 16s debuff; +1.25% mana leech, +3.75% life leech vs debuffed' },
            { points: 1000, effect: 'Stage 3: 16s debuff; +1.5% mana leech, +4.5% life leech vs debuffed' },
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
        { id: 'ms_d3_hp', name: 'Hit Points', namePt: 'pontos de vida', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+1 HP per point' },
        { id: 'ms_d3_mana', name: 'Mana', namePt: 'mana', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+6 Mana per point' },
        { id: 'ms_d3_capacity', name: 'Capacity', namePt: 'capacidade', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+2 Capacity per point' },
        { id: 'ms_d3_hpregen', name: 'HP Regen Boost', namePt: 'recarga de vida', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+0.2% HP regen burst chance per point' },
        { id: 'ms_d3_manaregen', name: 'Mana Regen Boost', namePt: 'recarga de mana', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+0.2% Mana regen burst chance per point' },
        { id: 'ms_d3_familiar_exp', name: 'Familiar Expertise', namePt: 'expertise familiar', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+0.3% familiar HP, +0.1% familiar damage per point' },
        { id: 'ms_d3_familiar_cd', name: 'Familiar Cooldown', namePt: 'cooldown familiar', tier: 'dedication', domain: 3, maxPoints: 3, effect: '-1s familiar cooldown per point' },
        { id: 'ms_d3_mitigation', name: 'Mitigation', namePt: 'mitigação', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+0.03% mitigation multiplier per point' },
        // ── Conviction ──────────────────────────────────────────────────────
        { id: 'ms_d3_earth_res', name: 'Earth Resistance', namePt: 'resistência à terra', tier: 'conviction', domain: 3, maxPoints: 1, effect: '+2% earth resistance', requires: ['ms_d3_hp', 'ms_d3_mana'] },
        { id: 'ms_d3_magic_level', name: 'Magic Level', namePt: 'nível mágico', tier: 'conviction', domain: 3, maxPoints: 1, effect: '+1 magic level', requires: ['ms_d3_capacity'] },
        // ── Revelation ──────────────────────────────────────────────────────
        {
          id: 'ms_d3_avatar_of_storm', name: 'Avatar of Storm', namePt: 'avatar da tempestade', tier: 'revelation', domain: 3, maxPoints: 1,
          effect: 'Transform into a storm avatar for 11s with damage reduction and critical hit bonuses.',
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
