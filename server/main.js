import { Meteor } from 'meteor/meteor';

// our Mongo Collection object from shared lib directory
import './../lib/collections.js'

import './../lib/taskListMethods.js'

Meteor.startup(() => {
  // code to run on server at startup
});
