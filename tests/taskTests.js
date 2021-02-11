/*
    unit tests for backend methods
    [1] task.insert
    [2] task.markDone
    [3] task.remove
*/

import { Meteor } from 'meteor/meteor';
import assert from "assert";

// our Mongo Collection object from shared lib directory
import './../lib/collections.js'
// Meteor methods
import '../lib/methods.js'


if (Meteor.isServer) {

    describe('Server methods', () => {
        const userId = Random.id();
        const otherUserId = Random.id();
        let taskId;
        
        beforeEach(() => {
            TaskList.remove({});
            taskId = TaskList.insert({
                userId: userId,
                label: 'test task',
                description: "",
                startDate: new Date(),
                duration: 2,
                done: false,
            });
        });

        it('can add new task', () => {

            // Find the task method so we can test it in isolation
            const markTaskDone = Meteor.server.method_handlers['task.insert'];
    
            // Set up a fake method invocation that looks like what the method expects
            const invocation = { userId };
    
            // Build new task object
            const newTask = {
                userId: userId,
                label: '2nd test task',
                description: "",
                startDate: new Date(),
                duration: 2,
                done: false,
            };

            // Run the method with `this` set to the fake invocation
            markTaskDone.apply(invocation, [newTask]);
    
            // retrieve the task
            let task = TaskList.find({ label: newTask.label}).fetch();

            // Verify that the method does what we expected
            assert.equal(task.length, 1);
        });

        it('can mark task done', () => {

            // Find the task method so we can test it in isolation
            const markTaskDone = Meteor.server.method_handlers['task.markDone'];
    
            // Set up a fake method invocation that looks like what the method expects
            const invocation = { userId };
    
            // Run the method with `this` set to the fake invocation            console.log(task)

            markTaskDone.apply(invocation, [taskId, true]);
    
            // retrieve the task
            let task = TaskList.find({ _id: taskId }).fetch()[0];

            // Verify that the method does what we expected
            assert.equal(task.done, true);
        });

        it('can delete task', () => {

            // Find the task method so we can test it in isolation
            const deleteTask = Meteor.server.method_handlers['task.remove'];
    
            // Set up a fake method invocation that looks like what the method expects
            const invocation = { userId };
    
            // Run the method with `this` set to the fake invocation
            deleteTask.apply(invocation, [taskId]);
    
            // Verify that the method does what we expected
            assert.equal(TaskList.find({}).count(), 0);    
        });

    });
}