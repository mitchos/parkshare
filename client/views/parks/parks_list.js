/* global Template Parks */
Template.recentParks.helpers({
  recentParks: function() {
    return Parks.find({}, {sort: {submitted: -1}});
  }
});

Template.parksByOwner.helpers({
  parksByOwner: function() {
      return Parks.find({userId: Meteor.userId()});
  }
});