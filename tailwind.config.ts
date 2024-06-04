import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';
import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import type { PluginUtils } from 'tailwindcss/types/config';

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: colors.orange,
				secondary: colors.yellow,
				steel: {
					100: '#D2E0F0',
					200: '#AEBED0',
					300: '#8C9DAF',
					400: '#6D7D8F',
					500: '#515F70',
					600: '#374351',
					700: '#242E38',
					800: '#171e26',
					900: '#10161D',
				},
			},
			fontFamily: {
				sans: [...defaultTheme.fontFamily.sans],
			},
			typography: ({ theme }: { theme: PluginUtils['theme'] }) => ({
				steel: {
					css: {
						'code::after': {
							content: 'none',
						},
						'code::before': {
							content: 'none',
						},
						'--tw-prose-body': theme('colors.steel[600]'),
						'--tw-prose-headings': theme('colors.steel[700]'),
						'--tw-prose-lead': theme('colors.steel[600]'),
						'--tw-prose-links': theme('colors.steel[900]'),
						'--tw-prose-bold': theme('colors.steel[900]'),
						'--tw-prose-counters': theme('colors.steel[500]'),
						'--tw-prose-bullets': theme('colors.steel[300]'),
						'--tw-prose-hr': theme('colors.steel[200]'),
						'--tw-prose-quotes': theme('colors.steel[900]'),
						'--tw-prose-quote-borders': theme('colors.steel[200]'),
						'--tw-prose-captions': theme('colors.steel[500]'),
						'--tw-prose-code': theme('colors.steel[900]'),
						'--tw-prose-pre-code': theme('colors.steel[200]'),
						'--tw-prose-pre-bg': theme('colors.steel[800]'),
						'--tw-prose-th-borders': theme('colors.steel[300]'),
						'--tw-prose-td-borders': theme('colors.steel[200]'),
						'--tw-prose-invert-body': theme('colors.steel[300]'),
						'--tw-prose-invert-headings': theme('colors.steel[200]'),
						'--tw-prose-invert-lead': theme('colors.steel[400]'),
						'--tw-prose-invert-links': theme('colors.steel[200]'),
						'--tw-prose-invert-bold': theme('colors.steel[200]'),
						'--tw-prose-invert-counters': theme('colors.steel[400]'),
						'--tw-prose-invert-bullets': theme('colors.steel[600]'),
						'--tw-prose-invert-hr': theme('colors.steel[700]'),
						'--tw-prose-invert-quotes': theme('colors.steel[100]'),
						'--tw-prose-invert-quote-borders': theme('colors.steel[700]'),
						'--tw-prose-invert-captions': theme('colors.steel[400]'),
						'--tw-prose-invert-code': theme('colors.steel[200]'),
						'--tw-prose-invert-pre-code': theme('colors.steel[300]'),
						'--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
						'--tw-prose-invert-th-borders': theme('colors.steel[600]'),
						'--tw-prose-invert-td-borders': theme('colors.steel[700]'),
					},
				},
			}),
		},
	},
	plugins: [typography],
	darkMode: 'media',
} satisfies Config;
