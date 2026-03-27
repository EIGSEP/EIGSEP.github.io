(function(){
  const listEl = document.getElementById('memo-list');
  const qEl = document.getElementById('q');
  const sortEl = document.getElementById('sort');
  const countEl = document.getElementById('count');

  async function load() {
    const sources = [
      { url: '/memos.json',     kind: 'memo' },
      { url: '/notebooks.json', kind: 'notebook' },
      { url: '/uploads.json',   kind: 'pdf' }
    ];
  
    try {
      const arrays = await Promise.all(
        sources.map(async (src) => {
          const res = await fetch(src.url, { cache: 'no-store' });
          if (!res.ok) {
            console.warn(`Skipping ${src.url}: ${res.status}`);
            return [];
          }
          const items = await res.json();
          // tag each item with its source kind
          return items.map(it => ({ ...it, kind: it.kind || src.kind }));
        })
      );
  
      const all = arrays.flat();
      // fallback if nothing loads
      if (!all.length) throw new Error('No items loaded');
  
      window.__ITEMS__ = all;
      render();
      qEl.addEventListener('input', render);
      sortEl.addEventListener('change', render);
    } catch (e) {
      listEl.innerHTML = '<li>Cannot load memos/notebooks. <a href="/pdfs/">Try /pdfs/ directly</a>.</li>';
      console.error(e);
    }
  }

  function render() {
    const q = (qEl.value || '').toLowerCase().trim();
    const sortMode = sortEl.value;
    let data = window.__ITEMS__ ? [...window.__ITEMS__] : [];

    if (q) {
      data = data.filter(m => {
        const hay = [
          m.title, 
          m.authors?.join(', '), 
          m.summary, 
          (m.tags||[]).join(' '),
          m.number ? `#${m.number}` : '',
          m.number ? `${m.number}` : ''
        ].join(' ').toLowerCase();
        return hay.includes(q);
      });
    }

    if (sortMode === 'title') {
      data.sort((a,b) => a.title.localeCompare(b.title));
    } else if (sortMode === 'old') {
      data.sort((a,b) => (a.number||0) - (b.number||0));
    } else {
      data.sort((a,b) => (b.number||0) - (a.number||0)); // newest
    }

    countEl.textContent = data.length ? `${data.length} item${data.length===1?'':'s'} shown` : 'No items match your search.';
    listEl.innerHTML = data.map(toCard).join('\n');
  }

  function toCard(m) {
    const authors = (m.authors||[]).join(', ');
    const dateFmt = m.first_commit_date
      ? new Date(m.first_commit_date).toLocaleDateString(undefined, {year:'numeric', month:'short', day:'numeric'})
      : '';

    const primaryLink = m.pdf || m.href || m.url || '#';
    const displayTitle = m.number ? `#${m.number} \u2013 ${m.title}` : m.title;
    const kindLabel = m.kind ? capitalize(m.kind) : '';

    return `<li class="memo-row">
      <a class="memo-link" href="${encodeURI(primaryLink)}" target="_blank" rel="noopener">
        <span class="memo-title">${escapeHTML(displayTitle)}</span>
        <span class="memo-meta">${escapeHTML(authors)}${dateFmt ? ' \u00b7 ' + dateFmt : ''}${kindLabel ? ' \u00b7 ' + escapeHTML(kindLabel) : ''}</span>
      </a>
    </li>`;
  }
  
  function capitalize(s){ return (s||'').charAt(0).toUpperCase() + (s||'').slice(1); }

  function escapeHTML(str){ return (''+str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s])); }

  load();
})();
