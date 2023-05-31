select_funcionario.innerHTML += `<option value=${sessionStorage.ID_USUARIO}>Funcionario</option>`;

function validar() {
  var nome = input_nome.value;
  var email = input_email.value;
  var senha = input_senha.value;
  var confirmacao_senha = input_confirmar_senha.value;
  var funcao = select_funcionario.value;

  var campoVazio =
    nome == "" ||
    email == "" ||
    senha == "" ||
    confirmacao_senha == "" ||
    funcao == "0";

  var validacao = senha == confirmacao_senha;

  var email_valido = email.indexOf("@") >= 0 && email.indexOf(".") >= 0;

  if (!campoVazio) {
    if (email_valido) {
      mensagem.innerHTML =
        "<p class='ok'>Funcionário cadastrado com sucesso!</p>";
      cadastrarFuncionario(nome, email, senha, funcao);
    } else {
      mensagem.innerHTML = `<p class='erro '>Insirsa um e-mail válido!</p>`;
    }

    if (!validacao) {
      mensagem.innerHTML = `<p class='erro'>Senha e confirmação de senha diferentes</p>`;
    }
  } else {
    mensagem.innerHTML = `<p class='erro'>Preencha todos os campos!</p>`;
  }
}

function cadastrarFuncionario(nome, email, senha, funcao) {
  if (funcao == "null") {
    funcao = null;
  }

  fetch("/usuarios/cadastrarFuncionario", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      emailServer: email,
      nomeServer: nome,
      senhaServer: senha,
      fkADMServer: funcao,
      idEmpresaServer: sessionStorage.ID_EMPRESA,
    }),
  }).then(function (resposta) {
    resposta.json().then(function (json) {
      if (resposta.ok) {
        console.log(json);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else console.log(json);
    });
  });
}
function listarFuncionario() {
  fetch(`/usuarios/listarFuncionario/${sessionStorage.ID_EMPRESA}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function (resposta) {
    console.log("ESTOU NO THEN DO entrar()!");

    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then((json) => {
        for (var i = 0; i < json.length; i++) {
          var funcionarioAtual = json[i];
          console.log(funcionarioAtual);
          var funcao;
          if (funcionarioAtual.fk_ADM != null) {
            funcao = "Funcionário";
          } else {
            funcao = "ADM";
          }
          listaFuncionarios.innerHTML += `
             
          <div class="linhaLista">
          <div class="itemLista">
            <span>${funcionarioAtual.nomeUsuario}</span> 
          </div>
          <div class="itemLista email">
            <span>${funcionarioAtual.emailUsuario}</span> 
          </div>
          <div class="itemLista">
            <span>${funcao}</span> 
          </div>
        </div>
        
              `;
        }
      });
    }
  });
  return false;
}
