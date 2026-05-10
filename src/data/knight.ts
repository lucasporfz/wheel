import type { VocationWheel } from './types'

// Elite Knight - Wheel of Destiny
// Domain layout (clockwise from top-right):
//   0 = Green  → Gift of Life
//   1 = Yellow → Executioner's Throw
//   2 = Blue   → Combat Mastery
//   3 = Purple → Avatar of Steel
// VERIFY: exact domain-to-revelation mapping in-game

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
        { id: 'ek_d0_life_leech', name: 'Life Leech', namePt: 'absorção de vida', tier: 'conviction', domain: 0, maxPoints: 1, effect: '+0.75% life leech chance', requires: ['ek_d0_hp', 'ek_d0_mana'] },
        { id: 'ek_d0_fire_res', name: 'Fire Resistance', namePt: 'resistência ao fogo', tier: 'conviction', domain: 0, maxPoints: 1, effect: '+2% fire resistance', requires: ['ek_d0_capacity'] },
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
        { id: 'ek_d1_battle_instinct', name: 'Battle Instinct', namePt: 'instinto de batalha', tier: 'conviction', domain: 1, maxPoints: 1, effect: '+6 shielding and +1 melee skill per adjacent enemy creature', requires: ['ek_d1_hp', 'ek_d1_mana'] },
        { id: 'ek_d1_energy_res', name: 'Energy Resistance', namePt: 'resistência à energia', tier: 'conviction', domain: 1, maxPoints: 1, effect: '+2% energy resistance', requires: ['ek_d1_capacity'] },
        // ── Revelation ──────────────────────────────────────────────────────
        {
          id: 'ek_d1_executioners_throw', name: "Executioner's Throw", namePt: 'arremesso do executor', tier: 'revelation', domain: 1, maxPoints: 1,
          effect: 'Throw your weapon at target; bounces to 1/2/3 nearby enemies. +100/125/150% damage to targets below 30% HP. Cooldown: 22/18/14s.',
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
        { id: 'ek_d2_battle_healing', name: 'Battle Healing', namePt: 'cura em batalha', tier: 'conviction', domain: 2, maxPoints: 1, effect: 'Heal based on shielding skill; healing multiplied when HP is low', requires: ['ek_d2_hp', 'ek_d2_mana'] },
        { id: 'ek_d2_ice_res', name: 'Ice Resistance', namePt: 'resistência ao gelo', tier: 'conviction', domain: 2, maxPoints: 1, effect: '+2% ice resistance', requires: ['ek_d2_capacity'] },
        // ── Revelation ──────────────────────────────────────────────────────
        {
          id: 'ek_d2_combat_mastery', name: 'Combat Mastery', namePt: 'maestria de combate', tier: 'revelation', domain: 2, maxPoints: 1,
          effect: 'Passive: increases critical extra damage for two-handed weapons (or shielding bonus for one-handed).',
          stages: [
            { points: 250, effect: 'Stage 1: +5% critical extra damage (two-handed) or +8 shielding (one-handed)' },
            { points: 500, effect: 'Stage 2: +10% critical extra damage or +12 shielding' },
            { points: 1000, effect: 'Stage 3: +15% critical extra damage or +16 shielding' },
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
        { id: 'ek_d3_mana_leech', name: 'Mana Leech', namePt: 'absorção de mana', tier: 'conviction', domain: 3, maxPoints: 1, effect: '+0.25% mana leech chance', requires: ['ek_d3_hp', 'ek_d3_mana'] },
        { id: 'ek_d3_earth_res', name: 'Earth Resistance', namePt: 'resistência à terra', tier: 'conviction', domain: 3, maxPoints: 1, effect: '+2% earth resistance', requires: ['ek_d3_capacity'] },
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
