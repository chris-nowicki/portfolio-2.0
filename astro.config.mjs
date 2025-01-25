// @ts-check
import { defineConfig } from 'astro/config'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import rehypeAutoLinkHeadings from 'rehype-autolink-headings'
import tailwindcss from '@tailwindcss/vite'
import vercel from '@astrojs/vercel'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.chrisnowicki.dev',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  markdown: {
    shikiConfig: {
      theme: 'catppuccin-mocha',
      wrap: true,
    },
    rehypePlugins: [
      rehypeHeadingIds,
      [
        rehypeAutoLinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            class: ['subheading-anchor'],
            ariaLabel: 'Link to section',
          },
        },
      ],
    ],
  },

  experimental: {
    svg: true,
  },

  adapter: vercel(),
})
