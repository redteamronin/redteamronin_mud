import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages, set base to your repo name: base: '/your-repo-name/'
// For regular hosting, use: base: './'
export default defineConfig({
  plugins: [react()],
  base: './',
})
