---
title: Forgejo monthly update - February 2024
publishDate: 2024-02-29
tags: ['news', 'report']
excerpt: Forgejo started as a soft fork of Gitea, in reaction to governance changes within the project. Over time, it developed its own identity, adopted both development and governance practices - to ensure the stability, quality, and openness of the project - that made it more challenging to remain a soft fork. The decision was made to become a hard fork, and for Forgejo to forge its own path going forward.
---

The monthly report is meant to provide a high level view of what happened in Forgejo in the past month. If you would like to help, please get in touch in [the chatroom](https://matrix.to/#/#forgejo-chat:matrix.org) or participate in the [ongoing discussions](https://codeberg.org/forgejo/discussions).

Since its [inception](../2022-12-15-hello-forgejo/), Forgejo has been a soft fork of Gitea. Over time, it developed its own identity, adopted both development and governance practices - to ensure the stability, quality, and openness of the project - that made it more challenging to remain a soft fork. The decision was made to become a hard fork, and for Forgejo to forge its own path going forward. Read more in the [blog post announcing the decision](../2024-02-forking-forward/).

Forgejo reached [1,000 stars on Codeberg](https://codeberg.org/forgejo/forgejo/stars) and it is heartwarming to see so much support. Each of these stars are more valuable than those loaned by proprietary forges: they really belong to Forgejo and come from developers who made an effort to register on Codeberg.

## Implementation of the hard fork

The hard part was to make a decision, the implementation itself (as [laid out in the decision](https://codeberg.org/forgejo/governance/issues/58)) is
comparatively simpler and is now in place.

- Publish a blog post [explaining the decision](../2024-02-forking-forward/).
- Switch from rebasing weekly (see [this rebase example](https://codeberg.org/forgejo/forgejo/issues/2293)) to cherry-picking weekly (see [this cherry-pick example](https://codeberg.org/forgejo/forgejo/pulls/2478)).
- Update the [developer documentation](https://forgejo.org/docs/v1.21/developer/workflow/) to update the parts that are no longer needed.
- Merge all feature branches and [delete the branches](https://codeberg.org/forgejo/discussions/issues/123) that are no longer necessary.
- Develop tools and procedures are in the design phase and [discussions mostly happen](https://codeberg.org/forgejo/forgejo/pulls/2478) whenever cherry-picking from Gitea.

## Code

https://codeberg.org/forgejo/forgejo

Notable improvements and bug fixes:

- [Add colorblind theme variants](https://codeberg.org/forgejo/forgejo/pulls/1746).
- [Use `git grep`](https://codeberg.org/forgejo/forgejo/pulls/1594) to search repositories [when the repository indexer is not configured](https://forgejo.org/docs/v7.0/user/code-search/).
- Improvement to the [Agit workflow](https://forgejo.org/docs/v7.0/user/agit-support/) (PRs [1](https://codeberg.org/forgejo/forgejo/pulls/2444), [2](https://codeberg.org/forgejo/forgejo/pulls/2386), [3](https://codeberg.org/forgejo/forgejo/pulls/2344)).
- Fix error when marking outdated code reviews as resolved (PR [1](https://codeberg.org/forgejo/forgejo/pulls/2282), [2](https://codeberg.org/forgejo/forgejo/pulls/2306)).
- [Allow instance-wide disabling of forking](https://codeberg.org/forgejo/forgejo/pulls/2445).
- [Improve display of 404/500 error pages](https://codeberg.org/forgejo/forgejo/pulls/2466).

[Read more](https://codeberg.org/forgejo/forgejo/pulls?q=&type=all&sort=&state=closed&labels=&milestone=0&project=0&assignee=0&poster=0) in the pull requests.

### In flight pull requests

Most [pull requests](https://codeberg.org/forgejo/forgejo/pulls?state=closed) are opened and closed within a week. But some of them take a longer time, either because they are more complex or because they are taken care of by volunteers who can only occasionally work on them in their free time. This is a list of those that were updated since the last monthly report. If they are of interest to you, reviewing the changes or providing solutions would be appreciated.

- [Add initial layout support for right-to-left languages](https://codeberg.org/forgejo/forgejo/pulls/2223)
- [Federated repository stars](https://codeberg.org/forgejo/forgejo/pulls/1680)
- [Implement external release assets](https://codeberg.org/forgejo/forgejo/pulls/1445)
- [Add optional pronoun field in user settings](https://codeberg.org/forgejo/forgejo/pulls/1518)
- [Implement remote user login source and promotion to regular user](https://codeberg.org/forgejo/forgejo/pulls/2465)

### Documentation

- Updates cherry-picked from the [Codeberg](https://docs.codeberg.org/) and [Gitea](https://docs.gitea.com/) documentation.
- Newer [user guide on the AGit workflow](https://forgejo.org/docs/v7.0/user/agit-support/).
- New section in the developer guide for [testing strategies and requirements](https://forgejo.org/docs/v7.0/developer/testing/).

## FOSDEM 2024

Codeberg's stand at FOSDEM was a success and it appears to have [also been a success for Forgejo](https://codeberg.org/forgejo/discussions/issues/115). There was a notable amount of people who were still looking for a self-hosted option and were curious to learn about Forgejo instead of GitLab or Gitea. The transparent stickers did not work out very well, because the colours do not cover enough, so the result was unreadable on dark background. Still, many people were interested in Forgejo stickers: several hundred of them were distributed. The NLnet stand had a [different Forgejo sticker](https://nlnet.nl/project/Forgejo/) (hex variant) and probably used up their whole budget with distributing them. [Read more in the FOSDEM 2024 discussion](https://codeberg.org/forgejo/discussions/issues/115).

## Discussions

A significant number of discussions revolved around the hard fork decision and most of them are linked from the [governance tracker](https://codeberg.org/forgejo/governance/issues/58). A few long term discussions are also worth mentioning and participation would be welcome.

### Monitoring forge features and its impact on forge federation

GitLab and GitHub releases are being analysed to [figure out which features are added to each release](https://codeberg.org/forgejo/discussions/issues/120). These projects are driven by gigantic corporations and the rythm at which features are added is intimidating. The idea is not for Forjego to compete on the same ground: this is a race that is already lost. However gaining and maintaining a good understanding of their features is key to the success of the implementation of federation in Forgejo.

### Gathering user feedback on accessibility

User feedback is the most valuable resource for projects. Lowering the barrier for its collection helps to get much more insights, because there are a lot of problems where users don't bother opening an issue. [Read more](https://codeberg.org/forgejo/discussions/issues/124).

### (Scope of) Moderation of Forgejo instances

A discussion [started a month ago about how to develop effective moderation mechanisms](https://codeberg.org/forgejo/discussions/issues/107) within Forgejo while maintaining means of dynamically reacting to changing problems. It aims at collecting feedback. How much is in the scope for Forgejo? What kinds of moderation actions do Forgejo admins need to perform? This kind of user research is instrumental to understand existing best practices in order to figure out what problems needs to be resolved first.

## Federation

The pull request to implement [federated stars](https://codeberg.org/forgejo/forgejo/pulls/1680) made progress. Discussions happened on how a federated Person should be mapped to a local FederatedUser representation. Read [more in the activity summary](https://codeberg.org/meissa/forgejo/src/branch/forgejo-federated-star/docs/unsure-where-to-put/blog.md).

The F3 Forgejo driver [refactor is complete](https://codeberg.org/forgejo/forgejo/pulls/2388): it is back where it was about six month ago. The representation of a remote user [was split out of the driver](https://codeberg.org/forgejo/forgejo/pulls/2465) as it is generally useful for both data portability and federation.

The [federation implementation task list](https://codeberg.org/forgejo/forgejo/issues/59) was updated.

## Localization

The Forgejo translations [have been liberated](https://codeberg.org/forgejo/discussions/issues/104) and now [rely on a Free Software service](https://translate.codeberg.org/). A localization team was bootstraped and their work can already be seen in the [experimental Forgejo instance](https://next.forgejo.org). Transations for a few new languages began and will show when they are added to the Forgejo codebase. If you are fluent in another language and would like to help, please [apply](https://forgejo.org/docs/v1.21/developer/localization/#joining-the-localization-team) or join the [localization chatroom](https://matrix.to/#/#forgejo-localization:matrix.org) to figure out what it entails.

References:

- https://forgejo.org/docs/next/developer/localization/

## Helm chart

The Forgejo helm chart had [three major updates](https://codeberg.org/forgejo-contrib/forgejo-helm/releases). Two because of major bumps of the postgresql dependencies and one because of merging upstream changes from Gitea chart.

References:

- https://codeberg.org/forgejo-contrib/forgejo-helm/releases

## Alpine Package Registry

The [Alpine Package Registry](https://forgejo.org/docs/v1.21/user/packages/alpine/) now properly supports `noarch` package files, maintaining compatibility with the official Alpine Linux package repositories.

The logic for uploading a package to the Alpine Registry stored architecture independent packages (`noarch`) in their own architecture repository, instead of being available to all architectures available in the repository. Because of this, the Alpine Package Keeper wasn't able to locate the packages in the repository.

The architecture independent packages are now copied to all available architectures in the repository, and a fallback to `x86_64` is used if the repository is brand new and doesn't contain any packages.

## Releases

There has been [one security release](https://forgejo.org/releases/) in February 2024. Forgejo admins are encouraged to [subscribe to security announcement](https://codeberg.org/forgejo/security-announcements) so they can better plan their upgrades.

Test release were once published manually on a weekly basis and used to upgrade https://next.forgejo.org upgraded. This [process was automated](https://codeberg.org/forgejo/discussions/issues/116) and [documented](https://forgejo.org/docs/v7.0/developer/release/#experimental-releases) to happen daily. It runs the [end to end](https://code.forgejo.org/forgejo/end-to-end) test suite before being upgraded which helps detect regressions early.

References

- https://code.forgejo.org/forgejo/forgejo
- https://code.forgejo.org/forgejo/end-to-end
- https://forgejo.org/releases/
- https://codeberg.org/forgejo/security-announcements

## Governance

### Sustainability

https://prototypefund.de is open to proposal in 2024 and there [were discussions](https://codeberg.org/forgejo/sustainability/issues/38) about applications around Forgejo and federation.

### Moderation

A [moderation action](https://codeberg.org/forgejo/governance/src/branch/main/MODERATION-PROCESS.md) was carried out to put an end to an [ad-hominem attack](https://codeberg.org/forgejo/governance/issues/91). A few days later it turned out the person responsible was someone banned from Forgejo space in 2023. The ban was enforced and extended to help prevent future misbehavior.

References:

- https://codeberg.org/forgejo/governance

## We Forge

Forgejo is a **community of people** who contribute in an inclusive environment. We forge on an equal footing, by reporting a bug, voicing an idea in the chatroom or implementing a new feature. The following list of contributors is meant to reflect this diversity and acknowledge all contributions since the last monthly report was published. If you are missing, please [ask for an update](https://codeberg.org/forgejo/website/issues/new).

- https://codeberg.org/0ko
- https://codeberg.org/6543
- https://codeberg.org/AdamGreenberg
- https://codeberg.org/adrinux
- https://codeberg.org/algernon
- https://codeberg.org/andar1an
- https://codeberg.org/Andre601
- https://codeberg.org/argrat
- https://codeberg.org/axd99
- https://codeberg.org/bramh
- https://codeberg.org/CactiChameleon9
- https://codeberg.org/caesar
- https://codeberg.org/CodeDoctor
- https://codeberg.org/crystal
- https://codeberg.org/Cyborus
- https://codeberg.org/dachary
- https://codeberg.org/denyskon
- https://codeberg.org/domske
- https://codeberg.org/douglasparker
- https://codeberg.org/DraconicNEO
- https://codeberg.org/earl-warren
- https://codeberg.org/eNBeWe
- https://codeberg.org/fkooman
- https://codeberg.org/flvffywvffy
- https://codeberg.org/fnetX
- https://codeberg.org/fractalf
- https://codeberg.org/goddess
- https://codeberg.org/GottemHams
- https://codeberg.org/Gusted
- https://codeberg.org/gwymor
- https://codeberg.org/halibut
- https://codeberg.org/hazy
- https://codeberg.org/hexaheximal
- https://codeberg.org/i9e1
- https://codeberg.org/inference
- https://codeberg.org/ivanhercaz
- https://codeberg.org/JakobDev
- https://codeberg.org/jerger
- https://codeberg.org/jilen
- https://codeberg.org/jthvai
- https://codeberg.org/KaKi87
- https://codeberg.org/Kladky
- https://codeberg.org/KN4CK3R
- https://codeberg.org/KOLANICH
- https://codeberg.org/krumelmonster
- https://codeberg.org/lanodan
- https://codeberg.org/ledyba
- https://codeberg.org/lhinderberger
- https://codeberg.org/lime360
- https://codeberg.org/maltejur
- https://codeberg.org/mathilde
- https://codeberg.org/mbateman
- https://codeberg.org/mjtimblin
- https://codeberg.org/mokazemi
- https://codeberg.org/moralpanic
- https://codeberg.org/msrd0
- https://codeberg.org/n0toose
- https://codeberg.org/neuhalje
- https://codeberg.org/nykula
- https://codeberg.org/oatbiscuits
- https://codeberg.org/oliverpool
- https://codeberg.org/PatchMixolydic
- https://codeberg.org/PierreLannoy
- https://codeberg.org/puzzle-it-nu
- https://codeberg.org/qwerty287
- https://codeberg.org/realaravinth
- https://codeberg.org/rpoovey
- https://codeberg.org/salif
- https://codeberg.org/Salt
- https://codeberg.org/santalet
- https://codeberg.org/seodisparate
- https://codeberg.org/silverwind
- https://codeberg.org/sininenkissa
- https://codeberg.org/skobkin
- https://codeberg.org/slatian
- https://codeberg.org/snematoda
- https://codeberg.org/thatonecoder
- https://codeberg.org/thefinn93
- https://codeberg.org/tuxcoder
- https://codeberg.org/VadZ
- https://codeberg.org/viceice
- https://codeberg.org/voltagex
- https://codeberg.org/wangito33
- https://codeberg.org/Werenter
- https://codeberg.org/wondercollective
- https://codeberg.org/Wuzzy
- https://codeberg.org/Xinayder
- https://codeberg.org/zareck
- https://codeberg.org/Zip

A **minority of Forgejo contributors earn a living** by implementing the roadmap co-created by the Forgejo community, see [the sustainability repository](https://codeberg.org/forgejo/sustainability) for the details.
