const coleccion_docentes=[
    {
        nombre:"Luis Alberto",
        apellidos:"Mendoza San Juan",
        puesto:"Profesor investigador",
        edad:41,
        estado:true
    },
    {
        nombre:"med. Efren",
        apellidos:"Juarez Castillo",
        puesto:"Profesor investigador",
        edad:55,
        estado:true
    },
    {
        nombre:"Hermes",
        apellidos:"Salazar Casanova",
        puesto:"Profesor investigador",
        edad:43,
        estado:true
    }
]

const mostrar=()=>{
    //rescatamos el div que va a contener la informacion 
    const contenedor = document.getElementById("contenedor")

    //limpiamos el contenedor para que no se repitan los elementos 
    contenedor.innerHTML=""

    coleccion_docentes.forEach((docente)=>{
        if(docente.estado==true){
            contenedor.innerHTML+="<div class='tarjeta'>"+
            "<h2>"+docente.nombre+"</h2>"+"</div>"
        }

    })

    
}