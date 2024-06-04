---
title: Forgejo monthly update - October 2023
publishDate: 2023-10-23
tags: ['news', 'report']
excerpt: A security issue related to Long-term Authentication was fixed for Forgejo v1.21 and backported to Forgejo v1.20.5-0. Four release candidates were published for Forgejo v1.21 and the documentation updated to cover the new functionalities. A service request was published to develop new functionalities for the benefit of German schools. Solutions were also identified for bootstrapping a fully Free Software hosting provider including Forgejo.
---

A security issue identified earlier this year was fixed for Forgejo
v1.21 and backported to Forgejo v1.20. It was non trivial and
involved a 90-day embargo as well as a database upgrade. Four release
candidates for Forgejo v1.21 were published in the [experimental
organization](https://codeberg.org/forgejo-experimental/forgejo/releases). The
improvements it contains for Forgejo Actions were documented and are
now associated with end to end testing to guard against future
regressions.

A [service
request](https://codeberg.org/forgejo/sustainability/issues/28)
originating from German schools in need of additional Forgejo
features was published. There are currently no known freelance or
company providing Forgejo expertise and discussions happened about
what to do with such requests. Solutions were also identified for
bootstraping a fully Free Software hosting provider including Forgejo.

## Development

### Refactor of Long-term Authentication

When a user logs into Forgejo, they can click the **Remember This Device** checkbox and their browser will store a **Long-term authentication** token provided by the server, in a cookie that will allow them to stay logged in for a number of days as defined by the [`LOGIN_REMEMBER_DAYS`](https://forgejo.org/docs/v1.20/admin/config-cheat-sheet/#security-security) setting.

Given a copy of the Forgejo database, a **Long-term authentication** token could be constructed for any user and used to impersonate them. Such a token did not expire `LOGIN_REMEMBER_DAYS` days after it was created and remained valid for as long as users did not change their password.

This security issue does not require brute force and was the most significant discovered this year.
A fix was published by the [Forgejo security team](https://codeberg.org/forgejo/governance/src/branch/main/TEAMS.md#security) on [6 October
2023](https://forgejo.org/2023-10-release-v1-20-5-0/) after a [90-day
embargo](https://forgejo.org/2023-10-release-v1-20-5-0/#responsible-disclosure-to-gitea) and
was backported to [Forgejo
v1.20.5-0](https://forgejo.org/2023-10-release-v1-20-5-0/) the same day.

### v1.21 release candidates

The Forgejo v1.21 release candidate cycle is coming to an end, with
[four
releases](https://codeberg.org/forgejo-experimental/forgejo/releases),
published in the [experimental
organization](https://codeberg.org/forgejo-experimental/forgejo/releases). They
are now used daily on the https://code.forgejo.org and
https://next.forgejo.org instances and all the release blockers
discovered so far were fixed.

Tests were conducted on a simulation of a Codeberg upgrade to verify
the database migration was fast enough, despite some operations that
were potentially expensive on large tables.

End-to-end testing for Forgejo v1.20 is part of the
[setup-forgejo](https://code.forgejo.org/actions/setup-forgejo) action
testsuite. It was extended to [include the Forgejo v1.21 release candidates](https://code.forgejo.org/actions/setup-forgejo/src/branch/main/.forgejo/workflows/integration.yml#L14-L17) and new tests for the Forgejo Actions features that did not exist in Forgejo v1.20.

### Federation

[ForgeFlux](https://forgeflux.org/) is working towards providing
compliance testing for the forge federation ecosystem using a tool called ["ftest"](https://docs.forgeflux.org/ftest/introduction). The tool ran successfully against Forgejo and produced [this compliance report](https://docs.forgeflux.org/example/ftest/results/targets/forgejo/results) proving the correctness of Forgejo's work-in-progress implementation.

The [F3](https://f3.forgefriends.org/) Forgejo driver is on pause
while the
[gof3](https://lab.forgefriends.org/friendlyforgeformat/gof3) package
is undergoing a [complete
refactor](https://lab.forgefriends.org/friendlyforgeformat/gof3/-/merge_requests/90/commits). The
API will be roughly the same and allow to copy data from one forge to another.

## Forgejo service providers

Forgejo exists under the umbrella of Codeberg which is a non-profit
organization. But it can be used by freelancers or for-profit
companies to generate an income. Just like there are many service
providers using Git which exists under the umbrella of [Software
Freedom Conservancy](https://sfconservancy.org/projects/current/).

### Professional services

When someone needs a Forgejo instance of their own but does not have the
resources to maintain and improve upon it, they should be able to find
help, for a fee. For instance the German state of
[Baden-Württemberg](https://en.wikipedia.org/wiki/Baden-W%C3%BCrttemberg)
needs [additional
features](https://codeberg.org/forgejo/sustainability/issues/28) to
deploy Forgejo in German schools next year. The new development could
then be contributed back to Forgejo and be available for all.

### Hosting provider

If someone is looking for a hosting provider where they can rent their
own Forgejo instance and Forgejo runner without being bothered by
upgrades, they currently have nowhere to go.

The easiest solution would be that Forgejo is part of the application
portfolio of an existing hosting providers. But none of them is powered
by Free Software and the Forgejo instance would be trapped: migrating
to another hosting provider would require a significant effort.

There are two fully Free Software stacks providing [a turnkey solution
to setup a hosting service
provider](https://codeberg.org/forgejo/discussions/issues/72). One of
them is unmaintained and [the other](https://fossbilling.org/) needs a
Forgejo driver.

## Documentation

The bulk of the documentation updates relate to the new Forgejo v1.21
features of Forgejo Action in the
[user](https://forgejo.org/docs/v1.21/user/actions/) and
[admin](https://forgejo.org/docs/v1.21/user/actions/) sections. They
are associated with [examples and
tests](https://code.forgejo.org/actions/setup-forgejo/src/branch/main/testdata)
that help understand how they actually work.

A round of updates was also done by harvesting documentation improvements
[from Codeberg](89c24509f03ea3fe1cbea866180dee8019e7e48f) and [from
Gitea](https://codeberg.org/forgejo/docs/commit/0b81e66c45cc6a7a24306a948707e8ee01361876).

## Forgejo Actions

### Runner 3.0.1

A number of actions
(e.g. [checkout@v4](https://code.forgejo.org/actions/checkout/src/tag/v4))
now depend on node 20 which was only recently supported by
[ACT](https://code.forgejo.org/forgejo/act) on top of which the
[Forgejo runner](https://code.forgejo.org/forgejo/runner) is based. The [Forgejo runner
3.0.1](https://code.forgejo.org/forgejo/runner/src/branch/main/RELEASE-NOTES.md#301)
contains that upgrade.

### The cascading-pr action

Forgejo is not a mono-repository project. It is made up of several software projects that
have their own release cycle in multiple repositories. Synchronizing
them is sometimes challenging, as demonstrated by the [rather
involved](https://code.forgejo.org/forgejo/runner/src/tag/v3.0.0/README.md#hacking)
test instructions of the Forgejo runner.

To simplify the development workflow a new action was
developed. [cascading-pr](https://code.forgejo.org/actions/cascading-pr/)
can be used in the workflow of a repository to verify that a proposed
change won't break anything when a dependent software upgrades.
For instance, when a pull request is opened in the Forgejo runner,
a [workflow](https://code.forgejo.org/forgejo/runner/src/branch/main/.forgejo/workflows/cascade-setup-forgejo.yml)
will also [open a pull request](https://code.forgejo.org/actions/setup-forgejo/pulls/68/files) in setup-forgejo.

If the CI passes on setup-forgejo, it is an additional confirmation
that the proposed change in Forgejo runner does not contain a
regression that would break setup-forgejo once released.

## Governance and communication

### Gitea copyright assignment

Code contributions to Gitea now [require a copyright
assignment](https://codeberg.org/forgejo/discussions/issues/67). It
does not impact the most trivial bug fixes because they are not subject
to copyright. But it means that it is not enough for a contribution to
be released under the MIT license, all copyright headers must also be
removed.

This new requirement was discovered when the Forgejo security team
contributed the fix for the Long-term Authentication security issue
explained above. It contained files with a `Copyright Forgejo` header
in addition to the `Copyright Gitea` header and was blocked for that
reason. The author of the patch agreed under protest to remove their
copyright headers for the sake of Gitea admin security.

### FOSDEM 2024

Plans are made to organize a [Forgejo and Codeberg
presence](https://codeberg.org/forgejo/discussions/issues/65) at
[FOSDEM 2024](https://fosdem.org/2024/). If you would like to
participate, feel free to reach out in the [development
chatroom](https://matrix.to/#/#forgejo-development:matrix.org).

### Moderation

The moderation team currently has just one person, which is
problematic when they are involved in a moderation action. A new
member [proposed their
participation](https://codeberg.org/forgejo/governance/issues/35) to
remedy this.

## We Forge

Forgejo is a **community of people** who contribute in an inclusive environment. We forge on an equal footing, by reporting a bug, voicing an idea in the chatroom or implementing a new feature. The following list of contributors is meant to reflect this diversity and acknowledge all contributions since the last monthly report was published. If you are missing, please [ask for an update](https://codeberg.org/forgejo/website/issues/new).

- https://codeberg.org/BradBot1
- https://codeberg.org/buhtz
- https://codeberg.org/caesar
- https://codeberg.org/crystal
- https://codeberg.org/dachary
- https://codeberg.org/DanielGibson
- https://codeberg.org/dikey0ficial
- https://codeberg.org/earl-warren
- https://codeberg.org/ell1e
- https://codeberg.org/fasterthanlime
- https://codeberg.org/fluzz
- https://codeberg.org/fnetX
- https://codeberg.org/gmem
- https://codeberg.org/grisha
- https://codeberg.org/Gusted
- https://codeberg.org/hazy
- https://codeberg.org/KaKi87
- https://codeberg.org/KOLANICH
- https://codeberg.org/leana8959
- https://codeberg.org/lm41
- https://codeberg.org/magicfelix
- https://codeberg.org/maltejur
- https://codeberg.org/Mikaela
- https://codeberg.org/mlncn
- https://codeberg.org/n0toose
- https://codeberg.org/nezbednik
- https://codeberg.org/nyncral
- https://codeberg.org/oliverpool
- https://codeberg.org/realaravinth
- https://codeberg.org/rome-user
- https://codeberg.org/ryan-distrust.co
- https://codeberg.org/Sertonix
- https://codeberg.org/smxi
- https://codeberg.org/snematoda
- https://codeberg.org/strypey
- https://codeberg.org/tgy
- https://codeberg.org/viceice
- https://codeberg.org/xfix
- https://codeberg.org/xy
- https://codeberg.org/zareck

A **minority of Forgejo contributors earn a living** by implementing the roadmap co-created by the Forgejo community, see [the sustainability repository](https://codeberg.org/forgejo/sustainability) for the details.
