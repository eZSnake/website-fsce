---
title: Forgejo monthly update - December 2023
publishDate: 2023-12-30
tags: ['news', 'report']
excerpt: Codeberg migrated to Forgejo v1.21, a long awaited forge comparison page was published, the Forgejo Helm Chart reached GA, end-to-end tests proved useful to fix Forgejo Actions bugs and two new machines were added to the infrastructure.
---

- Codeberg migrated to Forgejo v1.21 and suffered a downtime related to performance issues. Although it was quickly recovered, it shows work is still needed to improve scaling and stability.
- A new [forge comparison](https://forgejo.org/compare/) page is available. Gitea turned Open Core this month and it articulates why Forgejo is a safe heaven for admins who want to escape this trap.
- The [Forgejo Helm Chart](https://codeberg.org/forgejo-contrib/forgejo-helm) reached general availability with version 1.0.0.
- [Forgejo end-to-end testing](https://code.forgejo.org/forgejo/end-to-end) can now be triggered from Forgejo pull requests by setting a label. For instance, they were [used to verify](https://code.forgejo.org/forgejo/end-to-end/src/commit/d3bd171b6edeab58ea5cbb547a2b1af9c63196dd/actions/example-cron/run.sh#L3-L16) a bug fix in how [scheduled actions](https://forgejo.org/docs/v1.21/user/actions/#onschedule) work by automatically running an actual Forgejo instance and a runner.
- Two new machines were [added to the Forgejo infrastructure](https://forgejo.org/docs/next/developer/infrastructure/#hetzner0203) to service https://code.forgejo.org, an instance dedicated to Forgejo development.

As Forgejo grows, the format of this monthly report changed to distribute the workload among all Forgejo contributors. The summary is replaced with a bullet list of the highlights and the sections are written by the Forgejo contributors who have been active on a given subject. If you would like to help, please get in touch in [the chatroom](https://matrix.to/#/!JpOtsqTARyyfkoizCU:matrix.org) or participate in the [ongoing discussions](https://codeberg.org/forgejo/discussions).

## Forgejo

https://codeberg.org/forgejo/forgejo

Notable improvements or bug fixes:

- [Allow changing the email address before activation](https://codeberg.org/forgejo/forgejo/pulls/1891): In case someone accidentally registered with the wrong email address (made a typo, for example), with this PR, they will be able to change the email address, and request a new activation mail to be sent. This requires logging in, which _is_ possible, even while the account isn't activated yet. Previously, this required help from an instance administrator, now it can be self-serviced.
- [Allow viewing the latest Action on the web](https://codeberg.org/forgejo/forgejo/pulls/1900): a tiny little convenience route that allows linking to the latest action of a repository. Useful for READMEs and CI badges.

### In flight pull requests

Most [pull requests](https://codeberg.org/forgejo/forgejo/pulls?state=closed) are opened and closed within a week. But some of them take a longer time, either because they are more complex or because they are taken care of by volunteers who can only occasionally work on them in their free time. This is a list of those that were updated since the last monthly report. If they are of interest to you, reviewing the changes or providing solutions would be appreciated.

- [Actions: Link to Workflow in View](https://codeberg.org/forgejo/forgejo/pulls/1866)
- [pulls: "Edit File" button in "Files Changed" tab](https://codeberg.org/forgejo/forgejo/pulls/1992)
- [Federated repository stars](https://codeberg.org/forgejo/forgejo/pulls/1680)
- [Add colorblind theme variants](https://codeberg.org/forgejo/forgejo/pulls/1746)

### Federation

The pull request to implement [federated stars](https://codeberg.org/forgejo/forgejo/pulls/1680) can now be tested manually and [an activity summary was published](https://codeberg.org/meissa/forgejo/src/branch/forgejo-federated-star/docs/unsure-where-to-put/blog.md#2023-12-federated-staring-open-for-test).

The [F3 refactor](https://lab.forgefriends.org/friendlyforgeformat/gof3/-/merge_requests/90/commits)
is making daily progress.

The [federation implementation task list](https://codeberg.org/forgejo/forgejo/issues/59) was updated.

### Releases

Forgejo [maintains **two** stable releases](https://forgejo.org/docs/latest/admin/upgrade/#release-life-cycle) at any given time:

- Stable (latest major version): receives full support, bugfixes and security fixes.
- Old Stable (previous major version): receives only critical security support.

There has been [one release a week](https://forgejo.org/releases/) in the past month, an unusually high frequency explained by a series of security vulnerabilities. They are labeled with a different color **Stable** and **Oldstable** to make it easier for the Forgejo admin to figure out which one applies to their instance.

The [CVE-2023-49946](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-49946) was created a week after the publication of the [Forgejo v1.20.5-1 release that fixes this critical vulnerability](https://forgejo.org/2023-11-release-v1-20-5-1/). As a reminder the Forgejo v1.21 stable release already includes the associated security fixes and was never vulnerable.

Forgejo admins are encouraged to [subscribe to security announcement](https://codeberg.org/forgejo/security-announcements) so they can better plan their upgrades.

References

- https://forgejo.org/releases/
- https://codeberg.org/forgejo/security-announcements

## End-to-end testing

Forgejo end-to-end tests require running an actual instance and were moved to [a dedicated repository](https://code.forgejo.org/forgejo/end-to-end) which requires a significant number of manual steps to run them on a given Forgejo pull request. It was made simpler by triggering them with the [`run-end-to-end-tests`](https://codeberg.org/forgejo/forgejo/pulls?labels=159443) label. For instance, in [this Forgejo pull request](https://codeberg.org/forgejo/forgejo/pulls/2015) setting the label triggered [this workflow in the end-to-end](https://code.forgejo.org/forgejo/end-to-end/actions/runs/391/jobs/1) repository, using a binary [created with the pull request](https://codeberg.org/forgejo/forgejo/src/commit/c98322ed9c877a9bf717f22c4035d3fc45a5ea54/.forgejo/workflows/cascade-setup-end-to-end.yml).

References:

- https://code.forgejo.org/actions/cascading-pr/
- https://code.forgejo.org/forgejo/end-to-end

## Forgejo helm

Forgejo Helm Chart reached GA version 1.0.0 and is basically HA ready thanks to upstream Gitea Chart.

The only remaining issue is that all cron jobs are run on all instances because there's no leader elections yet.

References:

- https://codeberg.org/forgejo-contrib/forgejo-helm
- https://code.forgejo.org/forgejo-contrib/forgejo-renovate/

## Codeberg

Codeberg migrated to Forgejo v1.21 and despite preliminary testing and a [curated list of potential regressions](https://codeberg.org/forgejo/forgejo/issues/1783), a performance issue prevented it from running. It was quickly diagnosed and fixed but the root problem remains: there is a lack of performance tests in Forgejo. That could be mitigated if there were other Forgejo (or Gitea) instances running at the same scale (~100,000 users and projects, publicly available) as they would also run into the same problems. But in the past years the vast majority of performance issues were discovered in the context of Codeberg, which strongly suggests it is the largest instance in existence.

A [priority list](https://codeberg.org/Codeberg/Community/issues/1356) has been established so Forgejo contributors can quickly figure out which problems deserve their attention.

References:

- https://codeberg.org/Codeberg/Community
- https://codeberg.org/Codeberg/Community/issues/1356

## Forgejo runner

[Forgejo runner 3.3.0](https://code.forgejo.org/forgejo/runner/src/branch/main/RELEASE-NOTES.md#3-3-0) was published and is now IPv6 capable. Unfortunately there is [a bug in Debian LXC support](https://code.forgejo.org/forgejo/lxc-helpers/issues/19) that limits the scope of tests it can support.

References:

- https://code.forgejo.org/forgejo/lxc-helpers
- https://code.forgejo.org/forgejo/runner

## Governance

### Mergers team

The [Contributors](https://codeberg.org/forgejo/governance/src/branch/main/TEAMS.md#contributors) team has no permissions on "Code" which prevents members from merging pull requests although they have write permissions on "PullRequests" for the Forgejo repository. There is not much scrutiny to enter the contributors team because it bears almost no risk to the integrity of the Forgejo project. Being given permission to write the repository is a different matter. The new "Mergers" team is created [and requires a formal application process](https://codeberg.org/forgejo/governance/issues/46). However light, it will make a difference that matters in terms of trust and commitment.

### Moderation

Two [moderation actions](https://codeberg.org/forgejo/governance/src/branch/main/MODERATION-PROCESS.md) were carried out: one regarding an [ad-hominem attack](https://codeberg.org/forgejo/governance/issues/45) and another regarding the publication of [private information](https://codeberg.org/forgejo/governance/issues/49).

References:

- https://codeberg.org/forgejo/governance

## Professional services

Forgejo, just like any other Free Software can be the base of commercial activity from service providers independent from the project itself. Forgejo exists under the umbrella of the Codeberg e.V. non profit which does not provide professional services so there is no competition and will never be.

Even if to address a handful of requests per year, it is convenient to have a place where people in need of professional services can meet service providers with the will and the skills to meet their needs. Here are some similar places in other Free Software projects:

- Drupal https://www.drupal.org/drupal-services
- OpenStack https://www.openstack.org/marketplace/consulting/
- OSD https://discourse.opensourcedesign.net/t/posting-jobs-read-this-first/3416

It was [decided](https://codeberg.org/forgejo/governance/issues/47) to create a kind of job board which was bootstrapped as a [dedicated issue tracker](https://codeberg.org/forgejo/professional-services).

References:

- https://codeberg.org/forgejo/professional-services

## Hardware infrastructure

Two new machines were [added to the Forgejo infrastructure](https://forgejo.org/docs/next/developer/infrastructure/#hetzner0203) and are now hosting `code.forgejo.org` that was previously in an OpenStack virtual machine. It is faster (10 times more bandwidth) and also is IPv6 capable. The LXC containers are setup and maintained using [lxc-helpers](https://code.forgejo.org/forgejo/lxc-helpers/).

A LXC container with extended capabilities required to run a nested k8s cluster was setup on an dedicated hardware for better isolation. Forgejo runners are installed for both [lxc-helpers](https://code.forgejo.org/forgejo/lxc-helpers) and [forgejo-helm](https://code.forgejo.org/forgejo-contrib/forgejo-helm) so they can [run workflows that depend on k8s](https://code.forgejo.org/forgejo/lxc-helpers/src/branch/main/.forgejo/workflows/test.yml#L13). For instance, it helped detect regressions with the Forgejo Helm chart prior to version 1.0.0.

The `next.forgejo.org` instance that is running the development branch of Forgejo (updated weekly) is now also hosted on this hardware. It was reset entirely on that occasion and displays a prominent reminder that there is no guarantee that any data will persist. It is only for experimental purposes.

References:

- https://code.forgejo.org/forgejo/lxc-helpers
- https://forgejo.org/docs/next/developer/next-forgejo-org/
- https://forgejo.org/docs/next/developer/infrastructure/#hetzner0203

## OCI mirrors

Container images hosted at https://hub.docker.com/ are subject to rate
limiting which can be disrupting, for instance when the CI is used
intensively by multiple contributors.

Some of the most commonly used container images used by Forgejo were
manually mirrored in a [dedicated
organization](https://code.forgejo.org/oci/-/packages) to partially
resolve that problem. Updating these images should be done
automatically but there still is no script to do so.

References:

- https://code.forgejo.org/oci/-/packages

## We Forge

Forgejo is a **community of people** who contribute in an inclusive environment. We forge on an equal footing, by reporting a bug, voicing an idea in the chatroom or implementing a new feature. The following list of contributors is meant to reflect this diversity and acknowledge all contributions since the last monthly report was published. If you are missing, please [ask for an update](https://codeberg.org/forgejo/website/issues/new).

- https://codeberg.org/6543
- https://codeberg.org/adrinux
- https://codeberg.org/adz
- https://codeberg.org/algernon
- https://codeberg.org/APoniatowski
- https://codeberg.org/Aqa-Ib
- https://codeberg.org/asandikci
- https://codeberg.org/ashimokawa
- https://codeberg.org/Cs137
- https://codeberg.org/dachary
- https://codeberg.org/dejan
- https://codeberg.org/delgh1
- https://codeberg.org/earl-warren
- https://codeberg.org/fnetX
- https://codeberg.org/foxy
- https://codeberg.org/Freso
- https://codeberg.org/GamePlayer-8
- https://codeberg.org/Gusted
- https://codeberg.org/halibut
- https://codeberg.org/hazy
- https://codeberg.org/HexagonCDN
- https://codeberg.org/JakobDev
- https://codeberg.org/jerger
- https://codeberg.org/jfinkhaeuser
- https://codeberg.org/joeroe
- https://codeberg.org/jornfranke
- https://codeberg.org/jthvai
- https://codeberg.org/KN4CK3R
- https://codeberg.org/lmaotrigine
- https://codeberg.org/luca-pellegrini
- https://codeberg.org/macfanpl
- https://codeberg.org/Miraha
- https://codeberg.org/n0toose
- https://codeberg.org/oelmekki
- https://codeberg.org/oliverpool
- https://codeberg.org/realaravinth
- https://codeberg.org/Ryuno-Ki
- https://codeberg.org/sachaz
- https://codeberg.org/schwarze
- https://codeberg.org/sdolan99
- https://codeberg.org/Septem9er
- https://codeberg.org/SteffoSpieler
- https://codeberg.org/teutat3s
- https://codeberg.org/twann
- https://codeberg.org/viceice
- https://codeberg.org/Weebull
- https://codeberg.org/wetneb
- https://codeberg.org/Wild-Turtles
- https://codeberg.org/wolcen
- https://codeberg.org/woofman420
- https://codeberg.org/Xinayder
- https://codeberg.org/xyhhx
- https://codeberg.org/zareck

A **minority of Forgejo contributors earn a living** by implementing the roadmap co-created by the Forgejo community, see [the sustainability repository](https://codeberg.org/forgejo/sustainability) for the details.
