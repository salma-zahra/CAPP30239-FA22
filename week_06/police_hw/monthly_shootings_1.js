d3.csv("monthly_shootings.csv").then(data => {

    for (let d of data) {
        d.Count = +d.Count; //force a number
    };

    const height = 400,
          width = 700,
          margin = ({ top: 25, right: 30, bottom: 35, left: 50 }); //defining margin as an object so we can give it values

    let svg = d3.select("#chart") 
        .append("svg")
        .attr("viewBox", [0, 0, width, height]); // for resizing element in browser
    
    let x = d3.scaleBand()
        .domain(data.map(d => d.Month)) // map will match the values in the csv. => indicates we're looping through the data. we're mapping and creating an array
        .range([margin.left, width - margin.right]) // pixels on page
        .padding(0.1); // padding is a stylistic element
    
    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Count)]).nice() // nice rounds the top number to make it cleaner
        .range([height - margin.bottom, margin.top]); //svgs are built from top down, so this is reversed
    
    /* Update: simplfied axes */
    svg.append("g") // g is part of the html. Its a group element
        .attr("transform", `translate(0,${height - margin.bottom + 5})`) // transform allows us to move location of axis by 5 pixels
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
        .attr("fill", "purple")
        .attr("x", d => x(d.Month)) // x position attribute
        .attr("width", x.bandwidth()) // this width is the width attr on the element. Bnadwidth is only used for bar chart because it comes with scaleband
        .attr("y", d => y(d.Count)) // y position attribute
        .attr("height", d => y(0) - y(d.Count)); // this height is the height attr on element
    
    bar.append("text") // add data labels
        .text(d => d.Count)
        .attr("x", d => x(d.Month) + (x.bandwidth()/2))
        .attr("y", d => y(d.Count) - 15) // +15 will put the data label inside the bar
        .attr("text-anchor", "middle")
        .style("fill", "black");

    svg.append("text") // add x axis label
        .attr("class", "x label")
        .attr("text-anchor", "middle")
        .attr("x", width - 40)
        .attr("y", height - 2)
        .style("font-size", "10px") 
        .text("Month");

    svg.append("text") // add y axis label
        .attr("class", "y label")
        .attr("text-anchor", "top")
        .attr("x", width)
        .attr("y", height)
        .attr("y", 140)
        .attr("dy", ".75em")
        .style("font-size", "10px") 
        .text("Number of shootings");

    svg.append("text") // add title
        .attr("x", width / 2 )
        .attr("y", 10)
        .style("text-anchor", "middle")
        .style("font-size", "10px") 
        .text("Number of monthly Police shootings in 2015");
});