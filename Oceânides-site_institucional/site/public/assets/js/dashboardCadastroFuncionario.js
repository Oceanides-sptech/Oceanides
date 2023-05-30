function listarFuncionario() {
  
  fetch(`/usuarios/listarFuncionario/${sessionStorage.ID_EMPRESA}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
}).then(function (resposta) {
    console.log("ESTOU NO THEN DO entrar()!")

    if (resposta.ok) {
        console.log(resposta);
        resposta.json().then((json) => {
            for(var i = 0; i < json.length; i++){
              var funcionarioAtual = json[i]
              console.log(funcionarioAtual)
              var funcao;
              if(funcionarioAtual.fk_ADM != null){
                funcao = "Funcionário"
              }else{
                funcao = "ADM"
              }
              listaPessoal.innerHTML += `
              
              ${funcionarioAtual.idUsuario},
              ${funcionarioAtual.nomeUsuario}
              ${funcionarioAtual.emailUsuario} 
              ${funcao}  <br>
              `
            }

           
        });

    } 

})
return false;
}
  