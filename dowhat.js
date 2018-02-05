//required 
var request = require("request");
// Load the fs package to read and write
var fs = require("fs");
// Load the inquirer pacakge
var inquirer = require("inquirer");
//twitter
var Twitter = require('twitter');
//spotify
var Spotify = require('node-spotify-api');

//get the file 
fs.readFile('./random.txt', 'utf8', function(err, contents) {
    if(err)throw err;
    // console.log(contents);
    var dataArray =[];
    // console.log(dataArray); 
    dataArray.push(contents);
     //make  the text  an array
    //postion [0] of array is the case
    //position [1] of the array is the variable   
        if (dataArray[0]="spotify-this-song" ) {
        //feed array[1] into songName
        // console.log("song: " +dataArray[0])
       
        var songRes = dataArray[1];
        var songName = songRes.split(); 

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
      

        }
        if (dataArray[0]="movie-this" ) {
            //feed array[1] into movieName
            // console.log("move :"+dataArray[0])
            var movieName=dataArray[1]
        }
        if (dataArray[0]="my-tweets") {
            console.log("tweet: "+dataArray[0])
           
        }



});







