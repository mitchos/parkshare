/* global Marker google  */
gmaps = {


    addMarker: function(Location) {

        for (var i in Location) {
            var lat = Location[i].lat;
            var lng = Location[i].lng;
            var addr = Location[i].address;
            var latlng = new google.maps.LatLng(lat, lng);

            // Add the marker
            gMarker = new google.maps.Marker({
                position: latlng,
                map: this.map,
                title: addr
            });

            // Create the infowindow for each marker
            google.maps.event.addListener(gMarker, 'click', function() {
                infoWindow.open(this.map, this);
                infoWindow.setContent(this.title);
                // Streetview testing

            });


        }
    },


    initialise: function() {
        console.log("[+] Intializing Google Maps...");

        var mapOptions = {
            center: new google.maps.LatLng(-25.274398, 133.77513599999997),
            zoom: 4,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: greenStyle
        };
        
        // Set map global variables
        map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);
        this.map = map;
        infoWindow = new google.maps.InfoWindow();
        geocoder = new google.maps.Geocoder();

        /* Check if browser supports geolocation then ask to add users current location
         to center of the map*/
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                console.log('[+] Centering map on user location');
                map.setCenter(initialLocation);
                map.setZoom(13);
            });
        }

        Session.set('map', true);
    }
};
