const express = require('express'); 
const keys = require('./keys.js');

const app = express();

const ConversationV1 = require('watson-developer-cloud/conversation/v1');
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
  
  let conversation = new ConversationV1({
  username: 'FILL_ME_IN',
  password: 'FILL_ME_IN',
  version_date: ConversationV1.VERSION_DATE_2016_09_20
  });
  
  conversation.message({
  input: { text: 'What\'s the weather?' },
  workspace_id: '<workspace id>'
  }, function(err, response) {
      if (err) {
      console.error(err);
      } else {
      console.log(JSON.stringify(response, null, 2));
      }
  });
  //configure Watson API

  //send message to Watson Developer API



});

app.listen(3000, () => {
  console.log('Connected to port 3000');
});
