import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/AutoServiceHoute/',
  publicDir: 'public',
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        apk: resolve(__dirname, 'apk.html'),
        airco: resolve(__dirname, 'airco.html')
      }
    }
  }
})
