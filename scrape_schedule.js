
var request = require('request');
var fs = require('fs');

function getSched() {
    request('http://www.espn.com/mens-college-basketball/team/schedule/_/id/222/year/2018', function (error, response, body) {

        if (!error && response.statusCode == 200) {

            fs.writeFileSync('schedule.txt', body);

        }
        else {console.error('request failed')};
    })
}

// Call the function
getSched();