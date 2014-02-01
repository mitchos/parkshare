/* global Meteor gmaps Template place Router throwError google Session */
Template.addParkForm.events({

    // When input is selected, starts calculating the address
    'focus #addParkInput': function(e) {
        gmaps.watchAutocomplete('addParkInput');
    },

    // When input is submitted, adds the park to the collection
    'submit #addPark': function(e) {
        e.preventDefault();
        Router.go('/parks');
        console.log("Running addPark events handler");

        // Define the object to get address components from
        var addressComponents = {
            subpremise: 'short_name',
            street_number: 'short_name',
            route: 'long_name',
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            country: 'long_name',
            postal_code: 'short_name'
        },
        parsedAddressComponents = {};

        // Extracts each address component from the autocomplete address and then
        // reassigns these values to the addressComponents object
        function getAddressComponents() {
            for (var i = 0; i < place.address_components.length; i++) {
                var addressType = place.address_components[i].types[0];
                if (addressComponents[addressType]) {
                    var val = place.address_components[i][addressComponents[addressType]];
                    parsedAddressComponents[addressType] = val;
                }
            }
            return parsedAddressComponents;
        }

        getAddressComponents();

        // Define the object that gets passed to the server side function 
        var park = {
            address: place.formatted_address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            addressComponents: parsedAddressComponents
        };

        // Server side function checks and inserts parking parameters into the
        // collection
        Meteor.call('park', park, function(error, id) {
            if (error) {
                // display the rror
                throwError(error.reason);
                if (error.error === 302) Router.go('/', {
                    _id: error.details
                });
            }
            else {
                Router.go('/parks', {
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

Template.addPark.rendered = function() {


    $("#slider").slider({
        range: "$",
        value: 5,
        min: 1,
        max: 20,
        step: 0.5,
        slide: function(event, ui) {
            $("#amount").html("$" + ui.value);
            Session.set("parkPrice", ui.value);
        }
    });
    var value = $("#slider").slider("value");
    Session.set("parkPrice", value);
    $("#amount").html("$" + value);
};

Template.addPark.events({
    'change #parkingType': function(e) {
        var value = $("#parkingType").val();
        Session.set("parkType", value);
    }
});

Handlebars.registerHelper('session', function(input) {
    return Session.get(input);
});