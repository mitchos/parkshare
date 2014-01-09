/* global Parks Meteor _ */

Parks = new Meteor.Collection('parks');


Meteor.methods({
    park: function(parkAttributes) {
        console.log('[-] Meteor Method(park): Running');
        
        var park,
            parkId,
            user = Meteor.user(),
            owner = user.profile.name,
            parkWithSameAddress = Parks.findOne({
                address: parkAttributes.address
            });
            console.log(parkAttributes);
            console.log('[-] Meteor Method(park): Variables set');
            console.log(parkWithSameAddress);

        // ensure the user is logged in
        if (!user) throw new Meteor.Error(401, "You need to login or register to submit a new park");

        // ensure the park has an address
        if (!parkAttributes.address) throw new Meteor.Error(422, 'Please fill in an address');

        // check that there are no previous posts with the same link
        if (parkAttributes.address && parkWithSameAddress) {
            throw new Meteor.Error(302, 'This park has already been listed',
            parkWithSameAddress._id);
        }

        // pick out the whitelisted keys
            park = _.extend(_.pick(parkAttributes, 'address', 'lat', 'lng'), {
            userId: user._id,
            owner: owner,
            submitted: new Date().getTime()
        });

        parkId = Parks.insert(park);

        return parkId;
    },
    
    deletePark: function(parkId) {

        var parkDeleted = Parks.remove(parkId);

        return parkDeleted;
    }
});
