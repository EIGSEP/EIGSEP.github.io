---
layout: page
title: Services
permalink: /software/services/
---

# Services

Systemd services on the EIGSEP Pi image are declared in
`eigsep-field/manifest.toml` under `[services.*]`. The image build,
`eigsep-field doctor`, and `eigsep-field services list` are all
driven from that table — there is no parallel list to maintain.

Tracking
[`eigsep-field@{{ site.data.eigsep_field.tag }}`]({{ site.data.eigsep_field.repo_url }}/tree/{{ site.data.eigsep_field.tag }}).

## What's there

- [Manifest service table]({{ site.data.eigsep_field.repo_url }}/blob/{{ site.data.eigsep_field.tag }}/manifest.toml)
  — each service's `kind` (apt / local / sibling), `unit`,
  `activation` (always / role), and `role` (panda / backend /
  dhcp-master).
- [Systemd services index]({{ site.data.eigsep_field.repo_url }}/blob/{{ site.data.eigsep_field.tag }}/docs/interface/README.md#systemd-services)
  — sibling-owned units with permalinked authority + drift tracking.

## How a service gets enabled

Every Pi enables the `activation = "always"` services at image build.
Per-Pi role services (`activation = "role"`) are enabled on first
boot by `eigsep-first-boot.service` based on
`/boot/eigsep-role.conf`. The role's `.target` (`eigsep-panda.target`,
`eigsep-backend.target`, `eigsep-dhcp.target`) is what `Wants=` the
role-specific units.

For sibling-owned units, `scripts/check_services_drift.py` enforces
that the unit file shipped inside the image still matches its
upstream source at the manifest-pinned tag — CI fails on drift.

## Adding a service

The procedure (manifest entry + unit file + role target update +
drift check) lives in
[`eigsep-field/CLAUDE.md`]({{ site.data.eigsep_field.repo_url }}/blob/{{ site.data.eigsep_field.tag }}/CLAUDE.md)
under "When adding a systemd service to the image".
