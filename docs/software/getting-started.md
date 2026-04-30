---
layout: page
title: Getting started
permalink: /software/getting-started/
---

# Getting started

A new collaborator showing up with a fresh laptop and an empty SD card
should be able to get from this page to a working EIGSEP cluster
without anyone walking them through it.

Tracking
[`eigsep-field@{{ site.data.eigsep_field.tag }}`]({{ site.data.eigsep_field.repo_url }}/tree/{{ site.data.eigsep_field.tag }}).

## 1. What you need

See the [Hardware]({{ site.baseurl }}/software/hardware/) page for the
full bill of materials. Minimum to bring up a working two-Pi cluster:

- One Raspberry Pi 4 (panda role) and one Pi 5 (backend role), each
  with an SD card large enough for the EIGSEP image.
- An EIGSEP private LAN switch and Ethernet cabling.
- An operator laptop with a wired Ethernet port.

## 2. Clone the umbrella

The `eigsep-field` repo is the only repo you need to clone. It pins
every other package and firmware version through `manifest.toml`.

```bash
git clone git@github.com:EIGSEP/eigsep-field.git
cd eigsep-field
```

For a deployed install, check out the latest release tag (see
[releases]({{ site.data.eigsep_field.repo_url }}/releases)).

Sibling repos (`eigsep_redis`, `eigsep_observing`, `pico-firmware`,
`CMT-VNA`, etc.) are pulled in as wheels via the manifest — clone
them only if you are working on that package.

## 3. Build or download the Pi image

The image is uniform across roles and across Pi 4 / Pi 5. Grab the
latest release artifact `eigsep-field-<release>.img.tar.xz`, or build
locally — see
[`image/pi-gen-config/`]({{ site.data.eigsep_field.repo_url }}/tree/{{ site.data.eigsep_field.tag }}/image/pi-gen-config).

Flash it to an SD card with Raspberry Pi Imager, balena-etcher, or
`dd`.

## 4. Set the role on first boot

Before you power-on, drop a `/boot/eigsep-role.conf` on the SD card's
boot partition:

```
role = panda          # or "backend"
dhcp = false          # or "true" on exactly one Pi per LAN
```

`eigsep-first-boot.service` reads this file on first boot, enables
the role's services, configures DHCP if applicable, and self-disables.

Full procedure (capturing MAC, reserving the IP, etc.):
[`docs/operator/new-pi.md`]({{ site.data.eigsep_field.repo_url }}/blob/{{ site.data.eigsep_field.tag }}/docs/operator/new-pi.md).

## 5. Configure the operator laptop

Wired Ethernet, static `10.10.10.17/24`, optional `chrony` for true
UTC. Full details:
[`docs/operator/laptop.md`]({{ site.data.eigsep_field.repo_url }}/blob/{{ site.data.eigsep_field.tag }}/docs/operator/laptop.md).

## 6. Verify

SSH into a Pi and run:

```
eigsep-field info        # release + installed package versions
eigsep-field doctor      # role + service health
eigsep-field services list
```

If `doctor` is green and the version matches the release tag, you are
done.

## Where to read next

- [Interfaces]({{ site.baseurl }}/software/interfaces/) — what the
  components on the Pis say to each other.
- [Operations]({{ site.baseurl }}/software/operations/) — day-to-day
  runbooks.
- [Services]({{ site.baseurl }}/software/services/) — what runs on
  the image and why.
