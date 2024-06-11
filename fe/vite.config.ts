import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  optimizeDeps: {
    include: [
      "react/jsx-runtime"
    ]
  },
  resolve: {
    alias: [
      { find: "src", replacement: "/src" }
    ]
  }
})
