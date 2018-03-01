
var fs = require('fs');
var request = require('request');

var links = fs.readFileSync('links.txt')
    .toString()
    .split(",");


function makeFile() {

    var i = 0;

    request(links[i], function (error, response, body) {
        if (!error && response.statusCode == 200) {
            fs.writeFileSync(i + '.txt', body);
            i++;

            //tell the program to stop at 29 files
            if (i<29) {
                makeFile();
            }
            else {return;}
        }
        else {console.error('request failed')};
    })

}

makeFile()

