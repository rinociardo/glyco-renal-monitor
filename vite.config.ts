import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/glyco-renal-monitor/' : '/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['vite.svg'],
      manifest: {
        name: 'Glucosio Renal Monitor',
        short_name: 'GlucosioMonitor',
        start_url: '/glyco-renal-monitor',
        scope: '/glyco-renal-monitor/',
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
    })
  ],
  server: {
    port: 5173
    // No need for custom HMR config unless you're proxying or using HTTPS
  }
}))
