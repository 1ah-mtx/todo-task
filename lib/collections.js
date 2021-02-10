import SimpleSchema from "simpl-schema";

const taskListSchema = new SimpleSchema({
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
        TaskList.insert(
            { label: "Create some tasks!"}
        );
    }
}