import type { VocationWheel } from './types'

// Royal Paladin - Wheel of Destiny
// Domain layout (clockwise from top-right):
//   0 = Green (top-right)     → Gift of Life
//   1 = Yellow (bottom-right) → Divine Grenade
//   2 = Blue (bottom-left)    → Divine Empowerment
//   3 = Purple (top-left)     → Avatar of Light

export const PALADIN_WHEEL: VocationWheel = {
  vocation: 'paladin',
  label: 'Royal Paladin',
  labelPt: 'Paladino',
  domains: [
    {
      index: 0,
      name: 'Green',
      namePt: 'Verde',
      color: 'hsl(130,60%,45%)',
      perks: [
        // ── Dedication ──────────────────────────────────────────────────────
        { id: 'pal_d0_hp', name: 'Hit Points', namePt: 'pontos de vida', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+2 HP per point' },
        { id: 'pal_d0_mana', name: 'Mana', namePt: 'mana', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+3 Mana per point' },
        { id: 'pal_d0_capacity', name: 'Capacity', namePt: 'capacidade', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+4 Capacity per point' },
        { id: 'pal_d0_hpregen', name: 'HP Regen Boost', namePt: 'recarga de vida', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+0.2% HP regen burst chance per point' },
        { id: 'pal_d0_manaregen', name: 'Mana Regen Boost', namePt: 'recarga de mana', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+0.2% Mana regen burst chance per point' },
        { id: 'pal_d0_familiar_exp', name: 'Familiar Expertise', namePt: 'expertise familiar', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+0.3% familiar HP, +0.1% familiar damage per point' },
        { id: 'pal_d0_familiar_cd', name: 'Familiar Cooldown', namePt: 'cooldown familiar', tier: 'dedication', domain: 0, maxPoints: 3, effect: '-1s familiar cooldown per point' },
        { id: 'pal_d0_mitigation', name: 'Mitigation', namePt: 'mitigação', tier: 'dedication', domain: 0, maxPoints: 3, effect: '+0.03% mitigation multiplier per point' },
        // ── Conviction ──────────────────────────────────────────────────────
        { id: 'pal_d0_ballistic', name: 'Ballistic Mastery', namePt: 'maestria balística', tier: 'conviction', domain: 0, maxPoints: 1, effect: 'While using a bow: attacks/spells treat physical & holy sensitivity as 2% higher on all enemies hit', requires: ['pal_d0_hp', 'pal_d0_mana'] },
        { id: 'pal_d0_aug_divine_dazzle', name: 'Aug: Divine Dazzle', namePt: 'aug: deslumbramento divino', tier: 'conviction', domain: 0, maxPoints: 1, effect: 'Augments Divine Dazzle', requires: ['pal_d0_capacity'], stages: [{ points: 50, effect: 'Aug I: +15% crit extra damage, +10% non-stacking crit chance' }, { points: 625, effect: 'Aug II: +4% base damage' }] },
        // ── Revelation ──────────────────────────────────────────────────────
        {
          id: 'pal_d0_gift_of_life', name: 'Gift of Life', namePt: 'presente da vida', tier: 'revelation', domain: 0, maxPoints: 1,
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
        { id: 'pal_d1_hp', name: 'Hit Points', namePt: 'pontos de vida', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+2 HP per point' },
        { id: 'pal_d1_mana', name: 'Mana', namePt: 'mana', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+3 Mana per point' },
        { id: 'pal_d1_capacity', name: 'Capacity', namePt: 'capacidade', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+4 Capacity per point' },
        { id: 'pal_d1_hpregen', name: 'HP Regen Boost', namePt: 'recarga de vida', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+0.2% HP regen burst chance per point' },
        { id: 'pal_d1_manaregen', name: 'Mana Regen Boost', namePt: 'recarga de mana', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+0.2% Mana regen burst chance per point' },
        { id: 'pal_d1_familiar_exp', name: 'Familiar Expertise', namePt: 'expertise familiar', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+0.3% familiar HP, +0.1% familiar damage per point' },
        { id: 'pal_d1_familiar_cd', name: 'Familiar Cooldown', namePt: 'cooldown familiar', tier: 'dedication', domain: 1, maxPoints: 3, effect: '-1s familiar cooldown per point' },
        { id: 'pal_d1_mitigation', name: 'Mitigation', namePt: 'mitigação', tier: 'dedication', domain: 1, maxPoints: 3, effect: '+0.03% mitigation multiplier per point' },
        // ── Conviction ──────────────────────────────────────────────────────
        { id: 'pal_d1_positional', name: 'Positional Tactics', namePt: 'táticas posicionais', tier: 'conviction', domain: 1, maxPoints: 1, effect: '+3 distance fighting when no creature within 1 sqm; else +3 holy magic level and +3 healing magic level', requires: ['pal_d1_hp', 'pal_d1_mana'] },
        { id: 'pal_d1_aug_divine_caldera', name: 'Aug: Divine Caldera', namePt: 'aug: caldeira divina', tier: 'conviction', domain: 1, maxPoints: 1, effect: 'Augments Divine Caldera', requires: ['pal_d1_capacity'], stages: [{ points: 225, effect: 'Aug I: +10% base damage' }, { points: 450, effect: 'Aug II: expand area by 1 sqm' }] },
        // ── Revelation ──────────────────────────────────────────────────────
        {
          id: 'pal_d1_divine_grenade', name: 'Divine Grenade', namePt: 'granada divina', tier: 'revelation', domain: 1, maxPoints: 1,
          effect: 'Plants a marker at your target\'s feet that explodes after 3 seconds dealing holy damage.',
          stages: [
            { points: 250, effect: 'Stage 1: moderate holy explosion' },
            { points: 500, effect: 'Stage 2: increased holy explosion damage' },
            { points: 1000, effect: 'Stage 3: maximum holy explosion damage and area' },
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
        { id: 'pal_d2_hp', name: 'Hit Points', namePt: 'pontos de vida', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+2 HP per point' },
        { id: 'pal_d2_mana', name: 'Mana', namePt: 'mana', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+3 Mana per point' },
        { id: 'pal_d2_capacity', name: 'Capacity', namePt: 'capacidade', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+4 Capacity per point' },
        { id: 'pal_d2_hpregen', name: 'HP Regen Boost', namePt: 'recarga de vida', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+0.2% HP regen burst chance per point' },
        { id: 'pal_d2_manaregen', name: 'Mana Regen Boost', namePt: 'recarga de mana', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+0.2% Mana regen burst chance per point' },
        { id: 'pal_d2_familiar_exp', name: 'Familiar Expertise', namePt: 'expertise familiar', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+0.3% familiar HP, +0.1% familiar damage per point' },
        { id: 'pal_d2_familiar_cd', name: 'Familiar Cooldown', namePt: 'cooldown familiar', tier: 'dedication', domain: 2, maxPoints: 3, effect: '-1s familiar cooldown per point' },
        { id: 'pal_d2_mitigation', name: 'Mitigation', namePt: 'mitigação', tier: 'dedication', domain: 2, maxPoints: 3, effect: '+0.03% mitigation multiplier per point' },
        // ── Conviction ──────────────────────────────────────────────────────
        { id: 'pal_d2_aug_sharpshooter', name: 'Aug: Sharpshooter', namePt: 'aug: atirador certeiro', tier: 'conviction', domain: 2, maxPoints: 1, effect: 'Augments Sharpshooter', requires: ['pal_d2_hp', 'pal_d2_mana'], stages: [{ points: 50, effect: 'Aug I: +5% life leech on spell' }, { points: 625, effect: 'Aug II: +10% base damage' }] },
        { id: 'pal_d2_aug_strong_ethereal_spear', name: 'Aug: Strong Ethereal Spear', namePt: 'aug: lança etérea forte', tier: 'conviction', domain: 2, maxPoints: 1, effect: 'Augments Strong Ethereal Spear', requires: ['pal_d2_capacity'], stages: [{ points: 225, effect: 'Aug I: +15% base damage' }, { points: 450, effect: 'Aug II: -2s cooldown' }] },
        // ── Revelation ──────────────────────────────────────────────────────
        {
          id: 'pal_d2_divine_empowerment', name: 'Divine Empowerment', namePt: 'empoderamento divino', tier: 'revelation', domain: 2, maxPoints: 1,
          effect: 'Creates a 3×3 holy energy field at your feet that lasts 5s while standing in it, increasing damage dealt.',
          stages: [
            { points: 250, effect: 'Stage 1: every 16th attack → 5s holy field, +8% damage dealt' },
            { points: 500, effect: 'Stage 2: every 14th attack → 5s holy field, +10% damage dealt' },
            { points: 1000, effect: 'Stage 3: every 12th attack → 5s holy field, +12% damage dealt' },
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
        { id: 'pal_d3_hp', name: 'Hit Points', namePt: 'pontos de vida', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+2 HP per point' },
        { id: 'pal_d3_mana', name: 'Mana', namePt: 'mana', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+3 Mana per point' },
        { id: 'pal_d3_capacity', name: 'Capacity', namePt: 'capacidade', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+4 Capacity per point' },
        { id: 'pal_d3_hpregen', name: 'HP Regen Boost', namePt: 'recarga de vida', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+0.2% HP regen burst chance per point' },
        { id: 'pal_d3_manaregen', name: 'Mana Regen Boost', namePt: 'recarga de mana', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+0.2% Mana regen burst chance per point' },
        { id: 'pal_d3_familiar_exp', name: 'Familiar Expertise', namePt: 'expertise familiar', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+0.3% familiar HP, +0.1% familiar damage per point' },
        { id: 'pal_d3_familiar_cd', name: 'Familiar Cooldown', namePt: 'cooldown familiar', tier: 'dedication', domain: 3, maxPoints: 3, effect: '-1s familiar cooldown per point' },
        { id: 'pal_d3_mitigation', name: 'Mitigation', namePt: 'mitigação', tier: 'dedication', domain: 3, maxPoints: 3, effect: '+0.03% mitigation multiplier per point' },
        // ── Conviction ──────────────────────────────────────────────────────
        { id: 'pal_d3_aug_swift_foot', name: 'Aug: Swift Foot', namePt: 'aug: pé veloz', tier: 'conviction', domain: 3, maxPoints: 1, effect: 'Augments Swift Foot', requires: ['pal_d3_hp', 'pal_d3_mana'], stages: [{ points: 225, effect: 'Aug I: +2 movement speed' }, { points: 450, effect: 'Aug II: 10% chance to evade attacks' }] },
        // ── Revelation ──────────────────────────────────────────────────────
        {
          id: 'pal_d3_avatar_of_light', name: 'Avatar of Light', namePt: 'avatar da luz', tier: 'revelation', domain: 3, maxPoints: 1,
          effect: 'Transform into a holy avatar for 11s with damage reduction and critical hit bonuses.',
          stages: [
            { points: 250, effect: 'Stage 1: 11s avatar; 5% damage reduction; all attacks critical (+5% extra damage); cooldown 120min' },
            { points: 500, effect: 'Stage 2: 11s avatar; 10% damage reduction; all attacks critical (+10% extra damage); cooldown 90min' },
            { points: 1000, effect: 'Stage 3: 11s avatar; 15% damage reduction; all attacks critical (+15% extra damage); cooldown 60min' },
          ]
        },
      ],
    },
  ],
}
