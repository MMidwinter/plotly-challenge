//Import that data from the JSON
d3.json("./samples.json").then((importedData) => {
    
    
    var data = importedData;


    var trace1 = {
        x: data.map(row => row.samples_values),
        y: data.map(row => row.otu_ids),
        text: data.map(row => row.otu_labels),
        name: "Verticle Bar",
        type: "bar",
        orientation: "h"
    };
    var chartData = [trace1];

    var layout = {
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100 
        }
    };
    Plotly.newPlot("plot", chartData, layout);
});