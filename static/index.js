// Fetch data from api
const tableHeaders = [
  "Poster",
  "Title",
  "Year",
  "Certificate",
  "Director",
  "Genre1",
  "Runtime",
  "MetaScore",
  "IMDB",
  "Votes",
  "Gross",
];

const sortFields = [
  "IMDB",
  "Runtime",
  "MetaScore",
  "Votes",
  "Gross",
  "Year",
  "~Randomized~",
];
const sortBy = document.getElementById("sort-by");
let sortByHTML = "";
sortFields.forEach((header, index) => {
  sortByHTML += `<option value=${index}>${header}</option>`;
});

sortBy.innerHTML = sortByHTML;
sortBy.addEventListener("change", (e) => {
  const optionIndex = e.target.value;
  const selectedField = sortFields[optionIndex];
  console.log(selectedField);
  getData(selectedField);
});

getData(sortFields[0]);

async function getData(selectedHeader) {
  const url = `/api/sorted_movies/${selectedHeader}`;
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
    tableHeaders.forEach((header) => {
      if (header === "Poster") {
        tableHTML += `<td><img src="${movie[header]}"></td>`;
      } else {
        tableHTML += `<td>${movie[header]}</td>`;
      }
    });
    tableHTML += "</tr>";
  });

  tableBody.innerHTML = tableHTML;
  return movie_data;
}
