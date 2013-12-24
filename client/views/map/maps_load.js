/* global  */
gmaps = {

    initialise: function() {
        var mapOptions = {
            center: new google.maps.LatLng(-34.397, 150.644),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);
        infowindow = new google.maps.InfoWindow();
        geocoder = new google.maps.Geocoder();

        Session.set('map', true);

    }
}
