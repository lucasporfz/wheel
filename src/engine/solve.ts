import type { Spec } from '../nlu/parse'
import { MAX_ACTIVE_GEMS, GOL_THRESHOLDS, GRAN_CON_COST } from './data'

// Solver DEMO (não é o grafo real da Wheel).
// Regras mínimas para dar feedback "é possível / não é possível" no MVP.
// Depois você troca por uma engine verdadeira baseada no grafo da Wheel.
export function solve(spec: Spec){
  if(!spec.vocation) return { ok:false, reason: 'Informe a vocação (paladino/knight/druid/sorcerer).' }
  if(!spec.points) return { ok:false, reason: 'Informe a quantidade de pontos.' }

  if(spec.gemSlots > MAX_ACTIVE_GEMS){
    return { ok:false, reason: `Máximo de ${MAX_ACTIVE_GEMS} gemas ativas (1 por quadrante).` }
  }

  // Heurística DEMO: verificar custos mínimos de requisitos declarados
  let required = 0
  for(const w of spec.wants){
    if(w.key === 'gift_of_life'){
      const need = GOL_THRESHOLDS[Math.min(w.stage,3) as 1|2|3]
      required += need
    }
    if(w.key === 'gran_con'){
      const need = GRAN_CON_COST[Math.min(w.stage,3) as 1|2|3]
      required += need
    }
  }
  // "Custo" fictício para abrir slots de gema (DEMO)
  required += spec.gemSlots * 50

  const feasible = (spec.points ?? 0) >= required

  if(!feasible){
    return { ok:false, reason: `Pontos insuficientes (requerido ≈ ${required}, disponível ${spec.points}).` }
  }

  // Resultado DEMO (substitua pela rota, perks e "export code" de verdade quando a engine estiver pronta)
  return {
    ok: true,
    summary: {
      vocation: spec.vocation,
      pointsAvailable: spec.points,
      pointsEstimatedSpent: required,
      wants: spec.wants,
      gemSlots: spec.gemSlots
    },
    // shareUrl será montado pelo App via param ?state=
    exportCode: null // placeholder até integrar com planner oficial
  }
}
