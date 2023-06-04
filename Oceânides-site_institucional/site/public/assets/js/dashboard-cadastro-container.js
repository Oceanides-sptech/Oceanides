function validar() {
    var nome = input_nome.value;
    var faixa = Number(slFaixaTemperatura.value);
    var codigo = input_codigo.value;

    var camposVazio =
      nome == "" || faixa == "0" || codigo == "";
    if (camposVazio) {
      div_mensagem_confirmacao.innerHTML = `<span style= "color: #DC3545">Preencha todos os campos para realizar o cadastro!</span>`;
    } else {
        faixa = Number(faixa)
      cadastrar(nome, faixa, codigo)
    }
  }

function cadastrar(nome, faixa, codigo) {
    fetch("/containers/cadastrarContainer", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nome,
            fkTemperaturaServer: faixa,
            fkEmpresaServer: sessionStorage.ID_EMPRESA,
            codigoServer: codigo
        })
    }).then(function(resposta){
      div_mensagem_confirmacao.innerHTML = "<span  style= 'color: #00a91b' >Container ativado com sucesso</span>"
      setTimeout(function() {
        div_mensagem_confirmacao.innerHTML = "<span  style= 'color: #00a91b' >Container ativado com sucesso.</span>"
      },1000)
      setTimeout(function() {
        div_mensagem_confirmacao.innerHTML = "<span  style= 'color: #00a91b' >Container ativado com sucesso..</span>"
      },2000)
      setTimeout(function() {
        div_mensagem_confirmacao.innerHTML = "<span  style= 'color: #00a91b' >Container ativado com sucesso...</span>"

      },3000)
      setTimeout(function() {
        window.location.href = "containers.html"
      },4000)
    })
}