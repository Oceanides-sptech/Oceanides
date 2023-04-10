var menuFechado = document.getElementById("menu-fechado");
var menuAberto = document.getElementById("menu-aberto");
function abrirFecharMenu() {
    if (menuFechado.style.display == "flex") {
        menuFechado.style.display = "none";
        menuAberto.style.display = "flex";
       
    }else{
        menuAberto.style.display = "none";
        menuFechado.style.display = "flex";
    }
}
