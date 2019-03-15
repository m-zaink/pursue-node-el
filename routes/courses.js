const express = require('express');
const router = express.Router();

// ----------- Aux Data ----------------
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

// -------------------------------------


// --------- Utility Functions ---------

function validateCourse(course) {
    const schema = {
        // name should be a string, contain atleast 3 characters and 
        // is required.
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

// -------------------------------------


router.get('/', (req, res) => {
    // Get all the courses
    res.send(courses);
});

router.get('/:id', (req, res) => {

    // Get a specific course identified by id
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)
        return res.status(404).send('Object doesn\'t exists.');
    // 404 - Object Not Found

    res.send(course);
});


router.post('/', (req, res) => {

    // Add a new course
    // Validate the body of the request.

    const { error } = validateCourse(req.body); // Object Destructuring

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

router.put('/:id', (req, res) => {
    // Loopk up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));

    // If not found, return 404
    if (!course)
        return res.status(404).send('Object doesn\'t exists.');

    // Validate the body of the request.
    const { error } = validateCourse(req.body);

    // If invalid, return 400
    if (error)
        return res.status(400).send(result.error.details[0].message);

    course.name = req.body.name;

    res.send(course);
});


router.delete('/:id', (req, res) => {
    // Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id))

    // If not found, return 404
    if (!course)
        return res.status(404).send('Object doesn\'t exists.');

    const index = courses.indexOf(course);

    courses.splice(index, 1);

    res.send(course);
});

module.exports = router;