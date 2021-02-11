import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import './collections.js'

Meteor.methods({

  'task.insert'(newTask) {

    check(newTask.label, String);

    // Check we have a user
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // update collection
    return TaskList.insert(newTask)
  },

  'task.remove'(taskId) {

    check(taskId, String);

    TaskList.remove(taskId);
  },

  'task.markDone'(taskId, isDone) {

    check(taskId, String);
    check(isDone, Boolean);

    TaskList.update(taskId, { $set: { done: isDone } });
  },

});

