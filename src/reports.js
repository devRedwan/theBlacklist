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
const table = document.querySelector("#reported-complaints-data-table");
const tbody = document.querySelector(".reports__table--rows");
const rows = tbody.getElementsByTagName("tr");
const tableHeaders = document.querySelectorAll(".table__column--header");
let fetchData, fetchAPI;

//executes the API call to pull all the data
//sets the up the row inside the table
async function renderAPIData() {
  fetchAPI = await fetch(`${url}?$select=${filteredColumns()}&$limit=10`);
  fetchData = await fetchAPI.json();

  tbody.innerHTML = fetchData.map((data) => dataSetSkeleton(data)).join("");
}

const dataSetSkeleton = (reportData) => {
  const skeleton = `<tr class="reports__table--row fs-5">
  <td data-sort-type="date" data-sort-key="date_of_incident" >${
    formattedDate(reportData.date_of_incident) || "UNKNOWN"
  }</td>
  <td data-sort-type="time" data-sort-key="time_of_incident" >${
    reportData.time_of_incident || "UNKNOWN"
  }</td>
  <td data-sort-type="date" data-sort-key="date_reported_to_police" >${
    formattedDate(reportData.date_reported_to_police) || "UNKNOWN"
  }</td>
  <td data-sort-type="integer" data-sort-key="precinct" >${
    reportData.precinct || "UNKNOWN"
  }</td>
  <td data-sort-type="string" data-sort-key="borough" >${
    reportData.borough || "UNKNOWN"
  }</td>
  <td data-sort-type="string" data-sort-key="exact_location_of_occurance" >${
    reportData.exact_location_of_occurance.latitude
  }, ${reportData.exact_location_of_occurance.longitude}</td>
  <td data-sort-type="string" data-sort-key="level_of_offense" >${
    reportData.level_of_offense || "UNKNOWN"
  }</td>
  <td data-sort-type="string" data-sort-key="description_of_offense" >${
    reportData.description_of_offense || "UNKNOWN"
  }</td>
  <td data-sort-type="string" data-sort-key="transit_station_name" >${
    reportData.transit_station_name || "UNKNOWN"
  }</td>
  <td data-sort-type="string" data-sort-key="suspect_age_group" >${
    reportData.suspect_age_group || "UNKNOWN"
  }</td>
  <td data-sort-type="string" data-sort-key="suspect_race" >${
    reportData.suspect_race || "UNKNOWN"
  }</td>
  <td data-sort-type="string" data-sort-key="suspect_sex" >${
    formattedSex(reportData.suspect_sex) || "UNKNOWN"
  }</td>
  <td data-sort-type="string" data-sort-key="victim_age_group" >${
    reportData.victim_age_group || "UNKNOWN"
  }</td>
  <td data-sort-type="string" data-sort-key="victim_race" >${
    reportData.victim_race || "UNKNOWN"
  }</td>
  <td data-sort-type="string" data-sort-key="victim_sex" >${
    formattedSex(reportData.victim_sex) || "UNKNOWN"
  }</td></tr>`;
  return skeleton;
};

//styles the unknown values to be almost invisible
const stylingNullValues = () => {
  for (i = 0; i < rows.length; i++) {
    let cellsInRow = rows[i].cells;
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
let sortAscending = true;

const sortColumns = (event) => {
  const compare = (sortAscending, compA, compB) => {
    if (sortAscending) {
      if (compA < compB) {
        return -1;
      }
      if (compA > compB) {
        return 1;
      }
    } else {
      if (compA > compB) {
        return -1;
      }
      if (compA < compB) {
        return 1;
      }
    }
  };
  const sortKey = event.target.getAttribute("data-sort");
  const rowsArray = [...rows];

  rowsArray.sort(function (a, b) {
    const cellA = a.querySelector(`td[data-sort-key="${sortKey}"]`);
    const cellB = b.querySelector(`td[data-sort-key="${sortKey}"]`);
    let valA = cellA.textContent;
    let valB = cellB.textContent;
    const sortType = cellA.getAttribute("data-sort-type");

    if (sortType === "integer") {
      let intA = parseInt(valA);
      let intB = parseInt(valB);
      let compA = intA;
      let compB = intB;
      return compare(sortAscending, compA, compB);
    } else if (sortType === "date") {
      // If the values are dates, parse them and use the parsed values for comparison
      let dateFormat = "MM/DD/YYYY";
      let dateA = new Date(valA);
      let dateB = new Date(valB);
      let compA = dateA.getTime();
      let compB = dateB.getTime();
      return compare(sortAscending, compA, compB);
    } else {
      // If the values are strings, use the original values for comparison
      let compA = valA;
      let compB = valB;
      return compare(sortAscending, compA, compB);
    }
    return 0;
  });

  sortAscending = !sortAscending;
  rowsArray.forEach((row) => {
    tbody.appendChild(row);
  });
};
//finished sorting the table based on column

//all necessary function calls
renderAPIData();
setTimeout(() => {
  stylingNullValues();
}, 2000);
