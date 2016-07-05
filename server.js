var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var port = process.env.PORT || 8180;

var chats = [
  {
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  },
  {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  },
  {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  },
  {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  },
  {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }
];

var router = express.Router(); // get an instance of the express Router

// route to authenticate
router.get('/authenticate', function(req, res) {
  res.json({});
});

// middleware to use for all requests below and protect routes
router.use(function(req, res, next) {
  var auth = false;
  
  // enable CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS");
      
  // retrieve token
  var token = req.get('Authorization');
  
  // decode token
  if (token) {
    console.log( 'Authorization header: ' + req.get('Authorization') );
  }
  
  if (auth) {
    // authentication is ok, move to next routes
    next();
  }
  else {
    res.status(403).json({error: 'not authorized'});
  }
});

router.get('/chats', function(req, res) {
  res.json(chats);
});

router.get('/chats/:id', function(req, res) {
  for (var i = 0; i < chats.length; i++) {
    if (chats[i].id === parseInt(req.params.id)) {
      res.json(chats[i]);
      return;
    }
  }
  
  res.json({});
});

router.delete('/chats/:id', function(req, res) {
  for (var i = 0; i < chats.length; i++) {
    if (chats[i].id === parseInt(req.params.id)) {
      chats.splice(i, 1);
      break;
    }
  }
  
  res.json(chats);
});

// apply routes to our application
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Waiting on port ' + port);