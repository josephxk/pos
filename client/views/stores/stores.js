Template.stores.onRendered(function() {
    Session.set('pageTitle', 'Stores');

    $('#table_stores').DataTable({
        "columnDefs": [{
            "targets": 'no-sort',
            "orderable": false,
            "order": []
        }]
    });
});

Template.stores.helpers({
    //
});

Template.stores.events({
    'click #create' (evt, tpl) {
        evt.preventDefault();
        Session.set('pageKey', 'store.create');
        Router.go('store.create');
    },
});
