// varriable

const navbar = document.querySelector(".navbar-bottom");
const kesiswaanBtn = document.querySelector(".kesiswaan-btn");
const navbarBtn = document.querySelector(".btnUpKesiswaan");
const sideBar = document.querySelector(".small-screen");

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    navbar.classList.add("scrolled");
    kesiswaanBtn.classList.add("scrolled");
    navbarBtn.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
    kesiswaanBtn.classList.remove("scrolled");
    navbarBtn.classList.remove("scrolled");
  }
  document.querySelectorAll("[popover]").forEach((p) => {
    if (p.matches(":popover-open")) {
      p.hidePopover(); // ini API bawaan HTML
    }
  });
});

function sideBarToogler() {
  sideBar.classList.toggle("active");
}
