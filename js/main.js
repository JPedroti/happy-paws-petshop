/* ============================================================
   main.js — interações globais (menu mobile)
   ============================================================ */
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const myToggle = document.querySelector(".nav__toggle");
    const myList = document.querySelector(".nav__list");
    if (myToggle && myList) {
      myToggle.addEventListener("click", () => myList.classList.toggle("is-open"));
    }
  });
})();