Template.user.onCreated(function() {
    var self = this;
    route = Router.current();
    self._id = route.params._id
    self.autorun(function() {
        // console.log('user template: subscribe: ' + self._id); //ok
        self.subscribe('singleUser', self._id); //needs parameter
    });
});

Template.user.helpers({
    userEmail: function() {
        if (!_.isUndefined(this.emails)) {
            return this.emails[0].address;
        }
    },
    userIsAdmin: function() {
        var user = this;
        return Roles.userIsInRole(user, ['admin'], 'general');
    },
    userCreatedAt: function() {
        return moment(this.createdAt).format();
    }
});

Template.user.events({
    // 'click #save' (evt, tpl) {
    //     evt.preventDefault();
    //     var id = tpl.$('#id').data('id');
    //     var firstName = tpl.$('#firstname').val();
    //     var lastName = tpl.$('#lastname').val();
    //     var active = tpl.$('#active').prop('checked');
    //     var admin = tpl.$('#admin').prop('checked');
    //     Meteor.call('updateUser', [id, firstName, lastName, active, admin], function(error, result) {
    //         if (error) {
    //             toastr.error(error.reason, error.code);
    //         } else {
    //             toastr.success('Save successful.');
    //         }
    //     });
    // },
    'click #delete' (evt, tpl) {
        evt.preventDefault();
        toastr.error('I do not think that word means what you think it means.', 'Inconceivable!')
    },
    'click #cancel' (evt, tpl) {
        evt.preventDefault();
        Router.go('users');
    }
});

var userHooksObject = {
    before: {
        // Replace `formType` with the form `type` attribute to which this hook applies
        formType: function(doc) {
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
        formType: function(error, result) {}
    },

    // Called when form does not have a `type` attribute
    onSubmit: function(insertDoc, updateDoc, currentDoc) {
        // You must call this.done()!
        //this.done(); // submitted successfully, call onSuccess
        //this.done(new Error('foo')); // failed to submit, call onError with the provided error
        //this.done(null, "foo"); // submitted successfully, call onSuccess with `result` arg set to "foo"

        console.log(moment().format() + 'hook: onSubmit - ');
        this.done();
    },

    // Called when any submit operation succeeds
    onSuccess: function(formType, result) {
        console.log(moment().format() + ' - hook: onSuccess');
        console.log('formType: ' + formType);
        console.log(result);
        toastr.success('Save successful.');
    },

    // Called when any submit operation fails
    onError: function(formType, error) {
        console.log(moment().format() + ' - hook: onError');
        console.log(error);
        toastr.error(error.message);
    },

};

// Pass an array of form IDs for multiple forms
AutoForm.addHooks(['userForm'], userHooksObject);