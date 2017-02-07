const express = require('express'); 
const ConversationV1 = require('watson-developer-cloud/conversation/v1');

const app = express();

const keys = require('./keys.js');

{/*A history of any clients and their previous conversations with Watson*/}
let contexts = [];

app.get('/smssent', (req, res, err) => {
  console.log('hello world')
  let message = req.query.Body;
  let number = req.query.From;
  let twilioNumber = req.query.To;
  console.log('Ive recieved a' + message + 'from ' + number + 'twilio number is ' + twilioNumber);
  res.send(message).status(200);

  let context = null;
  let index = 0; 
  let indexForContext = 0;

  contexts.forEach((val) => {
    if (val.from === number) {
      context = val.context;
      contextIndex = index;
    }
    index += 1;
  }); 
  //store message history in context  
  let conversation = new ConversationV1({
    username: keys.watsonUsername,
    password: keys.watsonPassword,
    version_date: ConversationV1.VERSION_DATE_2016_09_20
  });

  
  conversation.message({
  input: { text: message },
  workspace_id: keys.workSpaceId
  }, function(err, response) {
      if (err) {
      console.error(err);
      } else {
      console.log(JSON.stringify(response, null, 2)); // for testing
      }
  });

  const client = require('twilio')(keys.twilioAccountSid, keys.twilioAuthToken); 
  client.messages.create({
    from: twilioNumber,
    to: number,
    body: response.output.text[0] /// verify this response 
  }, (err, message) => {
    if (err) {
      console.error(err.message)
    }
  })
  res.send(''); 
});

app.listen(3000, () => {
  console.log('Connected to port 3000');
});
