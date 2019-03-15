const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Starting route
    // res.send('Hello World');
    // render sends a html markup.
    res.render('index', {
        // {} contains the dynamic variables to be used inside the index.pug
        'title': 'My Express App',
        'message': 'Hello Pug'
    });
});

module.exports = router;