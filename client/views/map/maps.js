/* global google Template Session Deps Parks infowindow gmaps*/

Template.maps.rendered = function() {

    // Initialise the map if the page is loaded for the first time
    if (!Session.get('map')) gmaps.initialise();

    // Autorun function to render all points in the Parks collection on the map
    Deps.autorun(function() {
        console.log('[+] Fetching locations');
        
        var Location;

        if (Router.current().params.suburb) {
            var suburb = Router.current().params.suburb;
           gmaps.geoCode(suburb);
            Location = Parks.find({
                'addressComponents.locality': suburb
            }).fetch();
            
        }
        else {
            Location = Parks.find().fetch();
        }
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
    'focus #findParkInput': function(e) {
        gmaps.watchAutocomplete('findParkInput');
    },

});