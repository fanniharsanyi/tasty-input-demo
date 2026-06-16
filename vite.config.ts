import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Build timestamp, shown in the header so it's easy to tell whether a page is
// the latest deploy or a stale cache.
const builtAt = new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC';

// `base` matches the GitHub Pages project URL: https://fanniharsanyi.github.io/tasty-input-demo/
export default defineConfig({
  plugins: [react()],
  base: '/tasty-input-demo/',
  define: {
    __BUILT_AT__: JSON.stringify(builtAt),
  },
});
