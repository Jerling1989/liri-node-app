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


// More Spotify Keys and Secrets
var spotify = new Spotify(keys.spotifyKeys);


// Twitter function for my-tweets command
function twitter() {

	// Accessing Twitter Keys
	var client = new Twitter(keys.twitterKeys);
	// Access timeline of username
	client.get('statuses/user_timeline', 'jacoberling', function(error, tweets, response) {

	  if (error) {
	  	console.log(error);
	  } else {
	  	// Loops through tweets and log to the console
	  	for(var i = 0; i < tweets.length; i++) {
	  		console.log('\n' + tweets[i].text + '\n' + tweets[i].created_at); 
	  	}
	  }

	});	

}

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
	  	console.log('\n Artist(s): ' + result.artists[0].name);
	  	console.log('\n Track: ' + result.name);
	  	console.log('\n Preview: ' + result.preview_url);
	  	console.log('\n Album: ' + result.album.name + '\n');

	  })
	  .catch(function(error) {
	    console.log(error);
	  });

}

// OMDB function for movie-this command
function omdb() {

}

// Random.txt function for do-what-it-says command
function randomText() {

}