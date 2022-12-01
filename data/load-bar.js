/* Bar chart of load carried */

d3.csv("avg_load.csv").then(data => {

    for (let d of data) {
        d.load = +d.load;
    }

    const height = 400; /*we can also use commas instead of semi-colons and not keep adding const*/
    const width = 600;
    const margin = ({ top: 25, right:30, bottom:35, left:50}); /*we define margin as an object because we want to give it different values*/ 
    
    let svg = d3.select("#bar-chart")
                .append("svg")
                .attr("viewBox", [0, 0, width, height]); /* viewbox allows you to adjust your browser */

    const x = d3.scaleBand() /* first scale: d3 is a scale for barcharts. There's lots of different types fo scales. Scales allow you to give your data a domain and a range.*/
                .domain(data.map(d => d.type)) /* map will match the values in the csv*/
                .range([margin.left, width - margin.right]) /* margin.left because we made left a variable*/
                .padding(0.4); /* stylistic element */

    const y = d3.scaleLinear()
                .domain([0, 100]).nice() /* .nice will round up last value to make it look clean */
                .range([height - margin.bottom, margin.top]);

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom + 5})`) /* transform allows you to move axis. its an attribute*/ 
        .call(d3.axisBottom(x))

    const yAxis = g => g
        .attr("transform", `translate(${margin.left - 5}, 0)`);
        // .call(d3.axisLeft(y))
        // .call(g => g.select(".domain").remove()); //remove y axis

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    let bar = svg.selectAll(".bar")
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");

    bar.append("rect")
        .attr("fill", "#AAA")    
        // .attr("fill", d => (data[d].type === "American climber") ? "#003366" : "#AAA")
        .attr("x", d => x(d.type))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.load))
        .attr("height", d => y(0) - y(d.load));

    bar.append("text")
        .text(d => d.load)
        .attr("x", d => x(d.type) + (x.bandwidth()/2))
        .attr("y", d => y(d.load) - 15) /* if we do +15 then the data label will be in the middle of the bar*/
        .attr("text-anchor", "middle")
        .style("fill", "black");

    svg.append("g")
        .attr("transform", "translate(0, "+y(20)+")")
        .append("line")
        .attr("x2", width)
        .style("stroke", "black")
        .style("stroke-width", "1px");

    var myText =  svg.append("text")
        .attr("y", height - 130)//magic number here
        .attr("x", 550)
        .style("font-size", "10px")
        .attr('text-anchor', 'middle')
        .attr("class", "myLabel")//easy to style with CSS
        .text("Recommended");

    var myText =  svg.append("text")
        .attr("y", height - 120)//magic number here
        .attr("x", 550)
        .style("font-size", "10px")
        .attr('text-anchor', 'middle')
        .attr("class", "myLabel")//easy to style with CSS
        .text("weight = ");

    var myText =  svg.append("text")
        .attr("y", height - 110)//magic number here
        .attr("x", 550)
        .style("font-size", "10px")
        .attr('text-anchor', 'middle')
        .attr("class", "myLabel")//easy to style with CSS
        .text("20%");
});