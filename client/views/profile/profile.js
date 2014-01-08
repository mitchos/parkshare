Template.profile.events({
    // Runs when user clicks the 'Link <social media>' button
    "click .linkService": function(e) {
        var service;
        e.preventDefault();
        service = $(event.target).data("service");
        console.log(service);
        return linkUserService(service);
    },
    // Runs when user clicks the 'Unlink <social media>' button
    "click .unlinkService": function(e) {
        var service;
        e.preventDefault();
        service = $(event.target).data("service");
        console.log(service);
        return unlinkUserService(service);
    }
});
// This function unlinks facebook and google accounts from the user
var unlinkUserService = function(service) {
    switch (service) {
    case "facebook":
        console.log("Unlinking Facebook");
        break;
    case "google":
        console.log("Unlinking Google");
    }
};

// This function links facebook and google accounts to the user

var linkUserService = function(service) {
    // Add the facebook and google packages so we can get a token

    var Facebook = Package.facebook.Facebook; //Facebook package
    var Google = Package.google.Google; //Google package

    switch (service) {
        // If user tries to link facebook
    case "facebook":
        console.log('Executing case: ' + service);
        // Choose the permissions that we are going to ask for
        Facebook.requestCredential({
            requestPermissions: ["email", "user_friends", "manage_notifications"]
        }, function(token) {
            //Request a client token from facebook and pass to server method
            return Meteor.call("userAddOauthCredentials", token, Meteor.userId(),
            service, function(error, id) {
                if (error) {
                    // display the error
                    throwError(error.reason);
                    if (error.error === 302) Router.go('/profile', {
                        _id: error.details
                    });
                }
                else {
                    Router.go('/profile', {
                        _id: id
                    });
                }
            });
        });
        break;
    case "google":
        console.log('Executing case: ' + service);
        // Choose the permissions we are going to ask for
        Google.requestCredential({
            requestPermissions: ["email", "https://www.googleapis.com/auth/calendar"],
            requestOfflineToken: true
        }, function(token) {
            // Request a client token from google and pass to server method
            return Meteor.call("userAddOauthCredentials", token, Meteor.userId(),
            service, function(error, id) {
                if (error) {
                    // display the error
                    throwError(error.reason);
                    if (error.error === 302) Router.go('/profile', {
                        _id: error.details
                    });
                }
                else {
                    Router.go('/profile', {
                        _id: id
                    });
                }
            });
        });
    }
};
