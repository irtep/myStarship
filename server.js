const express = require('express');
const app = express();

app.use(express.static('public'));

// GET handlers:
// start menu
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/startMenu/index.html');
});

// campaign main screen
app.get('/main', function(request, response) {
  response.sendFile(__dirname + '/views/mainScreen/index.html');
});

// space battle:
app.get('/sbattle', function(request, response) {
  response.sendFile(__dirname + '/views/spaceBattle/index.html');
});

// close combat:
app.get('/ccombat', function(request, response) {
  response.sendFile(__dirname + '/views/closeCombat/index.html');
});
// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

// notes:
/*
Should use that kind of stuff with dabatase stuffs (and html requests at fronend side):
var promise1 = new Promise(function(resolve, reject) {
  let serverResponse = null;
  
  if (serverResponse) {
    resolve('Success!');
  } else {
    reject('Error!');
  }
});

promise1.then(function(value) { console.log(value); });

promise1.catch( (error) => { console.log(error);});

// EXAMPLE:

      const newDbConnect = new Promise( (resolve, reject) => {
      
        champsModel.find((err, results) => {
          
          if (results !== null) {
            
            resolve(results);
          } 
        });  
      });
      
      newDbConnect.then( (results) => {
        
        responding = results;
        const sending = JSON.stringify(responding);
        console.log("responding with data ");
        console.log('lists now: ', responding);
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end(sending); 
      });
*/
