import { defineConfig } from 'vite'

export default defineConfig({
  base: '/AutoServiceHoute/',
  publicDir: 'public',
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
    emptyOutDir: true
  }
})
