/* global google Template Session Deps Parks infowindow*/

Template.maps.rendered = function() {
    // Initialise the map if the page is loaded for the first time
    if (!Session.get('map')) gmaps.initialise();

    // Autorun function to render all points in the Parks collection on the map
    Deps.autorun(function() {
        console.log('[+] Fetching locations');
        var Location = Parks.find().fetch();
        gmaps.addMarker(Location);

    });
};

Template.maps.destroyed = function() {
    // Close session to allow the map to load next time user accesses the page
    Session.set('map', false);
};

/*
 *  Handlebar helpers for maps.html
 */
Template.maps.helpers({
    parkCount: function() {
        return Parks.find().count();
    }
});

/*********************************
 *  Event handlers for maps.html *
 *********************************/
 
Template.maps.events({

    'submit #addPark': function(e) {
        e.preventDefault();
        console.log("Running events function for ParkForm");
        // Call geocoder to get lat/long from address
        console.log(place);
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
                Router.go('/', {
                    _id: id
                });
            }
            gmaps.map.setCenter(new google.maps.LatLng(park.lat, park.lng));
            gmaps.map.setZoom(16);
            return park;

        });
        
        console.log(park);
        console.log("Stored address successfully");

    }
});