---
layout: page
title: Interfaces
permalink: /software/interfaces/
---

# Interfaces

Wire contracts between the EIGSEP packages — Redis keys, sensor
schemas, bus roles, producer contracts — are authored in
`eigsep-field/docs/interface/`. Tables there are generated from the
sibling Python modules at the manifest-pinned versions and
CI-drift-checked, so reading them at the pinned tag below is reading
the authoritative source.

Tracking
[`eigsep-field@{{ site.data.eigsep_field.tag }}`]({{ site.data.eigsep_field.repo_url }}/tree/{{ site.data.eigsep_field.tag }}).

## Canonical documents

- [Interface index]({{ site.data.eigsep_field.repo_url }}/blob/{{ site.data.eigsep_field.tag }}/docs/interface/README.md)
  — overview, regeneration procedure, drift enforcement.
- [Redis key registry]({{ site.data.eigsep_field.repo_url }}/blob/{{ site.data.eigsep_field.tag }}/docs/interface/redis-keys.md)
  — every key, stream, and set the stack touches.
- [Sensor schemas]({{ site.data.eigsep_field.repo_url }}/blob/{{ site.data.eigsep_field.tag }}/docs/interface/sensor-schemas.md)
  — fields each sensor producer emits.
- [Bus roles]({{ site.data.eigsep_field.repo_url }}/blob/{{ site.data.eigsep_field.tag }}/docs/interface/bus-roles.md)
  — writer/reader-per-bus pattern.
- [Producer contracts]({{ site.data.eigsep_field.repo_url }}/blob/{{ site.data.eigsep_field.tag }}/docs/interface/producer-contracts.md)
  — conformance suite shipped inside the `eigsep_observing` wheel.

## Why no copy lives here

These tables drift the moment they are duplicated. The generator in
`eigsep-field/scripts/gen_interface_docs.py` imports the sibling
modules and rewrites the tables on each release; CI fails the release
PR if the committed docs do not match the generator output. Reading
them at the pinned tag is the same as reading the source code.
