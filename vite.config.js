import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "components": path.resolve(__dirname, "./src/components"),
      "lib": path.resolve(__dirname, "./src/lib"),
      "hooks": path.resolve(__dirname, "./src/hooks"),
      "services": path.resolve(__dirname, "./src/services"),
      "store": path.resolve(__dirname, "./src/store"),
      "pages": path.resolve(__dirname, "./src/pages"),
      "layout": path.resolve(__dirname, "./src/layout"),
    },
  },
})
