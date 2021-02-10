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

Template.calendar.helpers({
    tasks: () => { return TaskList.find() },
    // clearEvents: () => { 
    //     console.log('clear called')
    //     if (calendar) {
    //         let events = calendar.getEvents() 
    //         console.log('clearing ', events.length,  ' events')
    //         events.forEach( event => { event.remove() } )
    //     }
    // },
    addEvent: (task) => { 
        console.log(task)
        let endsOn = new Date(task.startOn)
        endsOn.setTime(endsOn.getTime() + ( task.duration * 60 * 60 * 1000 ) )

        let myEvent = {
            id: task._id,
            title: task.label,
            start: task.startOn,
            end: endsOn,
        }
        let result = calendar.addEvent(myEvent);
        console.log("myEvent! : ", myEvent, result);
        calendar.render();
    },
});

Template.calendar.onRendered(() => {
    _initCalendar()
});

function _initCalendar() {

    var host = document.getElementById('calendarDiv');

    calendar = new Calendar(host, {
        plugins: [ interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin/*, bootstrapPlugin*/ ],
        themeSystem: 'standard',    // 'botstrap' theme buggy...
        headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        initialDate: new Date(),
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        dayMaxEvents: true, // allow "more" link when too many events
        events: []
    });

    calendar.render();
}