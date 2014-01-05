Template.parkPage.rendered = function() {

    var fenway = new google.maps.LatLng(-34.052532, 151.15388299999995);

    var panoramaOptions = {
        position: fenway,
        pov: {
            heading: 90,
            pitch: -5
        }
    };
    var panorama = new google.maps.StreetViewPanorama(document.getElementById("sview-canvas"), panoramaOptions);

};

Template.parkPage.helpers({
    parkTest: function() {
        return Parks.find({
            _id: this._id
        });
    },

    // Function to check if the user owns this park
    ownPark: function() {
        return Parks.find({
            _id: this._id,
            userId: Meteor.user()._id
        });
    }
});

Template.parkPage.events({
    'click .delete': function(e) {
        e.preventDefault();

        if (confirm("Delete this park?")) {
            var currentParkId = this._id;
            Meteor.call('deletePark', currentParkId, function(error, id) {
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
        }
    }
});
