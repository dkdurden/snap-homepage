// Helper to make sure one menu is open at a time
class MenuManager {
  constructor() {
    this.activeMenu = null;
  }

  setActiveMenu(menu) {
    if (this.activeMenu === menu) {
      return;
    }

    if (this.activeMenu != null) {
      this.activeMenu.hideMenu();
    }

    this.activeMenu = menu;
  }

  clearActiveMenu() {
    if (this.activeMenu != null) {
      this.activeMenu = null;
    }
  }
}

// This class represents a navbar dropdown menu, with logic
//   for handling opening/closing, and keydown/click events
class Menu {
  constructor(menuToggle) {
    this.menuToggle = menuToggle;
    this.toggleIcon = menuToggle.lastElementChild;
    this.menu = menuToggle.nextElementSibling;
    this.menuLinks = this.menu.querySelectorAll("li > a");
    this.isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    this.keydownHandler = (e) => {
      if (e.key === "Tab") {
        const lastFocusedElement = e.target;

        if (
          (!e.shiftKey &&
            lastFocusedElement === this.menuLinks[this.menuLinks.length - 1]) ||
          (e.shiftKey && lastFocusedElement === this.menuToggle)
        ) {
          this.hideMenu();
        }
      }

      const active = document.activeElement.closest("li");

      if (e.key === "ArrowUp") {
        e.preventDefault();

        if (document.activeElement !== this.menuToggle) {
          const prev = active.previousElementSibling;

          if (prev != null) {
            prev.lastElementChild.focus();
          }
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();

        if (document.activeElement === this.menuToggle) {
          this.menuLinks[0].focus();
        } else {
          const next = active.nextElementSibling;

          if (next != null) {
            next.lastElementChild.focus();
          }
        }
      }
    };

    this.clickHandler = (e) => {
      // close menu if clicking outside dropdown
      if (e.target.closest(".dropdown") != null) {
        return;
      }

      this.hideMenu();
    };
  }

  showMenu() {
    menuManager.setActiveMenu(this);

    this.menu.classList.add("show");
    this.toggleIcon.src = "/images/icon-arrow-up.svg";
    this.menuToggle.setAttribute("aria-expanded", "true");

    window.addEventListener("keydown", this.keydownHandler);
    window.addEventListener("click", this.clickHandler);
  }

  hideMenu() {
    menuManager.clearActiveMenu();

    this.menu.classList.remove("show");
    this.toggleIcon.src = "/images/icon-arrow-down.svg";
    this.menuToggle.setAttribute("aria-expanded", "false");

    window.removeEventListener("keydown", this.keydownHandler);
    window.removeEventListener("click", this.clickHandler);
  }
}

function addEvents() {
  const dropdownToggles = document.querySelectorAll(".dropdown__toggle");
  const navToggle = document.querySelector(".nav__toggle");

  dropdownToggles.forEach((toggle, i) => {
    toggle.addEventListener("click", (e) => {
      // could pass in either e.currentTarget or "toggle" variable here
      const menu = new Menu(e.currentTarget);

      if (menu.isOpen) {
        menu.hideMenu();
      } else {
        menu.showMenu();
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

var menuManager = new MenuManager();
addEvents();
