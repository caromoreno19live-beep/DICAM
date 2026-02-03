document.querySelector("#checkout-form").addEventListener("submit", async e => {
  e.preventDefault();

  const carrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

  const res = await fetch("http://localhost:3000/stripe/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items: carrito.map(p => ({
        price_data: {
          currency: "eur",
          product_data: { name: p.titulo },
          unit_amount: p.precio * 100
        },
        quantity: p.cantidad
      }))
    })
  });

  const data = await res.json();
  window.location.href = data.url;
});
