import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

Session.set('pageTitle', '');

Tracker.autorun(function () {
    console.log('pageTitle - ' + Session.get('pageTitle'));
});