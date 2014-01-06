Accounts.onCreateUser(function(options, user) {
    console.log(options.profile);
    if ('facebook' in options) {
        console.log('Detected facebook account');
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        user.profile = options.profile;
    }
    console.log(user);
    user.profile = options.profile;
    return user;

});



