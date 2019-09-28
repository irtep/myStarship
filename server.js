const express = require('express');
const app = express();

app.use(express.static('public'));

// GET handlers:
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/startMenu/index.html');
});

app.get('/main', function(request, response) {
  response.sendFile(__dirname + '/views/mainScreen/index.html');
});
// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
