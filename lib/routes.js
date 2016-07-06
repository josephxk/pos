Router.route('/', { controller: 'HomeController' });
Router.route('/admin', { controller: 'AdminController' });
// Router.route('/enroll-account/:_id', { controller: 'EnrollAccountController' });
Router.route('/users', { controller: 'UsersController' });
Router.route('/users/:_id', { name: 'user.edit', controller: 'UserController' });
Router.route('/stores', { controller: 'StoresController' });
Router.route('/stores/new', { name: 'store.create', controller: 'StoreNewController' });
Router.route('/stores/:_id', { name: 'store.edit', controller: 'StoreEditController' });
