document.getElementById('use-gps').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            // You can now use the lat and lon variables to send to the Open-Meteo API
            // You might want to update the location input field with this information
            document.getElementById('location').value = 'Lat: ' + lat + ', Lon: ' + lon;
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});