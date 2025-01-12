import { defineConfig } from 'vite';
import topLevelAwait from 'vite-plugin-top-level-await';
import { resolve } from 'path';

export default defineConfig({
  plugins: [topLevelAwait()],
  base: './', // Keeps relative paths for assets
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'), // Main page
        preorder: resolve(__dirname, 'preorder.html'), // Additional page
        testdrive: resolve(__dirname, 'testdrive.html'), // Another page
        contact: resolve(__dirname, 'contactus.html'), // Another page
      },
    },
  },
});