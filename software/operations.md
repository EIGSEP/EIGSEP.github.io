---
layout: page
title: Operations
permalink: /software/operations/
---

# Operations

Day-to-day runbooks live in `eigsep-field/docs/operator/`.

Tracking
[`eigsep-field@{{ site.data.eigsep_field.tag }}`]({{ site.data.eigsep_field.repo_url }}/tree/{{ site.data.eigsep_field.tag }}).

## Runbooks

- [Sourcing and deploying a new Pi]({{ site.data.eigsep_field.repo_url }}/blob/{{ site.data.eigsep_field.tag }}/docs/operator/new-pi.md)
  — flashing, role assignment, capturing the MAC, reserving the IP.
- [Operator laptop capabilities]({{ site.data.eigsep_field.repo_url }}/blob/{{ site.data.eigsep_field.tag }}/docs/operator/laptop.md)
  — what the laptop needs (static IP, optional `chrony`), and the
  LAN address table.

## CLI quick reference

The `eigsep-field` Python package ships a single CLI on every Pi:

```
eigsep-field info        # release + installed package versions
eigsep-field doctor      # role + service health
eigsep-field services list
eigsep-field verify      # run shipped contract tests against the live stack
```

CLI source:
[`src/eigsep_field/cli.py`]({{ site.data.eigsep_field.repo_url }}/blob/{{ site.data.eigsep_field.tag }}/src/eigsep_field/cli.py).
