---
title: Forgejo v1.21 release candidates
publishDate: 2023-09-22
tags: ['releases', 'rc']
release: 1.21.0-0-rc0
excerpt: The first Forgejo v1.21 release candidate is ready for testing. In addition to many improvements to `Forgejo Actions` it also includes an improved issue search, a hint to speed up the creation of newly pushed branches, the ability to archive labels and more.
---

Today the first release candidate for the upcoming Forgejo v1.21 release [was published](https://codeberg.org/forgejo-experimental/forgejo/releases/tag/v1.21.0-0-rc0). It is meant for testing only: **do not upgrade a production instance with it**.

Beside a number of improvements to `Forgejo Actions` ([variables](https://codeberg.org/forgejo/forgejo/commit/35a653d7edbe0d693649604b8309bfc578dd988b), [cron](https://codeberg.org/forgejo/forgejo/commit/0d55f64e6cd3de2e1e5c0ee795605823efb14231), [disabling workflows](https://codeberg.org/forgejo/forgejo/commit/19872063a3c14256a1d89b2a104d63e7538a3a28), [artifacts cleanup](https://codeberg.org/forgejo/forgejo/commit/460a2b0edffe71d9e64633beaa1071fcf4a33369), [auto-cancellation of concurrent jobs](https://codeberg.org/forgejo/forgejo/commit/44781f9f5c4ede618660d8cfe42437f0e8dc22a0), [multiple artifacts](https://codeberg.org/forgejo/forgejo/commit/f3d293d2bbe0b2eab047bdd403046069cffbc0c4) and more), the most prominent new features are:

- [Newly pushed branches show in the web UI with a link to create a PR](https://codeberg.org/forgejo/forgejo/commit/6375419468edc95fdfac94aac3b0e10b23743557).
- Improved [issue search](https://codeberg.org/forgejo/forgejo/commit/1e76a824bcd71acd59cdfb2c4547806bc34b3d86).
- Admins can be notified via [email when a new user registers](https://codeberg.org/forgejo/forgejo/commit/7d2d9970115c94954dacb45684f9e3c16117ebfe) to help fight spam bots.
- Labels that are no longer useful [can be archived](https://codeberg.org/forgejo/forgejo/commit/cafce3b4b5afb3f254a48e87f1516d7b5dc209b6). They can no longer be selected but they remain on existing issues.
- When a PR contains multiple commits, it is now [possible review to each commit independently](https://codeberg.org/forgejo/forgejo/commit/55532061c83d38d33ef48bdc5eeac0f652844e8a).
- In addition to the cron jobs defined to cleanup packages, it is now [also possible to trigger the cleanup manually](https://codeberg.org/forgejo/forgejo/commit/0c6ae61229bce9d9ad3d359cee927464968a2dd1).
- The `CODEOWNERS` file is interpreted to [automatically set reviewers on PRs](https://codeberg.org/forgejo/forgejo/commit/3bdd48016f659c440d6e8bb57386fab7ad7b357b).
- To improve performances, branch information is [now cached in a database table](https://codeberg.org/forgejo/forgejo/commit/6e19484f4d3bf372212f2da462110a1a8c10cbf2).

The [draft release notes](https://codeberg.org/forgejo/forgejo/src/branch/forgejo/RELEASE-NOTES.md#draft-1-21-0-0)
will be completed in the following weeks. Make sure to [check the breaking
changes](https://codeberg.org/forgejo/forgejo/src/branch/forgejo/RELEASE-NOTES.md)
and get your production instance ready for when the v1.21 release is available.

There also was progress regarding federation with the
[F3 driver and its CLI](https://codeberg.org/forgejo/forgejo/commits/branch/forgejo-f3)
(an essential building block to synchronize forges
with each other) but nothing is ready for experimenting yet.

### Try it out

The release candidate is published in [the dedicated "experimental"
Forgejo organization](https://codeberg.org/forgejo-experimental) and
can be downloaded from:

- Containers at https://codeberg.org/forgejo-experimental/-/packages/container/forgejo/1.21
- Binaries at https://codeberg.org/forgejo-experimental/forgejo/releases/tag/v1.21.0-0-rc0

Check out the v1.21 documentation section for detailed
[installation instructions](/docs/v1.21/admin/installation).

It will be updated based on your feedback until it becomes robust enough to be released.

### Help write good release notes

The best release notes are meant to articulate the needs and benefits
of new features and the actions recommended for breaking changes so
Forgejo admins quickly know if it is of interest to them.

The [current draft release
notes](https://codeberg.org/forgejo/forgejo/src/branch/forgejo/RELEASE-NOTES.md#draft-1-21-0-0)
are still incomplete. They will be finished by the time the release is published
and you can help make them better.

### Contribute to Forgejo

If you have any feedback or suggestions for Forgejo, we'd love to hear from you!
Open an issue on [the issue tracker](https://codeberg.org/forgejo/forgejo/issues)
for feature requests or bug reports. You can also find us [on the Fediverse](https://floss.social/@forgejo),
or drop by [the Matrix space](https://matrix.to/#/#forgejo:matrix.org)
([main chat room](https://matrix.to/#/#forgejo-chat:matrix.org)) to say hi!
