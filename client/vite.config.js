import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ['c2d0-2409-40c1-110c-6160-f171-a685-bf35-6395.ngrok-free.app']
  }
})
