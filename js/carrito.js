// =======================
// OBTENER CARRITO DESDE LS
// =======================
let productosEnCarrito = JSON.parse(
    localStorage.getItem("productos-en-carrito")
) || [];

// =======================
// ELEMENTOS DEL DOM
// =======================
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");

const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

// =======================
// CARGAR PRODUCTOS
// =======================
function cargarProductosCarrito() {
    if (productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        contenedorCarritoProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");

            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>

                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <div class="cantidad-controles">
                        <button class="restar" data-id="${producto.id}">-</button>
                        <span>${producto.cantidad}</span>
                        <button class="sumar" data-id="${producto.id}">+</button>
                    </div>
                </div>

                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>

                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>

                <button class="carrito-producto-eliminar" data-id="${producto.id}">
                    <i class="bi bi-trash-fill"></i>
                </button>
            `;

            contenedorCarritoProductos.append(div);
        });

        actualizarBotonesEliminar();
        actualizarBotonesCantidad();
        actualizarTotal();

} else {
  contenedorCarritoVacio.classList.remove("disabled");
  contenedorCarritoProductos.classList.add("disabled");
  contenedorCarritoAcciones.classList.add("disabled");
}
}

cargarProductosCarrito();

// =======================
// SUMAR / RESTAR CANTIDAD
// =======================
function actualizarBotonesCantidad() {
    document.querySelectorAll(".sumar").forEach(boton => {
        boton.addEventListener("click", () => {
            const producto = productosEnCarrito.find(
                p => p.id === boton.dataset.id
            );
            producto.cantidad++;
            actualizarCarrito();
        });
    });

    document.querySelectorAll(".restar").forEach(boton => {
        boton.addEventListener("click", () => {
            const producto = productosEnCarrito.find(
                p => p.id === boton.dataset.id
            );

            producto.cantidad--;

            if (producto.cantidad <= 0) {
                productosEnCarrito = productosEnCarrito.filter(
                    p => p.id !== producto.id
                );
            }

            actualizarCarrito();
        });
    });
}

// =======================
// ELIMINAR PRODUCTO
// =======================
function actualizarBotonesEliminar() {
    document.querySelectorAll(".carrito-producto-eliminar").forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idProducto = e.currentTarget.dataset.id;
    const productoHTML = e.currentTarget.closest(".carrito-producto");

    productoHTML.style.opacity = "0";
    productoHTML.style.transform = "translateX(20px)";

    setTimeout(() => {
        productosEnCarrito = productosEnCarrito.filter(
            producto => producto.id !== idProducto
        );

        Toastify({
            text: "Producto eliminado",
            duration: 2500,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #4b33a8, #785ce9)",
                borderRadius: "2rem",
                fontSize: ".75rem"
            },
            offset: { x: "1.5rem", y: "1.5rem" }
        }).showToast();

        actualizarCarrito();
    }, 300);
}

// =======================
// ACTUALIZAR CARRITO
// =======================
function actualizarCarrito() {
    if (productosEnCarrito.length === 0) {
        localStorage.removeItem("productos-en-carrito");
    } else {
        localStorage.setItem(
            "productos-en-carrito",
            JSON.stringify(productosEnCarrito)
        );
    }
    cargarProductosCarrito();
    const numerito = document.querySelector("#numerito");
    if (numerito) {
        numerito.innerText = productosEnCarrito.reduce(
            (acc, producto) => acc + producto.cantidad,
            0
        );
    }
}

// =======================
// VACIAR CARRITO
// =======================
if (botonVaciar) {
    botonVaciar.addEventListener("click", () => {
        Swal.fire({
            title: "¿Estás seguro?",
            icon: "question",
            html: `Se van a borrar <strong>${productosEnCarrito.reduce(
                (acc, producto) => acc + producto.cantidad, 0
            )}</strong> productos.`,
            showCancelButton: true,
            confirmButtonText: "Sí, vaciar",
            cancelButtonText: "No"
        }).then(result => {
            if (result.isConfirmed) {
                productosEnCarrito = [];
                actualizarCarrito();
            }
        });
    });
}

// =======================
// TOTAL
// =======================
function actualizarTotal() {
    const subtotal = productosEnCarrito.reduce(
        (acc, producto) => acc + producto.precio * producto.cantidad,
        0
    );

    let descuento = 0;

    // Descuento automático si supera $200
    if (subtotal >= 200) {
        descuento = subtotal * 0.1;
        document.querySelector("#linea-descuento").classList.remove("hidden");
        document.querySelector("#descuento").innerText = `-$${descuento.toFixed(2)}`;
    } else {
        document.querySelector("#linea-descuento").classList.add("hidden");
    }

    const totalFinal = subtotal - descuento;

    document.querySelector("#subtotal").innerText = `$${subtotal.toFixed(2)}`;
    document.querySelector("#total").innerText = `$${totalFinal.toFixed(2)}`;
}

// =======================
// COMPRAR
// =======================
if (botonComprar) {
    botonComprar.addEventListener("click", () => {
        Swal.fire({
            title: "¡Pedido listo!",
            text: "¿Qué deseas hacer ahora?",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "Seguir comprando",
            cancelButtonText: "Ir a checkout",
            background: "#121212",
            color: "#fff"
        }).then(result => {
            if (result.isConfirmed) {
                window.location.href = "index.html";
            } else {
                window.location.href = "checkout.html";
            }
        });
    });
}

const btnFinalizar = document.querySelector("#btn-finalizar");

if (btnFinalizar) {
    btnFinalizar.addEventListener("click", e => {
        if (productosEnCarrito.length === 0) {
            e.preventDefault();
            alert("Tu carrito está vacío");
        }
    });
}
