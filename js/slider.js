/* ============================================================
   slider.js — carrossel simples (auto + botões + dots)
   ============================================================ */
(function () {
  function initSlider(root) {
    const slides = root.querySelectorAll(".slider__slide");
    const prevBtn = root.querySelector(".slider__btn--prev");
    const nextBtn = root.querySelector(".slider__btn--next");
    const dotsBox = root.querySelector(".slider__dots");
    let index = 0;
    let timer = null;
    const INTERVAL = 5000;

    // dots
    slides.forEach((_, i) => {
      const d = document.createElement("button");
      d.className = "slider__dot";
      d.type = "button";
      d.setAttribute("aria-label", `Ir para slide ${i + 1}`);
      d.addEventListener("click", () => go(i));
      dotsBox.appendChild(d);
    });
    const dots = dotsBox.querySelectorAll(".slider__dot");

    function render() {
      slides.forEach((s, i) => s.classList.toggle("is-active", i === index));
      dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
    }
    function go(i) {
      index = (i + slides.length) % slides.length;
      render();
      restart();
    }
    function next() { go(index + 1); }
    function prev() { go(index - 1); }
    function start() { timer = setInterval(next, INTERVAL); }
    function stop() { clearInterval(timer); }
    function restart() { stop(); start(); }

    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", prev);
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);

    render();
    start();
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-slider]").forEach(initSlider);
  });
})();