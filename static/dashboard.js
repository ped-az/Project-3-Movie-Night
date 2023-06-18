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
  ];

  
  (async function () {
    const url = `/api/movies`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    new Chart(document.getElementById("bubble-chart"), {
      type: "bubble",
      data: {
        labels: data.map(
          (x) =>
            `${x.Series_Title}: ${new Intl.NumberFormat("en-AU", {
              style: "currency",
              currency: "AUD",
            }).format(x.Gross)}`
        ),
        datasets: [
          {
            label: "Dimensions",
            data: data.map((row) => ({
              x: row.Released_Year,
              y: row.IMDB_Rating,
              r: row.Gross / 25000000,
            })),
            hoverBackgroundColor: "red",
          },
        ],
      },
    });
  })();
