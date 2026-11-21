import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Maps each source file to its built chunk. scripts/prerender.js reads it
    // to preload a page's own code, then deletes it from dist/.
    manifest: true,
  },
})
