import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  server: {
    proxy: {
      '/api': {
        target: 'mongodb+srv://abhigyanshr2122:abhigyan1234@cluster0.qaaubik.mongodb.net/',
        changeOrigin: true
      }
    }
  }
});
