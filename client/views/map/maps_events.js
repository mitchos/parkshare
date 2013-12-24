/* global map Parks geocoder Template google */
Template.maps.events({
    'submit #geocode': function(e) {
        e.preventDefault();

        var address = document.getElementById("address").value;
        geocoder.geocode({
            'address': address
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                Parks.insert({
                    address: address,
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                });
            }
            else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    },

    'submit #addPark': function(e) {
        e.preventDefault();

        console.log("Running events function for ParkForm");
        var streetNumber = document.getElementById("streetNumber").value,
            streetName = document.getElementById("streetName").value,
            streetType = document.getElementById("streetType").value,
            suburb = document.getElementById("suburb").value,
            postCode = document.getElementById("postCode").value,
            state = document.getElementById("state").value,
            country = document.getElementById("country").value,
            userId = Meteor.userId(),
            address = streetNumber + " " + streetName + " " + streetType + " " + suburb + " " + state + " " + postCode + " " + country;

        console.log(address);
        geocoder.geocode({
            'address': address
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                Parks.insert({
                    userId: userId,
                    address: address,
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                });
                console.log("Stored address successfully");

                $('#parkModal').modal('hide');
            }
            else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });

    }
});