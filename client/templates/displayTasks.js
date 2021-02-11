import { calendarFormat } from "moment";


// displayTasks 
Template.displayTasks.helpers({
    tasks: () => { return TaskList.find({ userId: Meteor.userId() }) },
});


// tasks
Template.task.helpers({
    formatDate: (date) => { return date.toLocaleDateString() },
    formatTime: (date) => { return ('00' + date.getUTCHours()).slice(-2) + ':' + ('00' + date.getUTCMinutes()).slice(-2)}
});

Template.task.events({
    "click input": (event, template) => {
        let id = template.data._id;
        let isDone = ! TaskList.findOne({_id: id}).done;
        TaskList.update({_id: id}, {$set: {done: isDone}});
    },
    "click .delete-task": (event, template) => {
        TaskList.remove({_id: template.data._id});
        let calendarEvent = calendar.getEventById(template.data._id);
        console.log("deleting ", calendarEvent);
        calendarEvent.remove();
    },
});