///// set up URL to read in data and store

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// retrieve JSON data from file and store
d3.json(url).then(function(data){
    console.log(data);
});

//create init function for charts, and dropdown for each sample dataset

function init(){
    // create dropdown menu for sample IDs through appending every ID as a new value
    let dropdown = d3.select("#selDataset");
    //access sample data
    d3.json(url).then((data) => {
    // get sample data to populate dropdown list
    let sample_ids = data.names;
    console.log(sample_ids);
        for (id of sample_ids){
            dropdown.append("option").attr("value", id).text(id);
        };   
    // store first sample for display
    let first_entry = sample_ids[0];
    console.log(first_entry);

    // use the init() function to call the graph generating functions with the first entry - id490
    makeBar(first_entry);
    makeBubble(first_entry);
    makeDemographics(first_entry);
    }); //end d3 access
};

//function to populate the horizontal barchart
function makeBar(sample){

    //get sample data in order to populate bar chart
    d3.json(url).then((data) => {
        let sample_data = data.samples;
        //align filter that matches sample id
        let results = sample.data.filter(id => id.id ==sample);
        // store first entry in results filter
        let first_result = results[0];
        console.log(first_result);
        //store first 10 results to display in bar chart
        let sample_values = first_result.sample_values.slice(0,10);
        let otu_ids = first_result.otu_ids.slice(0.10);
        let otu_labels = first_result.otu_labels.slice(0.10);
        console.log(sample_values);
        console.log(otu_ids);
        console.log(otu_labels);

        //create trace for bar chart
        let bar_trace = {
            x: sample_values.reverse(),
            y: otu_ids.map(item => `OTU ${item}`).reverse(),
            text: otu_labels.reverse(),
            type: 'bar',
            orientation: 'h'
        };

        let layout = {title: "Top 10 OTUs"};
        Plotly.newPlot("bar", [bar_trace], layout);
    });
};

function makeBubble(sample){
    //access  sample data to populate bubble chart
    d3.json(url).then((data) => {
        let sample_data = data.samples;
        //apply filter that matches sample id
        let results = sample_data.filter(id => id.id == sample);
        //store the first entry in results filter
        let first_result = results[0];
        console.log(first_result);
        //store the results and show in the bubble chart
        let sample_values = first_result.sample_values;
        let otu_ids = first_result.otu_ids;
        let otu_labels = first_result.otu_labels;
        console.log(sample_values);
        console.log(otu_ids);
        console.log(otu_labels);

        //create bubble chart
        let bubble_trace = {
            x: otu_ids.reverse(),
            y: sample_values.reverse(),
            text: otu_labels.reverse(),
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
            }
        };

        let layout = {
            title: "Bacteria Count for Sample IDs",
            xaxis: {title: 'OTU ID'},
            yaxis: {title: 'Number of Bacteria'}
        };
        Plotly.newPlot("bubble", [bubble_trace], layout); 
    });
};

//create the demographic info function to populate each sample's info
function makeDemographics(sample){
    //access the sample data for populating the demographics section
    d3.json(url).then((data) => {
    //access the demographic info (metadata) with d3
    let demographic_info = data.metadata;
     //apply a filter that matches based on sample id
    let results = demographic_info.filter(id => id.id == sample);
    //store the first result to display in demographic info
    let first_result = results[0];
    console.log(first_result);
    //this is used to clear out previous entries in the demographic info section by setting the text to a blank string
    d3.select('#sample-metadata').text('');

    Object.entries(first_result).forEach(([key,value]) => {
        console.log(key,value);
        //select the demographic info html section with d3 and append new key-value pair
        d3.select('#sample-metadata').append('h3').text(`${key}, ${value}`);
    });
    
    });
};

// //define the function when the dropdown detects a change (function name as defined in index.html)
function optionChanged(value){
    //log the value for debug
    console.log(value);
    makeBar(value);
    makeBubble(value);
    makeDemographics(value);
};

init();