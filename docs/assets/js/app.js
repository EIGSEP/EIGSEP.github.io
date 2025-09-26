(function(){
  const listEl = document.getElementById('memo-list');
  const qEl = document.getElementById('q');
  const sortEl = document.getElementById('sort');
  const countEl = document.getElementById('count');

  async function load() {
    const sources = [
      { url: '/memos.json',     kind: 'memo' },
      { url: '/notebooks.json', kind: 'notebook' }
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
        const hay = [m.title, m.authors?.join(', '), m.summary, (m.tags||[]).join(' ')].join(' ').toLowerCase();
        return hay.includes(q);
      });
    }

    if (sortMode === 'title') {
      data.sort((a,b) => a.title.localeCompare(b.title));
    } else if (sortMode === 'old') {
      data.sort((a,b) => new Date(a.date) - new Date(b.date));
    } else {
      data.sort((a,b) => new Date(b.date) - new Date(a.date)); // newest
    }

    countEl.textContent = data.length ? `${data.length} memo${data.length===1?'':'s'} shown` : 'No memos match your search.';
    listEl.innerHTML = data.map(toCard).join('\n');
  }

  function toCard(m) {
    const tags = (m.tags||[]).map(t => `<span class="tag">${escapeHTML(t)}</span>`).join('');
    const authors = (m.authors||[]).join(', ');
    const dateFmt = m.date ? new Date(m.date).toLocaleDateString(undefined, {year:'numeric', month:'short', day:'numeric'}) : '';
  
    // accept either .pdf or .href (HTML notebooks, md -> html, etc.)
    const primaryLink = m.pdf || m.href || m.url || '#';
    const primaryLabel = m.pdf ? 'Open PDF' : 'Open';
  
    const kindBadge = m.kind
      ? `<span class="tag">${escapeHTML(capitalize(m.kind))}</span>`
      : '';
  
    return `<li class="card">
      <h3>${escapeHTML(m.title)}</h3>
      <div class="meta">
        ${authors ? `<span>${escapeHTML(authors)}</span>` : ''}
        ${dateFmt ? `<span>· ${dateFmt}</span>` : ''}
      </div>
      <div class="tags">
        ${kindBadge}
        ${tags}
      </div>
      <div class="actions">
        <a class="btn" href="${encodeURI(primaryLink)}" target="_blank" rel="noopener">${primaryLabel}</a>
        ${m.code ? `<a class="btn secondary" href="${encodeURI(m.code)}" target="_blank" rel="noopener">Code</a>` : ''}
      </div>
    </li>`;
  }
  
  function capitalize(s){ return (s||'').charAt(0).toUpperCase() + (s||'').slice(1); }

  function escapeHTML(str){ return (''+str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s])); }

  load();
})();
