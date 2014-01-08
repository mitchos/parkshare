/* global Meteor Package */
Meteor.methods({
    userAddOauthCredentials: function(token, userId, service) {
        console.log("[+]Executing server side credential grab");
        var Facebook = Package.facebook.Facebook, //  Facebook package for auth
            Google = Package.google.Google, //  Google package for auth
            data, // Retrieved profile data from service
            oldUser, // User of duplicate account
            profilePic; // Stores user profile picture

        switch (service) {

        case "facebook":
            data = Facebook.retrieveCredential(token).serviceData;
            // Check if this user id already exists
            oldUser = Meteor.users.findOne({
                "services.facebook.id": data.id
            });
            break;

        case "google":
            data = Google.retrieveCredential(token).serviceData;
            // Check if this user id already exists
            oldUser = Meteor.users.findOne({
                "services.google.id": data.id
            });
        }
        console.log(oldUser);
        // Throw error if we find the user
        /* if (oldUser != null) {
            throw new Meteor.Error(500, 
            ("This " + service + " account has already ") + "been assigned to another user.");
        } */


        // Update the user object with the new services information
        if (service === "facebook") {
            profilePic = "https://graph.facebook.com/" + data.id + "/picture/?type=large";
            return Meteor.users.update(userId, {
                $set: {
                    "services.facebook": data,
                    "profile.fbPicture": profilePic
                },
            });

        }
        else if (service === "google") {
            profilePic = "https://plus.google.com/s2/photos/profile/" + data.id;
            return Meteor.users.update(userId, {
                $set: {
                    "services.google": data,
                    "profile.gPicture": profilePic
                }
            });
        }



        // If the user doesn't have a valid email, put it into the emails property
        if (!_.contains(Meteor.user().emails, data.email)) {
            Meteor.users.update(userId, {
                $push: {
                    "emails": {
                        address: data.email,
                        verified: true
                    }
                }
            });
        }
    }
});