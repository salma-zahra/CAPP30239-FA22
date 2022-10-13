/* Bar chart of covid cases */

d3.csv("covid.csv").then(data => {

    for (let d of data) {
        d.cases = +d.cases;
    }

    const height = 400; /*we can also use commas instead of semi-colons and not keep adding const*/
    const width = 600;
    const margin = ({ top: 25, right:30, bottom:35, left:50}); /*we define margin as an object because we want to give it different values*/ 
    
    let svg = d3.select("#chart")
                .append("svg")
                .attr("viewBox", [0, 0, width, height]); /* viewbox allows you to adjust your browser */

    const x = d3.scaleBand() /* first scale: d3 is a scale for barcharts. There's lots of different types fo scales. Scales allow you to give your data a domain and a range.*/
                .domain(data.map(d => d.country)) /* map will match the values in the csv*/
                .range([margin.left, width - margin.right]) /* margin.left because we made left a variable*/
                .padding(0.1); /* stylistic element */

    const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.cases)]).nice() /* .nice will round up last value to make it look clean */
                .range([height - margin.bottom, margin.top]);

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom + 5})`) /* transform allows you to move axis. its an attribute*/ 
        .call(d3.axisBottom(x))

    const yAxis = g => g
        .attr("transform", `translate(${margin.left - 5}, 0)`)
        .call(d3.axisLeft(y));

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
        .attr("fill", "steelblue")
        .attr("x", d => x(d.country))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.cases))
        .attr("height", d => y(0) - y(d.cases));

    bar.append("text")
        .text(d => d.cases)
        .attr("x", d => x(d.country) + (x.bandwidth()/2))
        .attr("y", d => y(d.cases) - 15) /* if we do +15 then the data label will be in the middle of the bar*/
        .attr("text-anchor", "middle")
        .style("fill", "black");
});