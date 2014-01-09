/*global Router Meteor  */

Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() {
        return Meteor.subscribe('Parks');
    }
});

Router.map(function() {
    this.route('main', {
        path: '/'
    });

    this.route('home', {
        path: '/home'
    });

    this.route('register', {
        path: '/register'
    });

    this.route('maps', {
        path: '/map'
    });

    this.route('profile', {
        path: '/profile'
    });

    this.route('editProfile', {
        path: '/editProfile'
    });

    this.route('addPark', {
        path: '/addPark'
    });

    this.route('parkPage', {
        path: '/parks/:_id',
        data: function () { return Parks.findOne(this.params._id); }
    });
    
    this.route('parkEdit', {
        path: '/parks/:_id/edit',
        data: function () { return Parks.findOne(this.params._id); }
    });
});

var requireLogin = function() {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) this.render(this.loadingTemplate);
        else this.render('login');

        this.stop();
    }
};
Router.before(requireLogin, {
    except: ['main', 'register']
});
