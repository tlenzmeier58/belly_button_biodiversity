console.log('This is app.js')

function DrawBargraph(sampleID)
{
    console.log(`DrawBargraph(${sampleID})`);
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