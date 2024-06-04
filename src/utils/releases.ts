import { getCollection, type CollectionEntry } from 'astro:content';

import { giteaApi, type Release } from 'gitea-js';
const api = giteaApi('https://codeberg.org', {});

let _releases: Release[];
let _releaseBlogPosts: CollectionEntry<'blog'>[];

const semverRegex = /^v(\d+)\.(\d+)\./;

enum Comparison {
	LeftIsGreater = -1,
	Equal,
	LeftIsLower,
}

function compare(a: number, b: number) {
	if (a < b) {
		return Comparison.LeftIsLower;
	}
	if (a > b) {
		return Comparison.LeftIsGreater;
	}
	return Comparison.Equal;
}

class ReleaseVersion {
	readonly release?: Release;
	readonly major: number;
	readonly minor: number;

	constructor(release?: Release) {
		this.release = release;
		const [_, major, minor] = semverRegex.exec(release?.tag_name || 'v0.0.') || [];

		this.major = parseInt(major);
		this.minor = parseInt(minor);
	}

	compare(other: ReleaseVersion) {
		const majorCmp = compare(this.major, other.major);
		if (majorCmp != Comparison.Equal) {
			return majorCmp;
		}
		return compare(this.minor, other.minor);
	}
}

const _latestReleases = {
	stable: new ReleaseVersion(),
	oldstable: new ReleaseVersion(),
	experimental: new ReleaseVersion(),
};

/** Fetch a list of the latest Forgejo releases from Codeberg using the Forgejo API. */
export const fetchReleases = async () => {
	await ensureReleasesCached();
	return _releases;
};
async function ensureReleasesCached() {
	if (_releases) {
		return;
	}
	const response = await api.repos.repoListReleases('forgejo', 'forgejo');
	_releases = response.data;

	_releases.forEach((release) => {
		const rv = new ReleaseVersion(release);

		if (release.draft || release.prerelease) {
			if (_latestReleases.experimental.compare(rv) == Comparison.LeftIsLower) {
				_latestReleases.experimental = rv;
			}
			return;
		}

		const stableComparison = _latestReleases.stable.compare(rv);
		if (stableComparison == Comparison.LeftIsLower) {
			_latestReleases.oldstable = _latestReleases.stable;
			_latestReleases.stable = rv;
		} else if (
			stableComparison != Comparison.Equal &&
			_latestReleases.oldstable.compare(rv) == Comparison.LeftIsLower
		) {
			_latestReleases.oldstable = rv;
		}
	});
	if (_latestReleases.experimental.compare(_latestReleases.stable) != Comparison.LeftIsGreater) {
		// discared experimental if older than stable
		_latestReleases.experimental = new ReleaseVersion();
	}
}

/** Get the latest Forgejo release from Codeberg using the Forgejo API. */
export const getLatestRelease = async () => {
	await ensureReleasesCached();
	const release = _latestReleases.stable.release;
	if (!release) {
		throw new Error('no stable release!');
	}
	return release;
};

export const releaseLabel = async (release: Release) => {
	await ensureReleasesCached();
	switch (release.name) {
		case _latestReleases.stable.release?.name:
			return 'Stable';
		case _latestReleases.oldstable.release?.name:
			return 'Old Stable';
		case _latestReleases.experimental.release?.name:
			return 'Experimental';
	}
	return '';
};

/** Get the blog post for a release, if there is one. */
export const getReleaseBlogPost = async (version: string) => {
	if (!_releaseBlogPosts) {
		_releaseBlogPosts = await getCollection('blog', ({ data }) => data.release);
	}
	return _releaseBlogPosts.find(({ data }) => data.release == version);
};
