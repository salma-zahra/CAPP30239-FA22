let width = 1000,
height = 450;

const radius = 18;   
let margin = 40;

let svg = d3.select("#earn-chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("circle").attr("cx",150).attr("cy",200).attr("r", 45).style("fill", "black")
svg.append("circle").attr("cx",400).attr("cy",200).attr("r", 50).style("fill", "#AAA")
svg.append("circle").attr("cx",650).attr("cy",200).attr("r", 4).style("fill", "#003366")

var myText =  svg.append("text")
    .attr("y", height - 100)//magic number here
    .attr("x", 150)
    .style("font-size", "14px")
    .attr('text-anchor', 'middle')
    .attr("class", "myLabel")//easy to style with CSS
    .text("Cost for tourist =");

var myText =  svg.append("text")
    .attr("y", height - 80)//magic number here
    .attr("x", 150)
    .style("font-size", "14px")
    .attr('text-anchor', 'middle')
    .attr("class", "myLabel")//easy to style with CSS
    .text("$45,000");

var myText =  svg.append("text")
    .attr("y", height - 100)//magic number here
    .attr("x", 400)
    .style("font-size", "14px")
    .attr('text-anchor', 'middle')
    .attr("class", "myLabel")//easy to style with CSS
    .text("Income for western guide =");

var myText =  svg.append("text")
    .attr("y", height - 80)//magic number here
    .attr("x", 400)
    .style("font-size", "14px")
    .attr('text-anchor', 'middle')
    .attr("class", "myLabel")//easy to style with CSS
    .text("$50,000");

    var myText =  svg.append("text")
    .attr("y", height - 100)//magic number here
    .attr("x", 650)
    .style("font-size", "14px")
    .attr('text-anchor', 'middle')
    .attr("class", "myLabel")//easy to style with CSS
    .text("Income for Sherpa guide =");

var myText =  svg.append("text")
    .attr("y", height - 80)//magic number here
    .attr("x", 650)
    .style("font-size", "14px")
    .attr('text-anchor', 'middle')
    .attr("class", "myLabel")//easy to style with CSS
    .text("$4,000");
