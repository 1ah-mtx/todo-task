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
        max: 4,
    },
    done: {
        type: Boolean,
    }
});

// collection variable declared with global scope
TaskList = new Mongo.Collection("task-list");

if ( Meteor.isServer ) {
    if (TaskList.find().count() === 0 ) {
        TaskList.insert({ 
            UserId: 'su',
            label: "Create some tasks!",
            description: "the devil makes work...",
            startDate: new Date(),
            duration: 1,
            done: false,
        });
    }
}