export type Spec = {
  vocation: 'paladin'|'knight'|'druid'|'sorcerer'|null;
  points: number|null;
  wants: Array<{ key:string; label:string; stage:number }>;
  gemSlots: number;
}

const VOC_MAP: Record<string, Spec['vocation']> = {
  paladino:'paladin', paladin:'paladin',
  cavaleiro:'knight', knight:'knight',
  druida:'druid', druid:'druid',
  feiticeiro:'sorcerer', sorcerer:'sorcerer',
}

const WANT_PATTERNS = [
  { key:'gift_of_life', label:'Gift of Life', re:/gift\s*of\s*life[^0-9]*(\d)/i },
  { key:'gran_con',     label:'Gran Con',     re:/gran\s*con[^0-9]*(\d)/i },
]

export function parseInput(text: string): Spec{
  const s = text.toLowerCase()

  // Pontos
  const mPts = s.match(/(\d{2,5})\s*(pontos|points?)/)
  const points = mPts ? Number(mPts[1]) : null

  // Vocação
  let vocation: Spec['vocation'] = null
  for(const k of Object.keys(VOC_MAP)){
    if(new RegExp(`\\b${k}\\b`, 'i').test(s)){
      vocation = VOC_MAP[k]
      break
    }
  }

  // Wants (perks/estágios)
  const wants: Spec['wants'] = []
  for(const pat of WANT_PATTERNS){
    const m = text.match(pat.re)
    if(m){
      const stage = Number(m[1]) || 1
      wants.push({ key: pat.key, label: pat.label, stage })
    }
  }

  // Gem slots / greater gems
  const mGems = s.match(/(\d)\s*(slots?|espaços?)\s*(para\s*)?(greater|grandes?)\s*gem/i)
  const gemSlots = mGems ? Number(mGems[1]) : 0

  return { vocation, points, wants, gemSlots }
}
