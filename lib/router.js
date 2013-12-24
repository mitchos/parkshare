/*global Router Meteor  */

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('Parks'); }
});

Router.map(function() {
  this.route('main', {path: '/'});

  this.route('home', {path: '/home'});

  this.route('register', {path: '/register'});
  
  this.route('maps', {path: '/map'});
  
  this.route('profile', {path: '/profile'});
  
  this.route('editProfile', {path: '/editProfile'});
  
  this.route('addPark', {path: '/addPark'});
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');

    this.stop();
  }
};
Router.before(requireLogin, {except: ['main', 'register']});

