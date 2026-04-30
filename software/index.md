---
layout: page
title: Software
permalink: /software/
---

# EIGSEP software

A starting point for anyone setting up the EIGSEP stack on a new
machine — what hardware to acquire, what to clone, how to flash and
configure a Pi, where to find the wire contracts.

The contract documentation and operator runbooks are authored in the
[`eigsep-field`]({{ site.data.eigsep_field.repo_url }}) umbrella repo;
the pages under this tab link out to that canonical source rather
than copy it, so they do not drift. Outbound links currently track
**`{{ site.data.eigsep_field.tag }}`** — bumped to the new release
tag as part of the release checklist.

## Sections

- [Getting started]({{ site.baseurl }}/software/getting-started/) —
  first-day quickstart for a new operator.
- [Hardware]({{ site.baseurl }}/software/hardware/) — the bill of
  materials.
- [Interfaces]({{ site.baseurl }}/software/interfaces/) — Redis keys,
  sensor schemas, bus roles, producer contracts.
- [Operations]({{ site.baseurl }}/software/operations/) — runbooks for
  deploying a new Pi and configuring the operator laptop.
- [Services]({{ site.baseurl }}/software/services/) — systemd units
  on the Pi image.

## Source of truth

The canonical authority for everything below is the
[`eigsep-field`]({{ site.data.eigsep_field.repo_url }}) repository:

- `manifest.toml` — the blessed version tuple of every package and
  service.
- `docs/interface/` — wire contracts, generated from sibling Python
  modules and CI-drift-checked.
- `docs/operator/` — operator runbooks.

When in doubt, read the source repo at the pinned tag.
