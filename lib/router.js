/*global Router Meteor  */

Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() {
        return Meteor.subscribe('Parks');
    }
});

Router.map(function() {
    // General Routes
    this.route('main', {
        path: '/'
    });

    this.route('home', {
        path: '/home'
    });

    this.route('register', {
        path: '/register'
    });

    // Parking Routes

    this.route('allRecentParks', {
        path: '/parks'
    });

    this.route('parksByOwner', {
        path: '/myParks'
    });

    this.route('addPark', {
        path: '/addPark'
    });
    
    this.route('parksBySuburb', {
        path: '/parks/suburb=:suburb',
    });
    
    // Displays the profile page for the given park
    this.route('parkPage', {
        path: '/parks/:_id',
        data: function() {
            return Parks.findOne(this.params._id);
        }
    });
    
    // Displays the edit page for the given park
    this.route('parkEdit', {
        path: '/parks/:_id/edit',
        data: function() {
            return Parks.findOne(this.params._id);
        }
    });

    // User Profile Routes
    this.route('profile', {
        path: '/profile'
    });

    this.route('editProfile', {
        path: '/editProfile'
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
