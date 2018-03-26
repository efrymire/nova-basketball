// set the dimensions and margins of the graph

var margin = {top: 30, right: 30, bottom: 30, left: 30},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

console.log('hello')

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleLinear()
    .domain([0,2400])
    .range([0, width]);

var y = d3.scaleLinear()
    .domain([0,100])
    .range([height, 0]);

// axis formatting

var yAxis = d3.axisRight(y)
    .tickSize(width)

// var timeFormat = d3.timeFormat("%M:%S");
var xAxis = d3.axisBottom(x)
    .tickSize(height)
    // .tickFormat(timeFormat);

// axis functions for tick styles

var g = d3.select('svg').append('g')

function customYAxis(g) {
    g.call(yAxis);
    g.select(".domain").remove();
    g.selectAll(".tick line").attr("stroke", "#DDDDDD");
    g.selectAll(".tick text")
        .attr('font-size','1.1em')
        .attr("x", width)
        .attr("dx", 4)
}

function customXAxis(g) {
    g.call(xAxis);
    g.select(".domain").remove();
    g.selectAll(".tick line").attr("stroke", "#DDDDDD");
    g.selectAll(".tick text")
        .attr('text-anchor','end')
}

var homeTeam = d3.line()
    .x(function(d) { return x(d[0].seconds); })
    .y(function(d) { return y(d[0].homeScore); });

var awayTeam = d3.line()
    .x(function(d) { return x(d.seconds); })
    .y(function(d) { return y(d.awayScore); });

d3.json("novabasketball_1.json", function(error, data) {

    console.log(data);

    svg.append('g').call(customXAxis);
    svg.append('g').call(customYAxis);

    // Add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", homeTeam);

    // Add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", awayTeam);

});