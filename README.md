# Wheel Bot — MVP (Static GitHub Pages)

MVP 100% front-end (React + Vite + TypeScript) que:
- Lê instruções em PT-BR (vocação, pontos, perks e gemas).
- Faz **validações DEMO** (não é a engine real da Wheel).
- Gera um **link compartilhável** que recarrega o mesmo estado via `?state=`.

> Para gerar **screenshot** ou **export code/URL** do planner oficial, será preciso implementar a engine real e/ou um backend. Este repositório entrega a base estática para GitHub Pages.

## Rodando local
```bash
npm i
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Deploy GitHub Pages
1) Vá em `vite.config.ts` e ajuste `base: '/NOME_DO_REPO/'` (inclui barras no início e no fim).
2) Faça commit e push na branch `main`.
3) Em **Settings → Pages**, deixe **Source = GitHub Actions**.
4) O workflow `pages.yml` já faz o deploy do `dist/` automaticamente.

## Onde mexer no código
- **Parser**: `src/nlu/parse.ts`
- **Validador (DEMO)**: `src/engine/solve.ts` + `src/engine/data.ts`
- **UI**: `src/ui/App.tsx`
- **Estado compartilhável**: `src/ui/state.ts`

## Próximos passos (engine real)
- Substituir o solver DEMO por uma engine baseada no **grafo real** da Wheel.
- Implementar mapeamento para **export code/URL** compatível com o planner oficial.
- (Opcional) Backend para tirar **screenshot 1920×1080** a partir do export code/URL.
