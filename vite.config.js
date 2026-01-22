import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/AutoServiceHoute/' : '/',
  publicDir: 'public',
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
    emptyOutDir: true
  }
})
