SimpleSchema.debug = true;
Schema = {};
Schema.Store = new SimpleSchema({
    name: {
        type: String,
        label: "Store name",
        max: 50
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "Account email",
        max: 254
    },
    customerEmail: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "Customer email",
        max: 254
    },
    companyName: {
        type: String,
        label: "Company name",
        max: 80
    },
    phone: {
        type: String,
        label: "Phone",
        max: 20
    },
    address1: {
        type: String,
        label: "Address 1",
        max: 80
    },
    address2: {
        type: String,
        label: "Address 2",
        optional: true,
        max: 80
    },
    city: {
        type: String,
        label: "City",
        max: 50
    },
    postal: {
        type: String,
        label: "Postal code",
        max: 10
    },
    country: {
        type: String,
        label: "Country",
        max: 20,
        allowedValues: ["Singapore", "Thailand"]
    },
    ownedBy: {
        type: String,
        label: "Owned By",
        optional: true
    },
    createdAt: {
        type: Date,
        label: "Created At",
        autoValue: function () {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date()};
            } else {
                this.unset(); //prevent user from supplying their own value
            }
        }
    },
    updatedAt: {
        type: Date,
        label: "Updated At",
        autoValue: function () {
            if (this.isUpdate) {
                return new Date();
            }
        },
        denyInsert: true,
        optional: true
    },
    createdBy: {
        type: String,
        label: "Created By",
        autoValue: function () {
            if (this.isInsert) {
                return Meteor.userId();
            } else if (this.isUpsert) {
                return {$setOnInsert: new Meteor.userId()};
            } else {
                this.unset(); //prevent user from supplying their own value
            }
        }
    }
});
Schema.Invite = new SimpleSchema({
    firstName: {
        type: String,
        label: "First name",
        max: 50
    },
    lastName: {
        type: String,
        label: "Last name",
        max: 50
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "Email",
        max: 254
    }
});
Schema.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        label: "First name",
        max: 50 //,
        // optional: true
    },
    lastName: {
        type: String,
        label: "Last name",
        max: 50 //,
        // optional: true
    }
});
Schema.User = new SimpleSchema({
    username: {
        type: String,
        label: "Username",
        // placeholder: "Not defined",
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        min: 5,
        max: 15,
        optional: true
    },
    emails: {
        type: Array,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        label: "Email address",
        max: 254,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean,
        optional: true
    },
    // Use this registered_emails field if you are using splendido:meteor-accounts-emails-field / splendido:meteor-accounts-meld
    // registered_emails: {
    //     type: [Object],
    //     optional: true,
    //     blackbox: true
    // },
    createdAt: {
        type: Date,
        label: "Created At",
        autoform: {
            omit: true
        }
    },
    active: {
        type: Boolean,
        label: "Active"
    },
    profile: {
        type: Schema.UserProfile //,
        // optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Option 1: Object type
    // If you specify that type as Object, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Example:
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Option 2: [String] type
    // If you are sure you will never need to use role groups, then
    // you can specify [String] as the type
    // roles: {
    //     type: [String],
    //     optional: true
    // },
    // In order to avoid an 'Exception in setInterval callback' from Meteor
    heartbeat: {
        type: Date,
        optional: true
    }//,
    // usersManaging: {
    //     type: Array,
    //     label: "Users managing"
    // },
    // "usersManaging.$": {
    //     type: Object
    // },
    // "usersManaging.$._id": {
    //     type: String
    // },
    // managedBy: {
    //     type: String,
    //     label: "Managed By"
    // }
});

Stores.attachSchema(Schema.Store);
Meteor.users.attachSchema(Schema.User);