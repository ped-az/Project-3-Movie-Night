// Fetch data from api
const dataFields = [
  "Poster",
  "Title",
  "Year",
  "Certificate",
  "Director",
  "Genre",
  "Runtime",
  "MetaScore",
  "IMDB",
  "Votes",
  "Gross",
];

const tableHeaders = [
  "Poster",
  "Title",
  "Released Year",
  "Certificate",
  "Director",
  "Genre",
  "Runtime",
  "Meta Score",
  "IMDB Rating",
  "# of Votes",
  "Gross",
];

const sortFields = [
  "IMDB",
  "Runtime",
  "MetaScore",
  "Votes",
  "Gross",
  "Year",
  "Certificate",
  "Genre1",
  "~Randomized~",
];

const sortByElement = document.getElementById("sort-by");
let sortByHTML = "";
sortFields.forEach((header, index) => {
  if (header === "Genre1") {
    sortByHTML += `<option value=${index}>Genre</option>`;
  } else {
    sortByHTML += `<option value=${index}>${header}</option>`;
  }
});

sortByElement.innerHTML = sortByHTML;
sortByElement.addEventListener("change", (e) => {
  const optionIndex = e.target.value;
  const selectedField = sortFields[optionIndex];
  console.log(selectedField);
  getDataWithSort(selectedField);
});

const filterElement = document.getElementById("filter");
filterElement.addEventListener("change", (e) => {
  const sortByElement = document.getElementById("sort-by");
  const optionIndex = sortByElement.value;
  const sortByValue = sortFields[optionIndex];

  const filterElement = e.target;
  const filterValue = filterElement.options[filterElement.selectedIndex].text;

  console.log(filterValue);
  if (filterValue === "Select") {
    getDataWithSort(sortByValue);
  } else {
    getDataWithFilterValue(sortByValue, filterValue);
  }
});

getDataWithSort(sortFields[0]);

async function getDataWithSort(selectedHeader) {
  const url = `/api/sorted_movies/${selectedHeader}`;
  console.log(url);
  const response = await fetch(url);
  const movie_data = await response.json();
  console.log(movie_data);

  let filterValues = [
    ...new Set(
      movie_data.map((movie) => {
        return movie[selectedHeader];
      })
    ),
  ];

  filterValues = ["Select a filter value", ...filterValues];

  const filterElement = document.getElementById("filter");
  let filterHTML = "";

  if (selectedHeader !== "~Randomized~") {
    filterValues.forEach((value) => {
      filterHTML += `<option value=${value}>${value}</option>`;
    });
  }
  filterElement.innerHTML = filterHTML;

  const tableBody = document.getElementById("movie-table");

  let tableHTML = "<tr>";

  tableHeaders.forEach((header) => {
    tableHTML += `<th>${header}</th>`;
  });
  tableHTML += "</tr>";

  movie_data.forEach((movie) => {
    tableHTML += "<tr>";
    dataFields.forEach((field) => {
      if (field === "Poster") {
        tableHTML += `<td><img src="${movie[field]}"></td>`;
      } else if (field === "Gross") {
        tableHTML += `<td>$${new Intl.NumberFormat().format(
          movie[field]
        )}</td>`;
      } else if (field === "Votes") {
        tableHTML += `<td>${new Intl.NumberFormat().format(movie[field])}</td>`;
      } else {
        tableHTML += `<td>${movie[field]}</td>`;
      }
    });
    tableHTML += "</tr>";
  });

  tableBody.innerHTML = tableHTML;
}

async function getDataWithFilterValue(sortByValue, filterValue) {
  let filterValue2;
  if (filterValue === "MA 15+") {
    filterValue2 = "MA15";
  } else {
    filterValue2 = filterValue;
  }
  let url = `/api/filtered_movies?sortByValue=${sortByValue}&filterValue=${filterValue2}`;

  console.log(url);
  const response = await fetch(url);
  const movie_data = await response.json();
  console.log(movie_data);

  const tableBody = document.getElementById("movie-table");

  let tableHTML = "<tr>";

  tableHeaders.forEach((header) => {
    tableHTML += `<th>${header}</th>`;
  });
  tableHTML += "</tr>";

  movie_data.forEach((movie) => {
    tableHTML += "<tr>";
    dataFields.forEach((field) => {
      if (field === "Poster") {
        tableHTML += `<td><img src="${movie[field]}"></td>`;
      } else if (field === "Gross") {
        tableHTML += `<td>$${new Intl.NumberFormat().format(
          movie[field]
        )}</td>`;
      } else if (field === "Votes") {
        tableHTML += `<td>${new Intl.NumberFormat().format(movie[field])}</td>`;
      } else {
        tableHTML += `<td>${movie[field]}</td>`;
      }
    });
    tableHTML += "</tr>";
  });

  tableBody.innerHTML = tableHTML;
}
