var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var request = require('request');

// load the schedule text file into a variable, `content`, load `content` into a cheerio object
var content = fs.readFileSync('schedule.txt');
var $ = cheerio.load(content);

// create the empty array to be filled with gameID
var idOutput = [];
var gameIDs = [];
var links = [];

async function scrape_games() {

    getSched();
    getIDs();
    makeFile();

}

scrape_games()

function getSched() {
    request('http://www.espn.com/mens-college-basketball/team/schedule/_/id/222/year/2018', function (error, response, body) {

        if (!error && response.statusCode == 200) {

            fs.writeFileSync('data/schedule.txt', body);

        }
        else {console.error('request failed')};
    })
}

// use a function to fill the array with the addresses for the contents of every 3rd td node (see i*3 below)
function getIDs() {

    for (i=1; i<29; i++) {
        idOutput.push(
            $('li[class=score]').eq(i).html()
                .replace('<a href="//www.espn.com/ncb/recap/_/gameId/','')
        );
    }

    for (i=0; i<idOutput.length; i++) {
        gameIDs[i] = idOutput[i].slice(0,9)
    }

    for (i = 0; i<gameIDs.length; i++) {
        links[i] = 'http://www.espn.com/mens-college-basketball/playbyplay?gameId=' + gameIDs[i]
    }

    // console.log(links)

};

function makeFile() {

    var i = 0;

    request(links[i], function (error, response, body) {
        if (!error && response.statusCode == 200) {
            fs.writeFileSync(gameIDs[i] + '.txt', body);
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