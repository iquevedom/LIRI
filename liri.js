// Packages load
require("dotenv").config();
var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);

var moment = require("moment");
var inquirer = require("inquirer");
var axios = require("axios");

var option = process.argv[2];
var selection = process.argv[3];


// Create a "Prompt" with a series of questions.
inquirer
    .prompt([
        // Here we create a basic text prompt.
        {
            type: "list",
            message: "Please choose your option :",
            choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"],
            name: "userSelection",
        },

        {
            type: "input",
            message: "Enter your search :",
            name: "userSearch",
        }
    ])
    .then(function (inquirerResponse) {
        // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
        switch (inquirerResponse.userSelection) {
            case "concert-this":
                venue(inquirerResponse.userSelection);
                break;
            case "spotify-this-song":
                /*       musica(selection); */
                break;
            case "movie-this":
                /*   movies(selection); */
                break;
            case "do-what-it-says":
                /*   random(selection); */
                break;
            default:
                break;
        }
    });

function venue(selection) {
    var selection = "Paul McCartney";
    var urlVenue = "https://rest.bandsintown.com/artists/" + selection + "/events?app_id=codingbootcamp";
    axios.get(urlVenue).then(
        function (response) {
            // If the axios was successful...
            // Then log the body from the site!
            /*  console.log(response.data); */
console.log("\n",selection, "Events-----\n")
            for (let i = 0; i < response.data.length; i++) {
                console.log("Country : ",response.data[i].venue.country);
                console.log("City : ",response.data[i].venue.city);
                console.log("Name : ",response.data[i].venue.name);
                console.log("Date : ", moment(response.data[i].datetime).format("MM/DD/YYYY"),"\n");

            }

        });
};