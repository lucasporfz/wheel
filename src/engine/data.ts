// Placeholder para dados/constantes da Wheel.
// Substitua por dados reais quando você conectar a engine do planner.
export const MAX_ACTIVE_GEMS = 4

// Regras DEMO (simplificadas):
// Gift of Life: thresholds de 250/500/1000 (por estágio).
// ATENÇÃO: no jogo real isso refere-se a pontos no DOMÍNIO específico, não total.
export const GOL_THRESHOLDS = { 1:250, 2:500, 3:1000 }

// Gran Con (DEMO): exigimos um "custo base" fictício por estágio só para validar no MVP.
export const GRAN_CON_COST = { 1: 200, 2: 450, 3: 700 }
