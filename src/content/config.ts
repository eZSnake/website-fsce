// Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// see https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
const semverRegex =
	/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

// Define a `type` and `schema` for each collection
const blogCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		publishDate: z.date(),
		excerpt: z.string(),
		author: z.string().optional(),
		tags: z.array(z.string()),
		release: z.string().regex(semverRegex).optional(),
	}),
});

const docsCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		license: z.string().optional(),
		origin_url: z.string().url().optional(),
	}),
});

// Export a single `collections` object to register your collection(s)
export const collections = {
	blog: blogCollection,
	docs: docsCollection,
};
