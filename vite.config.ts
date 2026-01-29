import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Site is served at the domain root (https://joinlupin.app), so keep asset paths rooted at "/".
  base: '/',
  plugins: [react()],
})
