var menuFechado = document.getElementById("menu-fechado");
var menuAberto = document.getElementById("menu-aberto");
function abrirFecharMenu() {
    if (menuFechado.style.display == "flex") {
        menuFechado.style.display = "none";
        menuAberto.style.display = "flex";
       
    }else{
        menuFechado.style.display = "flex";
        menuAberto.style.display = "none";
    }
}
animate__slideOutLeft