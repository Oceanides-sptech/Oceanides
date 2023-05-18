function validarSessao() {
    // aguardar();

    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    if (email != null && nome != null) {
        // window.alert(`Seja bem-vindo, ${nome}!`);
    

        // finalizarAguardar();
    } else {
        window.location = "../login.html";
    }
}
function verificarAdm() {
    if(sessionStorage.FK_ADM == 'null'){

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
        `
        
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
        `
        
    }
}



function limparSessao() {
    // aguardar();
    sessionStorage.clear();
    // finalizarAguardar();
    window.location = "../login.html";
}