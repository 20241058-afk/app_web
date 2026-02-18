const cloudname = "dzkyzf0ni";
const preset = "preset5C";

const inputf=document.getElementById("fileInput");
const imagen=document.getElementById("imagen");

const subirimg=()=>{
    const foto = inputf.files[0];

    const formData = new FormData();
    formData.append(`file`, foto);
    formData.append(`upload_preset`, preset);
    fetch(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`, {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (!response.ok) 
            throw new Error("Falla al subir la imagen");
        return response.json();
    })
    .then(data => {
        alert("Imagen subida con exito");
        imagen.src = data.secure_url;
    });
}