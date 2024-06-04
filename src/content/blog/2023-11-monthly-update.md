---
title: Forgejo monthly update - November 2023
publishDate: 2023-11-30
tags: ['news', 'report']
excerpt: Forgejo is one year old and just published v1.21 its fourth major release. Developed in the interest of the general public it grew to become more secure, include more features while staying true to its commitment to only develop Free Software. Your help will make a difference and you are kindly invited to join the Forgejo contributors who work daily to implement federation.
---

Forgejo was [created in October 2022](https://forgejo.org/2022-12-15-hello-forgejo/) after a for profit company took over the Gitea project. In the beginning they were almost identical, except for the name and the color. But in the past year, this difference in governance led to choices that made Forgejo significantly and durably different from Gitea.

- **Better security**. Forgejo focuses on identifying and fixing security vulnerabilities as soon as they are discovered. Gitea is always notified in advance via encrypted channels (e.g. [Forgejo v1.20.5-1](https://forgejo.org/2023-11-release-v1-20-5-1/) or [Forgejo v1.20.5-0](https://forgejo.org/2023-10-release-v1-20-5-0/)).
- **More features**. Forgejo includes all of Gitea features and integrates new one as soon as they are available. It is a 100% compatible drop-in replacement with additional features, [self moderation](https://forgejo.org/docs/v1.21/user/blocking-user/) being the first one.
- **Better stability**. Forgejo relies on [end-to-end](https://code.forgejo.org/forgejo/end-to-end/) and upgrade tests. The upgrade tests were introduced to address an [instability caused by a regression in the storage settings](https://forgejo.org/2023-08-release-v1-20-3-0/).

Since its inception Forgejo has been strongly committed to provide forge federation. This long term work [keeps contributors busy daily](https://codeberg.org/forgejo/forgejo/issues/59) and it will still be a while before it is complete. Your help will make a difference and you are kindly invited to [join the team](https://matrix.to/#/#forgejo-development:matrix.org). Your work will not help build a startup chasing unicorns, it will benefit the general public and yourself. You will only use Free Software as Forgejo is developed with Forgejo on [Codeberg](https://codeberg.org) with a CI and releases powered by Forgejo Actions.

## Development

### v1.21 release

After eight release candidates over eight weeks, the [Forgejo v1.21 release](https://codeberg.org/forgejo/forgejo/src/branch/forgejo/RELEASE-NOTES.md#1-21-1-0)
was published and the [companion blog post](https://forgejo.org/2023-11-release-v1211-0/) provides a summary of the work it includes.

### In flight pull requests

Most [pull requests](https://codeberg.org/forgejo/forgejo/pulls?state=closed) are opened and closed within a week. But some of them take a longer time, either because they are more complex or because they are taken care of by volunteers who can only occasionally work on them in their free time. This is a list of those that were updated since the last monthly report. If they are of interest to you, reviewing the changes or providing solutions would be appreciated.

- [Avoid conflicts of issue and PR numbers in GitLab migration](https://codeberg.org/forgejo/forgejo/pulls/1790) and [Mock HTTP calls in GitLab migration unit test ](https://codeberg.org/forgejo/forgejo/pulls/1841)
- [Add colorblind theme variants](https://codeberg.org/forgejo/forgejo/pulls/1746)
- [Federated repository stars](https://codeberg.org/forgejo/forgejo/pulls/1680)

### End to end tests

Forgejo contributors developed end to end tests which require running actual instances and realistic use cases. The proved particularly useful to fix and debug the [regressions related to storage settings](https://forgejo.org/2023-08-release-v1-20-3-0/#fixing-the-risk-of-data-loss-related-to-storage-sections) and verifying the workflows sent to the [Forgejo runner](https://code.forgejo.org/forgejo/runner) succeed.

There were all moved into a [dedicated repository](https://code.forgejo.org/forgejo/end-to-end/) where they can conveniently be run and developed rather than being scattered in the Forgejo repository itself or the [setup-forgejo](https://code.forgejo.org/actions/setup-forgejo) action.

### Experimental releases

Starting 25 November 2023, test releases including the latest developments [will be published](https://forgejo.org/docs/v1.21/developer/release/#experimental-release-process) on a regular basis, usually every week. They will be used to run https://next.forgejo.org. It is not recommended to use them in production.

### Testing requirements

As a rule changes introduced in Forgejo are associated with tests that verify they work. Without such tests they are prone to regressions over time and more difficult to review. However, it is sometime challenging to create a new test when the underlying codebase lacks the basic infrastructure to do so. It is the case, for instance, for the JavaScript parts of the frontend or more generally user interface changes in Forgejo. As an exception, some pull requests will be merged without tests and [tagged as such](https://codeberg.org/forgejo/forgejo/pulls?labels=167348) when they can be contributed back to the main author of the codebase and not burden Forgejo with the associated technical debt.

### Federation

A new pull request was open to implement [federated stars](https://codeberg.org/forgejo/forgejo/pulls/1680) and [an activity summary was published](https://codeberg.org/meissa/forgejo/src/commit/d6c49675438fe5d5f84364e081ab1cb60ca42d75/docs/unsure-where-to-put/blog.md).

The [F3 refactor](https://lab.forgefriends.org/friendlyforgeformat/gof3/-/merge_requests/90/commits)
is making daily progress.

The [task list](https://codeberg.org/forgejo/forgejo/issues/59) created a year ago to track federation work is now updated monthly.

## Forgejo Actions

With the [3.2.0](https://code.forgejo.org/forgejo/runner/src/branch/main/RELEASE-NOTES.md#320) release of the Forgejo runner, the [LXC backend](https://forgejo.org/docs/v1.21/admin/actions/#lxc) was improved and can now be configured with capabilities to run k8s. It [unblocked the work](https://code.forgejo.org/forgejo/runner/issues/55#issuecomment-3332) started a few months ago to verify a helm chart using Forgejo can run in a workflow.

Groundwork for [IPv6 support](https://code.forgejo.org/forgejo/runner/issues/119) is done and needs testing before it can be released.

## Security releases

Late October, the [Forgejo security team](https://codeberg.org/forgejo/governance/src/branch/main/TEAMS.md#security) discovered critical vulnerabilities and worked on fixes that were published as part of Forgejo v1.21 and [backported to Forgejo v1.20.5-1](https://forgejo.org/2023-11-release-v1-20-5-1/) after a 30-day embargo. To better prepare for such upgrades, Forgejo admins can now watch [a repository](https://codeberg.org/forgejo/security-announcements/issues) dedicated to security announcements or subscribe to the [associated RSS feed](https://codeberg.org/forgejo/security-announcements.rss).

The severity of the vulnerabilities motivated security team members to [write a post-mortem](https://codeberg.org/forgejo/discussions/issues/86) and ask for input and ideas in an open discussion.

## User research

Although it is largely agreed that [user research](https://jdittrich.github.io/userNeedResearchBook/) is one of the areas where Forgejo needs more work, it has not seen significant progress in the past year. The effort has resumed, starting with [sorting issues into categories](https://codeberg.org/forgejo/user-research/issues/20). The goal is to better understand Forgejo users.

## Hardware infrastructure

As https://code.forgejo.org keeps growing, [new hardware is being provisioned](https://codeberg.org/forgejo/docs/pulls/262) so it can move from the cloud and have more disk space, mostly.

## Governance and communication

The moderation team is now composed of [two members](https://codeberg.org/forgejo/governance/src/branch/main/TEAMS.md#moderation). A Forgejo contributor also [applied](https://codeberg.org/forgejo/governance/issues/41) to the security team.

A few [new members](https://codeberg.org/forgejo/governance/pulls/44) were added to the contributors team and it [does not require a formal application process](https://codeberg.org/forgejo/governance/src/branch/main/TEAMS.md#contributors).

## We Forge

Forgejo is a **community of people** who contribute in an inclusive environment. We forge on an equal footing, by reporting a bug, voicing an idea in the chatroom or implementing a new feature. The following list of contributors is meant to reflect this diversity and acknowledge all contributions since the last monthly report was published. If you are missing, please [ask for an update](https://codeberg.org/forgejo/website/issues/new).

- https://codeberg.org/abyxcos
- https://codeberg.org/arkdae
- https://codeberg.org/asandikci
- https://codeberg.org/bodsch
- https://codeberg.org/caesar
- https://codeberg.org/cbn8krgm
- https://codeberg.org/crystal
- https://codeberg.org/dachary
- https://codeberg.org/earl-warren
- https://codeberg.org/fnetX
- https://codeberg.org/Gusted
- https://codeberg.org/hazy
- https://codeberg.org/jerger
- https://codeberg.org/jfinkhaeuser
- https://codeberg.org/jwildeboer
- https://codeberg.org/KaKi87
- https://codeberg.org/Korbs
- https://codeberg.org/maltejur
- https://codeberg.org/meaz
- https://codeberg.org/moralpanic
- https://codeberg.org/msrd0
- https://codeberg.org/n0toose
- https://codeberg.org/oliverpool
- https://codeberg.org/realaravinth
- https://codeberg.org/rome-user
- https://codeberg.org/s3lph
- https://codeberg.org/snematoda
- https://codeberg.org/SteffoSpieler
- https://codeberg.org/stevenroose
- https://codeberg.org/thepaperpilot
- https://codeberg.org/viceice
- https://codeberg.org/w8emv
- https://codeberg.org/wetneb
- https://codeberg.org/xtex
- https://codeberg.org/xy
- https://codeberg.org/xyhhx
- https://codeberg.org/yoctozepto
- https://codeberg.org/zareck

A **minority of Forgejo contributors earn a living** by implementing the roadmap co-created by the Forgejo community, see [the sustainability repository](https://codeberg.org/forgejo/sustainability) for the details.
