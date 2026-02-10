let lat
let lon

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
        (respuesta)=>{
            lat=respuesta.coords.latitude
            lon=respuesta.coords.longitude

            const coordenadas=[lat,lon]

            //let map = L.map('map').setView(coordenadas, 19);
            let map = L.map('map').setView([lat, lon], 19);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 22,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            let marcador = L.marker([lat, lon]).addTo(map);
            marcador.bindPopup('<b>esta es es la ubicacion de mi casa.....</b><br>Mis corrdenadas son : <br>latitud : '+lat+'<br>longitud : '+lon).openPopup()

            var polygon = L.polygon([
                [21.171405, -98.432113],
                [21.171358, -98.432011],
                [21.171299, -98.432079],
                [21.171274, -98.432106],
                [21.171332, -98.432191]
            ]).addTo(map);

            polygon.bindPopup("pertimetro de mi casa exacto").openPopup();
            //alert(lat+" , "+lon)
        },
        ()=>{}


    )


}else{

}