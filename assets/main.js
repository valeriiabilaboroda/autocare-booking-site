(function () {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("a.navlink").forEach(a => {
    const href = a.getAttribute("href");
    if (href === path) a.classList.add("active");
  });

  const y = new Date().getFullYear();
  const yEl = document.getElementById("year");
  if (yEl) yEl.textContent = String(y);
})();
