/*global  Template Accounts Router */
Template.register.events({
    'submit #registerForm': function(e, t) {
        e.preventDefault();
        var firstName = t.find('#firstName').value,
            lastName = t.find('#lastName').value,
            email = t.find('#email').value,
            password = t.find('#password').value;

        // Trim and validate the input

        Accounts.createUser({
            email: email,
            password: password,
            profile: {
                firstName: firstName,
                lastName: lastName,
                streetNumber: "",
                streetName: "",
                streetType: "",
                suburb: "",
                state: "",
                postCode: "",
                country: "",
                picture: ""
            }
        }, function(err) {
            if (err) {
                console.log('Couldn\'t create account');
            }
            else {
                Router.go('main');
            }

        });

        return false;
    }
});