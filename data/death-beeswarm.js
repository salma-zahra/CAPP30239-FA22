// (3) IMPORT DATA 
d3.csv('everest_deaths.csv').then(data => {
    data = data.sort((a, b) => d3.ascending(a.SHERPA, b.SHERPA));



    // (4) CALL FUNCTION WITH OPTIONAL PARAMS
    let chart = BeeswarmChart(data, {
        x: d => d.MYEAR,
        label: "Year",
        type: d3.scaleLinear, // try d3.scaleLog
        group: d => d.SHERPA,
        title: d => `${d.Origin}: ${d.Name}\n${d.MYEAR.toLocaleString("en")}`,
        width: 1040,
        marginTop: 50,
    });

    // (5) APPEND TO PAGE
    document.getElementById("beeswarm-chart").appendChild(chart);
});

// (2) PASTE OBSERVABLE FUNCTION

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/beeswarm
function BeeswarmChart(data, {
    value = d => d, // convenience alias for x
    label, // convenience alias for xLabel
    type = d3.scaleLinear, // convenience alias for xType
    domain, // convenience alias for xDomain
    x = value, // given d in data, returns the quantitative x value
    title = null, // given d in data, returns the title
    group, // given d in data, returns an (ordinal) value for color
    groups, // an array of ordinal values representing the data groups
    colors = ["#AAA", "#003366"], // an array of color strings, for the dots
    radius = 4, // (fixed) radius of the circles
    padding = 6, // (fixed) padding between the circles
    marginTop = 10, // top margin, in pixels
    marginRight = 20, // right margin, in pixels
    marginBottom = 45, // bottom margin, in pixels
    marginLeft = 20, // left margin, in pixels
    width = 640, // outer width, in pixels
    height, // outer height, in pixels
    xType = type, // type of x-scale, e.g. d3.scaleLinear
    xLabel = label, // a label for the x-axis
    xDomain = domain, // [xmin, xmax]
    xRange = [marginLeft, width - marginRight] // [left, right]
    } = {}) {
    // Compute values.
    const X = d3.map(data, x).map(x => x == null ? NaN : +x);
    const T = title == null ? null : d3.map(data, title);
    const G = group == null ? null : d3.map(data, group);

    // Compute which data points are considered defined.
    const I = d3.range(X.length).filter(i => !isNaN(X[i]));

    // Compute default domains.
    if (xDomain === undefined) xDomain = d3.extent(X);
    if (G && groups === undefined) groups = d3.sort(G);

    // Construct scales and axes.
    const xScale = xType(xDomain, xRange);
    const xAxis = d3
        .axisBottom(xScale)
        .tickSizeOuter(0)
        .ticks(30)
        .tickFormat(d3.format("d"));
    const color = group == null ? null : d3.scaleOrdinal(groups, colors);

    // Compute the y-positions.
    const Y = dodge(I.map(i => xScale(X[i])), radius + padding);

    // Compute the default height;
    if (height === undefined) height = d3.max(Y) + (radius + padding) * 2 + marginTop + marginBottom;

    // Given an array of x-values and a separation radius, returns an array of y-values.
    function dodge(X, radius) {
        const Y = new Float64Array(X.length);
        const radius2 = radius ** 2;
        const epsilon = 1e-3;
        let head = null, tail = null;

        // Returns true if circle ⟨x,y⟩ intersects with any circle in the queue.
        function intersects(x, y) {
        let a = head;
        while (a) {
            const ai = a.index;
            if (radius2 - epsilon > (X[ai] - x) ** 2 + (Y[ai] - y) ** 2) return true;
            a = a.next;
        }
        return false;
        }

        // Place each circle sequentially.
        for (const bi of d3.range(X.length).sort((i, j) => X[i] - X[j])) {

        // Remove circles from the queue that can’t intersect the new circle b.
        while (head && X[head.index] < X[bi] - radius2) head = head.next;

        // Choose the minimum non-intersecting tangent.
        if (intersects(X[bi], Y[bi] = 0)) {
            let a = head;
            Y[bi] = Infinity;
            do {
            const ai = a.index;
            let y = Y[ai] + Math.sqrt(radius2 - (X[ai] - X[bi]) ** 2);
            if (y < Y[bi] && !intersects(X[bi], y)) Y[bi] = y;
            a = a.next;
            } while (a);
        }
    
        // Add b to the queue.
        const b = {index: bi, next: null};
        if (head === null) head = tail = b;
        else tail = tail.next = b;
        }
    
        return Y;
    }

    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(xAxis)
        .call(g => g.append("text")
            .attr("x", width)
            .attr("y", marginBottom -2)
            .attr("fill", "currentColor")
            .attr("text-anchor", "end")
            .text(xLabel));

    const dot = svg.append("g")
        .selectAll("circle")
        .data(I)
        .join("circle")
        .attr("cx", i => xScale(X[i]))
        .attr("cy", i => height - marginBottom - radius - padding - Y[i])
        .attr("r", radius);

    if (G) dot.attr("fill", i => color(G[i]));

    // // Add legend
    // const scale = d3.scaleOrdinal()
    // .domain(["sherpa", "non-sherpa"])
    // .range(["#003366", "#AAA"]);
    
    // const legend = d3Legend
    // .legendColor()
    // .shape("path", d3.symbol().type(d3.symbolCircle).size(25)()) //.shape("circle")
    // .shapePadding(15)
    // .labelOffset(5)
    // .scale(scale)
    // .labels(["sherpa", "non-sherpa"]);
    
    // svg.append("g")
    // .attr("class", "legend_auto")
    // .style('font-size', 12)
    // .style('font-family', 'sans-serif')
    // .attr("transform", `translate(${width - margin.right + 5}, ${margin.top})`)
    // .call(legend)

    const tooltip = d3.select("body").append("div")
            .attr("class", "svg-tooltip")
            .style("position", "absolute")
            .style("visibility", "hidden")
            // .style("background-color", "white")
            // .style("border", "solid")
            // .style("border-width", "1px")
            // .style("border-radius", "5px")
            .style("width", "150px");
        
    dot
        .on("mouseover", function (event, i) {
            const d = data[i];
            d3.select(this).attr("fill", "black");
            tooltip
                .style("visibility", "visible")
                .html(
                  `Name: ${d.CLIMBER}<br />Climber: ${d.SHERPA}<br />Note: ${d.DEATHNOTE}`
                );
        })
        .on("mousemove", function (event) {
            tooltip
                .style("top", event.pageY + 20 + "px")
                .style("left", event.pageX - 150 + "px");
        })
        .on("mouseout", function (e, d) {
            d3.select(this).attr("fill", d => (data[d].SHERPA === "sherpa") ? "#003366" : "#AAA"); //condition
            tooltip.style("visibility", "hidden");
        });

    if (T) dot.append("title")
        .text(i => T[i]);

    return svg.node();
}