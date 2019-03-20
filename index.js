// ------------ Imports ----------------
const express = require('express');
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
// const startupDebugger = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');

//  User - Defined
const courses = require('./routes/courses');
const home = require('./routes/home');

// -------------------------------------

const app = express();

// console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);  // default : development

// ----------- Middlewares -------------

// app.use(logger); - user-defined middleware
app.use(express.json());
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);
// -------------------------------------

// --------- Configuration -------------

// console.log('Application name : ' + config.get('name'));
// console.log('Mail Server')
// console.log(`Password : ${config.get('mail.password')}`);
// if (app.get('env') === 'development') {
//     app.use(morgan('tiny'));
//     // startupDebugger('Started morgan');
// }

// DB work
// dbDebugger('Connected to db')
app.set('view engine', 'pug');  // Tells what view engine to use
app.set('views', './views');    // Tells where to look for the views
// -------------------------------------

// Listener set - up
// PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${port}`));

// ------------------------------------