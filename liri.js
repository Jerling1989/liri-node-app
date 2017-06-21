// Twitter Package
var Twitter = require('twitter');
// Spotify Package
var Spotify = require('node-spotify-api');
// Request Package
var request = require('request');
// fs Package
var fs = require('fs');
// Twitter and Spotify Keys
var keys = require('./keys.js');


// User Command Line Inputs
var userCommand = process.argv[2];
var extraCommand = process.argv[3];


// Switch statement to run function based on user commands
switch (userCommand) {
	case 'my-tweets':
		twitter();
		break;
	case 'spotify-this-song':
		spotify();
		break;
	case 'movie-this':
		omdb();
		break;
	case 'do-what-it-says':
		randomText();
		break;
	default:
		console.log('Sorry That is not a Valid Command');
}


// randomText function to get search query from text file
function randomText() {
	// Use file system function to pull data from random.txt
	fs.readFile("random.txt", "utf8", function(error, data) {
	// log error to console if applicable
  if (error) {
    return console.log(error);
  }

  // Place data into an array
  var dataArr = data.split(",");

  extraCommand = dataArr[1];

  var command = dataArr[0];

  switch(command) {
  	case "my-tweets": 
  	twitter();
  	break;
  	case "spotify-this-song": 
  	spotify(); 
  	break;
  	case "movie-this": 
  	omdb();
  	break;
  	console.log("Not a valid command.");
  }
	
});

}

// Twitter function for my-tweets command
function twitter() {

	// Accessing Twitter Keys
	var client = new Twitter(keys.twitterKeys);

	// Access timeline of my twitter username
	client.get('statuses/user_timeline', 'jacoberling', function(error, tweets, response) {
		// log error to console if applicable
	  if (error) {
	  	console.log(error);
	  } else {
	  	// Loops through tweets and log to the console
	  	for(var i = 0; i < tweets.length; i++) {
	  		console.log('\n' + 'Tweet: ' + tweets[i].text); 
	  		console.log('\n' + 'Time: ' + tweets[i].created_at + '\n');
	  	}
	  }

	});	

} // END OF TWITTER FUNCTION

// Spotify function for spotify-this-song command
function spotify() {

	// Accessing Spotify Keys
	var spotify = new Spotify(keys.spotifyKeys);

	// If user doesn't specify song
	if (!extraCommand) {
		extraCommand = 'The Sign Ace of Base';
	};

	// Searches Spotify API by user command input
	spotify.search(
		{ type: 'track', 
		query: extraCommand
		})
	  .then(function(response) {
	  	var result = response.tracks.items[0];
	  	// Song Data
	  	console.log('\n Artist: ' + result.artists[0].name);
	  	console.log('\n Track: ' + result.name);
	  	console.log('\n Preview: ' + result.preview_url);
	  	console.log('\n Album: ' + result.album.name + '\n');

	  })
	  // log error to console if applicable
	  .catch(function(error) {
	    console.log(error);
	  });

} // END OF SPOTIFTY FUNCTION 

// OMDB function for movie-this command
function omdb() {
	// If user doesn't specify a movie
	if(!extraCommand){
		request('http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=40e9cece', function(error, response, body){
		if(!error && response.statusCode === 200){
			var movieData = JSON.parse(body);
			console.log('\n' + 'Title: ' + movieData.Title);
			console.log('\n' + 'Year: ' + movieData.Year);
			console.log('\n' + 'Rating: ' + movieData.imdbRating);
			console.log('\n' + 'Country: ' + movieData.Country);
			console.log('\n' + 'Language: ' + movieData.Language);
			console.log('\n' + 'Plot: ' + movieData.Plot);
			console.log('\n' + 'Actors: ' + movieData.Actors);
			console.log('\n' + 'Rotten Tomatoes: ' + 'https://www.rottentomatoes.com/search/?search=' + movieData.Title + '\n');
		}
	})
	}
	// Searches OMDB API for data based on user search
	else{
		request('http://www.omdbapi.com/?t=' + extraCommand + '&y=&plot=short&apikey=40e9cece', function(error, response, body){
			if(!error && response.statusCode === 200){
				var movieData = JSON.parse(body);
				console.log('\n' + 'Title: ' + movieData.Title);
				console.log('\n' + 'Year: ' + movieData.Year);
				console.log('\n' + 'Rating: ' + movieData.imdbRating);
				console.log('\n' + 'Country: ' + movieData.Country);
				console.log('\n' + 'Language: ' + movieData.Language);
				console.log('\n' + 'Plot: ' + movieData.Plot);
				console.log('\n' + 'Actors: ' + movieData.Actors);
				console.log('\n' + 'Rotten Tomatoes: ' + 'https://www.rottentomatoes.com/search/?search=' + movieData.Title + '\n');
			} if(error) {
				console.log(error);
			}
		})
	}

} // END OF OMDB FUNCTION
