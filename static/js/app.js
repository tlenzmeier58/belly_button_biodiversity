console.log('This is app.js')
// Define a global variable

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function DrawBargraph(sampleID)
{
    // console.log(`DrawBargraph(${sampleID})`);

    d3.json(url).then(data => {
        console.log(data);

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id == sampleID);
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

        // Create a trace object, put it into an array, call Plotly
        let barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: 'bar',
            text: otu_labels.slice(0, 10).reverse(),
            orientation: 'h'

        };
        // Create a trace object
        let barArray = [barData];
        // Create a layout object
        let barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        }
        // Call the Plotly function
        Plotly.newPlot("bar", barArray, barLayout);


    })
}

function DrawBubblechart(sampleID)
{
    // console.log(`DrawBubblechart(${sampleID})`);
        d3.json(url).then(data =>{
            let samples = data.samples;
            let resultArray = samples.filter(s => s.id == sampleID);
            let result = resultArray[0];

            let otu_ids = result.otu_ids;
            let otu_labels = result.otu_labels;
            let sample_values = result.sample_values;

            //Create a trace
            let bubbleData = {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: "Earth"
                }
            }
            // Put the trace into an array
            let bubbleArray = [bubbleData];

            // Create a layout object
            let bubbleLayout = {
                title: "Bacteria Cultures Per Sample",
                margin: {t: 30},
                hovermode: "closest",
                xaxis: { title: "OTU ID"}
            }
            // Call Plotly
            Plotly.newPlot("bubble", bubbleArray, bubbleLayout);

        })
    }


function ShowMetaData(sampleID)
{
    //console.log(`ShowMetaData(${sampleID})`);
    d3.json(url).then(data => {
        let metadata = data.metadata;
        let demoPanel = d3.select('#sample-metadata')
        demoPanel.html('');
        let filteredData = metadata.filter(s => s.id == sampleID)[0]
        Object.entries(filteredData).forEach(([key, value]) => {
            demoPanel.append("h6").text(`${key.toUpperCase()}:${value}`);
        } )
    
    })
    }

function DrawGauge(sampleID)
{
    console.log(`Draw Gauge(${sampleID})`);
    d3.json(url).then(data => {
        let metadata = data.metadata;
        let resultArray = metadata.filter(m => m.id == sampleID);
        let result = resultArray[0];

        let wfreq = parseInt(result.wfreq)
    console.log(`Wash(${wfreq})`);
        // Create a trace object

        let gaugeData = [
            {
                domain: { x: [0,1], y:[0,1]},
                value: wfreq,
                title: {text: "Washing Frequency"},
                type: "indicator",
                mode: "gauge+number+delta",
                delta: {
                    reference: 4,
                    increasing: {color:'green'}
                },

                gauge: {
                    axis: {range:[0,9], tickwidth: 1, tickcolor:"darkblue"},
                    bar: {color:'blue'},
                    steps: [
                        {range:[0,4], color:"red"},
                        {range:[4,9], color: "green"}

                    ],
                    threshold: {
                        line: {color: "grey", width:4},
                        thickness: 1,
                        value: 9
                    }
                },
               // bgcolor: "Lavender",
            }
        ];
        // Put the trace into an array
        //let gaugeArray = [gaugeData];

        let layout = {
            title: "<b>Belly button Washing Frequency</b> <br>Scrubs Per Week</br>",
            width: 600,
            height: 470,
            margin: {t:25, r:25, L:25, b:25},
            font: {color:"darkblue", family:"Arial"}
        };
        Plotly.newPlot('gauge', gaugeData, layout);

    })
}


function optionChanged(sampleID)
{
    console.log(`optionChanged:${sampleID}`);
    DrawBargraph(sampleID);
    DrawBubblechart(sampleID);
    ShowMetaData(sampleID);
    DrawGauge(sampleID);
}

function InitDashboard()
{
    console.log('InitDashboard()');

    let selector = d3.select("#selDataset");

    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

    d3.json(url).then(data => {
        console.log("Here's the data:", data);

        let sampleNames = data.names;
        console.log("Here are the sample names:", sampleNames);

        // Populate the dropdown
        for (let i = 0; i < sampleNames.length; i++) {
            let sampleID = sampleNames[i];
            // console.log(`sampleID = ${sampleID}`);
            selector.append("option").text(sampleID).property("value", sampleID);
        };
        // Read the current value from the dropdown
        let initialID = selector.property("value");
        console.log(`initialID = ${initialID}`);
        // Draw the bar graph for the selected sample id
        DrawBargraph(initialID);

        // Draw the bubble chart for the selected id
        DrawBubblechart(initialID);
        // show the metadata for the selected sample id
        ShowMetaData(initialID);
        // Show the gauge
       DrawGauge(initialID);
    });




}

InitDashboard();