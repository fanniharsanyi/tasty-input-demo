import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base` matches the GitHub Pages project URL: https://fanniharsanyi.github.io/tasty-input-demo/
export default defineConfig({
  plugins: [react()],
  base: '/tasty-input-demo/',
});
