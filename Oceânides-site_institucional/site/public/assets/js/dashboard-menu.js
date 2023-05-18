var menuFechado = document.getElementById("menu-fechado");
var menuAberto = document.getElementById("menu-aberto");
var conteudosDashboard = document.getElementsByClassName("conteudo").style;
function abrirFecharMenu() {
  if (menuFechado.style.display == "flex") {
    menuFechado.style.width = "15%";
    menuFechado.style.display = "none";
    menuAberto.style.display = "flex";

    menuAberto.style.animation = "aumentarMenu";
    menuAberto.style.animationDuration = "1s";
    menuAberto.style.width = "15%";


    conteudo.style.width = "85%";
  } else {
    menuAberto.style.width = "5%";
    menuAberto.style.display = "none";
    menuFechado.style.display = "flex";
    menuFechado.style.animation = "diminuirMenu";
    menuFechado.style.animationDuration = "0.5s";
    menuFechado.style.width = "5%";
    conteudo.style.width = "95%";
  }
}

function limparSessao() {
  window.location.assign("../index.html");
}
