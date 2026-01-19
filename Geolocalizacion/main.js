const cordenanda=document.getElementById("parrafo")
const enlace=document.getElementById("enlace")

const obtener=()=>{
    //verificamos que el navegador tenga soporte para geolocalizacion
    if(navigator.geolocation){
        cordenanda.innerText="Localizando...."
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                const longitud=position.coords.longitude
                const latitud=position.coords.latitude

                cordenanda.innerText="Latitud = "+latitud+" Longitud = "+longitud;
                enlace.href="https://www.google.com/maps?q="+latitud+","+longitud;
                enlace.style.display="block";
                //alert("longitud : "+longitud+" Latidud : "+latitud)
            },
            (error)=>{
                cordenanda.innerText="No se pudo obtener la ubicacion"
            })
    }else{

    }
}

 
