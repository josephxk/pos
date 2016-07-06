// List of all usernames
Meteor.publish('allUsers', function() {
    return Meteor.users.find({}, {
        fields: { createdAt: 1, emails: 1, profile: 1, username: 1, roles: 1, active: 1 }
    })
});

//single user
Meteor.publish('singleUser', function(userId) {
    // check(userId, String); //not ok
    // console.log(userId);
    // console.log('publication singleUser: ' + userId); //ok
    return Meteor.users.find({ _id: userId }, {
        fields: { createdAt: 1, emails: 1, profile: 1, username: 1, roles: 1, active: 1 },
        limit: 1
    });
});

//all stores
Meteor.publish('allStores', function() {
    return Stores.find({}, {
        // fields: { _id: 1 }
    });
});

//single store
Meteor.publish('singleStore', function(storeId) {
    console.log('publication singleStore: ' + storeId);
    return Stores.find({ _id: storeId }, {
        fields: { _id: 1, name: 1, email: 1, customerEmail: 1, companyName:1, phone:1, address1: 1, address2: 1, city: 1, postal: 1, country: 1 }
    });
});