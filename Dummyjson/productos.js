const urlAPi="https://dummyjson.com/products"
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
            <p><strong>Rating: </strong> ${producto.rating}</p>
            <p><strong>Categoria: </strong> ${producto.category}</p>
            <button class="btn-detalle">Detalles</button>
        `;
        

        tarjeta.querySelector(".btn-detalle")
                .addEventListener("click", () => {
                    window.location.href = `../Dummyjson/producto.html?id=${producto.id}`;
                });

            contenedor.appendChild(tarjeta);
        });

}
