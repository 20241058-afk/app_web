const baseDeDatosCloud = [
    { nombre: "Amazon EC2", tipo: "IaaS", estado: "Activo", costo: 35.00 },
    { nombre: "Google Drive Enterprise", tipo: "SaaS", estado: "Activo", costo: 12.50 },
    { nombre: "Heroku App Server", tipo: "PaaS", estado: "Inactivo", costo: 0.00 },
    { nombre: "Azure Virtual Machines", tipo: "IaaS", estado: "Activo", costo: 40.00 }
];

const cargarServicios = () => {


    const contenedor = document.getElementById("contenedor-servicios")
    // Limpiar el contenedor antes de cargar nuevamente
    contenedor.innerHTML = "";
    
    baseDeDatosCloud.forEach(servicio => {

        // Reto lógico
         const claseEstado =
            servicio.estado === "Activo"
                ? "text-success fw-bold"
                : "text-danger fw-bold";



        // Crear la tarjeta usando Template Strings
        const tarjetaHTML = `
            <div class="col-md-3">
                <div class="card h-100 shadow">
                    <div class="card-body text-dark">
                        <h5 class="card-title">${servicio.nombre}</h5>
                        <p class="card-text"><strong>Tipo:</strong> ${servicio.tipo}</p>
                        <p class="card-text">
                            <strong>Estado:</strong>
                            <span class="${claseEstado}">
                                ${servicio.estado}
                            </span>
                        </p>
                        <p class="card-text">
                            <strong>Costo mensual:</strong> $${servicio.costo.toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>
        `;

        // Inyectar la tarjeta en el contenedor
        contenedor.innerHTML += tarjetaHTML;
    });
};