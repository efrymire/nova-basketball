var fs = require('fs');
var cheerio = require('cheerio');

var IDs = [ '400988423', '400988425', '400988492', '401000100', '401002169', '400988503', '400988510', '400986882', '400988524', '400988008', '400988543', '400988548', '400988553', '400988565', '400988569', '400988574', '400988577', '400988073', '400988584', '400988590', '400988595', '400988599', '400988603', '400988606', '400988612', '400988616', '400988623', '400988627' ]
var gameData = [];


function pullPlays() {

    for (i = 0; i < IDs.length; i++) {

        var content = fs.readFileSync('data/game_' + IDs[i] + '.txt');
        var $ = cheerio.load(content);

        gameData.push( '{"' + IDs[i] + '":' +
            $('div[id="gameFlow-graph"]').attr('data-plays')
            + '}'
        );


        fs.writeFile("gameData.txt", gameData)

    }

}

pullPlays()