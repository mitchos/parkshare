/* global google Template Session Deps Parks infowindow*/
Template.maps.rendered = function() {

    if (!Session.get('map')) gmaps.initialise();

    // Autorun function to render all points in the Parks collection on the map
    Deps.autorun(function() {

        // Iterate over database to get marker points
        var Location = Parks.find().fetch();

        for (var i in Location) {
            var lat = Location[i].lat;
            var lng = Location[i].lng;
            var addr = Location[i].address;
            var latlng = new google.maps.LatLng(lat, lng);

            // Add the marker
            marker = new google.maps.Marker({
                position: latlng,
                map: map,
                title: addr
            });

        }
    });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(this.title);
        infowindow.open(map, this);

    });
};