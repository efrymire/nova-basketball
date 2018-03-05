var fs = require('fs');
var async = require('async');
var cheerio = require('cheerio');

var IDs = [ '400988423', '400988425', '400988492', '401000100', '401002169', '400988503', '400988510', '400986882', '400988524', '400988008', '400988543', '400988548', '400988553', '400988565', '400988569', '400988574', '400988577', '400988073', '400988584', '400988590', '400988595', '400988599', '400988603', '400988606', '400988612', '400988616', '400988623', '400988627' ]
var gameData = []
var jsonGameData = []

// async function runCode() {
//
//     pullPlays();
//     // json()
//
// }
//
// runCode()

function pullPlays() {

    for (i = 0; i < IDs.length; i++) {

        var content = fs.readFileSync('data/game_' + IDs[i] + '.txt');
        var $ = cheerio.load(content);

        gameData.push(
            $('div[id="gameFlow-graph"]').attr('data-plays') //.replace('[{','{').replace('],[',',').replace('}]','}')
        );

        // gameData_sub = gameData.substr(1,gameData.len-1);

        // fs.writeFileSync(IDs[i] + '_data.txt',gameData.substr(1,gameData.len-1))

    }

    replace = gameData.toString();

    replace1 = replace.replace(/[/g,'');

    // replace2 = replace1.replace('],[',',')
    // replace3 = replace2.replace('}]','}')


    fs.writeFileSync('data.txt',replace1)


    // gameData.replace(/[\[\]']+/g,'')
    // console.log(gameData)
    // clean()


}

pullPlays()

// function clean() {
//
//     // gameData.replace(/[\[\]']+/g,'')
//
//     for (i=0; i<IDs.length; i++) {
//
//         var thisGame = new Object;
//         thisGame.IDs[i] = fs.readFileSync(IDs[i] + '_data.txt')
//         jsonGameData.push(thisGame);
//
//     }

    // fs.writeFileSync('jsonGameData.txt',jsonGameData)
    // console.log(jsonGameData)

    // console.log(gameData[0].toString().split('],['))
    // console.log(gameData)

// }