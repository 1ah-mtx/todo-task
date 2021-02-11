import SimpleSchema from "simpl-schema";


const taskListSchema = new SimpleSchema({
    userId: {
        type: String,
    },
    label: {
        type: String,
        max: 48,
    },
    description: {
        type: String,
        optional: true,
    },
    startDate: {
        type: Date,
    },
    duration: {
        type: SimpleSchema.Integer,
        min: 1,
        max: 128,
    },
    done: {
        type: Boolean,
    }
});

// collection variable declared with global scope
TaskList = new Mongo.Collection("task-list");

// attach schema for collections2 auto validation
TaskList.attachSchema(taskListSchema);

TaskList.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
});

if ( Meteor.isServer ) {

    // if (TaskList.find().count() === 0 ) {
    //     TaskList.insert({ 
    //         userId: 'su',
    //         label: "Create some tasks!",
    //         description: "the devil makes work...",
    //         startDate: new Date(),
    //         duration: 1,
    //         done: false,
    //     });
    // }

    Meteor.publish('taskList', function tasksPublication() {

        return TaskList.find();

    });
  
}
