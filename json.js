var fs = require('fs');

// var IDs = [ '400988423', '400988425', '400988492', '401000100', '401002169', '400988503', '400988510', '400986882', '400988524', '400988008', '400988543', '400988548', '400988553', '400988565', '400988569', '400988574', '400988577', '400988073', '400988584', '400988590', '400988595', '400988599', '400988603', '400988606', '400988612', '400988616', '400988623', '400988627' ]
var gameData = fs.readFileSync('allgamedata.txt').toString().split("],[");
var jsonGameData = []

// console.log(gameData)



// console.log(jsonGameData)

