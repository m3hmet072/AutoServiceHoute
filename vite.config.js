import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/',
  publicDir: 'public',
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        apk: resolve(__dirname, 'apk.html'),
        airco: resolve(__dirname, 'airco.html'),
        banden: resolve(__dirname, 'banden.html'),
        onderhoud: resolve(__dirname, 'onderhoud.html'),
        occasions: resolve(__dirname, 'occasions.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
        login: resolve(__dirname, 'login.html')
      }
    }
  }
})
