//The code in this section is based on my instructor Doms office hours on this homework
console.log("app.js is loaded")

function InitDashboard() {
    console.log("InitDashboard()")

//Populate the drop down for Subject ID
    var selector = d3.select("#selDataset");

    d3.json("data/samples.json").then(function(data) {
        console.log(data);

         

    });


//Update the bar graph
//Update the bubble chart
//Update Demo Data

} 

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