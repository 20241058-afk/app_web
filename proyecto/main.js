const urlApi = "https://inventariocomputo.grupoctic.com/apiEquipos.php";

const cargarEquipos = () => {
    fetch(urlApi)
        .then(respuestaEquipo => respuestaEquipo.json())
        .then(datosEquipo => {

            // Correccion: la API devuelve un objeto, el arreglo esta dentro de data
            mostrarEquipos(datosEquipo.data);
        })
        .catch(errorEquipo => {
            console.error(errorEquipo);
            alert("Error al cargar los equipos");
        });
};

const mostrarEquipos = (equipos) => {
    const contenedor = document.getElementById("contenedor-equipos");

    // Correccion: se limpia el contenedor para evitar duplicados
    contenedor.innerHTML = "";

    equipos.forEach(equipo => {
        const tarjetaEquipo = document.createElement("div");
        tarjetaEquipo.classList.add("practice-card");

        tarjetaEquipo.innerHTML = `
            <h3 class="practice-title">${equipo.nombre_equipo}</h3>
            <p><strong>Tipo:</strong> ${equipo.tipo_equipo}</p>
            <p><strong>Marca:</strong> ${equipo.marca}</p>
            <p><strong>Modelo:</strong> ${equipo.modelo}</p>
            <p><strong>Estado:</strong> ${equipo.estado}</p>
        `;

        contenedor.appendChild(tarjetaEquipo);
    });
};
