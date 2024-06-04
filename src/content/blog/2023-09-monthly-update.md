---
title: Forgejo monthly update - September 2023
publishDate: 2023-09-21
tags: ['news', 'report']
excerpt: The lifecycle of Forgejo v1.20 is coming to an end and v1.21 is entering the release candidate phase this week. There is every reason to believe this new release will go smoothly, but that should not hide the fact that there is a pressing need for more contributors. The storage settings regressions from v1.20.2-0 required more work but the issue is now resolved.
---

The lifecycle of Forgejo v1.20 is coming to an end and v1.21 is entering
the release candidate phase this week. In addition to work on the codebase a
lot also happened on the
[website](https://codeberg.org/Forgejo/website), the
[documentation](https://codeberg.org/Forgejo/documentation) and the
[Forgejo runner](https://code.forgejo.org/forgejo/runner).

Judging from the activity of Forgejo contributors, there is every
reason to believe this new release will go smoothly. No-one is
overworked or stressed, dependencies are up to date, features are
added, the technical debt is kept in check and it looks like it could
go on forever. But that should not hide the fact that there are
[many areas where progress could
happen](https://codeberg.org/forgejo/discussions/issues/53) if only
there were more contributors.

The past month was again dominated by the aftermath of the [storage
settings regressions](https://forgejo.org/2023-08-release-v1-20-3-0)
but this unfortunate episode is, at last, concluded. It
was a lesson for everyone involved on how to manage bugs that require
action from the Forgejo admins because they cannot be fixed with a new
release and an unattended upgrade. The recipe is simple enough but
also quite time consuming: understand the problem, write tests to
verify the conclusions, clearly explain what happened and provide
detailed recovery recommendations.

## Development

### Fixing S3 configuration bugs and regressions

The [storage configuration](https://forgejo.org/docs/v1.20/admin/storage/) regressions fixed
with the [Forgejo v1.20.3-0](https://forgejo.org/2023-08-release-v1-20-3-0/#fixing-the-risk-of-data-loss-related-to-storage-sections)
release were verified with newly introduced
[upgrade tests](https://codeberg.org/forgejo/forgejo/src/tag/v1.20.3-0/.forgejo/upgrades/test-upgrade.sh#L268-L271).
They were focused on local storage and assumed S3 configuration was not subject to the same issues.

This assumption was not verified with any test and turned out to be
wrong. A Forgejo instance setup to use
[garage](https://garagehq.deuxfleurs.fr/) instead of MinIO faced two
simultaneous issues blocking the upgrade: the storage unexpectedly
went from being in the filesystem to S3, and the S3 backend failed to
initialize. The failure to initialize was a
rather simple error in the settings, hidden behind a [non human
readable](https://codeberg.org/forgejo/forgejo/pulls/1365) error
message. With a configuration change, the Forgejo instance was upgraded successfully.

To help other Forgejo admins running into these bugs the storage documentation was
[updated](https://codeberg.org/forgejo/docs/pulls/100) with examples
and references. The recommendations
in the [Forgejo v1.20.3-0 blog post](https://forgejo.org/2023-08-release-v1-20-3-0/#fixing-the-risk-of-data-loss-related-to-storage-sections)
were also extensively updated to address both S3 and local storage. They were verified with
[more upgrade tests](https://codeberg.org/forgejo/forgejo/src/commit/a4369782e1cfbbc6f588c0cda5776ee823b0e493/.forgejo/upgrades/test-upgrade.sh#L577-L588)
that do the following for a variety of storage configurations:

- start an S3 server
- start a Forgejo instance at a given version
- upload objects into all subsystems (avatars, packages, attachments, etc.)
- verify they are found where they are supposed to be

The upgrade tests are run before each pull request is merged. They can also be
extended to identify breaking changes between major Forgejo versions
and verify the recommended actions to deal with them are accurate.

### Changing the update time of issues via the API

The pull request to allow for setting the update times of issues and
comments via the API [was
merged](https://codeberg.org/forgejo/forgejo/pulls/764). It is one of
the most fragile commits in Forgejo and was made significantly more
robust with an extensive set of tests.

When upgrading Forgejo dependencies, Forgejo can be impacted in two
ways:

- the API or the codebase changed and Forgejo won't compile
- there is no conflict but the **behavior** changed in an incompatible way, and Forgejo tests will fail

The Forgejo codebase is organized in a set of about 100 commits (as of
today) and heavily relies on tests during upgrades. It allows
maintainers to focus on meaningful problems instead of spending their
valuable time manually verifying, over and over, the same features keep working.

### User blocking

When a user tries to transfer a repository to a user or organization that has blocked them, [that transfer is denied](https://codeberg.org/forgejo/forgejo/pulls/1436). Pre-existing transfer requests are also denied when the user is blocked. [Read more in the moderation section of the documentation](https://forgejo.org/docs/v1.21/user/blocking-user/).

See [all moderation pull requests](https://codeberg.org/forgejo/forgejo/pulls?state=closed&labels=120787).

### Publishing development versions

A few months ago it was [proposed to publish Forgejo development
versions](https://codeberg.org/forgejo/discussions/issues/51) on a
weekly basis. This has happened in the past month and is what
https://next.forgejo.org is running. The version number is something
like `vX.Y.Z-test`, to clearly state it is not to be used for real.

### Federation

The [F3](https://f3.forgefriends.org/) Forgejo driver entered a new [development phase](https://codeberg.org/forgejo/forgejo/pulls?state=closed&labels=114735). It goes like this:

- `forgejo-cli f3 mirror` is run for upload or download on an existing repository
- a bug shows and is fixed either in:
  - the [gof3 package](https://lab.forgefriends.org/friendlyforgeformat/gof3)
  - the [Forgejo driver](https://codeberg.org/forgejo/forgejo/src/branch/forgejo-f3/services/f3/driver)
- repeat

It is still experimental.

See [all F3 pull requests](https://codeberg.org/forgejo/forgejo/pulls?state=closed&labels=114735).

### CURL based Forgejo client

[forgejo-curl.sh](https://code.forgejo.org/forgejo/forgejo-curl) is a
new thin curl wrapper that helps with Forgejo authentication. Beyond
that it does not provide anything. It is low maintenance because it
only relies on the authentication logic and does not need updating
when the REST API (or the web UI endpoints) change.

## Website and documentation

[Astro](https://astro.build/) was [upgraded to version 3](https://codeberg.org/forgejo/website/pulls/362),
and further improvements were made to the file layout to further separate content from code.

A number of small improvements were made, including a
[switch to system fonts](https://codeberg.org/forgejo/website/pulls/366) to improve
performance and fix a layout issue which sometimes caused scroll anchors to misbehave.

The documentation content [was moved](https://codeberg.org/forgejo/website/pulls/331) to
[its own dedicated repository](https://codeberg.org/forgejo/docs) to ease contribution
and separate the content from the website code.

[Detailed instructions](https://codeberg.org/forgejo/docs#contributing) are now provided
for working locally on the documentation.
Tooling is available to preview the results before sending a PR, and to fix linting errors.
A Git hook helps to ensure badly-formatted content is not committed,
and the Forgejo Actions CI helps to apply checks to the content before PRs are merged,
as well as helping to backport changes to older versions of the docs where necessary.

Creating previews for documentation PRs without exposing secrets is
not a trivial problem. Some CI have a setting to take the risk. But
Forgejo Actions does not work that way and that [requires a
different](https://codeberg.org/forgejo/docs/issues/89) strategy,
similar to what is used when publishing Forgejo releases in order to
protect the release signing key. It depends on a feature that will only
be available in v1.21 and it needs more manual work in the meantime.

## Forgejo Actions

The actions supporting the Forgejo runner release process are grouped
into a new repository,
[forgejo-build-publish](https://code.forgejo.org/forgejo/forgejo-build-publish/). The
[build
phase](https://code.forgejo.org/forgejo/forgejo-build-publish/src/branch/main/build)
and the [publishing
phase](https://code.forgejo.org/forgejo/forgejo-build-publish/src/branch/main/publish). They
are not new actions, they were copy/pasted from the [Forgejo main
repository](https://codeberg.org/forgejo/forgejo/src/branch/v1.20/forgejo/.forgejo/actions),
generalized to also be usable for the runner and verified with
[integration
tests](https://code.forgejo.org/forgejo/forgejo-build-publish/src/branch/main/.forgejo/workflows/build-publish-integration.yml).

The [new version of the Forgejo
runner](https://code.forgejo.org/forgejo/runner/releases/tag/v3.0.0)
that came out of this new release process has binaries named
differently than before and unified with the Forgejo binary naming
scheme.

The [container
image](https://code.forgejo.org/forgejo/-/packages/container/runner/3.0.0)
already existed but was not supported or thought through. It is now
[tested](https://code.forgejo.org/forgejo/runner/src/branch/main/.forgejo/workflows/example-docker-compose.yml)
and documented with a standalone [docker-compose
example](https://code.forgejo.org/forgejo/runner/src/branch/main/examples/docker-compose)
that is verified to work.

The container image only contains the runner binary and does not run
as root. The [docker-compose
example](https://code.forgejo.org/forgejo/runner/src/branch/main/examples/docker-compose)
shows there is no need for anything else, even when using
`docker:dind`.

## Infrastructure

The infrastructure as well as the runner backends rely on [LXC system
containers](https://linuxcontainers.org/lxc/) and use
[lxc-helpers.sh](https://code.forgejo.org/forgejo/lxc-helpers/) to
implement patterns common to Forgejo. Among other things, it sets the
permissions of the container to run docker, nested LXC or libvirt but
lacked flexibility to:

- Add more permissions to run a kubernetes cluster
- Restrict permissions for better isolation

The new [`--config` option](https://code.forgejo.org/forgejo/lxc-helpers/#usage)
provides a range of pre-defined permissions to remedy that problem. It includes `k8s` which is
[tested](https://code.forgejo.org/forgejo/lxc-helpers/src/branch/main/.forgejo/workflows/test.yml)
to work when [installing](https://code.forgejo.org/forgejo/lxc-helpers/src/commit/e59af3f4257d6baff880b4cdbcaf9d1de1f28b60/lxc-helpers-lib-test.sh#L153-L171) [k3s](https://www.rancher.com/products/k3s).

## Governance and communication

### Contributors team

The Forgejo "contributors" team was created informally and liberally
to grant permissions to label issue, manage CIs and pull requests
etc. To make it official it was formally proposed [in the governance
repository](https://codeberg.org/forgejo/governance/pulls/32) to be
decided according to the [decision making process](https://codeberg.org/forgejo/governance/src/branch/main/DECISION-MAKING.md).

### Debconf23

There were discussions about Forgejo at
[Debconf23](https://debconf23.debconf.org/) and a contributor to
FreedomBox was interested in packaging Forgejo for Debian so that
it can be distributed with FreedomBox. They could join the
[forgejo-deb](https://codeberg.org/forgejo-contrib/forgejo-deb) which
already provides functional Debian GNU/Linux packages.

### Sustainability

A new [discussion
started](https://codeberg.org/forgejo/discussions/issues/53) on how to
absorb the workload from the Forgejo issue tracker. There is no
conclusion or action planned and the problem unfortunately
remains. However, Codeberg independently [sent a call for
help](https://codeberg.org/Codeberg/Contributing/issues/37) to get
help with handling their scaling issues and it will hopefully attract
more contributors to Forgejo.

The [second payment](https://codeberg.org/forgejo/sustainability/pulls/24) of the
[NLnet grant](https://codeberg.org/forgejo/sustainability#2023) was received.
In total 40% of [the workplan](https://codeberg.org/forgejo/sustainability/src/branch/main/2022-12-01-nlnet/2023-06-workplan.md)
approved for the grant in June 2023 was implemented.

### Moderation

Earlier this year ad-hominem attacks were published in the Forgejo
spaces. This goes against the Forgejo Code of Conduct and some of
these messages were redacted. The author repeatedly refused to
acknowledge this was not an acceptable behavior in Forgejo spaces and
recently sent threats to publish more
ad-hominem attacks. [Read more in the moderation report](https://codeberg.org/forgejo/governance/issues/31).

## We Forge

Forgejo is a **community of people** who contribute in an inclusive environment. We forge on an equal footing, by reporting a bug, voicing an idea in the chatroom or implementing a new feature. The following list of contributors is meant to reflect this diversity and acknowledge all contributions since the last monthly report was published. If you are missing, please [ask for an update](https://codeberg.org/forgejo/website/issues/new).

- https://codeberg.org/Adrodoc
- https://codeberg.org/alex19srv
- https://codeberg.org/alrs
- https://codeberg.org/Andre601
- https://codeberg.org/belette
- https://codeberg.org/brainchild
- https://codeberg.org/caesar
- https://codeberg.org/crystal
- https://codeberg.org/CSDUMMI
- https://codeberg.org/cyborus
- https://codeberg.org/dachary
- https://codeberg.org/daenney
- https://codeberg.org/DanielGibson
- https://codeberg.org/DansLeRuSH
- https://codeberg.org/earl-warren
- https://codeberg.org/firefly-cpp
- https://codeberg.org/Fl1tzi
- https://codeberg.org/flightkick
- https://codeberg.org/fluzz
- https://codeberg.org/fnetX
- https://codeberg.org/GamePlayer-8
- https://codeberg.org/glts
- https://codeberg.org/gmem
- https://codeberg.org/Gusted
- https://codeberg.org/jetsung
- https://codeberg.org/KaKi87
- https://codeberg.org/mainboarder
- https://codeberg.org/mctaylors
- https://codeberg.org/meyay
- https://codeberg.org/Mikaela
- https://codeberg.org/n0toose
- https://codeberg.org/noisytoot
- https://codeberg.org/oliverpool
- https://codeberg.org/RaptaG
- https://codeberg.org/realaravinth
- https://codeberg.org/rome-user
- https://codeberg.org/rrahl0
- https://codeberg.org/Schoumi
- https://codeberg.org/thepaperpilot
- https://codeberg.org/therealpim
- https://codeberg.org/valvin
- https://codeberg.org/viceice
- https://codeberg.org/wh0ami
- https://codeberg.org/Wild-Turtles
- https://codeberg.org/xy
- https://codeberg.org/yeziruo
- https://codeberg.org/yoctozepto
- https://codeberg.org/zareck

A **minority of Forgejo contributors earn a living** by implementing the roadmap co-created by the Forgejo community, see [the sustainability repository](https://codeberg.org/forgejo/sustainability) for the details.
