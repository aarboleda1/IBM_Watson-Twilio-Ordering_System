const express = require('express'); 
const keys = require('./keys.js');

const app = express();

const client = require('twilio')(keys.twilioAccountSid, keys.twilioAuthToken); 
{/*A history of any clients and their previous conversations with Watson*/}
let contexts = [];

app.get('smssent', (req, res, err) => {
  var message = req.query.Body;
  var number = req.query.From;
  var twilioNumber = req.query.To;
  console.log('Ive recieved a' + message + 'from ' + number + 'twilio number is ' + twilioNumber);
  res.send(message).status(200);

  //store message history in context

  //configure Watson API

  //send message to Watson Developer API

  

});

app.listen(3000, () => {
  console.log('Connected to port 3000');
});
