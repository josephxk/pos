Template.store.onCreated(function() {
    //
});

Template.store.helpers({
    storeFormSchema: function() {
        return Schema.Store;
    },
    options: function() {
        return [
            { label: "Singapore", value: "Singapore" },
            { label: "Thailand", value: "Thailand" }
        ];
    },
    formDoc: function() {
        var value;
        if (Router.current().route.getName() === "store.create") {
            value = null;
        } else {
            value = this;
        }
        console.log('formDoc: ' + value);
        return value;
    },
    formType: function() {
        var value;
        if (Router.current().route.getName() === "store.create") {
            value = "method";
        } else {
            value = "method-update";
        }
        console.log('formType: ' + value);
        return value;
    },
    formMethod: function() {
        var value;
        if (Router.current().route.getName() === "store.create") {
            value = "createStore";
        } else {
            value = "updateStore";
        }
        console.log('formMethod: ' + value);
        return value;
    }
});

Template.store.onDestroyed(function() {
    AutoForm.resetForm("storeForm");
});

var storeHooksObject = {
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
    },

};

// Pass an array of form IDs for multiple forms
AutoForm.addHooks(['storeForm'], storeHooksObject);
