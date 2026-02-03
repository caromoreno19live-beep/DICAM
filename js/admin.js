const token = localStorage.getItem("token");
if (!token) location.href = "login.html";

const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
};

// cargar productos
fetch("http://localhost:3000/products")
.then(res => res.json())
.then(data => renderProducts(data));

function renderProducts(products) {
    document.getElementById("products").innerHTML =
        products.map(p => `
            <p>
                ${p.titulo} - $${p.precio}
                <button onclick="eliminar('${p._id}')">🗑</button>
            </p>
        `).join("");
}

// crear producto
document.getElementById("product-form").addEventListener("submit", e => {
    e.preventDefault();

    const producto = {
        titulo: titulo.value,
        precio: precio.value,
        imagen: imagen.value,
        categoria: categoria.value
    };

    fetch("http://localhost:3000/products", {
        method: "POST",
        headers,
        body: JSON.stringify(producto)
    })
    .then(() => location.reload());
});

function eliminar(id) {
    fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
        headers
    }).then(() => location.reload());
}
