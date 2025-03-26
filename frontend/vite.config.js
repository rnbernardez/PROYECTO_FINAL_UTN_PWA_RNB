import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: process.env.PORT || 4173,
    host: '0.0.0.0',
    strictPort: true,
  },
  preview: {
    port: process.env.PORT || 4173,
    host: '0.0.0.0',
    allowedHosts: ['utn-pwa-rnb-tpfinal.onrender.com'],
  },
});