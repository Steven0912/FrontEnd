(function () {

    function UserLocation(callback) {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (location) {
                callback({
                    lat: location.coords.latitude,
                    lng: location.coords.longitude
                });
            });
        } else {
            alert("No se puede detectar el lugar en el que te encuentras");
        }
    }

    var my_place = {
        lat: 3.459,
        lng: -76.5311833
    };

    google.maps.event.addDomListener(window, "load", function () {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: my_place,
            zoom: 15
        });

        var marker = new google.maps.Marker({
            map: map,
            position: my_place,
            title: "Restaurante Happy Happy",
            visible: true
        });

        new UserLocation(function (coords) {
            // Calcular distancia del restaurante al usuario

            var origen = new google.maps.LatLng(coords.lat, coords.lng);
            var destino = new google.maps.LatLng(my_place.lat, my_place.lng);

            var service = new google.maps.DistanceMatrixService();

            service.getDistanceMatrix({
                origins: [origen],
                destinations: [destino],
                travelMode: google.maps.TravelMode.DRIVING
            }, function (response, status) {
                if (status === google.maps.DistanceMatrixStatus.OK) {
                    var duration_element = response.rows[0].elements[0];
                    const duration_travel = duration_element.duration.text;
                    document.querySelector("#message").innerHTML ="Estás a "+ duration_travel + " de una noche inolvidable <span class='dancing-script medium'>" +
                        "Restaurante Happy Happy</span>";
                }
            });
        });
    });
})();