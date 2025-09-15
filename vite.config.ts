import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [vue(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['vite.svg'],
    manifest: {
      name: 'Glucosio Renal Monitor',
      short_name: 'GlucosioMonitor',
      start_url: '/',
      description: 'Una App per monitorare glucosio e i parametri di funzionalità renale',
      background_color: '#ffffff',
      theme_color: '#d3d3d3',
      icons: [
        {
          src: 'vite.svg',
          sizes: '192x192',
          type: 'image/svg+xml'
        },
        {
          src: 'VITE.svg',
          sizes: '512x512',
          type: 'image/svg+xml'
        }
      ]
    }
  })],
  server: {
    host: 'localhost',
    port: 5173,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173
    }
  }
})
