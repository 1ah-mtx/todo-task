/* 
    displayTasks scripts
*/

//helpers
Template.displayTasks.helpers({
    // gets the task list from the collection
    tasks: () => { return TaskList.find({ userId: Meteor.userId() }) },
});


// tasks
Template.task.helpers({
    formatDate: (date) => { return date.toLocaleDateString() },
    formatTime: (date) => { return ('00' + date.getUTCHours()).slice(-2) + ':' + ('00' + date.getUTCMinutes()).slice(-2)}
});

// event handlers
Template.task.events({
    // updates a tasks done property
    "click input": (event, template) => {
        let id = template.data._id;
        let isDone = ! TaskList.findOne({_id: id}).done;
        //TaskList.update({_id: id}, {$set: {done: isDone}});
        Meteor.call('task.markDone', id, isDone)
    },
    // removes a task from the collection and calendar
    "click .delete-task": (event, template) => {
        let id = template.data._id;
        // update database
        //TaskList.remove({_id: id});
        Meteor.call('task.remove', id);

        // update calendar
        if (calendar) {
            let calendarEvent = calendar.getEventById(id);
            calendarEvent.remove();
        }
    },
});