let productos = [];
let carrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

const contenedorProductos = document.querySelector("#productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const numerito = document.querySelector("#numerito");

fetch("./js/productos.json")
.then(res => res.json())
.then(data => {
  productos = data;
  cargarProductos(productos);
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

botonesCategorias.forEach(boton => {
  boton.addEventListener("click", () => {
    botonesCategorias.forEach(b => b.classList.remove("active"));
    boton.classList.add("active");

    if (boton.id === "todos") {
      cargarProductos(productos);
    } else {
      cargarProductos(productos.filter(p => p.categoria === boton.id));
    }
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
