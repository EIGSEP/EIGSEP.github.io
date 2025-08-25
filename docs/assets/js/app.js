(function(){
  const listEl = document.getElementById('memo-list');
  const qEl = document.getElementById('q');
  const sortEl = document.getElementById('sort');
  const countEl = document.getElementById('count');

  async function load() {
    try {
      const res = await fetch('/memos.json', {cache: 'no-store'});
      if (!res.ok) throw new Error('Failed to load memos.json');
      const memos = await res.json();
      window.__MEMOS__ = memos;
      render();
      qEl.addEventListener('input', render);
      sortEl.addEventListener('change', render);
    } catch (e) {
      listEl.innerHTML = '<li>Cannot load memos.json. <a href="/pdfs/">Try /pdfs/ directly</a>.</li>';
      console.error(e);
    }
  }

  function render() {
    const q = (qEl.value || '').toLowerCase().trim();
    const sortMode = sortEl.value;
    let data = window.__MEMOS__ ? [...window.__MEMOS__] : [];

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
    const pdfLink = m.pdf || '#';

    return `<li class="card">
      <h3>${escapeHTML(m.title)}</h3>
      <div class="meta">
        ${authors ? `<span>${escapeHTML(authors)}</span>` : ''}
        ${dateFmt ? `<span>· ${dateFmt}</span>` : ''}
      </div>
      ${tags ? `<div class="tags">${tags}</div>` : ''}
      <div class="actions">
        <a class="btn" href="${encodeURI(pdfLink)}" target="_blank" rel="noopener">Open PDF</a>
        ${m.code ? `<a class="btn secondary" href="${encodeURI(m.code)}" target="_blank" rel="noopener">Code</a>` : ''}
      </div>
    </li>`;
  }

  function escapeHTML(str){ return (''+str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s])); }

  load();
})();