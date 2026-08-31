import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from 'astro/config';

import vercel from "@astrojs/vercel";

// https://astro.build/configs
export default defineConfig({
  site: "https://therohitpatwa.me",
  integrations: [tailwind(), icon(), expressiveCode({
    styleOverrides: {
      frames: {
        // Style the copy button
        inlineButtonForeground: 'var(--code-copy-btn-fg)',
        inlineButtonBackground: 'var(--code-copy-btn-bg)',
        inlineButtonBorder: 'var(--code-copy-btn-border)',
        inlineButtonHoverOrFocusBackground: 'var(--code-copy-btn-hover-bg)',
      }
    }
  }), mdx(), sitemap({
    chunks: {
      blog: (item) => (item.url.includes('/blog/') || item.url.includes('/blogs')) ? item : undefined,
      projects: (item) => (item.url.includes('/projects/') || item.url.includes('/projects')) ? item : undefined,
      works: (item) => item.url.includes('/works/') ? item : undefined,
      contact: (item) => item.url.includes('/contact/') ? item : undefined,
      about: (item) => item.url.includes('/about/') ? item : undefined,
    }
  })],
  output: "static",
  adapter: vercel(),
  image: {
    domains: [],
    remotePatterns: []
  },
  vite: {
    build: {
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['astro']
          }
        }
      }
    }
  }
});