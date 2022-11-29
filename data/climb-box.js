d3.csv("avg_climb.csv").then(results => {

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 20, left: 40},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    var svg = d3.select("#box-plot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    
    // create dummy data
    // var data = [12,19,11,13,12,22,13,4,15,16,18,19,20,12,11,9]
    var x = d3.scaleBand()
        .domain(["Sherpa","Non-sherpa"])
        .range([0,width]);

    svg.append("g").attr("class","x").attr("transform", `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x));

    // Show the Y scale
    var y = d3.scaleLinear()
        .domain([0,23])
        .range([height - margin.bottom, margin.top]);

    svg.append("g").call(d3.axisLeft(y))

    buildBoxPlot(results, "Sherpa", svg, x, y);
    buildBoxPlot(results, "Non-sherpa", svg, x, y);

});

function buildBoxPlot(results, Sher, svg, x, y) {
    let data = [];
    for (let d of results) {
        if (d.Sher === Sher) data.push(+d.PKNAME)
    }
    console.log(data)

    // Compute summary statistics used for the box:
    var data_sorted = data.sort(d3.ascending)
    var q1 = d3.quantile(data_sorted, .25)
    var median = d3.quantile(data_sorted, .5)
    var q3 = d3.quantile(data_sorted, .75)
    var interQuantileRange = q3 - q1
    var min = data_sorted[0]
    var max = data_sorted[data_sorted.length - 1]
    var r0 = Math.max(min, q1 - 1.5 * interQuantileRange)
    var r1 = Math.min(max, q1 + 1.5 * interQuantileRange)
    
    var outliers = data_sorted.filter(d => d < r0 || d > r1);

    console.log(data)
    console.log("q1", q1)
    console.log("median", median)
    console.log("q3", q3)
    console.log("interQuantileRange", interQuantileRange)
    console.log("min", min)
    console.log("max", max)
    console.log("r0", r0)
    console.log("r1", r1)
    console.log("outliers", outliers)

    // a few features for the box
    var center = 200
    var width = 100

    // X position of the middle of the box plot 
    var xCenter = x.bandwidth()/2 + x(Sher);
    
    // Show the main vertical line
    svg
    .append("line")
    .attr("x1", xCenter)
    .attr("x2", xCenter)
    .attr("y1", y(r0) )
    .attr("y2", y(r1) )
    .attr("stroke", "black")
    
    // Show the box
    svg
    .append("rect")
    .attr("x", xCenter - width/2)
    .attr("y", y(q3) )
    .attr("height", (y(q1)-y(q3)) )
    .attr("width", width )
    .attr("stroke", "black")
    .style("fill", "#003366")
    
    // show median, min and max horizontal lines
    svg
    .selectAll("toto")
    .data([r0, median, r1])
    .enter()
    .append("line")
    .attr("x1", xCenter - width/2)
    .attr("x2", xCenter + width/2)
    .attr("y1", function(d){ return(y(d))} )
    .attr("y2", function(d){ return(y(d))} )
    .attr("stroke", "black")

    svg.append("g")
        .attr("fill", 1)
        .attr("fill-opacity", 0.2)
        .attr("stroke", "none")
        .attr("transform", d => `translate(${xCenter},0)`)
    .selectAll("circle")
    .data(outliers)
    .join("circle")
        .attr("r", 2)
        // .attr("cx", () => (Math.random() - 0.5) * 4)
        .attr("cx", 0)
        .attr("cy", d => y(d));

};