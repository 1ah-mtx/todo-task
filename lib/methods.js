import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import './collections.js'

Meteor.methods({

  'task.insert'(newTask) {

    // collection already auto validated with schema but why not...
    check(newTask.label, String);

    // update collection
    return TaskList.insert(newTask)
  },

  'task.remove'(taskId) {

    // double check
    check(taskId, String);

    // update collection
    TaskList.remove(taskId);
  },

  'task.markDone'(taskId, isDone) {

    // double double check
    check(taskId, String);
    check(isDone, Boolean);

    // update task in collection
    TaskList.update(taskId, { $set: { done: isDone } });
  },

});

