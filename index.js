// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000,'0.0.0.0', function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


// Enable Express to trust proxy headers
app.set('trust proxy', true);



// Define a route for /api/whoami
app.get('/api/whoami', (req, res) => {
 
  // Get the user's IP address from the request object
  const ipaddress =req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(ipaddress)
  // Get the user's preferred language from the "Accept-Language" header
  const language = req.get('Accept-Language');

  // Get the user's software information from the "User-Agent" header
  const software = req.get('User-Agent');

  // Return the response with ipaddress, language, and software keys
  res.json({ ipaddress, language, software });
});