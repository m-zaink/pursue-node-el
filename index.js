// ------------ Imports ----------------
const express = require('express');
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
// const logger = require('./logger');
// -------------------------------------

const app = express();

// console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);  // default : development

// ----------- Middlewares -------------
app.use(express.json());

app.use(express.static('public'));

app.use(helmet());

// Configuration
console.log('Application name : ' + config.get('name'));
console.log('Mail Server')

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}

// app.use(logger);

//---------------------------------------

function validateCourse(course) {
    const schema = {
        // name should be a string, contain atleast 3 characters and 
        // is required.
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

const courses = [
    {
        id: 1, name: 'course1'
    },
    {
        id: 2, name: 'course2'
    },
    {
        id: 3, name: 'course3'
    }
]

app.get('/', (req, res) => {
    // Starting route
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {

    // Get all the courses
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {

    // Get a specific course identified by id
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)
        return res.status(404).send('Object doesn\'t exists.');
        // 404 - Object Not Found

    res.send(course);
});


app.post('/api/courses', (req, res) => {

    // Add a new course
    // Validate the body of the request.

    const {error} = validateCourse(req.body); // Object Destructuring

    if (error)
        return res.status(400).send(result.error.details[0].message);
        // 400 - Bad Request

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // Loopk up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    
    // If not found, return 404
    if (!course)
        return res.status(404).send('Object doesn\'t exists.');

    // Validate the body of the request.
    const {error} = validateCourse(req.body);

    // If invalid, return 400
    if (error)
        return res.status(400).send(result.error.details[0].message);

    course.name = req.body.name;

    res.send(course);
});


app.delete('/api/courses/:id', (req, res) => {
    // Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id))

    // If not found, return 404
    if (!course)
        return res.status(404).send('Object doesn\'t exists.');

    const index = courses.indexOf(course);

    courses.splice(index, 1);

    res.send(course);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

