/// <reference types="vitest" />
import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true
  },
  plugins: [react(),
    VitePWA({
      // Enable PWA
      registerType: "autoUpdate",
      // Basic PWA configuration
      manifest: {
        name: "Divisas",
        short_name: "divisas",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },
      // Cache all files in public directory
      workbox: {
        
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg}"],
        // Configurar cache para imagenes
        runtimeCaching: [
          {
            urlPattern: /\.(png|jpg|jpeg|svg|gif|webp)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 50,  // Maximo de imagenes en cache
                maxAgeSeconds: 30 * 24 * 60 * 60  // 30 dias de expifacion
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]

      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
