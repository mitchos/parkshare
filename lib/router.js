Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.map(function() {
  this.route('main', {path: '/'});

  this.route('home', {path: '/home'});

  this.route('register', {path: '/register'})
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');

    this.stop();
  }
}
Router.before(requireLogin, {except: ['main', 'register']});

