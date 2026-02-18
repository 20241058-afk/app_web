const cloudname = "dzkyzf0ni";
const preset = "preset5C";

const inputf = document.getElementById("fileInput");
const imagen = document.getElementById("imagen");
const btnSubir = document.getElementById("btnSubir");
const cargandoText = document.getElementById("cargando");

const subirimg = () => {
    const foto = inputf.files[0];

    // Primero valido que sí hayas seleccionado algo, si no, me detengo aquí
    if (!foto) return alert("¡Oye! Selecciona una imagen primero");

    const formData = new FormData();
    formData.append(`file`, foto);
    formData.append(`upload_preset`, preset);

    // Aquí desactivo el botón y muestro el texto de carga para que no des mil clicks
    btnSubir.disabled = true;
    cargandoText.classList.remove("hidden");

    fetch(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`, {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (!response.ok) throw new Error("Falla al subir la imagen");
        return response.json();
    })
    .then(data => {
        alert("¡Listo! Imagen subida con éxito");

        // AQUÍ AGREGUÉ LAS 3 TRANSFORMACIONES:
        // 1. e_grayscale: Para que se vea en Blanco y Negro.
        // 2. w_500,c_fill: Para forzar el Tamaño a 500px de ancho.
        // 3. r_max: Para que los Bordes sean totalmente Redondeados (círculo).
        const misCambios = "e_grayscale,w_500,c_fill,r_max";
        
        // Reemplazo el pedazo de la URL original para meter mis parámetros de edición
        const urlFinal = data.secure_url.replace(
            "/upload/", 
            `/upload/${misCambios}/`
        );

        // Muestro el resultado final ya transformado
        imagen.src = urlFinal;
    })
    .catch(err => {
        // Si algo sale mal (red, preset inválido, etc), te aviso por consola y alerta
        console.error("Mi error:", err);
        alert("Algo salió mal en la subida.");
    })
    .finally(() => {
        // Pase lo que pase, vuelvo a activar el botón y escondo el mensaje de carga
        btnSubir.disabled = false;
        cargandoText.classList.add("hidden");
    });
}