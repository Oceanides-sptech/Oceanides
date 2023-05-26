var containers = []

function obterContainers() {
    fetch(`/containers/containersEmpresa/${sessionStorage.ID_EMPRESA}`, { cache: 'no-store' }).then(function(resposta) {
      if(resposta.ok){
        resposta.json().then((json)=>{
            containers = json
            listar()
        })
      }
    })
}

function listar() {
    div_containers.innerHTML = ''
    for (var i = 1; i <= containers.length; i++) {
        var containerAtual = containers[i-1]

        var alertasTemperaturas={
           temperaturaMuitoQuente: Number(containerAtual.temperaturaAltaCritica),
           temperaturaQuente: Number(containerAtual.temperaturaAltaAlerta),
           temperaturaFria: Number(containerAtual.temperaturaBaixaAlerta),
           temperaturaMuitoFria: Number(containerAtual.temperaturaBaixaCritica),
        }
        var temperaturaContainerAtual = Number(containerAtual.temperatura)
        var umidadeContainerAtual = Number(containerAtual.umidade)
        var codigoContainerAtual = containerAtual.codigo
        var nomeContainer = containerAtual.nomeContainer
        var containerAtual = containers[i-1]
        var classe = verificarTemperaturaContainer(temperaturaContainerAtual, alertasTemperaturas)

        div_containers.innerHTML += `
        <div onclick="abrirContainer(${containerAtual.idContainer})" class="container container-${classe}">
        <div class="info-container">
          <p>${nomeContainer}</p>
          <p>${codigoContainerAtual}</p>
          <p>Último registro: ${temperaturaContainerAtual}°C/${umidadeContainerAtual}%</p>
        </div>
        <div class="nivel-alerta">
          <div class="alerta">
            <div class="bola ${classe}"></div>
          </div>
        </div>
      </div>
      `         
      }
}

function verificarTemperaturaContainer(temperatura, {
    temperaturaMuitoQuente, temperaturaQuente, temperaturaFria, temperaturaMuitoFria
}) {
    var classe = ''
    if (temperatura >= temperaturaMuitoQuente) {
        classe = 'critico-quente'
    }
    else if (temperatura < temperaturaMuitoQuente && temperatura >= temperaturaQuente) {
        classe = 'emergencia-quente'
    }
    else if (temperatura < temperaturaQuente && temperatura > temperaturaFria) {
        classe = 'ideal'
    }
    else if (temperatura <= temperaturaFria && temperatura > temperaturaMuitoFria) {
        classe = 'emergencia-frio'
    }
    else if (temperatura <= temperaturaMuitoFria) {
        classe = 'critico-frio'
    }
    return classe
}

var recarregar = setInterval(()=>{
    obterContainers()
    listar()
},10000)

