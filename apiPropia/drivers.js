// drivers.js

const contenedor = document.getElementById("contenedor-productos");
const cmbYear = document.getElementById("cmbYear");
const inputBuscar = document.getElementById("piloto-buscado");

let pilotosGlobal = [];
let yearActual = cmbYear.value || 2026;

// Generar años de 2026 a 2000
cmbYear.innerHTML = ''; // Limpiar opciones actuales

for (let year = 2026; year >= 2000; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    cmbYear.appendChild(option);
}

// Obtener pilotos por año
const obtenerPilotosPorYear = year => {
    fetch(`https://f1api.dev/api/${year}/drivers`)
        .then(res => res.json())
        .then(data => {
            pilotosGlobal = data.drivers;
            mostrarPilotos(pilotosGlobal);
        })
        .catch(err => {
            console.error("Error al cargar pilotos:", err);
            contenedor.innerHTML = "<p>Error al cargar pilotos</p>";
        });
};

// Buscar piloto por nombre
const buscarPilotosAPI = texto => {
    fetch(`https://f1api.dev/api/drivers/search?q=${encodeURIComponent(texto)}`)
        .then(res => res.json())
        .then(data => mostrarPilotos(data.drivers ?? []))
        .catch(err => console.error("Error en búsqueda:", err));
};

// Mostrar pilotos en tarjetas
const mostrarPilotos = pilotos => {
    contenedor.innerHTML = "";

    if (!pilotos || pilotos.length === 0) {
        contenedor.innerHTML = `<p style="text-align:center;">No se encontraron pilotos</p>`;
        return;
    }

    pilotos.forEach(p => {
        const card = document.createElement("div");
        card.className = "tarjeta-producto";

        card.innerHTML = `
            <h3 class="title">${p.name} ${p.surname}</h3>
            <p><strong>Número:</strong> ${p.number ?? "N/A"}</p>
            <p><strong>Nacionalidad:</strong> ${p.nationality}</p>
            <p><strong>Escudería:</strong> ${p.teamId ?? "N/A"}</p>
            <button class="btn-detalle">Ver detalle</button>
        `;

        // Evento para ver detalle
       card.querySelector(".btn-detalle").addEventListener("click", () => {
            window.location.href = `driver.html?id=${p.driverId}`;
        });



        contenedor.appendChild(card);
    });
};

// Cambiar año
const cambiarYear = () => {
    yearActual = cmbYear.value;
    obtenerPilotosPorYear(yearActual);
};

// Buscar piloto desde el formulario
const buscarPiloto = e => {
    e.preventDefault();
    const texto = inputBuscar.value.trim();
    if (texto === "") {
        mostrarPilotos(pilotosGlobal);
    } else {
        buscarPilotosAPI(texto);
    }
};

// Eventos
cmbYear.addEventListener("change", cambiarYear);
document.querySelector(".barra_busqueda").addEventListener("submit", buscarPiloto);

// Inicialización
obtenerPilotosPorYear(yearActual);
