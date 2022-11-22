// (3) IMPORT DATA 
d3.csv("palmerpenguins.csv").then(data => {

    // Observable code
    //1
    rainCloudY = ({
        marks: [
          Plot.ruleY([Math.floor(d3.min(data.map(d => d[dimension])))]),
          halfViolinY,
          rawDataY,
          showBoxPlot ? boxPlotY : []
        ],
        facet: {
          data: data,
          x: 'species',
          marginBottom: 40
        },
        x: {
          ticks: 3,
          tickFormat: d => d < 0 ? '' : d 
        },
        fx: {
          axis: 'bottom'
        },
        marginBottom: 60,
        marginRight: 60,
        width: 480,
        height: 640
    });

    //2
    halfViolinY = Plot.areaX(
        data,
        Plot.binY(
          {
            x: "count"
          },
          {
            y: dimension,
            fill: "species",
            fillOpacity: 0.2,
            thresholds: thresholds,
            curve: "basis"
          }
        )
    );

    //3
    rawDataY = Plot.dot(
        data,
        {
              y: dimension,
            x: jitter(data, seed),
            fill: 'species',
              stroke: null,
              r: 1.5
          }
    );

    //4
    boxPlotY = [
        Plot.ruleY(
          data,
          Plot.groupZ(
            {
              y: "median"
            },
            {
              y: dimension,
              x1: 0,
              x2: (boxPlotSize * maxTotal) / 100,
              // x1: -boxPlotOffset - boxPlotSize * maxTotal / 100 / 2,
              // x2: -boxPlotOffset + boxPlotSize * maxTotal / 100 / 2,
              strokeWidth: 2,
              stroke: "species"
            }
          )
        ),
        Plot.rectY(
          data,
          Plot.groupZ(
            {
              y1: lowerQuartile,
              y2: upperQuartile
            },
            {
              y: dimension,
              x1: 0,
              x2: (boxPlotSize * maxTotal) / 100,
              stroke: "species"
            }
          )
        ),
        Plot.ruleX(
          data,
          Plot.groupX(
            {
              y1: lowerWhisker,
              y2: lowerQuartile
            },
            {
              y: dimension,
              x: (boxPlotSize * maxTotal) / 100 / 2,
              stroke: "species",
              strokeDasharray: "3,3"
            }
          )
        ),
        Plot.ruleX(
          data,
          Plot.groupX(
            {
              y1: upperQuartile,
              y2: upperWhisker
            },
            {
              y: dimension,
              x: (boxPlotSize * maxTotal) / 100 / 2,
              stroke: "species",
              strokeDasharray: "3,3"
            }
          )
        ),
        // the whiskers
        Plot.ruleY(
          data,
          Plot.groupZ(
            {
              y: upperWhisker
            },
            {
              y: dimension,
              x1: 0,
              x2: (boxPlotSize * maxTotal) / 100,
              strokeWidth: 2,
              stroke: "species"
            }
          )
        ),
        Plot.ruleY(
          data,
          Plot.groupZ(
            {
              y: lowerWhisker
            },
            {
              y: dimension,
              x1: 0,
              x2: (boxPlotSize * maxTotal) / 100,
              strokeWidth: 2,
              stroke: "species"
            }
          )
        )
    ];

    //5
    rainCloudX = ({
        marks: [
          Plot.ruleX([Math.floor(d3.min(data.map(d => d[dimension])))]),
          halfViolinX,
          rawDataX,
          showBoxPlot ? boxPlotX : []
        ],
        facet: {
          data: data,
          y: 'species',
          marginRight: 80
        },
        y: {
          ticks: 3,
          tickFormat: d => d < 0 ? '' : d 
        },
        marginBottom: 40,
        width: 640,
        height: 480
    })

    //6
    halfViolinX = Plot.areaY(
        data,
        Plot.binX(
          {
            y: "count"
          },
          {
            x: dimension,
            fill: "species",
            fillOpacity: 0.2,
            thresholds: thresholds,
            curve: "basis"
          }
        )
    )

    //7
    rawDataX = Plot.dot(
        data,
        {
              x: dimension,
            y: jitter(data, seed),
            fill: 'species',
              stroke: null,
              r: 1.5
          }
    )

    //8
    boxPlotX = [
        Plot.ruleX(
          data,
          Plot.groupZ(
            {
              x: "median"
            },
            {
              x: dimension,
              y1: 0,
              y2: (boxPlotSize * maxTotal) / 100,
              strokeWidth: 2,
              stroke: "species"
            }
          )
        ),
        Plot.rectX(
          data,
          Plot.groupZ(
            {
              x1: lowerQuartile,
              x2: upperQuartile
            },
            {
              x: dimension,
              y1: 0,
              y2: (boxPlotSize * maxTotal) / 100,
              stroke: "species"
            }
          )
        ),
        Plot.ruleY(
          data,
          Plot.groupZ(
            {
              x1: lowerWhisker,
              x2: lowerQuartile
            },
            {
              x: dimension,
              y: (boxPlotSize * maxTotal) / 100 / 2,
              stroke: "species",
              strokeDasharray: "3,3"
            }
          )
        ),
        Plot.ruleY(
          data,
          Plot.groupZ(
            {
              x1: upperQuartile,
              x2: upperWhisker
            },
            {
              x: dimension,
              y: (boxPlotSize * maxTotal) / 100 / 2,
              stroke: "species",
              strokeDasharray: "3,3"
            }
          )
        ),
        // the whiskers
        Plot.ruleX(
          data,
          Plot.groupZ(
            {
              x: upperWhisker
            },
            {
              x: dimension,
              y1: 0,
              y2: (boxPlotSize * maxTotal) / 100,
              strokeWidth: 2,
              stroke: "species"
            }
          )
        ),
        Plot.ruleX(
          data,
          Plot.groupZ(
            {
              x: lowerWhisker
            },
            {
              x: dimension,
              y1: 0,
              y2: (boxPlotSize * maxTotal) / 100,
              strokeWidth: 2,
              stroke: "species"
            }
          )
        )
    ]

    //Appendix
});