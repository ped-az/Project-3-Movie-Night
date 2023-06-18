// Fetch data from api
const tableHeaders = [
    "Series_Title",
    "Released_Year",
    "Certificate",
    "Director",
    "Genre_1",
    "Runtime",
    "Meta_score",
    "IMDB_Rating",
    "No_of_Votes",
    "Gross",
  ];
  const sortFields = [
    "IMDB_Rating",
    "Runtime",
    "Meta_score",
    "No_of_Votes",
    "Gross",
    "Released_Year",
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
        tableHTML += `<td>${movie[header]}</td>`;
      });
      tableHTML += "</tr>";
    });

    tableBody.innerHTML = tableHTML;
    return movie_data;
  }

  getData("IMDB_Rating");

  
      // movie_data.forEach((movie) => {
      //   tableBodyHTML += `<`;
      // });

      // Insert data into table

      // $(document).ready(function () {
      //   $.getJSON("/api/movies", function (data) {
      //     var moviesTable = $("#movies-table tbody");
      //     $.each(data, function (index, movie) {
      //       var row = $("<tr>");
      //       row.append($("<td>").text(movie.Series_Title));
      //       row.append($("<td>").text(movie.Released_Year));
      //       row.append($("<td>").text(movie.Certificate));
      //       row.append($("<td>").text(movie.Director));
      //       row.append($("<td>").text(movie.Genre_1));
      //       row.append($("<td>").text(movie.Genre_2));
      //       row.append($("<td>").text(movie.Genre_3));
      //       row.append($("<td>").text(movie.No_of_Genres));
      //       row.append($("<td>").text(movie.Runtime));
      //       row.append($("<td>").text(movie.Gross));
      //       moviesTable.append(row);
      //     });
      //   });
      // });