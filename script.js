// simple JS for easy development purposes
// TODO: improve this after styles are done, and make accessible
function addEvents() {
  const dropdowns = document.querySelectorAll(".dropdown");
  const navToggle = document.querySelector(".nav__toggle");

  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", (e) => {
      const menu = e.currentTarget.lastElementChild;
      const isOpen = menu.classList.contains("show");

      console.log(menu);

      if (isOpen) {
        menu.classList.remove("show");
      } else {
        menu.classList.add("show");
      }
    });
  });

  navToggle.addEventListener("click", (e) => {
    const expanded = e.currentTarget.getAttribute("aria-expanded") === "true";
    const navMenu = e.currentTarget.nextElementSibling;

    console.log(expanded, navMenu);

    if (!expanded) {
      e.currentTarget.setAttribute("aria-expanded", "true");
      e.currentTarget.innerHTML =
        '<img src="/images/icon-close-menu.svg" alt="" />';
      navMenu.style.display = "block";
    } else {
      e.currentTarget.setAttribute("aria-expanded", "false");
      e.currentTarget.innerHTML = '<img src="/images/icon-menu.svg" alt="" />';
      navMenu.style.display = "none";
    }
  });
}

addEvents();
