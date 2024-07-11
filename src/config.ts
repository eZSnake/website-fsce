export const SITE = {
	name: 'Forgejo',

	origin: 'https://castn.github.io/website-fsce/',
	basePathname: '/',
	trailingSlash: true,

	title: 'Fachschaft CE',
	description:
		'Die Fachschaft CE ist die Fachschaft des SB CE an der TU Darmstadt',
};

export const BLOG = {
	disabled: false,
	postsPerPage: 5,

	blog: {
		disabled: false,
		pathname: 'news', // blog main path, you can change this to "articles" (/articles)
	},

	post: {
		disabled: false,
		pathname: '', // empty for /some-post, value for /pathname/some-post
	},

	category: {
		disabled: false,
		pathname: 'category', // set empty to change from /category/some-category to /some-category
	},

	tag: {
		disabled: false,
		pathname: 'tag', // set empty to change from /tag/some-tag to /some-tag
	},
};

export const forgejoVersions = {
	latest: '1.21',
	next: '7.0',
};

export const DOCS = {
	repo: 'https://codeberg.org/forgejo/docs',
};
