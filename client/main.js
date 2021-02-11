import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

// Global Mongo Collection Object in shared folder
import './../lib/collections.js'

// Main entry point - contains application and page templates
import './main.html';

// external templates for views
import './templates/createTask.html';
import './templates/createTask.js';
import './templates/displayTasks.html';
import './templates/displayTasks.js';
import './templates/calendar.html';
import './templates/calendar.js';

// Basic routing
Router.route('/', function() { this.render('pageTask'); });
Router.route('/calendar', function() { this.render('pageCalendar'); });

Router.configure({
    layoutTemplate: 'ApplicationLayout'
  });