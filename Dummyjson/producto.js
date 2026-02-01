// Obtener el ID del producto desde localStorage
const idProducto = localStorage.getItem("productoId");

// Contenedor donde se mostrará el detalle del producto
const contenedor = document.getElementById("producto-detalle");

// Validamos que exista un ID guardado
if (!idProducto) {

    // Si no hay ID, mostramos mensaje de error
    contenedor.innerHTML = "<h2>No se seleccionó ningún producto</h2>";

} else {

    // Llamada a la API para obtener SOLO el producto seleccionado
    fetch(`https://dummyjson.com/products/${idProducto}`)
        .then(respuesta => respuesta.json())
        .then(producto => {
            mostrarProducto(producto);
        })
        .catch(error => {
            console.error("Error al cargar el producto:", error);
            contenedor.innerHTML = "<h2>Error al cargar el producto</h2>";
        });
}

// Función para mostrar el producto en pantalla
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

                <!-- Botón para regresar -->
                <button onclick="history.back()">⬅ Volver</button>
            </div>
        </section>
    `;
};
