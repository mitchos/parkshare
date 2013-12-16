 Template.login.events({

 'submit #loginForm' : function(e, t){
    e.preventDefault();
      // retrieve the input field values
      var email = t.find('#loginEmail').value
      , password = t.find('#loginPassword').value;

        // Trim and validate your fields here.... 

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.loginWithPassword(email, password, function(error, id){
          if (error){
            throw new Meteor.Error(401, "Incorrect login");
              Router.go('main', {_id: error.details});
          }
          // The user might not have been found, or their passwword
          // could be incorrect. Inform the user that their
          // login attempt has failed. 
          else{
            Router.go('main', {_id: id});
          }
          // The user has been logged in.
        });
        return false; 
      }
    });