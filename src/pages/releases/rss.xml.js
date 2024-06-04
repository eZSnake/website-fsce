import rss from '@astrojs/rss';

import { SITE } from '~/config.ts';
import { fetchReleases } from '~/utils/releases';
import { getCanonical } from '~/utils/permalinks';

export const get = async () => {
	const releases = await fetchReleases();

	return rss({
		title: `Forgejo Releases`,
		description: SITE.description,
		site: getCanonical('releases').toString(),

		items: releases.map((release) => ({
			link: release.html_url,
			title: release.name,
			// description: post.description || post.excerpt,
			pubDate: release.published_at,
		})),

		stylesheet: import.meta.env.BASE_URL + 'pretty-feed-v3.xsl',
	});
};
