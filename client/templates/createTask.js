
Template.createTask.helpers({
  getToday: () => { return new Date().toLocaleDateString('en-CA') },
  getTime: () => { let now = new Date(); return now.getHours() + ':' + now.getMinutes(); },
});

Template.createTask.events({'submit form' (event, instance) { 
    // we are taking care of this here, no need for browser submit
    event.preventDefault();

    // get our data from the form (the event's target object) and put it in an object
    let form = event.target
    let dateTime = new Date(form.startDate.value)
    let time = form.startTime.value.split(":")
    dateTime.setHours(time[0])
    dateTime.setMinutes(time[1])
    
    let newTask = {
      label: form.label.value,
      description: form.description.value,
      startOn: dateTime,
      duration: 2,
      done: false,
    };
    
    // update collection
    TaskList.insert(newTask)

    // reset the form fields
    event.target.label.value = ""
    event.target.description.value = ""
  },
});
