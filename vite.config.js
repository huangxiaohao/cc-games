import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  base: './',
  server: {
    proxy: {
      '/api': {
        target: 'http://8.136.133.152:8088',
        changeOrigin: true,
      }
    }
  }
})