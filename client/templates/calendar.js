// calendar stuff
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';

import '@fullcalendar/common/main.css';

import 'bootstrap/dist/css/bootstrap.css';
// import '@fortawesome/fontawesome-free/js/all.js';

Template.calendar.onRendered(() => {

    var host = document.getElementById('calendarDiv');

    var calendar = new Calendar(host, {
        plugins: [ interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin/*, bootstrapPlugin*/ ],
        themeSystem: 'standard',    // 'botstrap' theme buggy...
        headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        initialDate: '2018-01-12',
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        dayMaxEvents: true, // allow "more" link when too many events
        events: [
        {
            title: 'All Day Event',
            start: '2018-01-01',
        },
        {
            title: 'Long Event',
            start: '2018-01-07',
            end: '2018-01-10'
        },
        ]
    });

   calendar.render();
});