// driver.js

function cargarPiloto() {
    const contenedor = document.getElementById("detalle-piloto");

    // Obtener todo el objeto piloto desde localStorage
    const piloto = JSON.parse(localStorage.getItem("pilotoSeleccionado"));
    console.log("Piloto seleccionado:", piloto); // para depuración

    if (!piloto) {
        contenedor.innerHTML = "<h2>No se seleccionó ningún piloto</h2>";
        return;
    }

    // Mostrar los datos directamente
    contenedor.innerHTML = `
        <section class="piloto-completo">
            <div class="info">
                <h1>${piloto.name} ${piloto.surname}</h1>
                <p><strong>Nacionalidad:</strong> ${piloto.nationality ?? "N/A"}</p>
                <p><strong>Fecha de nacimiento:</strong> ${piloto.birthday ?? "N/A"}</p>
                <p><strong>Número:</strong> ${piloto.number ?? "N/A"}</p>
                <p><strong>Escudería:</strong> ${piloto.teamId ?? "N/A"}</p>
                <a href="drivers.html">⬅ Volver</a>
            </div>
        </section>
    `;
}
