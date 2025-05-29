const toggleTheme = document.getElementById("toggleTheme");
const rootHtml = document.documentElement;
const accordionHeaders = document.querySelectorAll(".accordion__header");
const menuLinks = document.querySelectorAll(".menu__link");
const toggleButton = document.getElementById("toggleProjects");
const extraProjects = document.querySelector(".extra-projects");
let expanded = false;

// Alternar tema claro/escuro
function changeTheme() {
  const currentTheme = rootHtml.getAttribute("data-theme");

  rootHtml.setAttribute(
    "data-theme",
    currentTheme === "dark" ? "light" : "dark"
  );

  toggleTheme.classList.toggle("bi-sun");
  toggleTheme.classList.toggle("bi-moon-stars");
}

toggleTheme.addEventListener("click", changeTheme);

// Funcionalidade de accordion
accordionHeaders.forEach(header => {
  header.addEventListener("click", () => {
    const accordionItem = header.parentElement;
    accordionItem.classList.toggle("active");
  });
});

// Navegação ativa
menuLinks.forEach(item => {
  item.addEventListener("click", () => {
    menuLinks.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  });
});

// Expandir e recolher projetos extras com animação
toggleButton.addEventListener("click", (e) => {
  e.preventDefault();
  expanded = !expanded;

  if (!expanded) {
    // animar scroll para subir antes de recolher
    const duration = 400;
    const initialScroll = window.scrollY;
    const targetScroll = Math.max(0, initialScroll - 1500);

    let startTime = null;

    function animateScroll(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentScroll = initialScroll + (targetScroll - initialScroll) * progress;
      window.scrollTo(0, currentScroll);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        // Após animar o scroll, recolhe a sessão
        extraProjects.classList.add("collapsed");
      }
    }

    requestAnimationFrame(animateScroll);
  } else {
    // expandir os projetos imediatamente
    extraProjects.classList.remove("collapsed");
  }

  toggleButton.innerHTML = expanded
    ? '<span>Ver Menos</span><i class="bi bi-arrow-up"></i>'
    : '<span>Ver Todos os Projetos</span><i class="bi bi-arrow-down"></i>';
});


