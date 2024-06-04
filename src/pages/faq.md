---
layout: '~/layouts/Markdown.astro'
publishDate: 'May 2023'
title: 'Forgejo FAQ'
---

For a FAQ on how Forgejo and Gitea are related, see the [dedicated comparison page](../compare-to-gitea/#faq).

## Where does the name come from?

**Forgejo** ([pronounced /forˈd͡ʒe.jo/](/static/forgejo.mp4)) is inspired by <i lang="eo">forĝejo</i>, the Esperanto word for forge.

## Who is using Forgejo?

The vast majority of Forgejo's users are developers of free and open source software.

Forgejo maintains a [list of public instances](https://codeberg.org/forgejo-contrib/delightful-forgejo#public-instances).

## What is the governance of Forgejo?

Forgejo's governance is [collectively defined by its contributors](https://codeberg.org/forgejo/governance/src/branch/main/README.md).

Forgejo's repositories show [how it receives and allocates money](https://codeberg.org/forgejo/sustainability), [how it wants to evolve and what it needs to do next](https://codeberg.org/forgejo/discussions/issues), [as well as how it turns these ideas into decisions](https://codeberg.org/forgejo/governance).

For less urgent conversations and real-time discussions, there is a [Matrix Space](https://matrix.to/#/#forgejo:matrix.org) that is open to everyone.

## Who owns the Forgejo domains and trademarks?

The Forgejo domains are in the custody of the non-profit [Codeberg e.V.](https://codeberg.org).

At this point in time, Forgejo has **not** registered any trademarks.

### What is 'Codeberg e.V.'?

[Codeberg](https://codeberg.org/Codeberg/org/src/branch/main/Imprint.md) is a non-profit association registered in Berlin, Germany.
The abbreviation **e.V.** stands for _eingetragener Verein_, which translates as 'registered association'.

[As defined by its Bylaws](https://codeberg.org/Codeberg/org/src/branch/main/en/bylaws.md),
its goal is to "guarantee the openness and continued availability of free software".

Forgejo has to abide by Codeberg's goals.
We believe that this arrangement reinforces the longevity of Forgejo,
as far as the project's stability and financial security is concerned.

For more information, see [Codeberg's Documentation](https://docs.codeberg.org/getting-started/what-is-codeberg/#what-is-codeberg-e.v.).

## What is the difference between Forgejo and Gitea?

See [Comparison with Gitea](../compare-to-gitea/).

### I'm sold. Are migrations from Gitea to Forgejo possible?

For the time being, yes. Up [until early 2024](../2024-02-forking-forward/), Forgejo used to include all of Gitea. All commits made on [Gitea](https://github.com/go-gitea/gitea/) were also present in Forgejo, and upgrading from Gitea [to Forgejo](/download/) was as easy as changing the URL from which you get your releases from.

Upgrading from the latest Gitea version released before the hard fork ([v1.21.5](https://github.com/go-gitea/gitea/releases/tag/v1.21.5)) is still guaranteed to work. Upgrading from releases made after that, aren't. It may remain possible, but as the two projects naturally drift apart, migration will become more risky.

### Does Forgejo have a Code of Conduct?

**Yes.** The [Code of Conduct](https://codeberg.org/forgejo/code-of-conduct) applies to **all** spaces that the Forgejo project is responsible for.

The [Moderation Team](https://codeberg.org/forgejo/governance/src/branch/main/TEAMS.md#moderation) is responsible for resolving conflicts.
Its decisions [are documented publicly](https://codeberg.org/forgejo/governance/issues?q=&type=all&labels=106732), while respecting the privacy of everyone involved.

## Is Forgejo sustainable? How is it funded?

Sustaining Free Software projects developed in the interest of the general public is an ongoing challenge.

Forgejo relies on a mixture of volunteer contributions, grants, donations and employee delegation to keep going.

In summary:

- [Codeberg e.V.](#what-is-codeberg-ev) owns Forgejo's domains, provides resources and cooperates closely with Forgejo.
- Forgejo's [governance structures](https://codeberg.org/forgejo/governance) remain independent of Codeberg's.
- Forgejo applies for grants to [meet its goals](#is-there-a-roadmap-for-forgejo) more efficiently.
- Contributors can independently accept [employment contracts](https://codeberg.org/forgejo/professional-services/issues).

More details are available on [Forgejo's repository dedicated to sustainability](https://codeberg.org/forgejo/sustainability).

## Is there a roadmap for Forgejo?

One of Forgejo's primary goals is implementing **forge federation** using [ForgeFed](https://forgefed.org/).
It is an extension of [ActivityPub](https://www.w3.org/TR/activitypub/).

Apart from that, there are various contributors spend a lot of their time issuing improvements based on user feedback.
Forgejo has a [user research project](https://codeberg.org/forgejo/user-research) with the goal of building a more concrete roadmap.
If you are interested in participating, please [join the chat room](https://matrix.to/#/#forgejo-chat:matrix.org).

## Where can I report a security vulnerability?

Security issues are managed by [a team](/.well-known/security.txt) sharing the effort between Codeberg and Forgejo.
The security team is available at `security@forgejo.org` (GPG public key [1B638BDF10969D627926B8D9F585D0F99E1FB56F](https://keyoxide.org/security@forgejo.org)) and is tasked to identify, define, and respond to vulnerabilities.

## Is Forgejo licensed under AGPL?

**No.** The [license of Forgejo](https://codeberg.org/forgejo/forgejo/src/branch/forgejo/LICENSE) is
[MIT](https://spdx.org/licenses/MIT.html).

In order to prevent a takeover from a for-profit company,
it was suggested to change the license to [AGPL](https://spdx.org/licenses/AGPL-3.0-or-later.html).
However, no agreement was reached. Instead, Forgejo agreed to allow contributions compatible with
[GNU General Public License v3.0 or later](https://spdx.org/licenses/GPL-3.0-or-later.html).
**As of January 2024,** such a contribution has **not** been made yet.

---

## Why are container images published with the 1.19 tag?

The **1.19** tag is set to be the latest patch release, starting with [1.19.0-2](https://codeberg.org/forgejo/-/packages/container/forgejo/1.19.0-2). **1.19** will then be equal to **1.19.1-0** when it is released and so on. It can conveniently be used for automated upgrades to the latest stable release.

## Why is there no latest tag for container images?

Because upgrading from **1.X** to **1.X+1** (for instance from **1.18** to **1.19**) requires a [manual operation and human verification](/docs/latest/admin/upgrade). However it is possible to use the **X.Y** tag (for instance **1.19**) to get the latest point release automatically.

## What are the names of the built-in Forgejo themes?

Forgejo introduces two new themes: light version named **forgejo-light** and a dark version named **forgejo-dark**. They are the default for a new installation but will need to be set explicitly if the `app.ini` file already has a custom list of themes. For instance, if it looks like this:

```
[ui]
THEMES = gitea-auto,gitea-light,gitea-dark
```

the **forgejo-auto**, **forgejo-light** and **forgejo-dark** can be added as follows:

```
[ui]
THEMES = forgejo-auto,forgejo-light,forgejo-dark,gitea-auto,gitea-light,gitea-dark
```

## Why are there no mentions of mssql in the documentation? Or Windows binaries?

Although the Forgejo codebase is known to be easy to built for Windows
and reliably run with a mssql database, there currently is no
expertise on either of those in the Forgejo community. Maintaining a
distribution targetting a given database and Operating System requires
someone to build and maintain the release pipeline, figure out the
root cause of bugs and fix them.
