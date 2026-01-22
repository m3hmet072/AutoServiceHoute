import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/AutoServiceHoute/' : '/',
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
    emptyOutDir: true
  }
})
