var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var request = require('request');


var idOutput = [];
var gameIDs = [];
var links = [];

async function scrape_games() {

    getSched();
    getIDs();

};

scrape_games()

function getSched() {

    request('http://www.espn.com/mens-college-basketball/team/schedule/_/id/222/year/2018', function (error, response, body) {

        if (!error && response.statusCode == 200) {

            fs.writeFileSync('data/schedule.txt', body);

        }
        else {console.error('request failed')};
    })
};

// use a function to fill the array with the addresses for the contents of every 3rd td node (see i*3 below)
function getIDs() {

    var content = fs.readFileSync('data/schedule.txt');
    var $ = cheerio.load(content);

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
        links[i] = 'http://www.espn.com/mens-college-basketball/game?gameId=' + gameIDs[i]
    }

    console.log(links)
    console.log(gameIDs)

    var i = 0
    makeFile(i)

};



function makeFile(i) {

    if (i<28) {
        request(links[i], function (error, response, body) {
            if (!error && response.statusCode == 200) {
                fs.writeFile('data/game_' + gameIDs[i] + '.txt', body, makeFile(i + 1));

            }
            else {console.error('request failed')};
        })
    }

    else {return;}

};