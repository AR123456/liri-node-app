//required 
var request = require("request");
// Load the fs package to read and write
var fs = require("fs");
// Load the inquirer pacakge
var inquirer = require("inquirer");
//twitter
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: 'ACaLflkZ0Gx8qfcEO2zPb56JK',
    consumer_secret: '89So669hTLboZhVLxKlXkAfPAz4bJlzGvsosS1hPZWLh6uO3Xs',
    access_token_key: '959538956932071424-9gxgNgcrxqx0HZSzGVCdvzyPckjMUM3',
    access_token_secret: '3H3Dm4I11Da1165aMqA1PN0lx3fUm1YMxFIECqc72eoAP'
  });
   
  var params = {screen_name: 'nodejs'};
  client.get('statuses/user_timeline', {q: 'node.js'}, function(error, tweets, response) {
    if (!error) {
    // console.log(tweets);
     for (var i = 0; i < tweets.length; i++) {
             //show the last 20 tweets and when created 
        // do something with data 
        console.log(tweets[i].created_at);
        console.log(tweets[i].text);
       
     }
      
    } else{
      console.log(error);
    }
  });
