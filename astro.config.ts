import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import type { Options as rehypeAutolinkOptions } from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { toString } from 'hast-util-to-string';

import { SITE } from './src/config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const autolinkOptions: rehypeAutolinkOptions = {
	behavior: 'append',
	properties: {},
	content: (heading) => {
		return {
			type: 'element',
			tagName: 'span',
			properties: {
				ariaLabel: `Permalink to “${toString(heading)}” section`,
				className: ['icon', 'icon-link'],
			},
			children: [],
		};
	},
};

export default defineConfig({
	site: "https://castn.github.io/",
	base: "website-fsce",
	trailingSlash: SITE.trailingSlash ? 'always' : 'never',

	output: 'static',

	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
		sitemap(),
		mdx(),
	],

	markdown: {
		rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, autolinkOptions]],
	},

	vite: {
		resolve: {
			alias: {
				'~': path.resolve(__dirname, './src'),
			},
			preserveSymlinks: true,
		},
	},

	redirects: {
		'/docs/': '/docs/latest/',
	},
});
