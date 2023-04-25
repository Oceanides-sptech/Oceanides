var menuFechado = document.getElementById("menu-fechado");
var menuAberto = document.getElementById("menu-aberto");
var conteudosDashboard = document.getElementsByClassName("conteudo").style;
function abrirFecharMenu() {
  if (menuFechado.style.display == "flex") {
    menuFechado.style.display = "none";
    menuAberto.style.display = "flex";
    conteudo.style.width = "75%";
  
  } else {
    menuAberto.style.display = "none";
    menuFechado.style.display = "flex";
    conteudo.style.width = "95%";
    
  }
}

function sair() {
  window.location.href = "../index.html";
}
