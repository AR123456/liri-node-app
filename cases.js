//required 
var request = require("request");
// Load the fs package to read and write
var fs = require("fs");
// Load the inquirer pacakge
var inquirer = require("inquirer");
//this will take the user input for movie untill i get inquire working 
//twitter
var Twitter = require('twitter');
//users choice of my-tweets spotify-this-song  movie-ths do-wht-it-says.
var action = process.argv[2];

switch (action) {
  case "my-tweets":
   myTweets();
    break;

  case "spotify-this-song":
  spotifySong();
    break;

  case "movie-this":
  movieThis();
    break;

  case "do-what-it-says":
    doWhat();
    break;
}


// functions 
  function myTweets() {
    if (action="my-tweets") {
      // console.log("you are in the myTweets function")
    inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is your name?"
      },
      {
        type: "password",
        mask:'*',
        name: "twitterAccount",
        message: "Enter your Twitter password to see tweets: "
      }
   ]).then(function(inquirerResponse){
      //  console.log("yep");
                  
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
                  console.log("____________________________________________________");
                  console.log(tweets[i].created_at);
                  console.log(tweets[i].text);
              }
                } else{
                console.log(error);
                }
            });
    });//this is the end ot the inquier ".then"

    }
      };
      
  function  spotifySong(){    
    if (action ="spotify-this-song") {
      console.log("you are in the spotify Song function")
    //   inquirer.prompt([
    //     {
    //       type: "input",
    //       name: "songName",
    //       message: "What song do you like?"
    //     },
    //  ]).then(function(user){
    //     console.log("lets see some stuff about your song"+ user.songName);
    //   });//this is the end ot the inquier ".then" 
    }
    };

  function  movieThis(){
    if (action="movie-this") {
      // console.log("you are in the movieThis function")
      inquirer.prompt([
        {
          type: "input",
          name: "movieName",
          message: "What movie do you like?"
        },
     ]).then(function(inquirerResponse){
      if(inquirerResponse.input){
        var movieName = inquirerResponse.name;
        // console.log("The var movieName is:  "+movieName);
    
      }
      });//this is the end ot the inquier ".then" 

    }
    
  };

  function  doWhat(){
    if (action ="do-what-it-says") {
      console.log("you are in the doWhat function")
      }
    };





// inquirer.prompt([
//   {
//     type: "input",
//     name: "name",
//     message: "What is your name?"
//   },
//   {
//     type: "list",
//     name: "whichAction",
//     message: "What can LIRI do for you today?",
//     choices: ["my-tweets", "spotify-this-song", "movie-this","do-what-it-says"]
//   },
// ]).then(function(user){
//switch cases 
// switch (user) {
//     //my-tweets
//     case "my-tweets":
//       myTweets();
//       break;
//     //spotify-this-song
//     case "spotify-this-song":
//       spotifySong();
//       break;
//     //movie-this
//     case "movie-this":
//      movieThis();
//       break;
//     //do-what-it-says
//     case "do-what-it-says":
//       doWhat();
//       break;
// //   }
// if (user.whichAction = "my-tweets") {
//   myTweets();
  
// } else if (user.whichAction = "spotify-this-song") {
//   spotifySong()
  
// } else if (user.whichAction = "movie-this") {
//   movieThis()
  
// } 
//  else {
//     doWhat()
  
// } 
// 
//});//this is the end ot the inquier ".then"