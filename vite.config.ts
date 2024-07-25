// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

import dotenv from 'dotenv'
dotenv.config()

export default defineConfig({
  plugins: [react(), svgr({
    svgrOptions: {
      icon: true,
    }
  })],
  server: {
    port: 4200, // Default to 3000 if not set
  },
})
