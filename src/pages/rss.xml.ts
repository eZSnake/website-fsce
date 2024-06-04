import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import { marked } from 'marked';

import { SITE } from '~/config';
import { getPermalink } from '~/utils/permalinks';

export const get = async () => {
	const posts = await getCollection('blog');
	posts.sort((a, b) => b.data.publishDate?.getTime() - a.data.publishDate?.getTime());

	return rss({
		title: `Forgejo News`,
		description: SITE.description,
		site: import.meta.env.SITE,

		items: posts.map((post) => ({
			link: getPermalink(post.slug, 'post'),
			title: post.data.title,
			description: post.data.excerpt,
			pubDate: post.data.publishDate,
			content: sanitizeHtml(marked.parse(post.body)),
		})),

		stylesheet: import.meta.env.BASE_URL + 'pretty-feed-v3.xsl',
	});
};
