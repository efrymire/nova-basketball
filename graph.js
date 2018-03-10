// // set the dimensions and margins of the graph
// var margin = {top: 20, right: 20, bottom: 30, left: 50},
//     width = 960 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;
//
// var x = d3.scaleTime().range([0, width]);
// var y = d3.scaleLinear().range([height, 0]);
//
// var valueline = d3.line()
//     .x(function(d) { return x(d.seconds); })
//     .y(function(d) { return y(d.homeScore); });
//
// var valueline2 = d3.line()
//     .x(function(d) { return x(d.seconds); })
//     .y(function(d) { return y(d.awayScore); });
//
// var svg = d3.select("body").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform",
//         "translate(" + margin.left + "," + margin.top + ")");
//
// function draw(data) {
//
//     var data = data;
//
//     // Add the valueline path.
//     svg.append("path")
//         .data([data])
//         .attr("class", "line")
//         .attr("d", valueline);
//
//     // Add the valueline path.
//     svg.append("path")
//         .data([data])
//         .attr("class", "line")
//         .attr("d", valueline2);
//
// }

d3.json("novabasketball_1.json", function(error, data) {
    if (error) throw error;

    console.log(data);

    var height = 500;
        width = 500;

    var svg = d3.select('body').append('svg')
        .attr("width", width)
        .attr("height", height)

    svg.selectAll("bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return d.seconds; })
        .attr("y", function(d) { return d.homeScore; })
        .attr("height", function(d) { return height - d.homeScore; })
        .attr("width", 5 );

});