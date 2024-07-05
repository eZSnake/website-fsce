# Website for Forgejo

This website is built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com/),
and is based on the [AstroWind](https://github.com/onwidget/astrowind) template.

When a branch `foobar` is pushed to the repository, the content is rendered for preview at `https://forgejo.codeberg.page/@foobar/`.

When a PR is created, its content is rendered for preview at `https://forgejo.codeberg.page/@pull_1234/` where `1234` is the number of the PR.

The `forgejo-website` user is dedicated to providing an application token set to `websitetoken` and allows for publishing the branch and CI previews in https://codeberg.org/forgejo/pages.

### Hosting

The website is hosted at https://uberspace.de and the technical details on how this is done can be found in the CI configuration at `.forgejo/workflows`

The `sshpass` password is not stored anywhere. It is set via https://dashboard.uberspace.de/dashboard/authentication and copied over to the secrets of the CI where it will never be displayed again. It can be verified to work with

```
SSHPASS=xyz rsync --rsh='sshpass -e ssh -oStrictHostKeyChecking=no -o PubkeyAuthentication=no' -av forgejo@atria.uberspace.de:html/ /tmp/html/
```

Google [topics are disabled](https://manual.uberspace.de/web-headers/#disable-google-topics)

```
[forgejo@atria ~]$ uberspace web header set / Permissions-Policy "browsing-topics=()"
Set header "Permissions-Policy: browsing-topics=()" for /
```

## Contributing

### Format locally

`docker run --rm -ti -v $(pwd):$(pwd) -w $(pwd) node:20 bash -c 'corepack enable ; pnpm install --frozen-lockfile ; pnpm run format'`

### Commands

All commands are run from the root of the project, from a terminal:

| Command                  | Action                                             |
| :----------------------- | :------------------------------------------------- |
| `pnpm install`           | Installs dependencies                              |
| `pnpm run prepare`       | Install git pre-commit hook                        |
| `pnpm run dev`           | Starts local dev server at `localhost:3000`        |
| `pnpm run build`         | Build your production site to `./dist/`            |
| `pnpm run preview`       | Preview your build locally, before deploying       |
| `pnpm run format`        | Format codes with Prettier                         |
| `pnpm run format-staged` | Format staged files with Prettier                  |
| `pnpm run lint:eslint`   | Run Eslint                                         |
| `pnpm run astro ...`     | Run CLI commands like `astro add`, `astro preview` |

See the [AstroWind docs](https://github.com/onwidget/astrowind) for more information.

### Project structure

The following is the default structure of the AstroWind template:

```
/
├── data/
|   └── blog/
|       ├── post-slug-1.md
|       ├── post-slug-2.mdx
|       └── ...
├── public/
│   ├── robots.txt
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── images/
|   |   └── styles/
|   |       └── base.css
│   ├── components/
│   │   ├── atoms/
│   │   ├── blog/
│   │   ├── core/
|   |   └── widgets/
|   |       ├── Header.astro
|   |       ├── Footer.astro
|   |       └── ...
│   ├── layouts/
│   |   |── BaseLayout.astro
│   |   └── ...
│   ├── pages/
│   |   ├── [...blog]/
|   |   |   ├── [...page].astro
|   |   |   └── [slug].astro
│   |   ├── [...categories]/
|   |   |   └── [category]/
|   |   |       └── [...page].astro
│   |   ├── [...tags]/
|   |   |   └── [tag]/
|   |   |       └── [...page].astro
│   |   ├── index.astro
|   |   ├── 404.astro
|   |   └-- rss.xml.js
│   ├── utils/
│   └── config.ts
├── package.json
└── ...
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory if they do not require any transformation or in the `assets/` directory if they are imported directly.

### Manual testing

When doing some dependency upgrade, the following should be manually tested:

_Note that ideally both the mobile (narrow) and desktop (wide) versions should be tested_

- [ ] visit the homepage
- [ ] visit the `rss.xml` feed (⚠️ the menu button points to the `main` version: put the URL manually in case of a pull request with `/@pull_XX` prefix)
- [ ] switch the theme (light/dark)
- [ ] visit the FAQ
- [ ] visit the Releases page (there should be one `Stable` and one `Old Stable` tag)
- [ ] visit the News page
- [ ] visit the News page for a given tag (`report` for instance)
- [ ] visit the first News
- [ ] visit the docs `/latest`
- [ ] visit the docs `/next`
- [ ] visit the docs `/v7.0`
- [ ] visit the docs > Admin > Reverse proxy and check that all code blocks have syntax coloring
- [ ] visit the docs > Admin > Configuration Cheat Sheet and check that the internal page navigation (on the right) behaves correctly (independently scrollable / click on item goes to the right place) _only available on desktop for now_
- [ ] check the menu toggling _only for mobile_
