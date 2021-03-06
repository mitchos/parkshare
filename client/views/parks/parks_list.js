/* global Template Parks Router Meteor */
Template.allRecentParks.helpers({
    allRecentParks: function() {
        return Parks.find({}, {
            sort: {
                submitted: -1
            }
        });
    }
});


// JS for parksByOwner

Template.parksByOwner.helpers({
    parksByOwner: function() {
        return Parks.find({
            'userId': Meteor.userId()
        });
    }
});


// JS for parksByOwner

Template.parksBySuburb.helpers({
    parksBySuburb: function() {
        var suburb = Router.current().params.suburb;
        return Parks.find({
            'addressComponents.locality': suburb
        });
    }
});

Template.parkItem.preserve(['.park-list-item']);