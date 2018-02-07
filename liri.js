//required 
var request = require("request");
// Load the fs package to read and write
var fs = require("fs");
// Load the inquirer pacakge
var inquirer = require("inquirer");
//this will take the user input for movie untill i get inquire working 
//twitter
var Twitter = require('twitter');
//spotify
var Spotify = require('node-spotify-api');
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
      // console.log("you are in the spotify Song function")
      inquirer.prompt([
        {
          type: "input",
          name: "songname",
          message: "What song do you like?"
        },
     ]).then(function(inquirerResponse){
      var songRes = inquirerResponse.songname;
      var songName = "";
        // console.log("song res "+ songRes);
      var songName = songRes.split(); 
      // console.log("song res "+ songName);
      //build url  
          var spotify = new Spotify({
            id: '32bf67364ca74add92adac229ad286a3',
            secret: 'f7e36e90658b48d4bc74ac7838ba29a9'
             });

          spotify.search({ type: 'track', query: songName, }, function(err, data) {
              if (err) {
                return console.log('Error occurred: ' + err);
                return;
              }
              //    console.log(data);
              //  console.log(data.tracks.items[0]);
              //artist name
                  console.log(data.tracks.items[0].artists[0].name); 
              //song name     
                  console.log(data.tracks.items[0].name); 
                //album name 
                  console.log(data.tracks.items[0].album.name);
                //external url  
                  console.log(data.tracks.items[0].external_urls.spotify); 
                });
      });//this is the end ot the inquier ".then" 
    }
    };

  function  movieThis(){
    if (action="movie-this") {
      // console.log("you are in the movieThis function")
      inquirer.prompt([
        {
          type: "input",
          name: "moviename",
          message: "What movie do you like?"
        },
     ]).then(function(inquirerResponse){
        var movieRes = inquirerResponse.moviename;
        var movieName = "";
        // console.log("The var moviename is:  "+movieRes);
        var movieName = movieRes.split();
            // Then run a request to the OMDB API with the movie specified
            var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
            // This line is just to help us debug against the actual URL.
            console.log(queryUrl);
            request(queryUrl, function(error, response, body) {
              // If the request is successful
              if (!error && response.statusCode === 200) {
                // Parse the body of the site and recover just the imdbRating
                // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("Title: " + JSON.parse(body).Title);
                console.log("IMDB Rating of this movie: " + JSON.parse(body).Rated);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
                console.log("Country producing movie: " + JSON.parse(body).Country);
                console.log("Language of the movie: " + JSON.parse(body).Language);
                console.log("Plot " + JSON.parse(body).Plot);
                console.log("Actors in the movie: " + JSON.parse(body).Actors);
              }
            });
      });//this is the end ot the inquier ".then" 
    }
  };

  function  doWhat(){
    if (action ="do-what-it-says") {
      // console.log("you are in the doWhat function")
      fs.readFile("./random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }    
          //  split it by commas 
        var dataArray = data.split(",");
         //get data from array
        // console.log(dataArray);
        if (dataArray[0]="spotify-this-song" ) {
         //keys replace with call to file 
          var spotify = new Spotify({
            id: '32bf67364ca74add92adac229ad286a3',
            secret: 'f7e36e90658b48d4bc74ac7838ba29a9'
              });
           spotify.search({ type: 'track', query: dataArray[1], }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
              return;
            }
            //artist name
                console.log(data.tracks.items[0].artists[0].name); 
            //song name     
                console.log(data.tracks.items[0].name); 
              //album name 
                console.log(data.tracks.items[0].album.name);
              //external url  
                console.log(data.tracks.items[0].external_urls.spotify); 
              }); 

          }
        // if (dataArray[0]="movie-this") {
        //   var queryUrl = "http://www.omdbapi.com/?t=" + dataArray[1] + "&y=&plot=short&apikey=trilogy";
        //   // This line is just to help us debug against the actual URL.
        //   console.log(queryUrl);
        //   request(queryUrl, function(error, response, body) {
        //     // If the request is successful
        //     if (!error && response.statusCode === 200) {
        //       // Parse the body of the site and recover just the imdbRating
        //       // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        //       console.log("Release Year: " + JSON.parse(body).Year);
        //       console.log("Release Year: " + JSON.parse(body).Year);
        //       console.log("Title: " + JSON.parse(body).Title);
        //       console.log("IMDB Rating of this movie: " + JSON.parse(body).Rated);
        //       console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
        //       console.log("Country producing movie: " + JSON.parse(body).Country);
        //       console.log("Language of the movie: " + JSON.parse(body).Language);
        //       console.log("Plot " + JSON.parse(body).Plot);
        //       console.log("Actors in the movie: " + JSON.parse(body).Actors);
        //     }
        //   });
          
        // } 
        // //end of movie if 
    
    
      });
    
  
//******end of the very first do what if if  */
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