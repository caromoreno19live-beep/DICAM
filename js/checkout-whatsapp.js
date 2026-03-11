const productos = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

const contenedor = document.querySelector("#checkout-productos");
const totalHTML = document.querySelector("#checkout-total");

let total = 0;

productos.forEach(p => {
  const div = document.createElement("div");
  div.classList.add("checkout-item");

  div.innerHTML = `
    <p>${p.titulo} x${p.cantidad}</p>
    <span>$${p.precio * p.cantidad}</span>
  `;

  total += p.precio * p.cantidad;
  contenedor.append(div);
});

totalHTML.innerText = `$${total}`;
document.querySelector("#checkout-form").addEventListener("submit", e => {
  e.preventDefault();

  const nombre = document.querySelector("#nombre").value;
  const telefono = document.querySelector("#telefono").value;
  const talla = document.querySelector("#talla").value;
  const direccion = document.querySelector("#direccion").value;

  let mensaje = `Hola DICAM 👋%0A`;
  mensaje += `Soy ${nombre}%0A`;
  mensaje += `Tel: ${telefono}%0A`;
  mensaje += `Talla: ${talla}%0A`;
  mensaje += `Dirección: ${direccion}%0A%0A`;
  mensaje += `🛒 Pedido:%0A`;

  productos.forEach(p => {
    mensaje += `- ${p.titulo} x${p.cantidad} ($${p.precio * p.cantidad})%0A`;
  });

  mensaje += `%0ATotal: $${total}`;

localStorage.removeItem("productos-en-carrito");

const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

pedidos.push({
  nombre,
  telefono,
  talla,
  direccion,
  productos,
  total,
  fecha: new Date().toLocaleString()
});

localStorage.setItem("pedidos", JSON.stringify(pedidos));


  window.open(
    `https://wa.me/573123179073?text=${mensaje}`,
    "_blank"
  );
  window.location.href = "pedido-enviado.html";
});