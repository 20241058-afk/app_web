// Obtener el id del producto desde la URL
const params = new URLSearchParams(window.location.search);
const idProducto = params.get("id");

// Contenedor principal
const contenedor = document.getElementById("producto-detalle");

// Llamada a la API para obtener solo el producto seleccionado
fetch(`https://dummyjson.com/products/${idProducto}`)
    .then(respuesta => respuesta.json())
    .then(producto => {
        mostrarProducto(producto);
    })
    .catch(error => {
        console.error("Error:", error);
        contenedor.innerHTML = "<h2>Error al cargar el producto</h2>";
    });

// Mostrar producto en pantalla completa
const mostrarProducto = (producto) => {
    contenedor.innerHTML = `
        <section class="producto-completo">
            <div class="imagen">
                <img src="${producto.thumbnail}" alt="${producto.title}">
            </div>

            <div class="info">
                <h1>${producto.title}</h1>
                <p class="descripcion">${producto.description}</p>

                <p><strong>Precio:</strong> $${producto.price}</p>
                <p><strong>Rating:</strong> ${producto.rating}</p>
                <p><strong>Categoría:</strong> ${producto.category}</p>
                <p><strong>Stock:</strong> ${producto.stock}</p>

                <button onclick="history.back()">⬅ Volver</button>
            </div>
        </section>
    `;
};
