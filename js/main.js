let productos = [];
let carrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

const contenedorProductos = document.querySelector("#productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const botonesSubcategorias = document.querySelectorAll(".boton-subcategoria");
const numerito = document.querySelector("#numerito");
let categoriaActiva = "todos";
let subcategoriaActiva = "todos";

fetch("./js/productos.json")
.then(res => res.json())
.then(data => {
  productos = data;
    aplicarFiltros();
  actualizarNumerito();
});


function cargarProductos(lista) {
  contenedorProductos.innerHTML = "";

  lista.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto");

    div.innerHTML = `
      <img src="${producto.imagen}" class="producto-imagen">
      <div class="producto-detalles">
        <h3>${producto.titulo}</h3>
        <p>$${producto.precio}</p>
        <button class="producto-agregar" data-id="${producto.id}">Agregar</button>
      </div>
    `;

    contenedorProductos.append(div);
  });
}
function aplicarFiltros() {
  let listaFiltrada = [...productos];

  if (categoriaActiva !== "todos") {
    listaFiltrada = listaFiltrada.filter(p => p.categoria === categoriaActiva);
  }

  if (subcategoriaActiva !== "todos") {
    listaFiltrada = listaFiltrada.filter(p => p.genero === subcategoriaActiva);
  }

  cargarProductos(listaFiltrada);
}

botonesCategorias.forEach(boton => {
  boton.addEventListener("click", () => {
    botonesCategorias.forEach(b => b.classList.remove("active"));
    boton.classList.add("active");
    categoriaActiva = boton.id;
    aplicarFiltros();
  });
});

    botonesSubcategorias.forEach(boton => {
  boton.addEventListener("click", () => {
    botonesSubcategorias.forEach(b => b.classList.remove("active"));
    boton.classList.add("active");
    subcategoriaActiva = boton.id.replace("sub-", "");
    aplicarFiltros();
  });
});

contenedorProductos.addEventListener("click", e => {
  if (e.target.classList.contains("producto-agregar")) {
    const id = e.target.dataset.id;
    const prod = productos.find(p => p.id === id);
    const existente = carrito.find(p => p.id === id);

    if (existente) existente.cantidad++;
    else carrito.push({ ...prod, cantidad: 1 });

    localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
    actualizarNumerito();
  }
});

function actualizarNumerito() {
  numerito.innerText = carrito.reduce((acc, p) => acc + p.cantidad, 0);
}

// animación productos

window.addEventListener("scroll",()=>{

const productos=document.querySelectorAll(".producto");

productos.forEach(p=>{

const pos=p.getBoundingClientRect().top;
const screen=window.innerHeight;

if(pos<screen-100){
p.style.opacity=1;
p.style.transform="translateY(0)";
}

});

});