import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Usamos '@' como alias para la carpeta 'src'
    },
  },
  server: {
    port: process.env.PORT || 4173, // Usa el puerto de Render o el 4173 por defecto
    host: true, // Esto permite que la app esté accesible en la red
  },
});