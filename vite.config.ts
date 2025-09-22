import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: set `base` to '/NOME_DO_REPO/' (inclui barra no início e no fim)
// Ex.: se seu repositório se chama "wheel-bot", use base: '/wheel-bot/'
export default defineConfig({
  plugins: [react()],
  base: '/wheel/', // use EXATAMENTE o nome do seu repo

})
