# Metix Task - Simple Reminders app

## General info
This project is a simple to-app impemented with the Meteor js library using the blaze template engine.

#### Structure

lib/collections.js

The data is stored in MongoDB using a SimpleSchema and Collection2 for data integrity, and published here.

lib/methods.js

CRUD functions defined here as Meteor methods.


tests.taskTests.js

Basic unit testing for CRUD functions


client/main.js

Subscribes to data and implements basic routing using Ironrouter

client/templates/createTask.js
client/templates/displayTasks.js

Blaze templates impementing standard ui

client/templates/calendar.js

Alternate calander view using FullCalendar impemented in in blaze template with Tracker


### To run

`$ npm install dependencies`

`$ meteor`

### To test

`$ TEST_WATCH=1 meteor test --driver-package meteortesting:mocha`


