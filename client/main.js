import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


import './main.html';

// Global Mongo Collection Object in shared folder
import './../lib/collections.js'

// templates
import './templates/applicationLayout.html'
import './templates/pageTask.html'
import './templates/pagecalendar.html'
import './templates/createTask.html';
import './templates/createTask.js';
import './templates/displayTasks.html';
import './templates/displayTasks.js';
import './templates/calendar.html';
import './templates/calendar.js';

// Some basic routing
Router.route('/', function() { this.render('pageTask'); });
Router.route('/calendar', function() { this.render('pageCalendar'); });
Router.configure({ layoutTemplate: 'ApplicationLayout' });