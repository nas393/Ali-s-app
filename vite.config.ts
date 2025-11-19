import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // This enables usage of process.env.API_KEY in the client-side code
      // Note: In production (Vercel), ensure API_KEY is set in the environment variables
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});