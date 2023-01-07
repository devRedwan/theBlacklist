
const filterRow = document.querySelector(".filter__row");
const filingReportRow = document.querySelector(".filingReport__row");
const footer = document.querySelector("footer");

//scrolling triggered animation

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { rootMargin: "-50px" }
);

observer.observe(filterRow);
observer.observe(filingReportRow);
observer.observe(footer);

// Pre-Loader
const preLoader = () => {
  document.body.classList += "loading";
  setTimeout(() => {
    return document.body.classList.remove("loading");
  }, 2000);
};
preLoader();

// Sticky NavBar
const navBar = document.querySelector(".navbar");
window.addEventListener("scroll", function () {
  if (window.scrollY > 250) {
    navBar.classList.add("sticky-top");
  } else {
    navBar.classList.remove("sticky-top");
  }
});
