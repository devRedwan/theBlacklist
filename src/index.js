/*
to add filters use '?' after url to add and '&' to connect them
- to filter using limit, use '$limit=[int]'
- to filter using columns use 'columnName = columnValue'
- Total Pay = total_ot_paid + total_other_pay + regular_gross_paid
For more filtering tutorial: https://dev.socrata.com/docs/endpoints.html
5uac-w243 - NYPD Year-To-Date Compaint History unique identifier
sort by cmplnt_fr_dt
*/

// async function cityPayrollapi() {
//   const fetchAPI = await fetch(
//     "https://data.cityofnewyork.us/resource/k397-673e.json?$limit=500000&agency_name=POLICE%20DEPARTMENT&$select=*"
//   );
//   const fetchData = await fetchAPI.json();
//   console.log(fetchData);
// }

// async function brooklynReportedFelonies() {
//   const fetchAPI = await fetch(
//     "https://data.cityofnewyork.us/resource/qgea-i56i.json?$limit=600000&boro_nm=QUEENS&law_cat_cd=FELONY"
//   );
//   const fetchData = await fetchAPI.json();
//   console.log("felonies", fetchData);
// }

//------------------------------------------------------------------------------------------

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
    navBar.classList.add("sticky-lg-top");
  } else {
    navBar.classList.remove("sticky-lg-top");
  }
});
