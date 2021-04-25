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
        
        yticks = otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`).reverse(); //TBD

        var barData = {
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation: "h"
        }

        var barArray = [barData];

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t:30, l:150}
        }

        Plotly.newPlot("bar", barArray, barLayout);

    });

}

//Draw the Bubble Chart
function DrawBubblechart(sampleId) {
    console.log(`DrawBubblechart(${sampleId})`);

    d3.json("data/samples.json").then(data => {
        //console.log(data);

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];
        
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        
        var bubbleData = {
            x: otu_ids,
            y: sample_values,
            mode: `markers`,
            marker: {
                size:sample_values,
                sizeref: .2,
                sizemode: `area`,
                colorscale: 'Hot',
                color: otu_ids
            },
            text: otu_labels
        }

        var bubbleArray = [bubbleData];

        var bubbleLayout = {
            title: "Sample Size by OTU Id",
            xaxis: {
                title: {
                    text: `OTU Ids`
                }
            },
            yaxis: {
                title: {
                    text: `Sample Values`
                }
            },
            margin: {t:30, l:150}
        }

        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);

    });

}

function DrawGauge(sampleId) {
    console.log(`DrawBubblechart(${sampleId})`);

    d3.json("data/samples.json").then(data => {
        //console.log(data);

        var metadata = data.metadata;
        var resultArray = metadata.filter(s => s.id == sampleId);
        var result = resultArray[0];
        console.log(result);
        
        var washFrequency = result.wfreq;
        
        var gaugeData = {
            domain: {x: [0,1],y: [0,1]},
            value: washFrequency,
            title: {text: `Scrubs Per Week`},
            type: `indicator`,
            mode: `gauge+number`,
            delta: {reference: 9},
            gauge: {steps: [{range: [0,1], color: `PaleGreen`},
                    {range: [1,2], color: `MediumAquaMarine`},
                    {range: [2,3], color: `LimeGreen`},
                    {range: [3,4], color: `MediumSeaGreen`},
                    {range: [4,5], color: `SeaGreen`},
                    {range: [5,6], color: `ForestGreen`},
                    {range: [6,7], color: `OliveDrab`},
                    {range: [7,8], color: `Green`},
                    {range: [8,9], color: `DarkGreen`}],
                axis: {range:[0,9]}}
        };

        var gaugeArray = [gaugeData];

        var gaugeLayout = {
            title: "Belly Button Washing Frequency",
            width: 600,
            length: 400
        };

        Plotly.newPlot("gauge", gaugeArray, gaugeLayout);

    });

}

//Update Demo Data
function ShowMetadata(sampleId) {
    console.log(`ShowMetadata(${sampleId})`);

    d3.json("data/samples.json").then(data => {
        //console.log(data);

        var samples = data.samples;
        var metaData = data.metadata;
        var resultArray = metaData.filter(s => s.id == sampleId);
        var result = resultArray[0];

        var demoId = result.id;
        var ethnicity = result.ethnicity;
        var gender = result.gender;
        var age = result.age;
        var location = result.location;
        var bbtype = result.bbtype;
        var wfreq = result.wfreq;
        
        console.log(`
            ID:${demoId}
            Ethnicity:${ethnicity}
            Gender:${gender}
            Age:${age}
            Location:${location}
            bbtype:${bbtype}
            wfreq:${wfreq} `);

        var table = d3.select(`#sample-metadata`);
        table.html("");
        table.append(`h6`).text(`ID: ${demoId}`);
        table.append(`h6`).text(`Ethnicity: ${ethnicity}`);
        table.append(`h6`).text(`Gender: ${gender}`);
        table.append(`h6`).text(`Age: ${age}`);
        table.append(`h6`).text(`Location: ${location}`);
        table.append(`h6`).text(`bbtype: ${bbtype}`);
        table.append(`h6`).text(`wfreq: ${wfreq}`);

    });

}

//Setup event handler
function optionChanged(newSampleId) {
    console.log(`User selected ${newSampleId}`);
    DrawBargraph(newSampleId);
    DrawBubblechart(newSampleId);
    DrawGauge(newSampleId);
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
        DrawGauge(id);
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