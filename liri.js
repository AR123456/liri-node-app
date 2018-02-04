//required 
var request = require("request");
// Load the fs package to read and write
var fs = require("fs");
// Load the inquirer pacakge
var inquirer = require("inquirer");
//twitter
var Twitter = require('twitter');

//this will take the user input for movie until i get inquire working 

var action = user.whichAction//from the which action list 

//link to keys  store as a variable 
// var twitterKeys = //link to file 
// var spotifyKeys =//link to file 
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
    message: "What is your Twitter."
  },
  {
    type: "input",
    name: "movieName",
    message: "What movie do you like?"
  },
  {
    type: "input",
    name: "songName",
    message: "What song do you like?"
  },
  {
    type: "list",
    name: "whichAction",
    message: "What can LIRI do for you today?",
    choices: ["my-tweets", "spotify-this-song", "movie-this","do-what-it-says"]
  },
]).then(function(user){
//switch cases 
switch (action) {
    //my-tweets
    case "my-tweets":
      myTweets();
      break;
    //spotify-this-song
    case "spotify-this-song":
      spotifySong();
      break;
    //movie-this
    case "movie-this":
     movieThis();
      break;
    //do-what-it-says
    case "do-what-it-says":
      doWhat();
      break;
  }
});//this is the end ot the inquier ".then"
// functions 
function myTweets() {
  if (user.whichAction ="my-tweets") {
    console.log("you are in the myTweets function")
  }
//1. `node liri.js my-tweets`
//* This will show your last 20 tweets and when they were created at in your terminal/bash window.
    }
function  spotifySong(){    
  if (user.whichAction ="spotify-this-song") {
    console.log("you are in the spotifySong function")
  }
// 2. `node liri.js spotify-this-song '<song name here>'`

//    * This will show the following information about the song in your terminal/bash window
     
//      * Artist(s)
     
//      * The song's name
     
//      * A preview link of the song from Spotify
     
//      * The album that the song is from

//    * If no song is provided then your program will default to "The Sign" by Ace of Base.
    }
function  movieThis(){
  if (user.whichAction ="movie-this") {
    console.log("you are in the movieThis function")
  }
  
// 3. `node liri.js movie-this '<movie name here>'` for the inquire syntax
var UserChoiceFromInquire = nodeArgs;//combine this but basicly either the movie name or movie input from another prompt
// Store all of the arguments in an array
var nodeArgs = process.argv;// need to use the "inquire to get the input also add to the json and requred above "
// Create an empty variable for holding the movie name
var movieName = "";
// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
  for (var i = 2; i < nodeArgs.length; i++) {
  if (i > 2 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
    }  else {
      movieName += nodeArgs[i];
    }
  }
// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
// This line is just to help us debug against the actual URL.
console.log(queryUrl);
request(queryUrl, function(error, response, body) {
  // If the request is successful
  if (!error && response.statusCode === 200) {
    // Parse the body of the site get:
    //* Title of the movie.
    console.log("Title: " + JSON.parse(body).Title);
        // * Year the movie came out.
    console.log("Release Year: " + JSON.parse(body).Year);
 //        * IMDB Rating of the movie  ``  
    console.log("IMDB Rating of this movie: " + JSON.parse(body).Rated);
    //        * Rotten Tomatoes Rating of the movie.
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
    //        * Country where the movie was produced.
    console.log("Country producing movie: " + JSON.parse(body).Country);
    //        * Language of the movie.
    console.log("Language of the movie: " + JSON.parse(body).Language);
        //        * Plot of the movie.
    console.log("Actors in the movie: " + JSON.parse(body).Plot);
    //        * Actors in the movie.
    console.log("Actors in the movie: " + JSON.parse(body).Actors);
      }
    });
}
//*********************************************************** */
function  doWhat(){
  if (user.whichAction ="do-what-it-says") {
    console.log("you are in the doWhat function")
  }
// 4. `node liri.js do-what-it-says`
   
//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     
//      * Feel free to change the text in that document to test out the feature for other commands.
  }

// ### BONUS

// * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

// * Make sure you append each command you run to the `log.txt` file. 

// * Do not overwrite your file each time you run a command.
