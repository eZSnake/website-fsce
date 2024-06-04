---
layout: '~/layouts/Markdown.astro'
publishDate: 'November 2023'
title: 'Comparison with Gitea'
---

Forgejo was [created in October 2022](https://forgejo.org/2022-12-15-hello-forgejo/) after a for profit company took over the Gitea project. It exists under the umbrella of a non-profit organization, Codeberg e.V. and is developed in the interest of the general public. In the year that followed, this difference in governance led to choices that made Forgejo significantly and durably different from Gitea. You will find below the most important reasons to choose Forgejo over Gitea. For an exhaustive comparison of [software forges](<https://en.wikipedia.org/wiki/Forge_(software)>), the corresponding [Wikidata project](https://www.wikidata.org/wiki/Wikidata:WikiProject_Informatics/Forges) can be used as a reference.

## Free software

Forgejo is [developed](https://codeberg.org/forgejo/forgejo) using Forgejo, [tested](https://codeberg.org/forgejo/forgejo/actions) and [released](../docs/latest/developer/release/#stable-release-process) using Forgejo Actions.

Gitea is developed on GitHub, tested and released using GitHub Actions.

Forgejo's localization is done using [Weblate](../docs/v1.21/developer/localization/).

Gitea's localization is done using Crowdin.

Forgejo exclusively develops software and documentation published under Free Software licenses.

Gitea contribution policy requires a [copyright assignment](https://codeberg.org/forgejo/discussions/issues/67), even for MIT licensed code. It is [Open Core](https://en.wikipedia.org/wiki/Open-core_model) and develops software that is not published under a Free Software license, such as features on top of the Gitea codebase or the stack running its SaaS offering.

## Better security

Forgejo focuses on identifying and fixing security vulnerabilities as soon as they are discovered. Gitea is always notified in advance via encrypted channels (e.g. [Forgejo v1.20.5-1](https://forgejo.org/2023-11-release-v1-20-5-1/), [Forgejo v1.20.5-0](https://forgejo.org/2023-10-release-v1-20-5-0/), [Forgejo v1.18.2](https://forgejo.org/2023-01-22-release-v1-18-2-1/)). Advance notice of security releases is [available to everyone](https://codeberg.org/forgejo/security-announcements/issues).

Gitea repeatedly makes choices that leave Gitea admins exposed to known vulnerabilities during extended periods of time. For instance Gitea spent resources to [undergo a SOC2 security audit](https://web.archive.org/web/20231129154148/https://blog.gitea.com/gitea-cloud/) for its SaaS offering while [critical vulnerabilities](https://forgejo.org/2023-11-release-v1-20-5-1/) demanded a new release. Advance notice of security releases is for [customers only](https://web.archive.org/web/20231124064958/https://about.gitea.com/pricing/).

## Better stability

Forgejo relies on [end-to-end](https://code.forgejo.org/forgejo/end-to-end/) and upgrade tests. The upgrade tests were introduced to address an [instability caused by a regression in the storage settings](https://forgejo.org/2023-08-release-v1-20-3-0/).

Gitea does not have end-to-end or upgrade tests that can verify the stability of a release. Storage could be misplaced [as it was in the Gitea v1.20 series](https://forgejo.org/2023-08-release-v1-20-3-0/) without raising an alarm.

## In the interest of the general public

Forgejo [sustainability](https://codeberg.org/forgejo/sustainability) depends on a healthy balance between paid staff and volunteers working on an equal footing. It is amicable to individuals and organizations being paid for their work, to provide services or custom developments. Because it is under the umbrella of Codeberg e.V. which is a non-profit organization, its priority is the interest of the general public.

Gitea is [controlled by a for-profit company](https://forgejo.org/2022-12-15-hello-forgejo/) (via the ownership of the domain name and the trademark) which leads to decisions being made to maximize profit rather than favor the interest of the general public.

## Focus on forge federation

Forgejo is working on implementing forge federation, with [monthly progress reports](https://forgejo.org/tag/report/).

Gitea is not working on forge federation.

## FAQ

This FAQ is on topics related to Forgejo and Gitea. There exists another, more [general FAQ](../faq/).

### Why was Forgejo created?

In October 2022 the domains and trademark of Gitea were transferred to a for-profit company without knowledge or approval of the community. Despite [writing an open letter](https://gitea-open-letter.coding.social/), the takeover was later confirmed. Forgejo was created as an alternative providing a software forge whose governance further the interest of the general public.

Forgejo was initially presented as a "soft-fork" of Gitea, similar to [LineageOS](https://lineageos.org/), a community led distribution based on Android from Google. It is however better described as a product built on top of Gitea, Git and hundreds of other Free Software projects. Forgejo also has its own documentation, infrastructure, release pipeline, CI infrastructure, distribution channels etc.

As of early 2024, Forgejo is developed independently of Gitea, as a "hard-fork".

### Is there a list of features Forgejo has over Gitea?

No, there isn't. Both Forgejo and Gitea are developed at a pace that would make such a comparison very hard to maintain.

You can compare the documentation (including blog posts) and release notes of both, to form an idea of what each can do for you.

### Are migrations from Gitea to Forgejo possible?

See the answer in the [general FAQ](/faq/#im-sold-are-migrations-from-gitea-to-forgejo-possible). In short, upgrading from Gitea releases prior to the hard fork are possible and supported. Upgrading from Gitea releases made after are not guaranteed.

### Should I submit all my pull requests to Forgejo, or are there changes you'd rather prefer see submitted to Gitea?

If you want to contribute to Forgejo, you should submit all your pull requests to it directly.

While Forgejo contributors regularly check Gitea to cherry-pick from, that is always going to be slower than direct contributions, and there is no guarantee that a particular pull request made to Gitea will find its way to Forgejo.

### Will my contributions to Forgejo get submitted to Gitea as PRs afterwards?

Most likely, no.

### Does the Gitea project cherry-pick Forgejo commits?

No.

### Will Forgejo stop being a 100% compatible drop-in replacement of Gitea?

Eventually, yes.

### Will Forgejo become a hard fork of Gitea?

Forgejo became a hard fork in [early 2024](../2024-02-forking-forward/).

### Why must I keep the binary name `gitea` on upgrade?

Because the `gitea` binary file name is referenced by an existing Gitea installation
and would need to be replaced if Forgejo was installed as `forgejo` instead.
It is the case, for instance, within the `git` hooks.

Using a symbolic link from `gitea` to `forgejo` makes it simple and convenient to use both
names while preserving backward compatibility.
