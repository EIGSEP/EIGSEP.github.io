(function(){
  const listEl = document.getElementById('memo-list');
  const qEl = document.getElementById('q');
  const countEl = document.getElementById('count');
  let memos = [];

  async function load() {
    try {
      const res = await fetch('/living/living.json', { cache: 'no-store' });
      if (!res.ok) throw new Error(`living.json: ${res.status}`);
      memos = (await res.json()).memos || [];
      render();
      qEl.addEventListener('input', render);
    } catch (e) {
      listEl.innerHTML = '<li>Cannot load the living memos.</li>';
      console.error(e);
    }
  }

  function render() {
    const q = (qEl.value || '').toLowerCase().trim();
    const data = memos
      .filter(m => !q || [m.number, m.title, m.summary, (m.authors||[]).join(' ')]
        .join(' ').toLowerCase().includes(q))
      .sort((a,b) => a.number.localeCompare(b.number));
    countEl.textContent = data.length ? `${data.length} memo${data.length===1?'':'s'} shown` : 'No memos match your search.';
    listEl.innerHTML = data.map(toCard).join('\n');
  }

  function toCard(m) {
    const version = m.version
      ? new Date(m.version + 'T00:00:00').toLocaleDateString(undefined, {year:'numeric', month:'short', day:'numeric'})
      : '';
    const meta = [(m.authors||[]).join(', '), version && `version ${version}`]
      .filter(Boolean).join(' · ');
    return `<li class="memo-row">
      <a class="memo-link" href="${encodeURI(m.pdf)}" target="_blank" rel="noopener">
        <span class="memo-title">Living memo ${escapeHTML(m.number)} – ${escapeHTML(m.title)}</span>
        ${m.summary ? `<span class="memo-summary">${escapeHTML(m.summary)}</span>` : ''}
        <span class="memo-meta">${escapeHTML(meta)}</span>
      </a>
    </li>`;
  }

  function escapeHTML(str){ return (''+str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s])); }

  load();
})();
