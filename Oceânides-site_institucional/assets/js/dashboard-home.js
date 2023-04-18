const graficoBarras = document.getElementById("graficoBarras");
new Chart(graficoBarras, {
  type: "bar",
  data: {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
    datasets: [
      {
        label: "Temperatura",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "#FFD90F",
        borderColor: "#FFD90F",
        borderWidth: 1,
      },
      {
        label: "Umidade",
        data: [80, 75, 50, 90, 100, 60],
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
        text: "Média temperatura ao mês",
      },
    },
  },
});

const graficoPizza = document.getElementById("graficoPizza");
new Chart(graficoPizza, {
  type: "pie",
  data: {
    labels: ["Containers protegidos", "Containers avariados"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 5],
        backgroundColor: ["#00AFEF", "#DC3545"],
        hoverOffset: 4,
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Média de Containers",
      },
    },
  },
});
