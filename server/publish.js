Meteor.publish(null, function() {
    return Meteor.users.find({
        _id: this.userId
    }, {
        fields: {
            profile: 1
        }
    });
});

Meteor.publish('Parks', function(){
  return Parks.find();
});