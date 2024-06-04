---
title: Forgejo summer update - July & August 2023
publishDate: 2023-08-17
tags: ['news', 'report']
excerpt: A new major release, Forgejo v1.20, was published. It has some interesting new features and was 100% built with Forgejo Actions. Codeberg was upgraded a few days ago and discovered an unexpected issue. It was fortunately resolved within hours and a fix will be integrated in the next point release. Meanwhile development continued on the code, the website, the documentaion etc. All signs of a healthy project that needs your help to keep going in the long run.
---

[Publishing Forgejo v1.20](https://forgejo.org/2023-07-release-v1201-0/) was the highlight of these past few weeks and also required more time than the previous major releases. The new features are the most attractive part of the announcement but most of the work went into listing and explaining the breaking changes in [the release notes](https://codeberg.org/forgejo/forgejo/src/branch/forgejo/RELEASE-NOTES.md#1-20-1-0). They have to be as clear as possible for Forgejo admins asking themselves: does it matter to me? What should I do then? Unfortunately a few issues were missed and one of them caused a downtime when upgrading Codeberg. A robust and durable solution was developed as a followup.

Meanwhile the development quietly went on, a project to produce Debian packages entered the Forgejo contrib organization, the website was reorganized internally, new documentation chapters were created, the hardware infrastructure did not cause any trouble and the Codeberg moderation dealt with spam bots efficiently. Are these signs that Forgejo is a healthy project? Definitely. Does this mean someone willing to help would be turned down because there is nothing else to do? Absolutely not! If you are serious about creating a world where Free Software can be developed with Free Software, step in, your help is needed.

### Forgejo v1.20

[Forgejo v1.20](https://forgejo.org/2023-07-release-v1201-0/) was published 24 July 2023 and there are reasons to be happy about the new features described in the blog post. And also by the fact that the entire release process is now based on Forgejo Actions. It is a challenging release for Forgejo admins because there are [many breaking changes](https://codeberg.org/forgejo/forgejo/src/branch/forgejo/RELEASE-NOTES.md#1-20-1-0). A lot of attention went into ensuring a seamless experience when upgrading from any Gitea version, v1.20 included, and there has been no report of failed upgrades so far.

Codeberg was successfully upgraded to Forgejo v1.20.2-0 on 10 August 2023 after a few tests of database upgrades. In the days prior to the upgrade, Forgejo contributors and Codeberg volunteers worked together to figure out the potential issues and prepare the ground. A [mail was sent](https://blog.codeberg.org/the-permissions-for-your-scoped-access-tokens-might-change-on-thursday.html) to all users a few days before, warning them to re-create their personal access tokens in order to ensure their scope were not unexpectedly modified. This was the most prominent breaking change since it required all users to be aware of its impact.

Shortly after the upgrade all [packages](https://forgejo.org/docs/v1.20/user/packages/) became unexpectedly unavailable and the feature was disabled while investigating. It turned out to be a regression caused by conflicting storage settings in the `app.ini` file and the problem was fixed a few hours later. The lesson was learned and the Forgejo v1.20.3-0 release will include a safeguard against that particular issue. Other bugs (with less impact) were discovered and some of them were fixed right away ([profile rendering](https://codeberg.org/forgejo/forgejo/pulls/1240), [auth icons ratio](https://codeberg.org/forgejo/forgejo/pulls/1241), [dropzone filename hidden](https://codeberg.org/forgejo/forgejo/pulls/1242), ...).

### Development

In addition to the development areas discussed below, it is worth mentioning there has been an unprecedented amount of pull requests proposed and merged to [fix bugs](https://codeberg.org/forgejo/forgejo/pulls?q=&type=all&state=closed&labels=78137&milestone=0&assignee=0&poster=26734) or implement features such as [OpenStreetMap links in profiles](https://codeberg.org/forgejo/forgejo/pulls/1076), [banning dots in usernames](https://codeberg.org/forgejo/forgejo/pulls/676) or [unifying project views](https://codeberg.org/forgejo/forgejo/pulls/1126). A number of these changes were [contributed back](https://github.com/go-gitea/gitea/pulls?q=is%3Apr+author%3Aearl-warren+is%3Aclosed) to Forgejo dependencies to keep the Forgejo codebase size to a minimum.

#### Federation

A pull request [started a few months ago](https://codeberg.org/forgejo/forgejo/pulls/764) to allow for setting the update times of issues and comments via the API is now two tests away from being merged. It matters to federation because mirroring an issue from one forge to another so it can be displayed requires the dates are preserved which is not currently possible.

The [F3](https://codeberg.org/forgejo/forgejo/src/branch/forgejo/services/f3/driver) driver for Forgejo [now relies](https://codeberg.org/forgejo/forgejo/src/branch/forgejo/cmd/forgejo/f3.go) on the [gof3 CLI](https://lab.forgefriends.org/friendlyforgeformat/gof3) instead of implementing its own. It was made possible by a [refactor of gof3](https://lab.forgefriends.org/friendlyforgeformat/gof3/-/merge_requests/63/diffs) that uses [urfave/v2](https://pkg.go.dev/github.com/urfave/cli/v2) to be compatible with Forgejo. This kind of factorization reduces the redundant work required to maintain independent projects and keeps their combined codebases [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

The new `forgejo-cli f3 mirror` subcommand will do what it suggests: mirrors projects, issues, pull requests, etc. from one forge to the other. The implementation is not complete but [made progress together with tests](https://codeberg.org/forgejo/forgejo/pulls/1191/files).

#### Storage settings regressions

Around 6 August work started to deal with a difficult problem regarding storage settings (see [the final draft blog post](https://codeberg.org/forgejo/website/src/commit/fb78c664e841dd97b1cb0de9c13c44c8af1d63c8/src/content/blog/2023-08-release-v1-20-3-0.md) if you are reading this before it is published). There are multiple cascading issues:

- The bug is found in all Forgejo releases
- Upgrading to a release fixing the bug requires manual intervention
- Implementing a safeguard has to be done before the database upgrade and after loading the settings but there is no logic to do that
- The safeguard has to prevent downgrading from a point release but the information about the previously running Forgejo instance is not available
- Testing the safeguard can only be done reliably with automated upgrade tests which do not exist

A solution for those issues was [implemented](https://codeberg.org/forgejo/forgejo/pulls/1225/commits) and [backported to v1.20](https://codeberg.org/forgejo/forgejo/pulls/1220). It was almost done when the Codeberg upgrade to v1.20 happened on 10 August and discovered one manifestation of the bug that was overlooked (conflicting `[packages]` and `[storage.packages]` sections). It was an unfortunate oversight but had the benefit of improving the fix to be released in v1.20.3-0.

Codeberg hit the issue shortly after [extensive manual upgrade testing](https://codeberg.org/forgejo/forgejo/pulls/1225#issuecomment-1037223) was conducted. All of which had to be repeated after fixing the newly found issue. It was a great example of why manual testing is generally a bad idea and eventually more time consuming than writing automated tests. Instead of running the upgrade tests manually again, [automated upgrade tests were implemented](https://codeberg.org/forgejo/forgejo/commit/884ca63738cc2e2c7cde31c649e9fa77cd590044). Although they launch multiple versions of Forgejo a dozen times, they run under five minutes.

#### Semantic Version

The Forgejo semantic version was used when [implementing the storage setting sanity checks](https://codeberg.org/forgejo/forgejo/src/commit/197177510980db4d237d4f7979497622a97e1562/services/forgejo/sanity_v1TOv5_0_1Included.go). It is not yet used for releases or public facing Forgejo version numbering. But it can be used internally.

#### Moderation

When a user is blocked and is also a collaborator on a repository that the blocker owns, [that collaboration is removed](https://codeberg.org/forgejo/forgejo/pulls/1151).

#### Publishing development versions

It was [proposed to publish Forgejo development versions](https://codeberg.org/forgejo/discussions/issues/51) on a weekly basis. Although this was done as a byproduct of the weekly Forgejo rebase [in August](https://codeberg.org/forgejo/forgejo/milestones?sort=furthestduedate&state=closed&q=rebase), the discussion is still ongoing. They are only for experimentation and could be used to run https://next.forgejo.org which is meant to help figure out if a bug is happening in the most recent development branch.

### Forgejo contrib

The [forgejo-contrib](https://codeberg.org/forgejo-contrib/) organization is where projects related to Forgejo can find a home while they are being developed or when the long term maintenance is uncertain.

#### Debian packages for Forgejo

The [Debian packages for Forgejo](https://codeberg.org/forgejo-contrib/forgejo-deb) project moved to `forgejo-contrib`. The packages [it provides](https://code.forgejo.org/forgejo-contrib/-/packages) use the [Debian package](https://forgejo.org/docs/v1.20/user/packages/debian/) registry that was introduced in Forgejo v1.20.

#### Helm chart for forgejo

A [pull request was proposed](https://codeberg.org/forgejo-contrib/forgejo-helm/pulls/165) to the [Helm chart for forgejo](https://codeberg.org/forgejo-contrib/forgejo-helm) to deploy the [Forgejo runner](https://code.forgejo.org/forgejo/runner) alongside Forgejo. The [offline registration](https://forgejo.org/docs/v1.20/admin/actions/#offline-registration) implemented in Forgejo and the runner were designed to help that particular use case.

### Website and Documentation

The website [was restructured](https://codeberg.org/forgejo/website/pulls/323) to use [Astro content collections](https://docs.astro.build/en/guides/content-collections/) to better separate content from the source and improve maintainability over the ad-hoc system previously in use. There also were smaller changes such as [custom 404 pages](https://codeberg.org/forgejo/website/pulls/329).

Now that v1.20 was published, the [v1.21 documentation](https://codeberg.org/forgejo/docs/src/branch/next) was created to receive updates that are not relevant to v1.20 such as the [new moderation features](https://codeberg.org/forgejo/website/pulls/335/files).

A [table of content](https://codeberg.org/forgejo/website/pulls/292) was added to help navigate large pages and preparations were made to [move the documentation into a separate repository](https://codeberg.org/forgejo/website/pulls/331).

### New workflow for stable releases

The Forgejo development branch is [rebased weekly](https://forgejo.org/docs/v1.21/developer/workflow/) and that worked out nicely for almost a year. The same was done until last month for stable branches. It also worked well but had one confusing side effect: the tags of the stable versions could not be found in the stable version branch. For instance the [v1.93.3-0 tag](https://codeberg.org/forgejo/forgejo/src/tag/v1.19.0-3) is not on a commit found in the [forgejo/v1.19](https://codeberg.org/forgejo/forgejo/src/branch/v1.19/forgejo) branch. Although it did not seem to create any actual problems, it is unusual and cause for confusion.

Early July a [proposal was made](https://codeberg.org/forgejo/website/pulls/296) for a different workflow to address this issue. It has been adopted when the first v1.20 release was published and the [v1.20.1-0](https://codeberg.org/forgejo/forgejo/src/tag/v1.20.1-0) and [v1.20.2-0](https://codeberg.org/forgejo/forgejo/src/tag/v1.20.2-0) are now both found in the [forgejo/v1.20](https://codeberg.org/forgejo/forgejo/src/branch/v1.20/forgejo) branch.

## Infrastructure

There **has been no issue** with any of the [hardware in the Forgejo infrastructure](https://forgejo.org/docs/v1.20/developer/infrastructure/). It is worth mentioning resources used daily for the CI and the releases did not cause trouble.

This kind of stability is taken for granted when relying on cloud providers but it does not happen magically. Their staff is hard at work to maintain a stable environment over time. Forgejo chose to rely on Free Software only and runs its own hardware. Part of the infrastructure is using an [OpenStack](https://www.openstack.org/) provider, similar to AWS but based on a Free Software stack and API. The rest is running on dedicated [LXC](https://linuxcontainers.org/lxc/) hypervisors.

Being independent from cloud providers running proprietary software means more work for Forgejo community members. But since Free Software is [one of the core values](https://codeberg.org/forgejo/governance/src/branch/main/MISSION.md#values) of Forgejo, it is also a requirement. The promise is to deliver a Free Software codebase but also to ensure it can be developed and released in a Free Software environment. The big question is: can the Forgejo devops team durably maintain a reliable and secure infrastructure? It is too early to tell but over four weeks of uninterrupted and stable service is a very positive sign.

## Governance and communication

### Wikidata

[Wikidata](https://www.wikidata.org/) acts as central storage for the structured data of its Wikimedia sister projects including Wikipedia, Wikivoyage, Wiktionary, Wikisource, and others. Forgejo [has an entry](https://www.wikidata.org/wiki/Q115962387) which was thoroughly updated. The Forgejo releases are also listed and [updated by Wikidata editors](https://www.wikidata.org/w/index.php?title=Q115962387&action=history) when they are published.

### Sustainability

The [NLnet grant](https://codeberg.org/forgejo/sustainability#2023) is progressing and some tasks related to the release process were completed. A "Requests for Payment" was [approved](https://codeberg.org/forgejo/sustainability/pulls/22) and another [is pending](https://codeberg.org/forgejo/sustainability/pulls/24). The relationship between NLnet and Forgejo is not a contract in the traditional sense and a "Request for Payment" is the equivalent of an invoice, only it is payed to the beneficiary as a charitable donation. In this case the payment will go to Codeberg e.V.

Time is as valuable as funding and Forgejo durability heavily depends on how much time volunteers are willing to devote to moderation, sorting bugs, fixing them etc. It is, in fact, arguably the most precious resource any Free Software project has. The time spent by [one volunteer](https://codeberg.org/forgejo/sustainability#2023) was added to the sustainability repository to account for that. It is not a requirement and each volunteer decides whether or not they want their time to be accounted for in this way.

### Moderation

With the upgrade to Forgejo v1.20, the [self-moderation features](https://forgejo.org/docs/v1.20/user/blocking-user/) are available on Codeberg and were used to [enforce the ban](https://codeberg.org/forgejo/governance/issues/16) decided on 17 March 2023 for a period of one year.

Two spam bots posted a dozen messages that have been sent via email to people watching the Forgejo repositories. The bots were removed by the Codeberg moderation team before the incident was even noticed by the Forgejo moderation team.

A [moderation report was published](https://codeberg.org/forgejo/governance/issues/29) and reminds Forgejo community members that "nobody can, under any circumstances, unilaterally decide to reveal private information in Forgejo spaces. It does not only go against one of the core values of Forgejo, it also goes against the most basic expectation for privacy of every person entering Forgejo spaces".

## We Forge

Forgejo is a **community of people** who contribute in an inclusive environment. We forge on an equal footing, by reporting a bug, voicing an idea in the chatroom or implementing a new feature. The following list of contributors is meant to reflect this diversity and acknowledge all contributions since the last monthly report was published. If you are missing, please [ask for an update](https://codeberg.org/forgejo/website/issues/new).

- https://codeberg.org/alex19srv
- https://codeberg.org/Andre601
- https://codeberg.org/aral
- https://codeberg.org/Beowulf
- https://codeberg.org/brainchild
- https://codeberg.org/caesar
- https://codeberg.org/chrysn
- https://codeberg.org/commonism
- https://codeberg.org/crystal
- https://codeberg.org/Cyborus
- https://codeberg.org/dachary
- https://codeberg.org/DanielGibson
- https://codeberg.org/diem
- https://codeberg.org/Dirk
- https://codeberg.org/earl-warren
- https://codeberg.org/Eragon
- https://codeberg.org/f00
- https://codeberg.org/f0sh
- https://codeberg.org/fasterthanlime
- https://codeberg.org/Fl1tzi
- https://codeberg.org/flamenco687
- https://codeberg.org/fluzz
- https://codeberg.org/fnetX
- https://codeberg.org/fr33domlover
- https://codeberg.org/g2px1
- https://codeberg.org/galambborong
- https://codeberg.org/gmem
- https://codeberg.org/GreenImp
- https://codeberg.org/Gusted
- https://codeberg.org/jb_wisemo
- https://codeberg.org/jklippel
- https://codeberg.org/jmshrtn
- https://codeberg.org/KaKi87
- https://codeberg.org/link2xt
- https://codeberg.org/louis9902
- https://codeberg.org/lucajunge
- https://codeberg.org/MagicLike
- https://codeberg.org/mainboarder
- https://codeberg.org/melroy89
- https://codeberg.org/n0toose
- https://codeberg.org/neveraskedtoexist
- https://codeberg.org/oliverpool
- https://codeberg.org/oscarcp
- https://codeberg.org/PatchMixolydic
- https://codeberg.org/pierreprinetti
- https://codeberg.org/RaptaG
- https://codeberg.org/rome-user
- https://codeberg.org/snematoda
- https://codeberg.org/SteffoSpieler
- https://codeberg.org/thatonecalculator
- https://codeberg.org/update.freak
- https://codeberg.org/viceice
- https://codeberg.org/vintprox
- https://codeberg.org/vladh
- https://codeberg.org/wetneb
- https://codeberg.org/xy
- https://codeberg.org/yverry

A **minority of Forgejo contributors earn a living** by implementing the roadmap co-created by the Forgejo community, see [the sustainability repository](https://codeberg.org/forgejo/sustainability) for the details.
