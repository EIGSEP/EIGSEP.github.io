---
layout: default
title: EIGSEP Memo Series
---

# EIGSEP Technical Memos

Enjoy!

<ul>
{% for file in site.static_files %}
  {% if file.extname == ".pdf" and file.path contains "memos/" %}
  <li>
    **{{ file.name | replace: ".pdf", "" }}** &mdash;
    <a href="{{ file.path }}">Download PDF</a>
  </li>
  {% endif %}
{% endfor %}
</ul>

