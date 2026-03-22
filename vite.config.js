import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    watch: {
      ignored: ['**/downloaded_images/**', '**/public/assets/medicines/**', '**/src/data/medicines.json']
    }
  }
})
