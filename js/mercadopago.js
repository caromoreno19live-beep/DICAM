import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN
});

export const crearPreferencia = async (req, res) => {
  const items = req.body.productos.map(p => ({
    title: p.titulo,
    quantity: p.cantidad,
    unit_price: p.precio
  }));

  const preference = {
    items,
    back_urls: {
      success: "https://tusitio.com/pedido-enviado.html",
      failure: "https://tusitio.com/checkout.html"
    },
    auto_return: "approved"
  };

  const response = await mercadopago.preferences.create(preference);
  res.json({ id: response.body.id });
};
