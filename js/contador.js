function actualizarNumerito() {
    const numerito = document.querySelector("#numerito");
    if (!numerito) return;

    const carrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
    numerito.innerText = carrito.reduce((acc, p) => acc + p.cantidad, 0);
}
actualizarNumerito();
