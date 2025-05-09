document.addEventListener("DOMContentLoaded", function(){
    let navegacion = document.querySelector(' header#responsive nav');
navegacion.id = "nav"

let contenedorIcono = document.querySelector(' header#responsive>section>div.derecha>div');
contenedorIcono.classList.add("nav-responsive");
contenedorIcono.addEventListener('click', mostrarOcultarMenu);

let icono = document.querySelector('header>section>div.derecha>div>i');
icono.classList.add("fa-solid", "fa-bars");

let menuVisible = false
//funcioin para ocultar y mostrar menu
function mostrarOcultarMenu(){
    if(menuVisible){
        document.querySelector(' header#responsive nav').classList=""
        menuVisible = false
    }else{
        document.querySelector(' header#responsive nav').classList="responsive"
        menuVisible = true
    }
}

function seleccionar(){
    document.querySelector(' header#responsive nav').classList = "";
    menuVisible = flase;
}


});