 Template.register.events({
    'submit #registerForm' : function(e, t) {
      e.preventDefault();
      var email = t.find('#email').value
        , password = t.find('#password').value;

        // Trim and validate the input

      Accounts.createUser({email: email, password : password}, function(err){
          if (err) {
            console.log('Couldn\'t create account');
          } else {
            Router.go('main');
          }

        });

      return false;
    }
  });