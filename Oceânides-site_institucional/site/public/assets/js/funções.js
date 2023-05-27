function validarSessao() {
  // aguardar();
  var email = sessionStorage.EMAIL_USUARIO;
  var nome = sessionStorage.NOME_USUARIO;
  span_nome.innerHTML = "Usuário: " + nome;
  span_empresa.innerHTML = "Empresa: " + sessionStorage.EMPRESA;
  if (email != null && nome != null) {
    // window.alert(`Seja bem-vindo, ${nome}!`);
    // finalizarAguardar();
  } else {
    window.location = "../login.html";
  }
}

var idEmpresa = sessionStorage.ID_EMPRESA;

function verificarAdm() {
  if (sessionStorage.FK_ADM == "null") {
    span_nivel.innerHTML = "<span class='info'>Nível:</span> ADM";
    itens.innerHTML += `
        <a href="cadastro-Funcionario.html">
        <div class="item">
          <div class="icone-botao">
            <svg
              style="width: 22px"
              viewBox="0 0 12 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 7C6.90931 7 7.78138 6.63125 8.42437 5.97487C9.06735 5.3185 9.42857 4.42826 9.42857 3.5C9.42857 2.57174 9.06735 1.6815 8.42437 1.02513C7.78138 0.368749 6.90931 0 6 0C5.09069 0 4.21862 0.368749 3.57563 1.02513C2.93265 1.6815 2.57143 2.57174 2.57143 3.5C2.57143 4.42826 2.93265 5.3185 3.57563 5.97487C4.21862 6.63125 5.09069 7 6 7ZM4.77589 8.3125C2.1375 8.3125 0 10.4945 0 13.1879C0 13.6363 0.35625 14 0.795536 14H11.2045C11.6438 14 12 13.6363 12 13.1879C12 10.4945 9.8625 8.3125 7.22411 8.3125H4.77589Z"
              />
            </svg>
          </div>
          <p class="texto-item texto-usuario">Cadastrar Funcionário</p>
        </div>
        </a>
        `;

    itens_fechados.innerHTML += `
        <a href="cadastro-Funcionario.html">
                      <div class="item">
                        <div class="icone-botao">
                          <svg
                            style="width: 22px"
                            viewBox="0 0 12 14"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 7C6.90931 7 7.78138 6.63125 8.42437 5.97487C9.06735 5.3185 9.42857 4.42826 9.42857 3.5C9.42857 2.57174 9.06735 1.6815 8.42437 1.02513C7.78138 0.368749 6.90931 0 6 0C5.09069 0 4.21862 0.368749 3.57563 1.02513C2.93265 1.6815 2.57143 2.57174 2.57143 3.5C2.57143 4.42826 2.93265 5.3185 3.57563 5.97487C4.21862 6.63125 5.09069 7 6 7ZM4.77589 8.3125C2.1375 8.3125 0 10.4945 0 13.1879C0 13.6363 0.35625 14 0.795536 14H11.2045C11.6438 14 12 13.6363 12 13.1879C12 10.4945 9.8625 8.3125 7.22411 8.3125H4.77589Z"
                            />
                          </svg>
                        </div>
                      </div>
                    </a>
        `;
  } else {
    span_nivel.innerHTML = "Nível: Comum";
  }
}

function limparSessao() {
  // aguardar();
  sessionStorage.clear();
  // finalizarAguardar();
  window.location = "../login.html";
}

var alertas = [];

function obterContainersAlertas() {
  fetch(`/containers/containersEmpresa/${sessionStorage.ID_EMPRESA}`, {
    cache: "no-store",
  }).then(function (resposta) {
    if (resposta.ok) {
      resposta.json().then((json) => {
        for (var i = 0; i < json.length; i++) {
          console.log(json[i])
          var containerAlertaAtual = json[i] 

          verificarAlerta(containerAlertaAtual)
        }
      });
    }
  });
}

function verificarAlerta(resposta) {
  var temperatura = resposta.temperatura
  var idContainer = resposta.idContainer
  var nome = resposta.nomeContainer
  var classe = ""
  var textoAviso = ""
  console.log(temperatura, idContainer, nome)
  var alertasTemperaturas = {
    temperaturaMuitoQuente: Number(resposta.temperaturaAltaCritica),
    temperaturaQuente: Number(resposta.temperaturaAltaAlerta),
    temperaturaFria: Number(resposta.temperaturaBaixaAlerta),
    temperaturaMuitoFria: Number(resposta.temperaturaBaixaCritica),
  };

  if (temperatura >= alertasTemperaturas.temperaturaMuitoQuente) {
    classe = "critico-quente";
    textoAviso = "Crítico quente"
    adicionarAlerta(nome, temperatura, idContainer, classe, textoAviso)
  } else if (
    temperatura < alertasTemperaturas.temperaturaMuitoQuente &&
    temperatura >= alertasTemperaturas.temperaturaQuente
  ) {
    classe = "emergencia-quente";
    textoAviso = "Emergência quente"

    adicionarAlerta(nome, temperatura, idContainer, classe, textoAviso)
    
  } else if (temperatura < alertasTemperaturas.temperaturaQuente && temperatura > alertasTemperaturas.temperaturaFria) {
    classe = "ideal";
    removerAlerta(idContainer)
  } else if (
    temperatura <= alertasTemperaturas.temperaturaFria &&
    temperatura > alertasTemperaturas.temperaturaMuitoFria
  ) {
    classe = "emergencia-frio";
    textoAviso = "Emergência fria"
    adicionarAlerta(nome, temperatura, idContainer, classe, textoAviso)
  } else if (temperatura <= alertasTemperaturas.temperaturaMuitoFria) {
    classe = "critico-frio";
    textoAviso = "Crítico frio"
    adicionarAlerta(nome, temperatura, idContainer, classe, textoAviso)
  }
}

function adicionarAlerta(nome, temperatura, idContainer, classe, textoAviso) {
  var indice = alertas.findIndex(item => item.idContainer == idContainer)

  if(indice >= 0) {
    alertas[indice] = {idContainer, temperatura, nome, classe, textoAviso}
  } else{
    alertas.push({idContainer, temperatura, nome, classe, textoAviso})
  }
  exibirAlertas()
}

function removerAlerta(idContainer) {
  alertas = alertas.filter(item => item.idContainer != idContainer)
  exibirAlertas()
}

function exibirAlertas() {
  div_alertas.innerHTML = ""
  for(var i = 0; i < alertas.length; i++) {
    var infoAlerta = alertas[i]
    div_alertas.innerHTML += transformarEmDiv(infoAlerta)
  }
}

function transformarEmDiv(info) {
  return `
  <div class="alerta-global">
  <div class="mensagem-alerta">
      <div class="bola-alerta ${info.classe}"></div>
      <p class="texto-alerta">${info.nome} está em estado de ${info.textoAviso}</p>
      <div class="linha-umidade-temperatura"> 
        <p>Temperatura: <span id="span_temperatura_alerta">${info.temperatura}</span>°C </p>
      </div>
  </div>
</div>
  `
  
}

obterContainersAlertas()
var atualizarAlertas = setInterval(()=> {
  obterContainersAlertas()
  
}, 5000)