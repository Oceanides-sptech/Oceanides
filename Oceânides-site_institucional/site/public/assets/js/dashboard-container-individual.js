
var idContainer =  sessionStorage.ID_CONTAINER_INDIVIDUAL

function obterDadosContainer() {
    fetch(`http://localhost:3333/containers/dadosContainer/${idContainer}`,{ cache: 'no-store' })
    .then(function name(resposta) {
        resposta.json().then((json)=>{
            console.log(json)
        })
    })
}