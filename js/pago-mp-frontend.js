const mp = new MercadoPago("TU_PUBLIC_KEY", {
  locale: "es-CO"
});

document.querySelector("#btn-mercadopago").addEventListener("click", async () => {
  const productos = JSON.parse(localStorage.getItem("productos-en-carrito"));

  const res = await fetch("/api/pagos/crear-preferencia", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productos })
  });

  const data = await res.json();

  mp.checkout({
    preference: { id: data.id },
    autoOpen: true
  });
});
