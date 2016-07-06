HomeController = RouteController.extend({
    template: 'home'
});
AdminController = RouteController.extend({
    layoutTemplate: 'admin',
    template: 'dashboard'
});
UsersController = RouteController.extend({
    layoutTemplate: 'admin',
    template: 'users',
    waitOn: function() {
        return Meteor.subscribe("allUsers");
    },
    data: function() {
        return { allusers: Meteor.users.find({}) }
    }
});
UserController = RouteController.extend({
    layoutTemplate: 'admin',
    template: 'user',
    data: function() {
        // console.log('user controller: userId: ' + this.params._id); //ok
        // console.log(Meteor.users.findOne({ _id: this.params._id })); //ok
        var user = Meteor.users.findOne({ _id: this.params._id }) || {};
        return user;
    }
});
StoresController = RouteController.extend({
    layoutTemplate: 'admin',
    template: 'stores',
    waitOn: function() {
        return Meteor.subscribe("allStores");
    },
    data: function() {
        return { allstores: Stores.find({}) }
    }
});
StoreNewController = RouteController.extend({
    layoutTemplate: 'admin',
    template: 'store'
    // ,
    // waitOn: function() {
    //     // console.log(this.params._id); //ok
    // },
    // data: function() {
    //     // console.log(Router.current().route.getName()); //ok
    //     // console.log('StoreNewController: params: ' + this.params._id); //ok
    // }
});
StoreEditController = RouteController.extend({
    layoutTemplate: 'admin',
    template: 'store',
    waitOn: function() {
        // console.log(this.params._id); //ok
        return Meteor.subscribe("singleStore", this.params._id);
    },
    data: function() {
        // console.log(Router.current().route.getName());
        // console.log('StoreEditController: params: ' + this.params._id); //ok
        var store = Stores.findOne({ _id: this.params._id }) || {};
        //console.log(store);
        return store;
    }
});