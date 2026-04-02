import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/',
  publicDir: 'public',
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
    emptyOutDir: true,
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        apk: resolve(__dirname, 'apk.html'),
        airco: resolve(__dirname, 'airco.html'),
        banden: resolve(__dirname, 'banden.html'),
        onderhoud: resolve(__dirname, 'onderhoud.html'),
        occasions: resolve(__dirname, 'occasions.html'),
        login: resolve(__dirname, 'login.html')
      },
    },
    chunkSizeWarningLimit: 1000
  }
})
