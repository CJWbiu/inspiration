import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import PostcssPresetEnv from 'postcss-preset-env';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/inspiration/site/',
  build: {
    outDir: 'site'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
      'pages': path.resolve(__dirname, '/src/pages'),
      'components': path.resolve(__dirname, '/src/components')
    }
  },
  css: {
    postcss: {
      plugins: [
        PostcssPresetEnv
      ]
    }
  },
  plugins: [vue()]
})
