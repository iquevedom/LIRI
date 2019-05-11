require("dotenv").config();
var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);


var moment=require("moment");

var axios = require("axios");

var option = process.argv[2];
var selection = process.argv[3];

switch (option) {
    case "concert-this":
        concierto(selection);
        break;
    case "spotify-this-song":
        musica(selection);
        break;
    case "movie-this":
        movies(selection);
        break;
    case "do-what-it-says":
        random(selection);
        break;
    default:
        break;
}

// shaws
function concierto(selection) {
    console.log(option);
     selection = "Paul McCartney";
    console.log(selection);
    var urlConcierto = "https://rest.bandsintown.com/artists/" + selection + "/events?app_id=codingbootcamp";
    console.log(urlConcierto);
    axios.get(urlConcierto).then(
        function (response) {
            // If the axios was successful...
            // Then log the body from the site!
           /*  console.log(response.data); */

            for (let i = 0; i < response.data.length; i++) {
                console.log(response.data[i].venue.country);
                console.log(response.data[i].venue.city);
                console.log(response.data[i].venue.name);
                console.log(moment(response.data[i].datetime).format("MM/DD/YYYY"));
                
            }

        },


        
        function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("error.response.data");
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        }



    );

}

function musica(selection) {


}
function movies(selection) {


}

function random(selection) {


}
