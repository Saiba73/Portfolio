import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/Portfolio/',
  plugins: [
    // Add your plugins here, for example, if you're using react plugin:
    // react(),
  ],
  assetsInclude: [
    'Keyboard.glb',
    'Monitor.glb',
    'Mouse.glb',
    'Table.glb',
    'blank_background.jpeg',
    'Logo_Vector.svg',
    'Play.ttf',
    'Montserrat.ttf'],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
  },
});
