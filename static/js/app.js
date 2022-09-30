console.log('This is app.js')
// Define a global variable

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function DrawBargraph(sampleID)
{
    console.log(`DrawBargraph(${sampleID})`);

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
    console.log(`DrawBubblechart(${sampleID})`);
}

function ShowMetaData(sampleID)
{
    console.log(`ShowMetadata(${sampleID})`);
}

function DrawGauge(sampleID)
{
    console.log(`DrawGauge(${sampleID})`);
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