import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true, // Fail if 5173 is taken, don't auto-increment
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
    watch: {
      usePolling: true, // Force polling to ensure file changes are caught
    }
  },
  resolve: {
    dedupe: ['react', 'react-dom', 'three'],
  },
  ssr: {
    noExternal: ['react-helmet-async'],
  },
})
