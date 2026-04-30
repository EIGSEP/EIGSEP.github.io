---
layout: page
title: Hardware
permalink: /software/hardware/
---

# Hardware

The EIGSEP field stack runs on a small, fixed set of compute and DSP
boards. This page is the bill of materials a new operator needs in
front of them.

## Compute (Raspberry Pis)

| Role     | Board                | Today's address | Notes                                            |
|----------|----------------------|-----------------|--------------------------------------------------|
| panda    | Raspberry Pi 4 (4 GB) | `10.10.10.11`   | Observing front-end: `picohost`, `cmtvna`.       |
| backend  | Raspberry Pi 5 (8 GB) | `10.10.10.10`   | Redis + observer; also LAN's DHCP master + NTP.  |

The image is uniform — either Pi can run either role. Role is set per
Pi by `/boot/eigsep-role.conf`, not baked into the image.

## DSP

- **SNAP boards** — one live unit, one cold spare. Both are flashed
  with a CASPER-built bitstream pinned in `manifest.toml`. They share
  `10.10.10.12` (DHCP reservation, never powered simultaneously).

## Pico subsystem

- **Picos** — RP2040 boards flashed with the firmware in
  [`pico-firmware`](https://github.com/EIGSEP/pico-firmware). The
  active set and their roles are pinned in `manifest.toml` under
  `[packages.pico-firmware]`.

## VNA

- **CMT-VNA** — driven by
  [`CMT-VNA`](https://github.com/EIGSEP/CMT-VNA). Service definition
  lives at the pinned tag in `eigsep-field/manifest.toml [services.cmtvna]`.

## RF chain

- Antennas, baluns, LNAs, switches, cabling — these are documented in
  the [memos]({{ site.baseurl }}/) catalog rather than here. Search
  the memos for "Vivaldi", "antenna", "LNA", "switch" for the latest
  measurements and design notes.

## Network

- **Switch** — any unmanaged Gigabit switch large enough for the Pis,
  SNAP, and the operator laptop.
- **Cabling** — Cat6 patch cables; the cluster runs on a private
  `10.10.10.0/24` LAN with no internet routing.

For LAN address conventions and the published entry point
(`10.10.10.10`), see
[`docs/operator/laptop.md`]({{ site.data.eigsep_field.repo_url }}/blob/{{ site.data.eigsep_field.tag }}/docs/operator/laptop.md).
