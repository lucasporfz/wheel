import type { VocationWheel } from './types'

// Master Sorcerer - Wheel of Destiny
// Revelation perks: Gift of Life, Beam Mastery, Drain Body, Avatar of Storm

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
        { id: 'ms_d0_runic_mastery', name: 'Runic Mastery', namePt: 'maestria rúnica', tier: 'conviction', domain: 0, maxPoints: 1, effect: '25% chance to increase Magic Level by 10% for 2s when using a rune (20% if it\'s a rune you can craft)', requires: ['ms_d0_hp', 'ms_d0_mana'] },
        { id: 'ms_d0_aug_sap_strength', name: 'Aug: Sap Strength', namePt: 'aug: drenar força', tier: 'conviction', domain: 0, maxPoints: 1, effect: 'Augments Sap Strength', requires: ['ms_d0_capacity'], stages: [{ points: 225, effect: 'Aug I: expand area by 1 sqm' }, { points: 450, effect: 'Aug II: +1% damage reduction per stack' }] },
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
        { id: 'ms_d1_manaregen', name: 'Mana Regen Boost', namePt: 'recarga de mana', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+0.2% Mana regen burst chance per point' },
        { id: 'ms_d1_familiar_exp', name: 'Familiar Expertise', namePt: 'expertise familiar', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+0.3% familiar HP, +0.1% familiar damage per point' },
        { id: 'ms_d1_familiar_cd', name: 'Familiar Cooldown', namePt: 'cooldown familiar', tier: 'dedication', domain: 1, maxPoints: 3, effect: '-1s familiar cooldown per point' },
        { id: 'ms_d1_mitigation', name: 'Mitigation', namePt: 'mitigação', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+0.03% mitigation multiplier per point' },
        // ── Conviction ──────────────────────────────────────────────────────
        { id: 'ms_d1_focus_mastery', name: 'Focus Mastery', namePt: 'maestria de foco', tier: 'conviction', domain: 1, maxPoints: 1, effect: 'Next attack spell within 12s after using Hell\'s Core or Rage of the Skies deals +35% damage', requires: ['ms_d1_hp', 'ms_d1_mana'] },
        { id: 'ms_d1_aug_focus_spells', name: 'Aug: Focus Spells', namePt: 'aug: feitiços de foco', tier: 'conviction', domain: 1, maxPoints: 1, effect: "Augments Hell's Core and Rage of the Skies", requires: ['ms_d1_capacity'], stages: [{ points: 50, effect: "Aug I: +5% base damage (Hell's Core & Rage of the Skies)" }, { points: 625, effect: 'Aug II: -4s cooldown on both' }] },
        // ── Revelation ──────────────────────────────────────────────────────
        {
          id: 'ms_d1_beam_mastery', name: 'Beam Mastery', namePt: 'maestria de feixe', tier: 'revelation', domain: 1, maxPoints: 1,
          effect: 'Also unlocks Great Death Beam spell. Each target hit increases beam damage; reduces other spell cooldowns by 1s (max 3s).',
          stages: [
            { points: 250, effect: 'Stage 1: +10% beam damage per target hit (max 30%); cooldown 10s' },
            { points: 500, effect: 'Stage 2: +12% per target (max 36%); +6% Great Death Beam base damage; cooldown 8s' },
            { points: 1000, effect: 'Stage 3: +14% per target (max 42%); +12% Great Death Beam base damage; cooldown 6s' },
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
        { id: 'ms_d2_aug_great_fire_wave', name: 'Aug: Great Fire Wave', namePt: 'aug: grande onda de fogo', tier: 'conviction', domain: 2, maxPoints: 1, effect: 'Augments Great Fire Wave', requires: ['ms_d2_hp', 'ms_d2_mana'], stages: [{ points: 50, effect: 'Aug I: +15% crit extra damage, +10% non-stacking crit chance' }, { points: 625, effect: 'Aug II: +4% base damage' }] },
        // ── Revelation ──────────────────────────────────────────────────────
        {
          id: 'ms_d2_drain_body', name: 'Drain Body', namePt: 'drenar corpo', tier: 'revelation', domain: 2, maxPoints: 1,
          effect: 'Debuffs all creatures in an area for 16s; grants mana leech and life leech against debuffed creatures. Cooldown: 12s.',
          stages: [
            { points: 250, effect: 'Stage 1: 16s debuff; +1% mana leech, +3% life leech vs debuffed; cooldown 12s' },
            { points: 500, effect: 'Stage 2: 16s debuff; +2% mana leech, +4% life leech vs debuffed' },
            { points: 1000, effect: 'Stage 3: 16s debuff; +3% mana leech, +5% life leech vs debuffed' },
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
