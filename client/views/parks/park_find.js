Template.findPark.events({
    'focus #findParkInput': function(e) {
        gmaps.watchAutocomplete('findParkInput');
    },
    'submit #findPark': function(e) {
        e.preventDefault();
        
        var addressComponents = {
            locality: 'long_name',
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
        Router.go('/parks/suburb=' + parsedAddressComponents.locality)
        
        console.log("Suburb is:");
        console.log();
        // Router.go('/parks/suburb=);
        
    }
});