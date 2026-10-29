const search = document.querySelector('#site-search');
const rows = [...document.querySelectorAll('.site-row')];
const buttons = [...document.querySelectorAll('.filter')];
const count = document.querySelector('#result-count');
const empty = document.querySelector('#empty-state');
let category = 'all';

function update() {
  const query = search.value.trim().toLocaleLowerCase('zh-CN');
  let visible = 0;
  for (const row of rows) {
    const matchesCategory = category === 'all' || row.dataset.category === category;
    const matchesQuery = !query || (row.dataset.search + ' ' + row.textContent).toLocaleLowerCase('zh-CN').includes(query);
    row.hidden = !(matchesCategory && matchesQuery);
    if (!row.hidden) visible++;
  }
  count.textContent = `共 ${visible} 个网站`;
  empty.hidden = visible !== 0;
}

search.addEventListener('input', update);
for (const button of buttons) {
  button.addEventListener('click', () => {
    category = button.dataset.filter;
    for (const item of buttons) {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    }
    update();
  });
}
