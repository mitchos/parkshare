/* global Profile Template  */
Template.profileForm.events({
    'submit #editProfile': function(e) {
        e.preventDefault();


        var firstName = document.getElementById("firstName").value,
            lastName = document.getElementById("lastName").value,
            email = document.getElementById("email").value,
            streetNumber = document.getElementById("streetNumber").value,
            streetName = document.getElementById("streetName").value,
            streetType = document.getElementById("streetType").value,
            suburb = document.getElementById("suburb").value,
            postCode = document.getElementById("postCode").value,
            state = document.getElementById("state").value,
            country = document.getElementById("country").value;



        Meteor.users.update({
            _id: Meteor.user()._id
        }, {
            $set: {
                profile: {
                    firstName: firstName,
                    lastName: lastName,
                    streetNumber: streetNumber,
                    streetName: streetName,
                    streetType: streetType,
                    suburb: suburb,
                    state: state,
                    postCode: postCode,
                    country: country
                }
            }
        });

    }

});

