// Packages load
require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var inquirer = require("inquirer");
var axios = require("axios");

// MAIN MENU : User selection prompt.
inquirer
    .prompt([
        // User selection action.
        {
            type: "list",
            message: "Please choose your option :",
            choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"],
            name: "userSelection",
        },
        // User selection search.
        {
            type: "input",
            message: "Enter your search :",
            name: "userSearch",
        }
    ])
    .then(function (inquirerResponse) {
        // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.

        // Case for respond user choice
        switch (inquirerResponse.userSelection) {
            // Venue selection
            case "concert-this":
                venue(inquirerResponse.userSearch);
                break;
            // Music selection
            case "spotify-this-song":
                music(inquirerResponse.userSearch);
                break;
            // Movie selection
            case "movie-this":
                movie(inquirerResponse.userSearch);
                /*   movies(selection); */
                break;
            case "do-what-it-says":
                /*   random(selection); */
                break;
            // There´s no default selection
        }
    });

// Venue API call to Bands In Town website and display of information
function venue(selection) {
    var urlVenue = "https://rest.bandsintown.com/artists/" + selection + "/events?app_id=codingbootcamp";
    axios.get(urlVenue).then(
        function (response) {
            // If the axios was successful...   
            console.log("\n", selection, "Events-----\n")
            for (let i = 0; i < response.data.length; i++) {
                console.log("Country : ", response.data[i].venue.country);
                console.log("City    : ", response.data[i].venue.city);
                console.log("Name    : ", response.data[i].venue.name);
                console.log("Date    : ", moment(response.data[i].datetime).format("MM/DD/YYYY"), "\n");
            };
        })
        .catch(function (error) {
            // Fail BandsInTown API response
            console.log("An error has ocurred : ", err);
          });
        return;
};

// Movie API call to to IMDB website and display of information
function movie(selection) {

    // Empty user song selection, then searches default
    if (!selection) {
        selection = "Mr. Nobody"
    };

    // Splits movie name into an array
    var movieArray = selection.split(" ");
    var movieSearch = "";
    
    // Adds "+" to the string for the IMDB API
    for (let i = 0; i < movieArray.length; i++) {
        if (i < (movieArray.length - 1)) {
            movieSearch += movieArray[i] + "+";
        } else {
            movieSearch += movieArray[i];
        }
    }

    // Configures url
    var queryUrl = "https://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=trilogy";
    
    /// IMDB API call
    axios.get(queryUrl).then(
        function (response) {

        // Display movie details
        console.log("\n **** Movie Information **** \n");
        console.log("Title             : ",response.data.Title); 
        console.log("Year              : ",response.data.Year); 
        console.log("IMDB Rating       : ",response.data.Ratings[0].Value); 
        console.log("R Tomatoes Rating : ",response.data.Ratings[1].Value); 
        console.log("Country           : ",response.data.Country); 
        console.log("Language          : ",response.data.Language); 
        console.log("Actors            : ",response.data.Actors); 
        console.log("Plot              : ",response.data.Plot, "\n"); 
        console.log("\n **** End **** \n");
        })
        .catch(function (error) {
            // Fail OMDB API response
            console.log("An error has ocurred : ", err);
          });
        return;
}

function music(selection) {

    // Empty user song selection, then searches default
    if (!selection) {
        selection = "The Sign Ace of Base"
    };

    /// Spotify API call with string 'selection' limited to 1 song (can may be several)
    spotify
    .search({ type: 'track', query: selection, limit : 1 })
    .then(function(response) {

       // Successful spotify API response
       console.log("Album           : ",response.tracks.items[0].album.name); 
       console.log("Song            : ",response.tracks.items[0].name);
       console.log("Artist(s)       : ",response.tracks.items[0].artists[0].name);  
       console.log("Date released   : ",response.tracks.items[0].album.release_date); 
       console.log("Preview url     : ",response.tracks.items[0].preview_url);
    })
    .catch(function(err) {
      // Fail spotify API response
      console.log("An error has ocurred : ", err);
      return;
    });

}