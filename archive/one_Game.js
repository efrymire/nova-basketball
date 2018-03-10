var fs = require('fs');
var cheerio = require('cheerio');
var one_game = []

var content = fs.readFileSync('data/game_400986882.txt');
var $ = cheerio.load(content);

one_game.push('{"400986882":' +
    $('div[id="gameFlow-graph"]').attr('data-plays') + '}'
);

console.log(one_game)