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