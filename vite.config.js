import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
<<<<<<< HEAD
  plugins: [react(), tailwindcss()],
=======
  plugins: [
    react(),
    tailwindcss(),
  ],
>>>>>>> 413f5c6692d57379365d4f133b1a4dff48d2f4a5
})
