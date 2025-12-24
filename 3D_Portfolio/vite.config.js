import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'


// https://vite.dev/config/
export default defineConfig({
  
  plugins: [react()],
  resolve: {
    alias: {
      // Esto le dice a Vite: "Cuando alguien pida react-dom/client, dáselo desde aquí"
      'react-dom/client': 'react-dom/client',
      'react-dom': 'react-dom',
      'react': 'react',
    },
  },
})
