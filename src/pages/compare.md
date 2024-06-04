---
layout: '~/layouts/Markdown.astro'
publishDate: 'February 2024'
title: 'Comparison with other Forges'
---

There are many alternatives to Forgejo. All of them bring their advantages and disadvantages. Comparing them feature by feature, however, is a task that is inherently biased, and due to the nature of evolving software, also immediately outdated. Thus, such an attempt will not be made. Instead, the comparisons herein will focus on the deep, fundamental, persistent differences between the various forges.

When it comes to features, the best course of action is to consult the documentation of each forge you're considering, or - if available - try their hosted versions to see what's available.

There is also a [summary which compares Forgejo with its origin Gitea](/compare-to-gitea/). Read that instead, if you are considering to upgrade from Gitea.

## Distribution

|                                | Forgejo                                                                                      | Gitea     | GitLab | GitHub | Sourcehut         |
| ------------------------------ | -------------------------------------------------------------------------------------------- | --------- | ------ | ------ | ----------------- |
| Hosted version                 | [Public Instances](https://codeberg.org/forgejo-contrib/delightful-forgejo#public-instances) | ?         | Yes    | Yes    | Yes               |
| 100% Free Software             | Yes                                                                                          | CE/EE[^1] | CE/EE  | No     | Yes               |
| Container Images               | Yes                                                                                          | Yes       | Yes    | No     | ?                 |
| Distribution-specific Packages | Yes                                                                                          | Yes       | Yes    | No     | Alpine-Linux only |

## Governance and transparency

Forgejo considers transparency and democratic governance key. The user's freedom is our core value. We have established [radically transparent workflows](https://codeberg.org/forgejo/governance/). Since none of the evaluated competitors is similarly auditable (e.g. no information about decisions in the Gitea TOC), it is hard to compare them here.

|                            | Forgejo                                                                  | Gitea                                                           | GitLab     | GitHub    | Sourcehut     |
| -------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------- | ---------- | --------- | ------------- |
| Democratic decision making | Yes                                                                      | Limited                                                         | No         | No        | ?             |
| Radical transparency       | Yes                                                                      | No                                                              | No         | No        | Partial       |
| Controlled by              | Non-profit Codeberg e.V.                                                 | [not clear](https://codeberg.org/forgejo/discussions/issues/85) | For-profit | Microsoft | Small company |
| Funding                    | [Transparently documented](https://codeberg.org/forgejo/sustainability/) | Unclear                                                         | Sales      | Unclear   | Paid accounts |

## Made for

How much do the compared solutions suit the different use cases?

|                                                     | Forgejo                 | Gitea                   | GitLab | GitHub    | Sourcehut |
| --------------------------------------------------- | ----------------------- | ----------------------- | ------ | --------- | --------- |
| Tiny machines (e.g. self-hosting on a Raspberry Pi) | Yes                     | Yes                     | No     | ---       | Yes       |
| Share code to the public                            | Yes                     | Yes                     | Yes    | Yes       | Yes       |
| Projects that value privacy                         | Yes                     | Mostly                  | Mostly | No        | Yes       |
| Closed teams (e.g. company networks)                | Yes                     | Yes                     | Yes    | Expensive | Yes       |
| Collectives who offer public service                | Yes (Moderation is WIP) | Yes (Moderation is WIP) | Yes    | No        | Yes       |
| Requirement for project management                  | Not yet                 | Not yet                 | Yes    | Not yet   | No        |
| Advanced CI requirements                            | Not yet                 | Not yet                 | Yes    | Yes       | Yes       |

[^1]: [Gitea's cloud offering](https://codeberg.org/forgejo/discussions/issues/92) contains a small portion of code currently not available in the Free variant, thus [making Gitea Open Core](https://codeberg.org/forgejo/discussions/issues/102). GitLab's official servers run an enterprise version with source-available (Open Core).
