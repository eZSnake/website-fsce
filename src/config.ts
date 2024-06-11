export const SITE = {
	name: 'Forgejo',

	origin: 'https://forgejo.org/',
	basePathname: '/',
	trailingSlash: true,

	title: 'Forgejo – Beyond coding. We forge.',
	description:
		'Forgejo is a self-hosted lightweight software forge. Easy to install and low maintenance, it just does not do the job.',
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
