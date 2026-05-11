import type { VocationWheel } from './types'

// Elite Knight - Wheel of Destiny
// Domain layout (clockwise from top-right):
//   0 = Green  → Gift of Life
//   1 = Yellow → Executioner's Throw
//   2 = Blue   → Combat Mastery
//   3 = Purple → Avatar of Steel

export const KNIGHT_WHEEL: VocationWheel = {
  vocation: 'knight',
  label: 'Elite Knight',
  labelPt: 'Cavaleiro',
  domains: [
    {
      index: 0,
      name: 'Green',
      namePt: 'Verde',
      color: 'hsl(130,60%,45%)',
      perks: [
        // ── Dedication ──────────────────────────────────────────────────────
        { id: 'ek_d0_hp', name: 'Hit Points', namePt: 'pontos de vida', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+3 HP per point' },
        { id: 'ek_d0_mana', name: 'Mana', namePt: 'mana', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+1 Mana per point' },
        { id: 'ek_d0_capacity', name: 'Capacity', namePt: 'capacidade', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+5 Capacity per point' },
        { id: 'ek_d0_hpregen', name: 'HP Regen Boost', namePt: 'recarga de vida', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+0.2% HP regen burst chance per point' },
        { id: 'ek_d0_manaregen', name: 'Mana Regen Boost', namePt: 'recarga de mana', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+0.2% Mana regen burst chance per point' },
        { id: 'ek_d0_familiar_exp', name: 'Familiar Expertise', namePt: 'expertise familiar', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+0.3% familiar HP, +0.1% familiar damage per point' },
        { id: 'ek_d0_familiar_cd', name: 'Familiar Cooldown', namePt: 'cooldown familiar', tier: 'dedication', domain: 0, maxPoints: 3, effect: '-1s familiar cooldown per point' },
        { id: 'ek_d0_mitigation', name: 'Mitigation', namePt: 'mitigação', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+0.03% mitigation multiplier per point' },
        // ── Conviction ──────────────────────────────────────────────────────
        { id: 'ek_d0_battle_instinct', name: 'Battle Instinct', namePt: 'instinto de batalha', tier: 'conviction', domain: 0, maxPoints: 1, effect: '+6 shielding +1 sword/axe/club fighting per adjacent creature (up to 5); each additional beyond 5 (max 8) gives same bonus', requires: ['ek_d0_hp', 'ek_d0_mana'] },
        { id: 'ek_d0_aug_chivalrous_challenge', name: 'Aug: Chivalrous Challenge', namePt: 'aug: desafio cavalheiresco', tier: 'conviction', domain: 0, maxPoints: 1, effect: 'Augments Chivalrous Challenge', requires: ['ek_d0_capacity'], stages: [{ points: 225, effect: 'Aug I: -20 mana cost' }, { points: 450, effect: 'Aug II: +1 additional target' }] },
        // ── Revelation ──────────────────────────────────────────────────────
        {
          id: 'ek_d0_gift_of_life', name: 'Gift of Life', namePt: 'presente da vida', tier: 'revelation', domain: 0, maxPoints: 1,
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
        { id: 'ek_d1_hp', name: 'Hit Points', namePt: 'pontos de vida', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+3 HP per point' },
        { id: 'ek_d1_mana', name: 'Mana', namePt: 'mana', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+1 Mana per point' },
        { id: 'ek_d1_capacity', name: 'Capacity', namePt: 'capacidade', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+5 Capacity per point' },
        { id: 'ek_d1_hpregen', name: 'HP Regen Boost', namePt: 'recarga de vida', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+0.2% HP regen burst chance per point' },
        { id: 'ek_d1_manaregen', name: 'Mana Regen Boost', namePt: 'recarga de mana', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+0.2% Mana regen burst chance per point' },
        { id: 'ek_d1_familiar_exp', name: 'Familiar Expertise', namePt: 'expertise familiar', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+0.3% familiar HP, +0.1% familiar damage per point' },
        { id: 'ek_d1_familiar_cd', name: 'Familiar Cooldown', namePt: 'cooldown familiar', tier: 'dedication', domain: 1, maxPoints: 3, effect: '-1s familiar cooldown per point' },
        { id: 'ek_d1_mitigation', name: 'Mitigation', namePt: 'mitigação', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+0.03% mitigation multiplier per point' },
        // ── Conviction ──────────────────────────────────────────────────────
        { id: 'ek_d1_aug_fierce_berserk', name: 'Aug: Fierce Berserk', namePt: 'aug: berserk feroz', tier: 'conviction', domain: 1, maxPoints: 1, effect: 'Augments Fierce Berserk', requires: ['ek_d1_hp', 'ek_d1_mana'], stages: [{ points: 50, effect: 'Aug I: -30 mana cost' }, { points: 625, effect: 'Aug II: +10% base damage' }] },
        { id: 'ek_d1_aug_front_sweep', name: 'Aug: Front Sweep', namePt: 'aug: varredura frontal', tier: 'conviction', domain: 1, maxPoints: 1, effect: 'Augments Front Sweep', requires: ['ek_d1_capacity'], stages: [{ points: 50, effect: 'Aug I: +5% life leech on spell' }, { points: 625, effect: 'Aug II: +14% base damage' }] },
        // ── Revelation ──────────────────────────────────────────────────────
        {
          id: 'ek_d1_executioners_throw', name: "Executioner's Throw", namePt: 'arremesso do executor', tier: 'revelation', domain: 1, maxPoints: 1,
          effect: 'Throw your weapon at target; bounces to 1/2/3 nearby enemies. +100/125/150% damage to targets below 30% HP.',
          stages: [
            { points: 250, effect: 'Stage 1: bounces to 1 enemy; +100% damage vs low HP; cooldown 22s' },
            { points: 500, effect: 'Stage 2: bounces to 2 enemies; +125% damage vs low HP; cooldown 18s' },
            { points: 1000, effect: 'Stage 3: bounces to 3 enemies; +150% damage vs low HP; cooldown 14s' },
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
        { id: 'ek_d2_hp', name: 'Hit Points', namePt: 'pontos de vida', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+3 HP per point' },
        { id: 'ek_d2_mana', name: 'Mana', namePt: 'mana', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+1 Mana per point' },
        { id: 'ek_d2_capacity', name: 'Capacity', namePt: 'capacidade', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+5 Capacity per point' },
        { id: 'ek_d2_hpregen', name: 'HP Regen Boost', namePt: 'recarga de vida', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+0.2% HP regen burst chance per point' },
        { id: 'ek_d2_manaregen', name: 'Mana Regen Boost', namePt: 'recarga de mana', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+0.2% Mana regen burst chance per point' },
        { id: 'ek_d2_familiar_exp', name: 'Familiar Expertise', namePt: 'expertise familiar', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+0.3% familiar HP, +0.1% familiar damage per point' },
        { id: 'ek_d2_familiar_cd', name: 'Familiar Cooldown', namePt: 'cooldown familiar', tier: 'dedication', domain: 2, maxPoints: 3, effect: '-1s familiar cooldown per point' },
        { id: 'ek_d2_mitigation', name: 'Mitigation', namePt: 'mitigação', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+0.03% mitigation multiplier per point' },
        // ── Conviction ──────────────────────────────────────────────────────
        { id: 'ek_d2_battle_healing', name: 'Battle Healing', namePt: 'cura em batalha', tier: 'conviction', domain: 2, maxPoints: 1, effect: 'Heals per challenged creature based on shielding skill; ×2 if HP <60%; ×3 if HP <30%', requires: ['ek_d2_hp', 'ek_d2_mana'] },
        { id: 'ek_d2_aug_groundshaker', name: 'Aug: Groundshaker', namePt: 'aug: abalo sísmico', tier: 'conviction', domain: 2, maxPoints: 1, effect: 'Augments Groundshaker', requires: ['ek_d2_capacity'], stages: [{ points: 225, effect: 'Aug I: +12.5% base damage' }, { points: 450, effect: 'Aug II: -2s cooldown' }] },
        // ── Revelation ──────────────────────────────────────────────────────
        {
          id: 'ek_d2_combat_mastery', name: 'Combat Mastery', namePt: 'maestria de combate', tier: 'revelation', domain: 2, maxPoints: 1,
          effect: 'Passive: increases critical extra damage for two-handed weapons, or shield defence bonus for one-handed.',
          stages: [
            { points: 250, effect: 'Stage 1: +4% crit extra damage (two-handed) or +10 shield defence (one-handed)' },
            { points: 500, effect: 'Stage 2: +8% crit extra damage or +20 shield defence' },
            { points: 1000, effect: 'Stage 3: +12% crit extra damage or +30 shield defence' },
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
        { id: 'ek_d3_hp', name: 'Hit Points', namePt: 'pontos de vida', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+3 HP per point' },
        { id: 'ek_d3_mana', name: 'Mana', namePt: 'mana', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+1 Mana per point' },
        { id: 'ek_d3_capacity', name: 'Capacity', namePt: 'capacidade', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+5 Capacity per point' },
        { id: 'ek_d3_hpregen', name: 'HP Regen Boost', namePt: 'recarga de vida', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+0.2% HP regen burst chance per point' },
        { id: 'ek_d3_manaregen', name: 'Mana Regen Boost', namePt: 'recarga de mana', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+0.2% Mana regen burst chance per point' },
        { id: 'ek_d3_familiar_exp', name: 'Familiar Expertise', namePt: 'expertise familiar', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+0.3% familiar HP, +0.1% familiar damage per point' },
        { id: 'ek_d3_familiar_cd', name: 'Familiar Cooldown', namePt: 'cooldown familiar', tier: 'dedication', domain: 3, maxPoints: 3, effect: '-1s familiar cooldown per point' },
        { id: 'ek_d3_mitigation', name: 'Mitigation', namePt: 'mitigação', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+0.03% mitigation multiplier per point' },
        // ── Conviction ──────────────────────────────────────────────────────
        { id: 'ek_d3_aug_intense_wound_cleansing', name: 'Aug: Intense Wound Cleansing', namePt: 'aug: cura intensa de feridas', tier: 'conviction', domain: 3, maxPoints: 1, effect: 'Augments Intense Wound Cleansing', requires: ['ek_d3_hp', 'ek_d3_mana'], stages: [{ points: 225, effect: 'Aug I: +125% base heal' }, { points: 450, effect: 'Aug II: -300s cooldown' }] },
        // ── Revelation ──────────────────────────────────────────────────────
        {
          id: 'ek_d3_avatar_of_steel', name: 'Avatar of Steel', namePt: 'avatar do aço', tier: 'revelation', domain: 3, maxPoints: 1,
          effect: 'Transform into a steel avatar for 11s with damage reduction and critical hit bonuses.',
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
