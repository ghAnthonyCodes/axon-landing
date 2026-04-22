import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const myelinHighlighter = {
  name: 'myelin-brand',
  span(hast, _line, _col, _lineEl, token) {
    if (token.content === 'myelin') {
      const existing = hast.properties.style || '';
      hast.properties.style = existing.replace(/color:[^;]+;?/, '') + ';color:#d3869b';
    }
  },
};

export default defineConfig({
  site: 'https://runaxon.com',
  integrations: [mdx({ shikiConfig: { transformers: [myelinHighlighter] } }), sitemap({
    filter: (page) => !page.includes('/blog/myelin-475x-one-command') && !page.includes('/quickstart'),
  })],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      transformers: [myelinHighlighter],
    },
  },
});
