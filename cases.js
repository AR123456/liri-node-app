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
      console.log("you are in the myTweets function")
  //   inquirer.prompt([
  //     {
  //       type: "password",
  //       mask:'*',
  //       name: "twitterAccount",
  //       message: "What is your Twitter."
  //     }
  //  ]).then(function(user){
  //     console.log("lets see your last 20 tweets"+ user.twitterAccount);
  //   });//this is the end ot the inquier ".then"
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