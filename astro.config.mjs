import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: import.meta.env.SITE || 'http://localhost:4321',
  output: 'server',
  adapter: cloudflare(),
  integrations: [
    react(),
    sitemap()
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
