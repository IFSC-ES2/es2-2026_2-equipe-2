import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: Number(process.env.PORT_WEB) || 3000,
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
