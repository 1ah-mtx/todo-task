import { calendarFormat } from "moment";


// displayTasks 
Template.displayTasks.helpers({
    tasks: () => { return TaskList.find() },
});


// tasks
Template.task.helpers({
    formatDate: (date) => { return date.toLocaleDateString() },
    formatTime: (date) => { return date.getUTCHours() + ':' + date.getUTCMinutes()}
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
        console.log("deleteing ", calendarEvent);
        calendarEvent.remove();
    },
});