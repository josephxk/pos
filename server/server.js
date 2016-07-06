import {Meteor} from 'meteor/meteor';

Meteor.startup(() => {
    // code to run on server at startup
});

Accounts.onCreateUser(function (options, user) {
    console.log(moment().format() + ' - Accounts.onCreateUser()');

    user.active = !(options.password === undefined);
    // user.active = true;

    //we still want the default hook's 'profile' behavior.
    if (options.profile) {
        user.profile = options.profile;
    }
    return user;
});

Meteor.methods({
    'inviteUser': function (data) {
        //todo: hook up enrollAccount method and set up email

        //important server-side check for security and data integrity
        console.log(moment().format() + ' - method: inviteUser');
        console.log(data);
        check(data, Schema.Invite);

        var profile = new Object();
        profile.firstName = data.firstName;
        profile.lastName = data.lastName;

        var newUser = Accounts.createUser({
            email: data.email,
            profile: profile
        });
        Accounts.sendEnrollmentEmail(newUser);
        return newUser;
    },
    'updateUser': function (modifier, documentId) {
        //todo: check if user is super admin; only super admin or admin is allowed to update user records

        //important server-side check for security and data integrity
        // console.log(moment().format() + ' - method: updateUser');
        // console.log('_id: ' + documentId);
        // console.log(modifier);

        try {
            check(modifier.$set['profile.firstName'], String)
        } catch (error) {
            throw new Meteor.Error('server.updateUser.noFirstName', 'First name is required');
        }

        try {
            check(modifier.$set['profile.lastName'], String)
        } catch (error) {
            throw new Meteor.Error('server.updateUser.noLastName', 'Last name is required');
        }

        try {
            check(modifier.$set.username, String)
        } catch (error) {
            throw new Meteor.Error('server.updateUser.noUsername', 'Username is required');
        }

        try {
            check(modifier.$set.emails, Array)
        } catch (error) {
            throw new Meteor.Error('server.updateUser.noEmail', 'Email is required');
        }


        if (!this.userId) {
            throw new Meteor.Error('server.updateUser.notLoggedIn', 'Must be logged in.');
        } else {
            try {
                //simulate wait
                //Meteor._sleepForMs(5000);
                var count = 0;
                // count = Meteor.users.update(documentId, { $set: { "profile.firstName": firstName, "profile.lastName": lastName } });
                count = Meteor.users.update(documentId, modifier);
                // if (count = 1) {
                //     if (active) {
                //         Roles.addUsersToRoles(id, ['active'], 'general');
                //     } else {
                //         Roles.removeUsersFromRoles(id, ['active'], 'general');
                //     }
                //     if (admin) {
                //         Roles.addUsersToRoles(id, ['admin'], 'general');
                //     } else {
                //         Roles.removeUsersFromRoles(id, ['admin'], 'general');
                //     }
                // }
                return count;
            } catch (error) {
                throw new Meteor.Error("server.updateUser.dbError", error.message);
            }
        }
    },
    'createStore': function (data) {
        //todo: logic for storeOwner, outletManager fields.

        //important server-side check for security and data integrity
        console.log(moment().format() + ' - method: createStore');
        console.log(data);
        data.createdAt = new Date();
        data.createdBy = Meteor.userId();
        check(data, Schema.Store);
        // Meteor._sleepForMs(2000);
        var newStore = Stores.insert(data);
        return newStore;
    },
    'updateStore': function (modifier, documentId) {
        //todo: check if user is store admin; only super admin or store admin is allowed to update store records
        //todo: check name, email, customerEmail, companyName, phone, address1, city, postal, country

        // important server-side check for security and data integrity
        console.log(moment().format() + ' - method: updateStore');
        console.log('_id: ' + documentId);
        console.log(modifier);

        try {
            check(modifier.$set['name'], String)
        } catch (error) {
            throw new Meteor.Error('server.updateStore.noName', 'Name is required');
        }

        if (!this.userId) {
            throw new Meteor.Error('server.updateStore.notLoggedIn', 'Must be logged in.');
        } else {
            try {
                var count = 0;
                count = Stores.update(documentId, modifier);
                return count;
            } catch (error) {
                throw new Meteor.Error("server.updateStore.dbError", error.message);
            }
        }
    }
});

//helpers
userActive = function (user) {
    return (user.emails[0].verified && user.active);
}