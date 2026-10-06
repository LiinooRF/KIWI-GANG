import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //el repo se llama KIWI-GANG asi que github pages lo publica dentro de esa carpeta
  base: '/KIWI-GANG/',
})
