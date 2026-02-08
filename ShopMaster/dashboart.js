/*********************************
 * CONFIGURACIÓN GLOBAL
 *********************************/
const API_BASE = "https://dummyjson.com/products";
let skip = 0;
const limit = 10;
let totalProductos = 0;

let filtros = {
    busqueda: "",
    categoria: "",
    ordenar: null
};


/*********************************
 * LISTADO DE PRODUCTOS (index.html)
 *********************************/
const cargarProductos = () => {
    const contenedor = document.getElementById("contenedor-productos");
    if (!contenedor) return; // ⛔ no estamos en el listado

    let url = `${API_BASE}?limit=${limit}&skip=${skip}`;

    if (filtros.busqueda) {
        url = `${API_BASE}/search?q=${filtros.busqueda}`;
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {
            totalProductos = data.total || data.products.length;
            mostrarProductos(data.products);
        })
        .catch(err => console.error(err));
};

const mostrarProductos = (productos) => {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = "";

    productos.forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta-producto";

        tarjeta.innerHTML = `
            <h3>${producto.title}</h3>
            <img src="${producto.thumbnail}">
            <p>$${producto.price}</p>
            <p>${producto.category}</p>

            <button class="btn-editar">Editar</button>
            <button class="btn-eliminar">Eliminar</button>
        `;

        tarjeta.querySelector(".btn-editar").onclick = () => {
            localStorage.setItem("productoId", producto.id);
            window.location.href = "editar.html";
        };

        tarjeta.querySelector(".btn-eliminar").onclick = () => {
            eliminarProducto(producto.id, tarjeta);
        };

        contenedor.appendChild(tarjeta);
    });
};


/*********************************
 * BUSCADOR
 *********************************/ 
const formularioBusqueda = document.querySelector(".barra_busqueda");
if (formularioBusqueda) {
    formularioBusqueda.addEventListener("submit", e => {
        e.preventDefault();
        filtros.busqueda = document.getElementById("producto-buscado").value;
        skip = 0;
        cargarProductos();
    });
}


/*********************************
 * ELIMINAR PRODUCTO
 *********************************/
const eliminarProducto = (id, tarjeta) => {
    if (!confirm("¿Eliminar producto?")) return;

    fetch(`${API_BASE}/${id}`, { method: "DELETE" })
        .then(res => res.json())
        .then(() => {
            tarjeta.remove();
            alert("Producto eliminado (simulado)");
        });
};


/*********************************
 * AGREGAR PRODUCTO (add.html)
 *********************************/
const guardarproducto = () => {
    const titulo = document.getElementById("titulo");
    if (!titulo) return; // ⛔ no estamos en add.html

    const precio = document.getElementById("precio").value;
    const categoria = document.getElementById("categoria").value;
    const descripcion = document.getElementById("descripcion").value;
    const resultado = document.getElementById("mensaje-exito");

    if (!titulo.value || !precio || !descripcion) {
        alert("Completa todos los campos obligatorios");
        return;
    }

    fetch(`${API_BASE}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: titulo.value,
            price: parseFloat(precio),
            category: categoria,
            description: descripcion,
            thumbnail: `https://dummyjson.com/image/400x200/008080/ffffff?text=${titulo.value}`
        })
    })
        .then(res => res.json())
        .then(data => {
            resultado.innerHTML = `
                <p class="text-success">
                    Producto agregado<br>
                    ID: ${data.id}
                </p>
            `;
        });
};


/*********************************
 * EDITAR PRODUCTO (editar.html)
 *********************************/
const editarProducto = () => {
    const titulo = document.getElementById("titulo");
    if (!titulo) return; // ⛔ no estamos en editar.html

    const id = localStorage.getItem("productoId");
    if (!id) return;

    fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: titulo.value,
            price: parseFloat(document.getElementById("precio").value),
            category: document.getElementById("categoria").value,
            description: document.getElementById("descripcion").value,
            thumbnail: document.getElementById("imagen").value
        })
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById("mensaje-exito").innerHTML =
                "Producto actualizado (simulado)";
        });
};

// Cargar datos en editar
(() => {
    const id = localStorage.getItem("productoId");
    const titulo = document.getElementById("titulo");
    if (!id || !titulo) return;

    fetch(`${API_BASE}/${id}`)
        .then(res => res.json())
        .then(producto => {
            titulo.value = producto.title;
            document.getElementById("precio").value = producto.price;
            document.getElementById("descripcion").value = producto.description;
            document.getElementById("categoria").value = producto.category;
        });
})();


/*********************************
 * DETALLE PRODUCTO (producto.html)
 *********************************/
(() => {
    const contenedor = document.getElementById("producto-detalle");
    if (!contenedor) return;

    const id = localStorage.getItem("productoId");
    if (!id) {
        contenedor.innerHTML = "<h2>No hay producto seleccionado</h2>";
        return;
    }

    fetch(`${API_BASE}/${id}`)
        .then(res => res.json())
        .then(producto => {
            contenedor.innerHTML = `
                <h2>${producto.title}</h2>
                <img src="${producto.thumbnail}">
                <p>${producto.description}</p>
                <p>$${producto.price}</p>
            `;
        });
})();


// INICIO LISTADO
cargarProductos();
