Router.configure(
    //
);

AccountsTemplates.configure({
    defaultLayout: 'homeLayout',
    homeRoutePath: '/',
    enablePasswordChange: true,
    showForgotPasswordLink: true,

    // Hooks
    // onLogoutHook: myLogoutFunc,
    // onSubmitHook: mySubmitFunc,
    // preSignUpHook: myPreSubmitFunc,
    // postSignUpHook: myPostSubmitFunc
});

AccountsTemplates.configureRoute('signIn', {
    name: 'account.signin',
    path: '/sign-in',
    template: 'tplSignIn',
    // layoutTemplate: 'myLayout',
    redirect: function () {
        var user = Meteor.user();
        if (user)
            Router.go('/user/' + user._id);
    }
});

AccountsTemplates.configureRoute('signUp', {
    name: 'account.signup',
    path: '/sign-up',
    template: 'tplSignUp'
});

AccountsTemplates.configureRoute('enrollAccount', {
    name: 'account.enrollaccount',
    path: '/enroll-account',
    template: 'tplEnrollAccount'
    // ,
    // data: function () {
    //     console.log(this.params.paramToken);
    // }
});

AccountsTemplates.configureRoute('changePwd', {
    name: 'account.changepwd',
    path: '/change-password',
    template: 'tplChangePassword'
});

AccountsTemplates.configureRoute('resetPwd', {
    name: 'account.resetpwd',
    path: '/reset-password',
    template: 'tplResetPassword'
});

AccountsTemplates.configureRoute('forgotPwd', {
    name: 'account.forgotpwd',
    path: '/forgot-password',
    template: 'tplForgotPassword'
});

var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([{
    _id: "username",
    type: "text",
    displayName: "username",
    required: true,
    minLength: 5,
}, {
    _id: 'email',
    type: 'email',
    required: true,
    displayName: "email",
    re: /.+@(.+){2,}\.(.+){2,}/,
    errStr: 'Invalid email',
},
    pwd, {
        _id: 'firstName',
        type: 'text',
        required: true,
        displayName: "First Name",
        placeholder: "First Name",
        // func: function(value) {
        //     return value !== 'First Name';
        // },
        trim: true,
        errStr: 'Only "First Name" allowed!'
    }, {
        _id: 'lastName',
        type: 'text',
        required: true,
        displayName: "Last Name",
        placeholder: "Last Name",
        // func: function(value) {
        //     return value !== 'Last Name';
        // },
        trim: true,
        errStr: 'Only "Last Name" allowed!'
    }
]);