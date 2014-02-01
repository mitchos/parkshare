/* global Marker google map infoWindow  */
gmaps = {

    // Initialises all map settings when page is loaded
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


        // Create the autocomplete object, restricting the search
        // to geographical location types.

        // When the user selects an address from the dropdown,
        // populate the address fields in the form.

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
    },

    // Add marker to the map
    addMarker: function(Location) {

        for (var i in Location) {
            var lat = Location[i].lat;
            var lng = Location[i].lng;
            var addr = Location[i].address;
            var latlng = new google.maps.LatLng(lat, lng);

            // Add the marker
            gMarker = new google.maps.Marker({
                position: latlng,
                map: map,
                title: addr,
            });

            // Create the infowindow for each marker
            google.maps.event.addListener(gMarker, 'click', function() {
                infoWindow.open(this.map, this);
                infoWindow.setContent(this.title);
                // Streetview testing

            });
        }
    },

    // Autocomplete function to geolocate the address given
    geolocate: function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var geolocation = new google.maps.LatLng(
                position.coords.latitude, position.coords.longitude);
                autocomplete.setBounds(new google.maps.LatLngBounds(geolocation,
                geolocation));
            });
        }
    },

    // Watches for autocomplete input boxes and adds the autocomplete event
    // handler
    watchAutocomplete: function(input) {
        var autocomplete;
        autocomplete = new google.maps.places.Autocomplete(
        /** @type {HTMLInputElement} */
        (document.getElementById(input)), {
            types: ['geocode']
        });
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            place = autocomplete.getPlace();
        });

        console.log(autocomplete);
    },

    // Geocodes any address supplied and returns results if geocode is OK
    geoCode: function(address) {
        geocoder = new google.maps.Geocoder();

        geocoder.geocode({
            'address': address
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                 map.setZoom(14);
                
            }
        });
        
    }
};
