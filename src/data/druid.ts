import type { VocationWheel } from './types'

// Elder Druid - Wheel of Destiny
// Revelation perks: Gift of Life, Twin Bursts, Blessing of the Grove, Avatar of Nature
// VERIFY: exact domain-to-revelation mapping in-game

export const DRUID_WHEEL: VocationWheel = {
  vocation: 'druid',
  label: 'Elder Druid',
  labelPt: 'Druida',
  domains: [
    {
      index: 0,
      name: 'Green',
      namePt: 'Verde',
      color: 'hsl(130,60%,45%)',
      perks: [
        // ── Dedication ──────────────────────────────────────────────────────
        { id: 'ed_d0_hp', name: 'Hit Points', namePt: 'pontos de vida', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+1 HP per point' },
        { id: 'ed_d0_mana', name: 'Mana', namePt: 'mana', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+6 Mana per point' },
        { id: 'ed_d0_capacity', name: 'Capacity', namePt: 'capacidade', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+2 Capacity per point' },
        { id: 'ed_d0_hpregen', name: 'HP Regen Boost', namePt: 'recarga de vida', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+0.2% HP regen burst chance per point' },
        { id: 'ed_d0_manaregen', name: 'Mana Regen Boost', namePt: 'recarga de mana', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+0.2% Mana regen burst chance per point' },
        { id: 'ed_d0_familiar_exp', name: 'Familiar Expertise', namePt: 'expertise familiar', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+0.3% familiar HP, +0.1% familiar damage per point' },
        { id: 'ed_d0_familiar_cd', name: 'Familiar Cooldown', namePt: 'cooldown familiar', tier: 'dedication', domain: 0, maxPoints: 3, effect: '-1s familiar cooldown per point' },
        { id: 'ed_d0_mitigation', name: 'Mitigation', namePt: 'mitigação', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+0.03% mitigation multiplier per point' },
        // ── Conviction ──────────────────────────────────────────────────────
        { id: 'ed_d0_healing_link', name: 'Healing Link', namePt: 'elo de cura', tier: 'conviction', domain: 0, maxPoints: 1, effect: 'Heal yourself for 10% of any healing you apply to others', requires: ['ed_d0_hp', 'ed_d0_mana'] },
        { id: 'ed_d0_fire_res', name: 'Fire Resistance', namePt: 'resistência ao fogo', tier: 'conviction', domain: 0, maxPoints: 1, effect: '+2% fire resistance', requires: ['ed_d0_capacity'] },
        // ── Revelation ──────────────────────────────────────────────────────
        {
          id: 'ed_d0_gift_of_life', name: 'Gift of Life', namePt: 'presente da vida', tier: 'revelation', domain: 0, maxPoints: 1,
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
        { id: 'ed_d1_hp', name: 'Hit Points', namePt: 'pontos de vida', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+1 HP per point' },
        { id: 'ed_d1_mana', name: 'Mana', namePt: 'mana', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+6 Mana per point' },
        { id: 'ed_d1_capacity', name: 'Capacity', namePt: 'capacidade', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+2 Capacity per point' },
        { id: 'ed_d1_hpregen', name: 'HP Regen Boost', namePt: 'recarga de vida', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+0.2% HP regen burst chance per point' },
        { id: 'ed_d1_manaregen', name: 'Mana Regen Boost', namePt: 'recarga de mana', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+0.2% Mana regen burst chance per point' },
        { id: 'ed_d1_familiar_exp', name: 'Familiar Expertise', namePt: 'expertise familiar', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+0.3% familiar HP, +0.1% familiar damage per point' },
        { id: 'ed_d1_familiar_cd', name: 'Familiar Cooldown', namePt: 'cooldown familiar', tier: 'dedication', domain: 1, maxPoints: 3, effect: '-1s familiar cooldown per point' },
        { id: 'ed_d1_mitigation', name: 'Mitigation', namePt: 'mitigação', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+0.03% mitigation multiplier per point' },
        // ── Conviction ──────────────────────────────────────────────────────
        { id: 'ed_d1_runic_mastery', name: 'Runic Mastery', namePt: 'maestria rúnica', tier: 'conviction', domain: 1, maxPoints: 1, effect: 'Enhances rune-based spells and effects', requires: ['ed_d1_hp', 'ed_d1_mana'] },
        { id: 'ed_d1_energy_res', name: 'Energy Resistance', namePt: 'resistência à energia', tier: 'conviction', domain: 1, maxPoints: 1, effect: '+2% energy resistance', requires: ['ed_d1_capacity'] },
        // ── Revelation ──────────────────────────────────────────────────────
        {
          id: 'ed_d1_twin_bursts', name: 'Twin Bursts', namePt: 'duplas explosões', tier: 'revelation', domain: 1, maxPoints: 1,
          effect: 'Choose ice or earth damage in area around you; both spells share cooldown. Deals +20/40/60% extra damage to targets above 60% HP.',
          stages: [
            { points: 250, effect: 'Stage 1: +20% extra damage to healthy targets; cooldown shared with other burst' },
            { points: 500, effect: 'Stage 2: +40% extra damage to healthy targets' },
            { points: 1000, effect: 'Stage 3: +60% extra damage to healthy targets' },
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
        { id: 'ed_d2_hp', name: 'Hit Points', namePt: 'pontos de vida', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+1 HP per point' },
        { id: 'ed_d2_mana', name: 'Mana', namePt: 'mana', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+6 Mana per point' },
        { id: 'ed_d2_capacity', name: 'Capacity', namePt: 'capacidade', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+2 Capacity per point' },
        { id: 'ed_d2_hpregen', name: 'HP Regen Boost', namePt: 'recarga de vida', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+0.2% HP regen burst chance per point' },
        { id: 'ed_d2_manaregen', name: 'Mana Regen Boost', namePt: 'recarga de mana', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+0.2% Mana regen burst chance per point' },
        { id: 'ed_d2_familiar_exp', name: 'Familiar Expertise', namePt: 'expertise familiar', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+0.3% familiar HP, +0.1% familiar damage per point' },
        { id: 'ed_d2_familiar_cd', name: 'Familiar Cooldown', namePt: 'cooldown familiar', tier: 'dedication', domain: 2, maxPoints: 3, effect: '-1s familiar cooldown per point' },
        { id: 'ed_d2_mitigation', name: 'Mitigation', namePt: 'mitigação', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+0.03% mitigation multiplier per point' },
        // ── Conviction ──────────────────────────────────────────────────────
        { id: 'ed_d2_life_leech', name: 'Life Leech', namePt: 'absorção de vida', tier: 'conviction', domain: 2, maxPoints: 1, effect: '+0.75% life leech chance', requires: ['ed_d2_hp', 'ed_d2_mana'] },
        // 2026 new druid conviction perks
        { id: 'ed_d2_lifegiver', name: 'Lifegiver', namePt: 'doador de vida', tier: 'conviction', domain: 2, maxPoints: 1, effect: 'Ally healing spells increased by 110%, but spell cooldowns doubled', requires: ['ed_d2_capacity'] },
        { id: 'ed_d2_rejuvenation', name: 'Rejuvenation', namePt: 'rejuvenescimento', tier: 'conviction', domain: 2, maxPoints: 1, effect: 'Self-healing spells heal 10% more', requires: ['ed_d2_life_leech', 'ed_d2_lifegiver'] },
        // ── Revelation ──────────────────────────────────────────────────────
        {
          id: 'ed_d2_blessing_of_grove', name: 'Blessing of the Grove', namePt: 'bênção do bosque', tier: 'revelation', domain: 2, maxPoints: 1,
          effect: 'Healing increases by 0.06/0.09/0.12% for every 1% of your target\'s missing HP.',
          stages: [
            { points: 250, effect: 'Stage 1: +0.06% healing per 1% missing HP of target' },
            { points: 500, effect: 'Stage 2: +0.09% healing per 1% missing HP of target' },
            { points: 1000, effect: 'Stage 3: +0.12% healing per 1% missing HP of target' },
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
        { id: 'ed_d3_hp', name: 'Hit Points', namePt: 'pontos de vida', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+1 HP per point' },
        { id: 'ed_d3_mana', name: 'Mana', namePt: 'mana', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+6 Mana per point' },
        { id: 'ed_d3_capacity', name: 'Capacity', namePt: 'capacidade', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+2 Capacity per point' },
        { id: 'ed_d3_hpregen', name: 'HP Regen Boost', namePt: 'recarga de vida', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+0.2% HP regen burst chance per point' },
        { id: 'ed_d3_manaregen', name: 'Mana Regen Boost', namePt: 'recarga de mana', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+0.2% Mana regen burst chance per point' },
        { id: 'ed_d3_familiar_exp', name: 'Familiar Expertise', namePt: 'expertise familiar', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+0.3% familiar HP, +0.1% familiar damage per point' },
        { id: 'ed_d3_familiar_cd', name: 'Familiar Cooldown', namePt: 'cooldown familiar', tier: 'dedication', domain: 3, maxPoints: 3, effect: '-1s familiar cooldown per point' },
        { id: 'ed_d3_mitigation', name: 'Mitigation', namePt: 'mitigação', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+0.03% mitigation multiplier per point' },
        // ── Conviction ──────────────────────────────────────────────────────
        { id: 'ed_d3_mana_leech', name: 'Mana Leech', namePt: 'absorção de mana', tier: 'conviction', domain: 3, maxPoints: 1, effect: '+0.25% mana leech chance', requires: ['ed_d3_hp', 'ed_d3_mana'] },
        { id: 'ed_d3_shared_preservation', name: 'Shared Preservation', namePt: 'preservação compartilhada', tier: 'conviction', domain: 3, maxPoints: 1, effect: 'Healing spells also heal a secondary party target for 30% effectiveness', requires: ['ed_d3_capacity'] },
        // ── Revelation ──────────────────────────────────────────────────────
        {
          id: 'ed_d3_avatar_of_nature', name: 'Avatar of Nature', namePt: 'avatar da natureza', tier: 'revelation', domain: 3, maxPoints: 1,
          effect: 'Transform into a nature avatar for 11s with damage reduction and critical hit bonuses.',
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
