/* --------------------- Table css filter class --------------------- */
let searchBar = document.querySelector(".input__keywordSearch");
let searchButton = document.querySelector(".keyword-search__submit");

searchBar.addEventListener("focusin", () => {
  searchButton.classList.add("active");
});
searchBar.addEventListener("focusout", () => {
  searchButton.classList.remove("active");
});

/* --------------------- rendering data from the API --------------------- */
const url = "https://data.cityofnewyork.us/resource/qgea-i56i.json";
const rowsElement = document.querySelector(".reports__table--rows");
const rowElements = rowsElement.getElementsByTagName("tr");
let fetchData, fetchAPI;

//executes the API call to pull all the data
//sets the up the row inside the table
async function renderAPIData() {
  fetchAPI = await fetch(`${url}?$select=${filteredColumns()}&$limit=100`);
  fetchData = await fetchAPI.json();
  rowsElement.innerHTML = fetchData
    .map((data) => dataSetSkeleton(data))
    .join("");
}

const dataSetSkeleton = (reportData) => {
  const skeleton = `<tr class="reports__table--row fs-5">
  <td>${formattedDate(reportData.date_of_incident) || "UNKNOWN"}</td>
  <td>${reportData.time_of_incident || "UNKNOWN"}</td>
  <td>${formattedDate(reportData.date_reported_to_police) || "UNKNOWN"}</td>
  <td>${reportData.precinct || "UNKNOWN"}</td>
  <td>${reportData.borough || "UNKNOWN"}</td>
  <td>${reportData.exact_location_of_occurance.latitude}, ${
    reportData.exact_location_of_occurance.longitude
  }</td>
  <td>${reportData.level_of_offense || "UNKNOWN"}</td>
  <td>${reportData.description_of_offense || "UNKNOWN"}</td>
  <td>${reportData.transit_station_name || "UNKNOWN"}</td>
  <td>${reportData.suspect_age_group || "UNKNOWN"}</td>
  <td>${reportData.suspect_race || "UNKNOWN"}</td>
  <td>${formattedSex(reportData.suspect_sex) || "UNKNOWN"}</td>
  <td>${reportData.victim_age_group || "UNKNOWN"}</td>
  <td>${reportData.victim_race || "UNKNOWN"}</td>
  <td>${formattedSex(reportData.victim_sex) || "UNKNOWN"}</td></tr>`;
  return skeleton;
};

//styles the unknown values to be almost invisible
const stylingNullValues = () => {
  for (i = 0; i < rowElements.length; i++) {
    let cellsInRow = rowElements[i].cells;
    for (j = 0; j < cellsInRow.length; j++) {
      if (cellsInRow[j].innerText === "UNKNOWN") {
        cellsInRow[j].style.opacity = "0.5";
      }
    }
  }
};

//takes the columnCodes from API Data, and turns them into readable words
//uses the output to filter columns that we are only interested in
const filteredColumns = () => {
  const columns = [
    { cmplnt_fr_dt: "date_of_incident" },
    { cmplnt_fr_tm: "time_of_incident" },
    { rpt_dt: "date_reported_to_police" },
    { addr_pct_cd: "precinct" },
    { boro_nm: "borough" },
    { lat_lon: "exact_location_of_occurance" },
    { law_cat_cd: "level_of_offense" },
    { ofns_desc: "description_of_offense" },
    { station_name: "transit_station_name" },
    { susp_age_group: "suspect_age_group" },
    { susp_race: "suspect_race" },
    { susp_sex: "suspect_sex" },
    { vic_age_group: "victim_age_group" },
    { vic_race: "victim_race" },
    { vic_sex: "victim_sex" },
  ];

  let columnsArray = [];
  columns.forEach((object) => {
    let elements = Object.entries(object).flat().join(" AS ");
    columnsArray.push(elements);
  });

  let filteredColumn = columnsArray.toString();
  return filteredColumn;
};

//formats the date into MM/DD/format
const formattedDate = (rawDate) => {
  let date = new Date(rawDate);
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  return `${month}/${day}/${year}`;
};

//Instead of showing 'M' or "f", show 'MALE' or 'FEMALE'
const formattedSex = (rawData) => {
  if (rawData === "M") {
    return "MALE";
  } else if (rawData === "F") {
    return "FEMALE";
  } else return "UNKNOWN";
};

//sorting the tables based on columns

//Date-Picker

//all necessary function calls
renderAPIData();
setTimeout(() => {
  stylingNullValues();
}, 2000);
