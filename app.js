//The code in this section is based on my instructor Doms office hours on this homework
console.log("app.js is loaded")


//Draw the Bar Chart
function DrawBargraph(sampleId) {
    console.log(`DrawBargraph(${sampleId})`);

    d3.json("data/samples.json").then(data => {
        //console.log(data);

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];
        
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        
        yticks = otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`); //TBD

        var barData = {
            x: sample_values.slice(0,10),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10),
            orientation: "h"
        }

        var barArray = [barData];

        var barLayout = {
            title: "Top 10 Bacteria Culturs Found",
            margin: {t:30, l:150}
        }

        Plotly.newPlot("bar", barArray, barLayout);

        console.log(sample_values);
    })

}

//Draw the Bubble Chart
function DrawBubblechart(sampleId) {
    console.log(`DrawBubblechart(${sampleId})`);
}

//Update Demo Data
function ShowMetadata(sampleId) {
    console.log(`ShowMetadata(${sampleId})`);
}

//Setup event handler
function optionChanged(newSampleId) {
    console.log(`User selected ${newSampleId}`);
    DrawBargraph(newSampleId);
    DrawBubblechart(newSampleId);
    ShowMetadata(newSampleId);
}

function InitDashboard() {
    console.log("InitDashboard()")

//Populate the drop down for Subject ID
    var selector = d3.select("#selDataset");

    d3.json("data/samples.json").then(function(data) {
        //console.log(data);

        var sampleNames = data.names;
        
        sampleNames.forEach(sampleId => {
            selector.append("option")
            .text(sampleId)
            .property("value", sampleId);
        });
        //Select the first drop down option
        var id = sampleNames[0];
        //Create the stub
        DrawBargraph(id);
        DrawBubblechart(id);
        ShowMetadata(id);

    });


//Update the bar graph
//Update the bubble chart
//Update Demo Data

}; 

InitDashboard();

//Import that data from the JSON
//d3.json("./samples.json").then((importedData) => {
    
    
   // var data = importedData;


    //var trace1 = {
    //    x: data.map(row => row.samples_values),
  //      y: data.map(row => row.otu_ids),
   //     text: data.map(row => row.otu_labels),
   //     name: "Verticle Bar",
   //     type: "bar",
   //     orientation: "h"
   // };
  //  var chartData = [trace1];

   // var layout = {
   //     margin: {
    //        l: 100,
   //         r: 100,
   //         t: 100,
   //         b: 100 
   //     }
  //  };
 //   Plotly.newPlot("plot", chartData, layout);
//});