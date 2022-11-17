// simple JS for easy development purposes
// TODO: improve this after styles are done, and make accessible
function addEvents() {
  const dropdownToggles = document.querySelectorAll(".dropdown__toggle");
  const navToggle = document.querySelector(".nav__toggle");

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      const menu = e.currentTarget.nextElementSibling;
      const icon = e.currentTarget.lastElementChild;
      const isOpen = menu.classList.contains("show");

      if (isOpen) {
        menu.classList.remove("show");

        icon.outerHTML = '<img src="/images/icon-arrow-down.svg" alt="" />';
      } else {
        menu.classList.add("show");

        icon.outerHTML = '<img src="/images/icon-arrow-up.svg" alt="" />';
      }
    });
  });

  navToggle.addEventListener("click", (e) => {
    const expanded = e.currentTarget.getAttribute("aria-expanded") === "true";
    const navMenu = e.currentTarget.nextElementSibling;

    if (!expanded) {
      e.currentTarget.setAttribute("aria-expanded", "true");
      e.currentTarget.innerHTML =
        '<img src="/images/icon-close-menu.svg" alt="" />';

      navMenu.style.display = "block";
      navMenu.style.boxShadow = "0px 0px 0px 100vw rgb(0 0 0 / 50%)";
    } else {
      e.currentTarget.setAttribute("aria-expanded", "false");
      e.currentTarget.innerHTML = '<img src="/images/icon-menu.svg" alt="" />';

      navMenu.style.display = "none";
    }
  });
}

addEvents();
