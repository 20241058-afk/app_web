// driver.js

const cargarPiloto = () => {

    const contenedor = document.getElementById("detalle-piloto");

    // Obtener ?id= desde la URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        contenedor.innerHTML = "<h2>No se especificó ningún piloto</h2>";
        return;
    }

    fetch(`https://f1api.dev/api/drivers/${id}`)
        .then(res => res.json())
        .then(data => {

            if (!data.driver || data.driver.length === 0) {
                contenedor.innerHTML = "<h2>Piloto no encontrado</h2>";
                return;
            }

            const piloto = data.driver[0];

            contenedor.innerHTML = `
                <section class="piloto-completo">
                    <div class="info">
                        <h1>${piloto.name} ${piloto.surname}</h1>
                        <p><strong>Nacionalidad:</strong> ${piloto.nationality ?? "N/A"}</p>
                        <p><strong>Fecha de nacimiento:</strong> ${piloto.birthday ?? "N/A"}</p>
                        <p><strong>Número:</strong> ${piloto.number ?? "N/A"}</p>
                        <p><strong>Abreviatura:</strong> ${piloto.shortName ?? "N/A"}</p>
                        <p>
                            <a href="${piloto.url}" target="_blank">
                                Ver más información
                            </a>
                        </p>
                    </div>
                </section>
            `;
        })
        .catch(error => {
            console.error(error);
            contenedor.innerHTML = "<h2>Error al cargar piloto</h2>";
        });
};

// Ejecutar
cargarPiloto();
    
