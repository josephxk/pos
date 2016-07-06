Template.users.onRendered(function () {
    Session.set('pageTitle', 'Users');

    $('#table_users').DataTable({
        "columnDefs": [{
            "targets": 'no-sort',
            "orderable": false,
            "order": []
        }]
    });

    $('.btn-status').mouseleave(function () {
        $(this).blur();
    });
});

Template.users.helpers({
    userEmailAddress: function () {
        return this.emails[0].address;
    },
    userEmailVerified: function () {
        return this.emails[0].verified;
    },
    userCreatedAt: function () {
        return moment(this.createdAt).format('DD MMMM YYYY, HH:mm:ss');
    }
});

Template.users.onCreated(function () {
    //
});

Template.users.events({
    //
});

Template.addUser.helpers({
    inviteFormSchema: function () {
        return Schema.Invite;
    }
});

Template.addUser.onDestroyed(function () {
    AutoForm.resetForm("inviteForm");
});

var inviteHooksObject = {
    before: {
        // Replace `formType` with the form `type` attribute to which this hook applies
        formType: function (doc) {
            // Potentially alter the doc
            // doc.foo = 'bar';

            // Then return it or pass it to this.result()
            //return doc; (synchronous)
            //return false; (synchronous, cancel)
            //this.result(doc); (asynchronous)
            //this.result(false); (asynchronous, cancel)
            //console.log('before');
        }
    },

    // The same as the callbacks you would normally provide when calling
    // collection.insert, collection.update, or Meteor.call
    after: {
        // Replace `formType` with the form `type` attribute to which this hook applies
        method: function (error, result) {
            console.log(moment().format() + 'hook: after (type=method) - ');
            if (error) {
                console.log(error);
                toastr.error(error.reason);
            } else {
                console.log(result);
                // toastr.success(result);
            }
        }
    },

    // Called when form does not have a `type` attribute
    onSubmit: function (insertDoc, updateDoc, currentDoc) {
        // You must call this.done()!
        //this.done(); // submitted successfully, call onSuccess
        //this.done(new Error('foo')); // failed to submit, call onError with the provided error
        //this.done(null, "foo"); // submitted successfully, call onSuccess with `result` arg set to "foo"

        // console.log(moment().format() + 'hook: onSubmit - ');
        // this.done();
    },

    // Called when any submit operation succeeds
    onSuccess: function (formType, result) {
        console.log(moment().format() + ' - hook: onSuccess');
        console.log('formType: ' + formType);
        console.log(result);
        toastr.success('Invite successful.');
    },

    // Called when any submit operation fails
    onError: function (formType, error) {
        console.log(moment().format() + ' - hook: onError');
        console.log(error);
    }
};

// Pass an array of form IDs for multiple forms
AutoForm.addHooks(['inviteForm'], inviteHooksObject);