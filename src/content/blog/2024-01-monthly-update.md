---
title: Forgejo monthly update - January 2024
publishDate: 2024-01-28
tags: ['news', 'report']
excerpt: Forgejo may become a hard fork of Gitea; user research is on the way to figure out the scope of moderation in Forgejo instances; a new requirement for tests was added to the development workflow; the "You pushed on branch" user experience was improved; the migration of translations to Weblate began.
---

- An [agreement is discussed](https://codeberg.org/forgejo/governance/issues/58) to make Forgejo a hard fork of Gitea.
- User research is on the way regarding the [(Scope of) moderation of Forgejo instances](https://codeberg.org/forgejo/discussions/issues/107).
- A new [requirement to the development workflow](https://codeberg.org/forgejo/governance/pulls/51) was added to contain the technical debt.
- The [migration of Forgejo translations](https://codeberg.org/forgejo/discussions/issues/104) to [the Codeberg instance of Weblate](https://translate.codeberg.org) is on the way.

The monthly report is meant to provide a high level view of what happened in Forgejo in the past month. If you would like to help, please get in touch in [the chatroom](https://matrix.to/#/!JpOtsqTARyyfkoizCU:matrix.org) or participate in the [ongoing discussions](https://codeberg.org/forgejo/discussions).

## Forgejo

https://codeberg.org/forgejo/forgejo

Notable improvements and bug fixes:

- Repository administrators can [allow anyone to edit the wiki](https://forgejo.org/docs/v7.0/user/wiki/#activation-and-permissions) in the repository Settings. ([#2001](https://codeberg.org/forgejo/forgejo/pulls/2001))
- [nuget api support serving package manifest](https://codeberg.org/forgejo/forgejo/pulls/2222)
- [Fix false positive in database migration](https://codeberg.org/forgejo/forgejo/pulls/2216)
- [Log SQL queries when the database return error](https://codeberg.org/forgejo/forgejo/pulls/2140)
- Instance administrators can enable [repository badges](https://forgejo.org/docs/v7.0/user/readme-badges/) in the [configuration file](https://forgejo.org/docs/v7.0/admin/config-cheat-sheet/#badges-badges). This feature depends on a shield generator service such as shields.io, and is disabled by default. ([#2070](https://codeberg.org/forgejo/forgejo/pulls/2070))
- [Allow viewing the latest Action on the web](https://codeberg.org/forgejo/forgejo/pulls/1900): a tiny little convenience route that allows linking to the latest action of a repository. Useful for READMEs and CI badges.
- Forgejo now recognizes more [linguist attributes](https://forgejo.org/docs/v7.0/user/language-detection/), making it possible to include documentation in the repository language statistics, for example. ([#2088](https://codeberg.org/forgejo/forgejo/pulls/2088))
- Users who signed up, but have not activated their accounts yet, are now able to [change their email before activation](https://codeberg.org/forgejo/forgejo/pulls/1891). ([#1891](https://codeberg.org/forgejo/forgejo/pulls/1891))
- The "You pushed on branch ...." banner user experience was improved ([#2141](https://codeberg.org/forgejo/forgejo/pulls/2141), [#2195](https://codeberg.org/forgejo/forgejo/pulls/2195), [#2196](https://codeberg.org/forgejo/forgejo/pulls/2196))

[Read more](https://codeberg.org/forgejo/forgejo/pulls?q=&type=all&sort=&state=closed&labels=&milestone=0&project=0&assignee=0&poster=0) in the pull requests.

### In flight pull requests

Most [pull requests](https://codeberg.org/forgejo/forgejo/pulls?state=closed) are opened and closed within a week. But some of them take a longer time, either because they are more complex or because they are taken care of by volunteers who can only occasionally work on them in their free time. This is a list of those that were updated since the last monthly report. If they are of interest to you, reviewing the changes or providing solutions would be appreciated.

- [Add intial layout support for right-to-left languages](https://codeberg.org/forgejo/forgejo/pulls/2223)
- [Refactor webhook logic in preparation for custom webhook](https://codeberg.org/forgejo/forgejo/pulls/2231)
- [Federated repository stars](https://codeberg.org/forgejo/forgejo/pulls/1680)
- [Add colorblind theme variants](https://codeberg.org/forgejo/forgejo/pulls/1746)

### Documentation

- New section on [how repo language detection works](https://codeberg.org/forgejo/docs/pulls/371)
- New section on [globally editable wikis](https://codeberg.org/forgejo/docs/pulls/358)
- New setting [[repository].DOWNLOAD_OR_CLONE_METHODS](https://codeberg.org/forgejo/docs/pulls/357/files)
- new section on [README badges feature](https://codeberg.org/forgejo/docs/pulls/356)
- The [Forgejo Actions](https://forgejo.org/docs/v1.21/user/actions) reference guide was significantly improved.
  The [Forgejo Actions tests](https://code.forgejo.org/forgejo/end-to-end/src/branch/main/actions) were refactored to capture the event payloads. For instance when a workflow is triggered from pushing a commit, the event will contain information about the repository, the SHA etc. The captured events are **automatically used to [update the documentation](https://code.forgejo.org/forgejo/end-to-end/src/branch/main/.forgejo/workflows/actions.yml#L65-L82)**. The `event` [section of the Forgejo Actions documentation](https://forgejo.org/docs/v1.21/user/actions/#githubevent) links to these examples and help figure out which fields are available depending on the type of event.

## (Scope of) Moderation of Forgejo instances

A discussion [started about how to develop effective moderation mechanisms](https://codeberg.org/forgejo/discussions/issues/107) within Forgejo while maintaining means of dynamically reacting to changing problems. It aims at collecting feedback. How much is in the scope for Forgejo? What kinds of moderation actions do Forgejo admins need to perform? This kind of user research is instrumental to understand existing best practices in order to figure out what problems needs to be resolved first.

## Reducing the technical debt

A discussion on [defining expectations regarding tests in the development workflow](https://codeberg.org/forgejo/discussions/issues/93) was [concluded](https://codeberg.org/forgejo/governance/pulls/51) with a new requirement [in the development workflow](https://codeberg.org/forgejo/governance/src/branch/main/PullRequestsAgreement.md) by which:

> 2. A reasonable effort has been made to test the change.

When developers do not perform tests (either automated or manual) end users experience bugs and regressions that [are much more time consuming](https://codeberg.org/forgejo/discussions/issues/103) to diagnose and resolve.

Ideally Forgejo would have a hard commitment to only merge changes that are covered by automated tests. But there are many areas where the test infrastructure itself is still lacking (the web UI for instance) and [manual tests are to be documented](https://codeberg.org/forgejo/discussions/issues/100) instead.

A [draft implementation of a Rust based Forgejo SDK](https://codeberg.org/Cyborus/forgejo-api) started using the [Swagger file](https://code.forgejo.org/swagger.v1.json) to generate code instead of manually implementing each API endpoint. Because the Forgejo Swagger file is currently manually maintained and only has a handful of recently added [manual tests](https://codeberg.org/forgejo-contrib/forgejo-manual-testing/issues) verifying it actually reflects the implementation, the author discovered inconsistencies that were fixed (see [this PR for instance](https://codeberg.org/forgejo/forgejo/pulls/2182)). When complete this SDK could be integrated in the Forgejo testsuite to verify the Swagger specification consistency and guard against regressions.

## Federation

The pull request to implement [federated stars](https://codeberg.org/forgejo/forgejo/pulls/1680) made progress, replay attacks were analyzed and mitigated in k8s. Read [more in the activity summary](https://codeberg.org/meissa/forgejo/src/branch/forgejo-federated-star/docs/unsure-where-to-put/blog.md#2024-01-federated-staring-with-like-activity).

The F3 reference implementation [was refactored](https://lab.forgefriends.org/friendlyforgeformat/gof3) and the old codebase [archived](https://lab.forgefriends.org/friendlyforgeformat/gof3/-/tree/2023-main). Read more in the [January 2024](https://forum.forgefriends.org/t/f3-monthly-update-january-2024/1007) report. The F3 Forgejo driver [refactor started](https://codeberg.org/forgejo/discussions/issues/105).

The [federation implementation task list](https://codeberg.org/forgejo/forgejo/issues/59) was updated.

## Localization

The Forgejo translations are depending on Gitea translations which are trapped in a proprietary service. A strategy was put in place to workaround the problem in 2022 and it worked fine until now, the overhead and problems were close to non-existent. Back then nobody knew Forgejo and establishing a brand new translation team would have been difficult but things are different now. There are significantly more people aware of what Forgejo is and willing to help.

Plans [were made](https://codeberg.org/forgejo/discussions/issues/104) to bootstrap a translation team on [Codeberg's Weblate instance](https://translate.codeberg.org/) and the implementation is well under way, with an initial localization team covering Arabic, Dutch, French, Russian, Hungarian, Greek and German. If you are fluent in another language and would like to help, please [apply](https://forgejo.org/docs/v1.21/developer/localization/#joining-the-localization-team) or join the [localization chatroom](https://matrix.to/#/#forgejo-localization:matrix.org) to figure out what it entails.

## Releases

There has been [one minor security release](https://forgejo.org/releases/) in January 2024. Forgejo admins are encouraged to [subscribe to security announcement](https://codeberg.org/forgejo/security-announcements) so they can better plan their upgrades.

Codeberg [suffered a DDoS attack](https://blog.codeberg.org/letter-from-codeberg-looking-into-the-new-year.html) that brought it down during more than 24h. Forgejo's own infrastructure was not impacted because it is hosted elsewhere and could have been used as an alternative to download releases. Only it did not have a mirror of the Forgejo releases. A [daily scheduled action](https://codeberg.org/forgejo/discussions/issues/98) was created and the releases are now also available at https://code.forgejo.org/forgejo/forgejo/.

References

- https://code.forgejo.org/forgejo/forgejo
- https://forgejo.org/releases/
- https://codeberg.org/forgejo/security-announcements

## End-to-end tests

Forgejo [end-to-end tests](https://code.forgejo.org/forgejo/end-to-end) require running an actual Forgejo instance.

They were extended to include **[Alpine packages](https://code.forgejo.org/forgejo/end-to-end/pulls/71)**, verifying a package built out of an Alpine container image can actually be installed.

References:

- https://forgejo.org/docs/v1.21/user/packages/alpine
- https://code.forgejo.org/forgejo/end-to-end

## Governance

### Hard fork

A discussion started on the [opportunity for Forgejo to become a hard fork of Gitea](https://codeberg.org/forgejo/discussions/issues/96).

Over the past year a number of components have been developed in Forgejo independently of Gitea, they are already hard forks. The documentation, the release process, end-to-end tests, the Forgejo Runner etc. It even happened within the Forgejo codebase. For instance, the [user blocking feature](https://forgejo.org/docs/v1.21/user/blocking-user/) is independent from Gitea. It has its own database tables and migrations while being part of the same binary. However Forgejo still cherry-picks commits on top of the [Gitea codebase on a weekly basis](https://codeberg.org/forgejo/forgejo/milestones?state=closed&q=furnace).

The discussion led to an [agreement proposal](https://codeberg.org/forgejo/governance/issues/58) where Forgejo community members expressed concerns that are addressed in accordance of the [Forgejo decision making process](https://codeberg.org/forgejo/governance/src/branch/main/DECISION-MAKING.md). If an agreement is reached, the previous logic will be reversed and **commits from Gitea will be cherry-picked on top of the Forgejo codebase**.

The discussions related to this agreement are:

- [Testing strategies and containing regressions](https://codeberg.org/forgejo/discussions/issues/103) to support the main benefit of a hard fork which is to shield Forgejo from endemic regressions introduced in Gitea due to insufficient testing.
- [Integration of the Gitea changes inside Forgejo](https://codeberg.org/forgejo/discussions/issues/108) should the agreement pass.
- [Explicitly encourage contributions to Forgejo](https://codeberg.org/forgejo/discussions/issues/99).
- [Gitea is Open Core](https://codeberg.org/forgejo/discussions/issues/103) explains why, with links for fact checking.
- [cloud.gitea.com shared account](https://codeberg.org/forgejo/discussions/issues/92) shows some of the proprietary features of Gitea Cloud and the non-Free Software version of Gitea that it runs.

Unless new concerns emerge, the agreement may be finalized in February.

### Moderation

A [moderation action](https://codeberg.org/forgejo/governance/src/branch/main/MODERATION-PROCESS.md) was carried out to put an end to [ad-hominem attacks and harassment](https://codeberg.org/forgejo/governance/issues/53): the person responsible for this behavior was banned for a period of two years. They have since created half a dozen accounts in an attempt to circumvent the ban but all content was removed or redacted within 24h.

References:

- https://codeberg.org/forgejo/governance

## We Forge

Forgejo is a **community of people** who contribute in an inclusive environment. We forge on an equal footing, by reporting a bug, voicing an idea in the chatroom or implementing a new feature. The following list of contributors is meant to reflect this diversity and acknowledge all contributions since the last monthly report was published. If you are missing, please [ask for an update](https://codeberg.org/forgejo/website/issues/new).

- https://codeberg.org/6543
- https://codeberg.org/adz
- https://codeberg.org/algernon
- https://codeberg.org/asandikci
- https://codeberg.org/banaanihillo
- https://codeberg.org/basebuilder
- https://codeberg.org/CanisHelix
- https://codeberg.org/Crown0815
- https://codeberg.org/crystal
- https://codeberg.org/Cwpute
- https://codeberg.org/Cyborus
- https://codeberg.org/dachary
- https://codeberg.org/earl-warren
- https://codeberg.org/Fl1tzi
- https://codeberg.org/fnetX
- https://codeberg.org/foxy
- https://codeberg.org/GamePlayer-8
- https://codeberg.org/Gusted
- https://codeberg.org/gwymor
- https://codeberg.org/halibut
- https://codeberg.org/houkime
- https://codeberg.org/hwpplayer1
- https://codeberg.org/jfinkhaeuser
- https://codeberg.org/jornfranke
- https://codeberg.org/kaffeeknecht
- https://codeberg.org/KaKi87
- https://codeberg.org/KOLANICH
- https://codeberg.org/lukawaay
- https://codeberg.org/macfanpl
- https://codeberg.org/mmarif
- https://codeberg.org/mokazemi
- https://codeberg.org/moralpanic
- https://codeberg.org/msrd0
- https://codeberg.org/n0toose
- https://codeberg.org/neuhalje
- https://codeberg.org/nevarr0
- https://codeberg.org/oatbiscuits
- https://codeberg.org/OdinVex
- https://codeberg.org/oliverpool
- https://codeberg.org/panos
- https://codeberg.org/rdwz
- https://codeberg.org/Salt
- https://codeberg.org/santalet
- https://codeberg.org/spla
- https://codeberg.org/swaggboi
- https://codeberg.org/thepaperpilot
- https://codeberg.org/tuxcoder
- https://codeberg.org/viceice
- https://codeberg.org/Visne
- https://codeberg.org/voltagex
- https://codeberg.org/wackbyte
- https://codeberg.org/Werenter
- https://codeberg.org/wetneb
- https://codeberg.org/wolftune
- https://codeberg.org/Xinayder
- https://codeberg.org/zareck

A **minority of Forgejo contributors earn a living** by implementing the roadmap co-created by the Forgejo community, see [the sustainability repository](https://codeberg.org/forgejo/sustainability) for the details.
