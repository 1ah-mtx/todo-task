// calendar stuff
import { Calendar, getEventClassNames } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';

import '@fullcalendar/common/main.css';

import 'bootstrap/dist/css/bootstrap.css';
// import '@fortawesome/fontawesome-free/js/all.js';

calendar = null
var calendarInitialEvents = []

Template.calendar.helpers({
    tasks: () => { return TaskList.find() },
    addEvent: (task) => { 
        console.log("add event", task)

        let endsOn = new Date(task.startDate)
        endsOn.setTime(endsOn.getTime() + ( task.duration * 60 * 60 * 1000 ) )

        let myEvent = {
            id: task._id,
            title: task.label,
            start: task.startDate,
            end: endsOn,
        }
 
        // if calendar object has been initialised, add event
        if (calendar) {
            let result = calendar.addEvent(myEvent);
            console.log("event added", myEvent, result);
            calendar.render();
        }
        else {
            // store in buffer for eventual init
            console.log("event buffered");
            calendarInitialEvents.push(myEvent)
        }
    },
});

Template.calendar.onRendered(() => {
    
    if ( !calendar ) 
        _initCalendar()
    
    calendar.render();
});

function _initCalendar() {

    console.log("in _initCalendar()")
    
    var host = document.getElementById('calendarDiv');

    calendar = new Calendar(host, {
        plugins: [ interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin/*, bootstrapPlugin*/ ],
        themeSystem: 'standard',    // 'bootstrap' theme buggy...
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