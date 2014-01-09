Template.addPark.events({
    'focus #addParkInput': function(e) {
        gmaps.watchAutocomplete('addParkInput');
    },
    'submit #addPark': function(e) {
        e.preventDefault();
        Router.go('/map');
        console.log("Running addPark events handler");
        // Call geocoder to get lat/long from address
        var park = {
            address: place.formatted_address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        };

        Meteor.call('park', park, function(error, id) {
            if (error) {
                // display the rror
                throwError(error.reason);
                if (error.error === 302) Router.go('/', {
                    _id: error.details
                });
            }
            else {
                Router.go('/map', {
                    _id: id
                });
            }
            gmaps.map.setCenter(new google.maps.LatLng(park.lat, park.lng));
            gmaps.map.setZoom(16);
            return park;

        });
        console.log("Stored address successfully");
        autocomplete = null;

    }
});