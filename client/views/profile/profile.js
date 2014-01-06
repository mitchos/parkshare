Template.profile.events({
    "click .addService": function(e) {
        var service;
        e.preventDefault();
        service = $(event.target).data("service");
        console.log(service);
        return addUserService(service);
    }
});


var addUserService = function(service) {

    if (service === "email") {
        console.log("Tried to add email");
    }
    else {
        console.log('Not email, switching service');
        switch (service) {
        case "facebook":
            console.log('Executing case: ' + service);
            var Facebook = Package.facebook.Facebook;
            console.log(Facebook);
            Facebook.requestCredential({
                requestPermissions: ["email", "user_friends", "manage_notifications"]
            }, function(token) {
                console.log(token);
                console.log(Meteor.userId());
                return Meteor.call("userAddOauthCredentials", token, Meteor.userId(), service, function(error, id) {
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
            });
            break;
        case "google":
            console.log('Executing case: ' + service);
            var Google = Package.google.Google;
            Google.requestCredential({
                requestPermissions: ["email", "https://www.googleapis.com/auth/calendar"],
                requestOfflineToken: true
            }, function(token) {
                return Meteor.call("userAddOauthCredentials", token, Meteor.userId(), service, function(error, id) {
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
            });
        }
    }

};
