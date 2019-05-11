var fs = require("fs");
fs.readFile('random.txt', "utf8", (err, data) => {
    if (err) throw err;
    var song = data.split(",");
    console.log(song[1]);
  });