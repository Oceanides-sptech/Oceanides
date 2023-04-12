const graficoBarras = document.getElementById("graficoBarras");

new Chart(graficoBarras, {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

const graficoPizza = document.getElementById("graficoPizza");
new Chart(graficoPizza, {
  type: "pie",
  data: {
    labels: ["Red", "Blue"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 5],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
        ],
        hoverOffset: 4,
      },
    ],
  },
});
