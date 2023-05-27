
var idContainer =  sessionStorage.ID_CONTAINER_INDIVIDUAL

function obterDadosContainer() {
    fetch(`http://localhost:3333/containers/dadosContainer/${idContainer}`,{ cache: 'no-store' })
    .then(function name(resposta) {
        resposta.json().then((json)=>{
            console.log(json)
        })
    })
}


  var tempAtual;
  var umidadeAtual;
    /* -- dht11Umidade -- */
    var contextoDht11Umidade = document.getElementById('dht11Umidade').getContext('2d');
    contextoDht11Umidade.canvas.width = 1000;
    contextoDht11Umidade.canvas.height = 300;
    var dht11Umidade = new Chart(
        contextoDht11Umidade,
        {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Umidade',
                    type: 'line',
                    borderColor: ['#45b3e7'],
                    backgroundColor: ['#89cff0']
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        distribution: 'series',
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Umidade'
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                animation: {
                    duration: 0
                }
            }
        }
    );
    /* -- dht11Temperatura -- */
    var contextoDht11Temperatura = document.getElementById('dht11Temperatura').getContext('2d');
    contextoDht11Temperatura.canvas.width = 1000;
    contextoDht11Temperatura.canvas.height = 300;
    var dht11Temperatura = new Chart(
        contextoDht11Temperatura,
        {
            type: 'line',
            data: {
                datasets: [{
                    label: "Temperatura",
                    type: 'line',
                    borderColor: ['#ff3232'],
                    backgroundColor: ['#ff7f7f'],
                   
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        distribution: 'series',
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Temperatura'
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                animation: {
                    duration: 0
                }
            }
        }
    );


    var linhas = {};
    var tempo = {};
    var container ={}



    function obterDados(grafico, endpoint) {
        var http = new XMLHttpRequest();
        http.open('GET', `http://localhost:3333/medidas/temperatura-umidade/${idContainer}`, false);
        http.send(null);
        var valores = JSON.parse(http.responseText);
        console.log(valores)
        if (linhas[endpoint] == null) {
            linhas[endpoint] = 0;
        }
        // Exibir à partir do último elemento exibido anteriormente
        var ultimaLinha = linhas[endpoint];
        linhas[endpoint] = valores.length;
        container = valores[0]
        
        p_critico_alto.innerHTML = `${container.temperaturaAltaCritica} °C | ${container.umidadeAltaCritica} %`

        p_alerta_alto.innerHTML = `${container.temperaturaAltaAlerta} °C | ${container.umidadeAltaAlerta} %`
       
        p_ideal.innerHTML = `${container.temperaturaIdeal} °C | ${container.umidadeIdeal} %`
      
        p_alerta_baixo.innerHTML = `${container.temperaturaBaixaAlerta} °C | ${container.umidadeBaixaAlerta} %`
      
        p_critico_baixo.innerHTML = `${container.temperaturaBaixaCritica} °C | ${container.umidadeBaixaCritica} %`
        console.log(valores)
        valores.forEach((dados) => {
            //Máximo de 60 itens exibidos no gráfico
            if ( grafico.data.datasets[0].data.length == 10) {
                grafico.data.labels.shift();
                grafico.data.datasets[0].data.shift();
            }
            if(grafico == dht11Umidade){
              try {
                umidadeAtual = dados.umidade;
              } catch (error) {
                console.log(error)
              }
            }else{
              try {
                tempAtual = dados.temperatura  
              } catch (error) {
                console.log("Não pegou")
              }
              
            }
            grafico.data.labels.push(dados.momento_grafico);
            if(grafico == dht11Temperatura){
              grafico.data.datasets[0].data.push(parseFloat(dados.temperatura));
            }else{
              grafico.data.datasets[0].data.push(parseFloat(dados.umidade));
            }
            
            grafico.update();
            
        })
        
    }

    
    

    setInterval(() => {
       obterDados(dht11Umidade, 'medidas/umidade');
       obterDados(dht11Temperatura, 'medidas/temperatura');
       atualizarAlerta();
    }, 1000);


  function atualizarAlerta() {
    var avisoUmidade = document.getElementById("p_umidade");
    var avisoTemperatura = document.getElementById("p_temperatura");

    if (tempAtual >= container.temperaturaAltaCritica) {
        avisoTemperatura.innerHTML = "Temperatura: <span class='status5'>Crítico quente</span>"
    }
    else if (tempAtual < container.temperaturaAltaCritica && tempAtual >= container.temperaturaAltaAlerta) {
        avisoTemperatura.innerHTML = "Temperatura: <span class='status4'>Alerta quente</span>"
    }
    else if (tempAtual < container.temperaturaAltaAlerta && tempAtual > container.temperaturaBaixaAlerta) {
        avisoTemperatura.innerHTML = "Temperatura: <span class='status3'>Ideal</span>" 
    }
    else if (tempAtual <= container.temperaturaBaixaAlerta && tempAtual >container.temperaturaBaixaCritica) {
        avisoTemperatura.innerHTML = "Temperatura: <span class='status2'>Alerta Frio</span>" 
    }
    else if (tempAtual <= container.temperaturaBaixaCritica) {
        avisoTemperatura.innerHTML = "Temperatura: <span class='status1'>Crítico Frio</span>" 
    }


    if (umidadeAtual >= container.umidadeAltaCritica) {
        avisoUmidade.innerHTML ="Umidade: <span class='status5'>Crítica</span>" 
    }
    else if (umidadeAtual < container.umidadeAltaCritica && umidadeAtual >= container.umidadeAltaAlerta) {
        avisoUmidade.innerHTML ="Umidade: <span class='status4'>Alerta</span>" 
    }
    else if (umidadeAtual < container.umidadeAltaAlerta && umidadeAtual > container.umidadeBaixaAlerta) {
        avisoUmidade.innerHTML ="Umidade: <span class='status3'>Ideal</span>" 
    }
    else if (umidadeAtual <= container.umidadeBaixaAlerta && umidadeAtual >container.umidadeBaixaCritica) {
        avisoUmidade.innerHTML ="Umidade: <span class='status2'>Alerta</span>" 
    }
    else if (umidadeAtual <= container.umidadeBaixaCritica) {
        avisoUmidade.innerHTML ="Umidade: <span class='status1'>Crítica</span>" 
    }

  }

 
