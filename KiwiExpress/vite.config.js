import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //en github pages la app vive en /KIWI-GANG/, en el bucket de s3 vive en la raiz
  //el workflow de aws compila con VITE_BASE=/ y si no viene se usa la de pages
  base: process.env.VITE_BASE || '/KIWI-GANG/',
})
