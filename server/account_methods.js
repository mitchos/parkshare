Meteor.methods({
    userAddOauthCredentials: function(token, userId, service) {
        console.log("[-]Credential success, grabbing user details from service");
        // Define oauth provider package so we can use functions from them
        var Facebook = Package.facebook.Facebook;
        var Google = Package.google.Google;
        var data, oldUser, selector;
        selector = "services." + service + ".id";
        switch (service) {

        case "facebook":
            // data is all allowed facebook profile information
            data = Facebook.retrieveCredential(token).serviceData;
            // Check if this user id already exists
            console.log(data.id);
            oldUser = Meteor.users.findOne({
                "services.facebook.id": data.id
            });
            break;

        case "google":
            // data is all allowed google profile information
            data = Google.retrieveCredential(token).serviceData;
            console.log(data.id);
            // Check if this user id already exists
            oldUser = Meteor.users.findOne({
                "services.google.id": data.id
            });
        }
        console.log(oldUser);
        // Throw error if we find the user
        if (oldUser != null) {
            throw new Meteor.Error(500, ("This " + service + " account has already ") + "been assigned to another user.");
        }


        // Update the user object with the new services information
        if (service === "facebook") {
            return Meteor.users.update(userId, {
                $set: {
                    "services.facebook": data
                }
            });
        }
        else if (service === "google") {
            return Meteor.users.update(userId, {
                $set: {
                    "services.google": data
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