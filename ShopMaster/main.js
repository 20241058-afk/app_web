const urlAPi="https://dummyjson.com/products?limit=32"
const cargarProductos=()=>{
    fetch(urlAPi)
        .then(respuesta=>respuesta.json())
        .then(datos=>{
            const productos=datos.products;

            console.log("Datos recibidos:", datos);

            mostrarProductos(productos);
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error);
            alert("Hubo un error al cargar los datos. Revisa la consola.");
        })
}
const mostrarProductos=(productos)=>{
    const contenedor=document.getElementById("contenedor-productos");
    contenedor.innerHTML="";
    
    productos.forEach(producto => {
        const tarjeta=document.createElement("div");
        tarjeta.className="tarjeta-producto";
        tarjeta.innerHTML=`
            <h3 class="title">${producto.title}</h3>
            <img src="${producto.thumbnail}" alt="${producto.title}">
            <p><strong>Precio: </strong> $${producto.price}</p>
            <p><strong>Rating: </strong>     ${producto.rating}</p>
            <p><strong>Categoria: </strong> ${producto.category}</p>
            <button class="btn-detalle">Detalles</button>
        `;
        

        tarjeta.querySelector(".btn-detalle")
                .addEventListener("click", () => {
                    
                // Guardamos el ID del producto en localStorage
                localStorage.setItem("productoId", producto.id);

                // Redirigimos a la página de detalle SIN mostrar el ID en la URL
                window.location.href = "../ShopMaster/producto.html";
                });

            contenedor.appendChild(tarjeta);
        });

}

const buscarProducto = () => {

    const productoBuscado = document.getElementById("producto-buscado").value;
    fetch(`https://dummyjson.com/products/search?q=${productoBuscado}`)
        .then(res => res.json())
        .then(data => {
            console.log("Resultados de búsqueda:", data);
            mostrarProductos(data.products);
        });
       
}
// Este bloque controla el envío del formulario
const Busqueda = document.querySelector(".barra_busqueda");

Busqueda.addEventListener("submit", (event) => {
    // Evita que la página se refresque y aparezca el color azul
    event.preventDefault(); 
    
    // Ejecuta tu función de búsqueda
    buscarProducto(); 
});