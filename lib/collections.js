// collection variable declared with global scope
TaskList = new Mongo.Collection("task-list");

if ( Meteor.isServer ) {
    if (TaskList.find().count() === 0 ) {
        TaskList.insert(
            { label: "Create some tasks!"}
        );
    }
}