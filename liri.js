//required
let request = require("request");
// Load the fs package to read and write
let fs = require("fs");
// Load the inquirer package
let inquirer = require("inquirer");
//twitter
let Twitter = require("twitter");
//spotify
let Spotify = require("node-spotify-api");
//users choice of my-tweets spotify-this-song  movie-ths do-wht-it-says.
let action = process.argv[2];
//link to keys
let client = new Twitter(require("./keys.js").twitterKeys);
let spotify = new Spotify({
  id: "32bf67364ca74add92adac229ad286a3",
  secret: "f7e36e90658b48d4bc74ac7838ba29a9"
});
inquirer
  .prompt([
    {
      type: "list",
      name: "wantToWhat",
      message: "Pick what you would like to try",
      choices: [
        "my-tweets",
        "spotify-this-song",
        "movie-this",
        "do-what-it-says"
      ]
    }
  ])
  .then(function(answers) {
    let action = answers.wantToWhat;
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
  });
// functions
function myTweets() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is your name?"
      },
      {
        type: "password",
        mask: "*",
        name: "twitterAccount",
        message: "Enter a secret password to see my tweets: "
      }
    ])
    .then(function(inquirerResponse) {
      let params = { screen_name: "nodejs" };
      client.get("statuses/user_timeline", { count: 20 }, function(
        error,
        tweets,
        response
      ) {
        if (!error) {
          for (let i = 0; i < tweets.length; i++) {
            //show tweets and when created
            console.log("____________________________________________________");
            console.log(tweets[i].created_at);
            console.log(tweets[i].text);
            fs.appendFile(
              "log.txt",
              "\n" + tweets[i].text + "\n" + tweets[i].created_at + "\n",
              "utf8",
              function(err) {
                if (err) {
                  return console.log(err);
                }
              }
            );
          }
        } else {
          console.log(error);
        }
      });
    });
}
function spotifySong() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "songname",
        message: "What song do you like?"
      }
    ])
    .then(function(inquirerResponse) {
      let songRes = inquirerResponse.songname;
      var songName = "";
      var songName = songRes.split();
      //build url
      spotify.search({ type: "track", query: songName }, function(err, data) {
        if (err) {
          return console.log("Error occurred: " + err);
          return;
        }
        //    console.log(data);
        //artist name
        console.log(data.tracks.items[0].artists[0].name);
        //song name
        console.log(data.tracks.items[0].name);
        //album name
        console.log(data.tracks.items[0].album.name);
        //external url
        console.log(data.tracks.items[0].external_urls.spotify);
        //write to log file
        fs.appendFile(
          "log.txt",
          "\n" +
            data.tracks.items[0].artists[0].name +
            "\n" +
            data.tracks.items[0].name +
            "\n" +
            data.tracks.items[0].album.name +
            "\n" +
            data.tracks.items[0].external_urls.spotify +
            "\n",
          "utf8",
          function(err) {
            if (err) {
              return console.log(err);
            }
          }
        );
      });
    });
}
function movieThis() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "moviename",
        message: "What movie do you like?"
      }
    ])
    .then(function(inquirerResponse) {
      //  console.log("inquire response :  "+inquirerResponse.moviename);
      if (inquirerResponse.moviename == "") {
        // console.log("no movie selected")
        var movieRes = "Mr Nobody";
      } else {
        var movieRes = inquirerResponse.moviename;
      }
      // Then run a request to the OMDB API
      let queryUrl =
        "http://www.omdbapi.com/?t=" +
        movieRes +
        "&y=&plot=short&apikey=trilogy";
      // console.log(queryUrl);
      request(queryUrl, function(error, response, body) {
        //  console.log(body);
        // If the request is successful
        if (!error && response.statusCode === 200) {
          // Parse the body
          console.log("Release Year: " + JSON.parse(body).Year);
          console.log("Title: " + JSON.parse(body).Title);
          console.log("IMDB Rating of this movie: " + JSON.parse(body).Rated);
          console.log(
            "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value
          );
          console.log("Country producing movie: " + JSON.parse(body).Country);
          console.log("Language of the movie: " + JSON.parse(body).Language);
          console.log("Plot " + JSON.parse(body).Plot);
          console.log("Actors in the movie: " + JSON.parse(body).Actors);
          //write to file
          fs.appendFile(
            "log.txt",
            "\n" +
              "Release Year: " +
              JSON.parse(body).Year +
              "\n" +
              "Title: " +
              JSON.parse(body).Title +
              "\n" +
              "IMDB Rating of this movie: " +
              JSON.parse(body).Rated +
              "\n" +
              "Rotten Tomatoes Rating: " +
              JSON.parse(body).Ratings[1].Value +
              "\n" +
              "Country producing movie: " +
              JSON.parse(body).Country +
              "\n" +
              "Language of the movie: " +
              JSON.parse(body).Language +
              "\n" +
              "Plot " +
              JSON.parse(body).Plot +
              "\n" +
              "Actors in the movie: " +
              JSON.parse(body).Actors +
              "\n",
            "utf8",
            function(err) {
              if (err) {
                return console.log(err);
              }
            }
          );
        }
      });
    });
}
function doWhat() {
  if ((action = "do-what-it-says")) {
    fs.readFile("./random.txt", "utf8", function(error, data) {
      if (error) {
        return console.log(error);
      }
      let dataArray = data.split(",");
      //get data from array
      if ((dataArray[0] = "spotify-this-song")) {
        spotify.search({ type: "track", query: dataArray[1] }, function(
          err,
          data
        ) {
          if (err) {
            return console.log("Error occurred: " + err);
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
          //write to log file
          fs.appendFile(
            "log.txt",
            "\n" +
              data.tracks.items[0].artists[0].name +
              "\n" +
              data.tracks.items[0].name +
              "\n" +
              data.tracks.items[0].album.name +
              "\n" +
              data.tracks.items[0].external_urls.spotify +
              "\n",
            "utf8",
            function(err) {
              if (err) {
                return console.log(err);
              }
            }
          );
        });
      }
    });
  }
}
