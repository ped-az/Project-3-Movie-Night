const tableHeaders = [
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
const sortFields = ["IMDB", "Runtime", "MetaScore", "Votes", "Gross", "Year"];

async function getAllMovieData() {
  const url = `/api/movies/`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  console.log("getAllMovieData", data);
  return data;
}

async function getTop10MovieData(attribute) {
  const url = `/api/top_movies/${attribute}`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  console.log("getTop10MovieData", data);
  return data;
}

async function getGenreData() {
  const url = `/api/genre/`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  console.log("getGenreData", data);
  return data;
}

async function getTop10DirectorByGross() {
  const url = `/api/director/Gross`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  console.log("getTop10DirectorByGross", data);
  return data;
}

async function getTop10GenresByGross() {
  const url = `/api/genre/Gross`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  console.log("getTop10GenresByGross", data);
  return data;
}

(async function () {
  const genreData = await getGenreData();
  new Chart(document.getElementById("top-genre"), {
    type: "doughnut",
    data: {
      labels: genreData.map((x) => x.Genre1),
      datasets: [
        {
          label: "Percentage",
          data: genreData.map((x) => (x.count / 999) * 100),
        },
      ],
    },
  });

  const top10IMDBData = await getTop10MovieData("IMDB");
  const top10IMDBTable = document.getElementById("top-imdb");
  let html = `
        <tr>
          <th>Title</th>
          <th>IMDB</th>
          <th>Year</th>
          <th>Director</th>
          <th>Gross</th>
        </tr>
        `;
  top10IMDBData.forEach((row) => {
    html += `
          <tr>
            <td>${row.Title}</td>
            <td>${row.IMDB}</td>
            <td>${row.Year}</td>
            <td>${row.Director}</td>
            <td>${new Intl.NumberFormat("en-AU", {
              style: "currency",
              currency: "AUD",
            }).format(row.Gross)}</td>
          </tr>`;
  });
  top10IMDBTable.innerHTML = html;

  const top10GrossData = await getTop10MovieData("Gross");
  new Chart(document.getElementById("top-gross"), {
    data: {
      labels: top10GrossData.map((x) => x.Title),
      datasets: [
        {
          type: "bar",
          yAxisID: "A",
          label: "Gross",
          data: top10GrossData.map((x) => x.Gross),
          // backgroundColor: "orange",
        },
        {
          type: "line",
          yAxisID: "B",
          label: "IMDB",
          data: top10GrossData.map((x) => x.IMDB),
          // backgroundColor: "#ff6384",
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Top 10 Movies By Gross",
        },
      },

      scales: {
        A: {
          type: "linear",
          position: "left",
        },
        B: {
          type: "linear",
          position: "right",
        },
      },
    },
  });

  const top10GenresByGrossData = await getTop10GenresByGross();
  new Chart(document.getElementById("top-genre-by-gross"), {
    data: {
      labels: top10GenresByGrossData.map((x) => `${x.Genre1}`),
      datasets: [
        {
          type: "bar",
          yAxisID: "A",
          label: "Average Gross",
          data: top10GenresByGrossData.map((x) => x.avg_gross),
          // backgroundColor: "#800080",
        },
        {
          type: "line",
          yAxisID: "B",
          label: "Number of Movies",
          data: top10GenresByGrossData.map((x) => x.count),
          // backgroundColor: "#800080",
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Top 10 Genres By Average Gross",
        },
      },
      scales: {
        A: {
          type: "linear",
          position: "left",
        },
        B: {
          type: "linear",
          position: "right",
        },
        xAxes: [
          {
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            },
          },
        ],
      },
    },
  });

  const top10DirectorByGrossData = await getTop10DirectorByGross();
  const top10DirectorByGrossTable = document.getElementById(
    "top-director-by-gross"
  );
  let html2 = `
        <tr>
          <th>Director</th>
          <th>Gross</th>
          <th>Number of Movies</th>
          <th>Average Gross</th>
        </tr>
        `;
  top10DirectorByGrossData.forEach((row) => {
    html2 += `
          <tr>
            <td>${row.Director}</td>
            <td>${new Intl.NumberFormat("en-AU", {
              style: "currency",
              currency: "AUD",
            }).format(row.gross)}</td>
            <td>${row.count}</td>
            <td>${new Intl.NumberFormat("en-AU", {
              style: "currency",
              currency: "AUD",
            }).format(row.avg_gross)}</td>
          </tr>`;
  });
  console.log();
  top10DirectorByGrossTable.innerHTML = html2;

  const allMovieData = await getAllMovieData();
  new Chart(document.getElementById("bubble-chart"), {
    type: "bubble",
    data: {
      labels: allMovieData.map(
        (x) =>
          `${x.Title}: ${new Intl.NumberFormat("en-AU", {
            style: "currency",
            currency: "AUD",
          }).format(x.Gross)}`
      ),
      datasets: [
        {
          label: "Gross",
          data: allMovieData.map((row) => ({
            x: row.Year,
            y: row.IMDB,
            r: row.Gross / 25000000,
          })),
          hoverBackgroundColor: "red",
        },
      ],
    },
  });
})();
