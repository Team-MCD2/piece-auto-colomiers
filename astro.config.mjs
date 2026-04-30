// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// URL canonique du site. Override via env SITE_URL pour previews/staging.
const SITE_URL = process.env.SITE_URL || 'https://pieces-auto-colomiers.vercel.app';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'never',
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'viewport',
  },
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }), // base styles dans src/styles/globals.css
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      filter: (page) => !page.includes('/404'),
    }),
  ],
  vite: {
    ssr: {
      // Leaflet et react-leaflet ne sont pas SSR-safe (window/document references)
      noExternal: ['leaflet', 'react-leaflet'],
    },
    build: {
      cssCodeSplit: true,
    },
  },
  build: {
    inlineStylesheets: 'auto',
    assets: '_assets',
  },
  compressHTML: true,
});
