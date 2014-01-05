Parks = new Meteor.Collection('parks');


Meteor.methods({
    park: function(parkAttributes) {

        var user = Meteor.user(),
            parkWithSameAddress = Parks.findOne({
                address: parkAttributes.address
            });

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
        var park = _.extend(_.pick(parkAttributes, 'address', 'lat', 'lng'), {
            userId: user._id,
            owner: user.profile.name,
            submitted: new Date().getTime()
        });

        var parkId = Parks.insert(park);

        return parkId;
    },
    deletePark: function(parkId) {

        var parkDeleted = Parks.remove(parkId);

        return parkDeleted;
    }
});
