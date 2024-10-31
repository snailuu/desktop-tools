import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import viteStylelint from 'vite-plugin-stylelint';
// @ts-expect-error not type
import viteEslint from 'vite-plugin-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  base: '/desktop-tools',
  plugins: [react(),

    viteStylelint({
      exclude: 'node_modules'
    }),
    viteEslint()
  ],
  resolve:{
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
