var fs = require('fs');
var cheerio = require('cheerio');

// load the schedule text file into a variable, `content`, load `content` into a cheerio object
var content = fs.readFileSync('schedule.txt');
var $ = cheerio.load(content);

// create the empty array to be filled with gameID
var gameIDs = [];
var idOutput = [];
links = []

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

    console.log(links)

    fs.writeFileSync('links.txt', links);

};

getIDs()

