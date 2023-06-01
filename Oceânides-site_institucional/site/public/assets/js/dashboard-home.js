var medias = [];

async function obterMedias(){
  await fetch(`/medidas/obterMediaTemperaturaUmidade/${sessionStorage.ID_EMPRESA}`, {
    method: "get",
  }).then(function(resposta){
    resposta.json().then((json)=>{
      console.log(json);
      medias = json
    }).then(function() {
      plotarGraficosBarras()
    })
  })
}
var dadosGraficosBarras = {
  type: "bar",
  data: {
    labels: ["Média Baixa", "Média Intermediária", "Média Alta"],
    datasets: [
      {
        label: "Temperatura",
        data: [0, 0, 0],
        backgroundColor: "#FFD90F",
        borderColor: "#FFD90F",
        borderWidth: 1,
      },
      {
        label: "Umidade",
        data: [0, 0, 0],
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
        text: "Médias de temperatura e Umidade",
      },
    },
  },
}

const graficoBarras = document.getElementById("graficoBarras");

var geracaoGraficoBarras = new Chart(graficoBarras, dadosGraficosBarras);

function plotarGraficosBarras(){
  for (var i = 0; i < medias.length; i++){
    var mediaAtual = medias[i];

    dadosGraficosBarras.data.datasets[0].data[i] = mediaAtual.temperatura
    dadosGraficosBarras.data.datasets[1].data[i] = mediaAtual.umidade
  }

  geracaoGraficoBarras.update()
}

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
