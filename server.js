var express = require('express');
var app = express();

var port = process.env.PORT || 8180;

var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log(req.headers);
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
    res.json({ message: 'welcome to our api!' });
});

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Waiting on port ' + port);