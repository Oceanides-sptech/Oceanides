const graficoBarras = document.getElementById("graficoBarras");
new Chart(graficoBarras, {
  type: "bar",
  data: {
    labels: ["BRA/CHI", "BRA/POR", "BRA/FRA", "BRA/EUA", "BRA/AUS", "BRA/AFR"],
    datasets: [
      {
        label: "Temperatura",
        data: [10, 8, 4, 9, 13, 14],
        backgroundColor: "#FFD90F",
        borderColor: "#FFD90F",
        borderWidth: 1,
      },
      {
        label: "Umidade",
        data: [92, 91, 95, 94, 93, 90],
        backgroundColor: "#00AFEF",
        borderColor: "#00AFEF",
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
    plugins: {
      title: {
        display: true,
        text: "Média temperatura por rota",
      },
    },
  },
});

const graficoPizza = document.getElementById("graficoPizza");
new Chart(graficoPizza, {
  type: "pie",
  data: {
    labels: [
      "Crítico Frio", 
      "Emergência Frio",
      "Ideal",
      "Emergência Quente",
      "Crítico Quente"
    ],
    datasets: [
      {
        label: "Containers",
        data: [1, 0, 7, 0, 1],
        backgroundColor: [
          "#6f42c1", 
          "#00afef",
          "#00a91b",
          "#fd7e14",
          "#dc3545"
        ],
        hoverOffset: 4,
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Quantidade de containers por alerta",
      },  
    },
  },
});
