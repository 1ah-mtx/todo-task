/* 
    displayTasks scripts
*/

const TASK_CLASS_DONE = 'task-done';
const TASK_CLASS_LATE = 'task-late';
const TASK_CLASS_PENDING = 'task-pending';

// task list helpers
Template.displayTasks.helpers({
    // gets the task list from the collection
    tasks: () => { return TaskList.find({ userId: Meteor.userId() }) },
});


// task item helpers
Template.task.helpers({
    formatDate: (date) => { return date.toLocaleDateString() },
    formatTime: (date) => { return ('00' + date.getUTCHours()).slice(-2) + ':' + ('00' + date.getUTCMinutes()).slice(-2)},
    // returns class name indicating task completion state
    state: (done, startDate, duration) => {
        let state = TASK_CLASS_PENDING;
        if (done) {
            state = TASK_CLASS_DONE;
        }
        else {
            let now = new Date();
            let dueDate = new Date(startDate);
            dueDate.setTime(dueDate.getTime() + (duration * 60 * 60 * 1000));

            if (dueDate.getTime() < now.getTime()) {
                state = TASK_CLASS_LATE;
            }
        }
        return state;
    }
});

// task item event handlers
Template.task.events({
    // updates a tasks done property
    "click input": (event, template) => {
        let id = template.data._id;
        let isDone = ! TaskList.findOne({_id: id}).done;

        Meteor.call('task.markDone', id, isDone)
    },
    // removes a task from the collection and calendar
    "click .delete-task": (event, template) => {
        let id = template.data._id;
        // update database

        Meteor.call('task.remove', id);
    },
});