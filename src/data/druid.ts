import type { VocationWheel } from './types'

// Elder Druid - Wheel of Destiny
// Revelation perks: Gift of Life, Twin Bursts, Blessing of the Grove, Avatar of Nature

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
        { id: 'ed_d0_healing_link', name: 'Healing Link', namePt: 'elo de cura', tier: 'conviction', domain: 0, maxPoints: 1, effect: 'Heal yourself 10% of healing applied to others via Nature\'s Embrace or Heal Friend', requires: ['ed_d0_hp', 'ed_d0_mana'] },
        { id: 'ed_d0_aug_heal_friend', name: 'Aug: Heal Friend', namePt: 'aug: curar amigo', tier: 'conviction', domain: 0, maxPoints: 1, effect: 'Augments Heal Friend', requires: ['ed_d0_capacity'], stages: [{ points: 50, effect: 'Aug I: -10 mana cost' }, { points: 625, effect: 'Aug II: +5.5% base heal' }] },
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
        { id: 'ed_d1_runic_mastery', name: 'Runic Mastery', namePt: 'maestria rúnica', tier: 'conviction', domain: 1, maxPoints: 1, effect: '25% chance to increase Magic Level by 10% for 2s when using a rune (20% if it\'s a rune you can craft)', requires: ['ed_d1_hp', 'ed_d1_mana'] },
        { id: 'ed_d1_aug_natures_embrace', name: "Aug: Nature's Embrace", namePt: 'aug: abraço da natureza', tier: 'conviction', domain: 1, maxPoints: 1, effect: "Augments Nature's Embrace", requires: ['ed_d1_capacity'], stages: [{ points: 225, effect: 'Aug I: +11% base heal' }, { points: 450, effect: 'Aug II: -10s cooldown' }] },
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
        { id: 'ed_d2_aug_strong_ice_wave', name: 'Aug: Strong Ice Wave', tier: 'conviction', namePt: 'aug: onda de gelo forte', domain: 2, maxPoints: 1, effect: 'Augments Strong Ice Wave', requires: ['ed_d2_hp', 'ed_d2_mana'], stages: [{ points: 50, effect: 'Aug I: +3% mana leech on spell' }, { points: 625, effect: 'Aug II: +10% base damage' }] },
        { id: 'ed_d2_aug_mass_healing', name: 'Aug: Mass Healing', namePt: 'aug: cura em massa', tier: 'conviction', domain: 2, maxPoints: 1, effect: 'Augments Mass Healing', requires: ['ed_d2_capacity'], stages: [{ points: 225, effect: 'Aug I: +4% base heal' }, { points: 450, effect: 'Aug II: expand area by 1 sqm' }] },
        // ── Revelation ──────────────────────────────────────────────────────
        {
          id: 'ed_d2_blessing_of_grove', name: 'Blessing of the Grove', namePt: 'bênção do bosque', tier: 'revelation', domain: 2, maxPoints: 1,
          effect: 'Healing bonus based on target\'s missing HP percentage.',
          stages: [
            { points: 250, effect: 'Stage 1: +6% healing if target 30–60% HP; +12% healing if target <30% HP' },
            { points: 500, effect: 'Stage 2: +9% healing if target 30–60% HP; +18% healing if target <30% HP' },
            { points: 1000, effect: 'Stage 3: +12% healing if target 30–60% HP; +24% healing if target <30% HP' },
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
        { id: 'ed_d3_aug_terra_wave', name: 'Aug: Terra Wave', namePt: 'aug: onda de terra', tier: 'conviction', domain: 3, maxPoints: 1, effect: 'Augments Terra Wave', requires: ['ed_d3_hp', 'ed_d3_mana'], stages: [{ points: 225, effect: 'Aug I: +6.5% base damage' }, { points: 450, effect: 'Aug II: +5% life leech on spell' }] },
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
