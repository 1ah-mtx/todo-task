import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

/* bootstrapPlugin buggy in meteor...*/
// import bootstrapPlugin from '@fullcalendar/bootstrap';
// import '@fortawesome/fontawesome-free/js/all.js';

import '@fullcalendar/common/main.css';
import 'bootstrap/dist/css/bootstrap.css';

var calendar = null
var calendarInitialEvents = []

// helpers to populate the calenadar with events
Template.calendar.helpers({
    tasks: () => {
        // return users tasks
        return TaskList.find({
            userId: Meteor.userId()
        })
    },
    addEvent: (task) => {
        /* adds event to calendar, buffering if called before calendar is instantiated */

        // calculate event end from startdate + duration
        let endsOn = new Date(task.startDate)
        endsOn.setTime(endsOn.getTime() + (task.duration * 60 * 60 * 1000))

        // create a callendar event object from our task
        let myEvent = {
            id: task._id,
            title: task.label,
            start: task.startDate,
            end: endsOn,
        }

        // if calendar object has been initialised, add event
        if (calendar) {
            let result = calendar.addEvent(myEvent);
            calendar.render();
        } 
        else {
            // store in buffer for eventual init
            calendarInitialEvents.push(myEvent)
        }
    },
});


// instantiate, attach and render the calendar when template rendered
Template.calendar.onRendered(() => {

    if (!calendar)
        _initCalendar()

    calendar.render();
});


// clean up
Template.calendar.onDestroyed(() => {
    calendar = null;
    calendarInitialEvents = [];
});


// instantiate and attach calendar
function _initCalendar() {
    // get ref to placeholder
    let host = document.getElementById('calendarDiv');

    // create a new calander object and render it in the placeholder
    calendar = new Calendar(host, {
        plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin /*, bootstrapPlugin*/ ],
        themeSystem: 'standard', // 'bootstrap' theme buggy...
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        initialDate: new Date(),
        navLinks: true,
        editable: true,
        dayMaxEvents: true,
        events: calendarInitialEvents // populate with any previously rendered events
    });
}