import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'pages/about.html'),
        services: resolve(__dirname, 'pages/services.html'),
        portfolio: resolve(__dirname, 'pages/portfolio.html'),
        contact: resolve(__dirname, 'pages/contact.html'),
        notfound: resolve(__dirname, '404.html'),
      },
    },
  },
});
