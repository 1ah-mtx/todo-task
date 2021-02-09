
Template.createTask.onCreated(()=>{});

Template.createTask.helpers({
  
});

Template.createTask.events({'submit form' (event, instance) { 
    // we are taking care of this here, no need for browser submit
    event.preventDefault();

    // get our data from the form (the event's target object)
    let label = event.target.label.value;

    console.log(label, " submitted!")
  },
});
