
Template.createTask.helpers({
  getToday: () => { return new Date().toLocaleDateString('en-CA') },
  getTime: () => { 
      let now = new Date(); 
      return ('00' + now.getHours()).slice(-2) + ':' + ('00'+ now.getMinutes()).slice(-2);
  },
});

Template.createTask.events({'submit form' (event, instance) { 
    // we are taking care of this here, no need for browser submit
    event.preventDefault();

    // get our data from the form (the event's target object) and put it in an object
    let form = event.target
    let dateTime = new Date(form.startDate.value)
    // add in the time
    let time = form.startTime.value.split(":")
    dateTime.setHours(time[0])
    dateTime.setMinutes(time[1])
    
    let user = Meteor.user()
    console.log(user)

    let newTask = {
      userId: user._id,
      label: form.label.value,
      description: form.description.value,
      startDate: dateTime,
      duration: form.duration.value,
      done: false,
    };
    
    // update collection
    TaskList.insert(newTask)

    // reset the form fields
    event.target.label.value = ""
    event.target.description.value = ""
  },
});

Template.createTask.onRendered( () => {
  let label = document.forms[0].label
  let submit = document.forms[0].addTask
  label.addEventListener("input", (event) => { submit.disabled = label.value.length === 0 })
});