d3.csv("../week_06/police_hw/monthly_shootings.csv").then(data => {

    for (let d of data) {
        d.Count = +d.Count; //force a number. d = what row we're on
    };

    // data.sort((a, b) => b.Count - a.Count);

    const height = 600,
          width = 800,
          margin = ({ top: 25, right: 30, bottom: 35, left: 50 });

    let svg = d3.select("#horizontal-chart")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]); // for resizing element in browser

    let x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Count)]).nice()
        .range([margin.left, width - margin.right]);
    
    let y = d3.scaleBand()
        .domain(data.map(d => d.Month))
        .range([margin.top, height - margin.bottom])
        .padding(0.1);

    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom + 5})`) // move location of axis
        .call(d3.axisBottom(x));
    
    svg.append("g")
        .attr("transform", `translate(${margin.left - 5},0)`)
        .call(d3.axisLeft(y));

    let bar = svg.selectAll(".bar") // create bar groups
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");

    bar.append("rect") // add rect to bar group
        .attr("fill", "steelblue")
        .attr("x", margin.left)
        .attr("width", d => x(d.Month))
        .attr("y", d => y(d.Count))
        .attr("height", y.bandwidth());
    
    bar.append('text') // add labels
        .text(d => d.Count)
        .attr('x', d => margin.left + x(d.Month) - 10)
        .attr('y', d => y(d.Count) + (y.bandwidth()/2))
        .attr('text-anchor', 'end')
        .attr('dominant-baseline', 'middle')
        .style('fill', 'white');

});