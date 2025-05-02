---
layout: default
title: EIGSEP
---

# EIGSEP Technical Memos

Enjoy!

<ol>
{% for file in site.static_files %}
  {% if file.extname == ".pdf" and file.path contains "pdfs/" %}
  <li>
    <a href="{{ file.path }}">{{ file.name | replace: ".pdf", "" }}</a>
  </li>
  {% endif %}
{% endfor %}
</ol>

