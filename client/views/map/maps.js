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

Template.maps.helpers({
    parkCount: function() {
        return Parks.find().count();
    }
});

Template.maps.events({

    // Called when new park is added from main map page
    'submit #addPark': function(e) {
        e.preventDefault();

        console.log("Running events function for ParkForm");

        var results = null;

        // Store form variables to send to Parks collection
        var park = {
            streetNumber: document.getElementById("streetNumber").value,
            streetName: document.getElementById("streetName").value,
            streetType: document.getElementById("streetType").value,
            suburb: document.getElementById("suburb").value,
            postCode: document.getElementById("postCode").value,
            state: document.getElementById("state").value,
            country: document.getElementById("country").value,
        };
        park.address = park.streetNumber + " " + park.streetName + " " + park.streetType + " " + park.suburb + " " + park.state + " " + park.postCode + " " + park.country;

        // Call geocoder to get lat/long from address
        geocoder.geocode({
            address: park.address,
            region: 'au',
            componentRestrictions: {
                country: 'au'
            }
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                // Add lat and long to our object so we can use them later
                park.lat = results[0].geometry.location.lat();
                park.lng = results[0].geometry.location.lng();
                // Change our address to a nicer gmaps formatted version
                park.address = results[0].formatted_address;
                // Insert park via Meteor Method in parks.js
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

                });
                // Set the center of the map to geocoded result and zoom in
                gmaps.map.setCenter(new google.maps.LatLng(park.lat, park.lng));
                gmaps.map.setZoom(16);
                return park;
            }
            else {
                throw new Meteor.Error(422, status);
            }
        });

        console.log("Stored address successfully");

        // Close the modal
        $('#parkModal').modal('hide');

    }
});