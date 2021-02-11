import { Meteor } from 'meteor/meteor';

// our Mongo Collection object from shared lib directory
import './../lib/collections.js'
// Meteor methods
import '../lib/methods.js'

Meteor.startup(() => {
  // code to run on server at startup
});

WebApp.addHtmlAttributeHook(() => ({ lang: "en-GB" }));