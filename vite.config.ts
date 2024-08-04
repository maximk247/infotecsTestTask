/// <reference types="vitest" />
/// <reference types="vite-plugin-svgr/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  base: '/infotecsTestTask/',
  plugins: [react(), svgr()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/__tests__/setup.ts'],
  },
  server: {
    fs: {
      cachedChecks: false
    }
  }
});
