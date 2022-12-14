/* --------------------- Table css filter class --------------------- */
let searchBar = document.querySelector(".input__keywordSearch");
let searchButton = document.querySelector(".keyword-search__submit");

searchBar.addEventListener("focusin", () => {
  searchButton.classList.add("active");
});
searchBar.addEventListener("focusout", () => {
  searchButton.classList.remove("active");
});
