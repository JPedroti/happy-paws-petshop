/* ============================================================
   search.js — filtra produtos por nome, categoria ou tags
   ============================================================ */
(function () {
  const grid = document.getElementById("shopGrid");
  const input = document.getElementById("searchInput");
  const button = document.getElementById("searchButton");
  if (!grid || !input || !button) return;

  function render(list) {
    grid.innerHTML = "";
    if (!list.length) {
      grid.innerHTML = `<p class="shop-empty">Nenhum produto encontrado.</p>`;
      return;
    }
    list.forEach(p => {
      const card = document.createElement("article");
      card.className = "product";
      card.innerHTML = `
        <div class="product__img">
          <img src="${p.img}" alt="${p.name}" loading="lazy">
        </div>
        <h3 class="product__name">${p.name}</h3>
        <p class="product__category">${p.category}</p>
        <p class="product__price">${p.price} R$</p>
      `;
      grid.appendChild(card);
    });
  }

  function filter(query) {
    const q = query.trim().toLowerCase();
    if (!q) return window.PF_PRODUCTS;
    return window.PF_PRODUCTS.filter(p => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    });
  }

  function run() { render(filter(input.value)); }

  button.addEventListener("click", run);
  input.addEventListener("input", run);
  input.addEventListener("keydown", e => { if (e.key === "Enter") run(); });

  // inicial
  render(window.PF_PRODUCTS);
})();