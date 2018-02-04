//required 
var request = require("request");
// Load the fs package to read and write
var fs = require("fs");
// Load the inquirer pacakge
var inquirer = require("inquirer");
//spotify
var Spotify = require('node-spotify-api');
//get song name 
//store the song name in array 
var nodeArgs = process.argv;
//need variabel to hold the song name
var songName = "";
//loop through the words in nodeArgs array
for (var i = 2; i < nodeArgs.length; i++) {
   if (i> 2 && i < nodeArgs.length) {
       songName = songName + "+" + nodeArgs[i];
   }else{
      songName += nodeArgs[i];
   }
}  
//make query request to the spotify APIreturn artist(s),song name, previewlink,albem song is from

//test getting url syntax  this is from the documenation on site 
 
var spotify = new Spotify({
  id: '32bf67364ca74add92adac229ad286a3',
  secret: 'f7e36e90658b48d4bc74ac7838ba29a9'
});

spotify.search({ type: 'track', query: songName,limit:"20" }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
      return;
    }
    //    console.log(data);
    //  console.log(data.tracks.items[0]);
         console.log(data.tracks.items[0].artists); 
    
 

  });