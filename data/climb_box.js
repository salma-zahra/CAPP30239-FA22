d3.csv("avg_climb.csv").then(results => {

    let data = [];
    for (let d of results) {
        if (d.Sher === "Sherpa") data.push(+d.PKNAME)
    }
    console.log(data)

    // margin, width, height, svg declaration, x scale, x axis call, y scale, y axis call

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 100, left: 40},
    width = 400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // X scale
    var x = d3.scaleBand()
    .domain(["Sherpa","Non-sherpa"])
    .range([0,width]);

    svg.append("g")
        .attr("class","x")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));
    
    // Show the Y scale
    var y = d3.scaleLinear()
    .domain([0,23])
    .range([height, 0]);
    
    svg.call(d3.axisLeft(y))
    
    buildBoxPlot(results, "Sherpa", svg, x, y);
    buildBoxPlot(results, "Non-sherpa", svg, x, y);

});

function buildBoxPlot(results, Sher, svg, x, y) {
    // Compute summary statistics used for the box:
    data.sort(d3.ascending); 
    var q1 = d3.quantile(data_sorted, .25); 
    var median = d3.quantile(data_sorted, .5); 
    var q3 = d3.quantile(data_sorted, .75); 
    var interQuantileRange = q3 - q1; 
    var min = data_sorted[0]; 
    var max = data_sorted[data_sorted.length - 1]; 
    var r0 = Math.max(min, q1 - 1.5 * interQuantileRange); 
    var r1 = Math.min(max, q1 + 1.5 * interQuantileRange);

    // a few features for the box
    var center = 200
    var width = 100
    
    // Show the main vertical line
    svg
    .append("line")
    .attr("x1", center)
    .attr("x2", center)
    .attr("y1", y(min) )
    .attr("y2", y(max) )
    .attr("stroke", "black")
    
    // Show the box
    svg
    .append("rect")
    .attr("x", center - width/2)
    .attr("y", y(q3) )
    .attr("height", (y(q1)-y(q3)) )
    .attr("width", width )
    .attr("stroke", "black")
    .style("fill", "#69b3a2")
    
    // show median, min and max horizontal lines
    svg
    .selectAll("toto")
    .data([min, median, max])
    .enter()
    .append("line")
    .attr("x1", center-width/2)
    .attr("x2", center+width/2)
    .attr("y1", function(d){ return(y(d))} )
    .attr("y2", function(d){ return(y(d))} )
    .attr("stroke", "black")

};