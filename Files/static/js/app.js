// app.js - Belly Button Biodiversity Dashboard


// -- CHART TRACERS --
// -------------------

// BUBBLE CHART BUILD
function bubbleChart(arr, params) {
  // Get the otu_ids, otu_labels, and sample_values
  let ids = arr.otu_ids;
  let values = arr.sample_values;
  let labels = arr.otu_labels;

  // Build a Bubble Chart
  let bubble_trace = {
    x: ids,
    y: values,
    mode: 'markers',
    marker: {
      size: values,
      color: ids,
      colorscale: 'Viridis'
    },
    text: labels
  };

  // Build Bubble Chart Layout
  let bubble_layout = {
    title: {
      text: 'Bacteria Cultures Per Sample'},
    xaxis: {
      title: {text: 'OTU ID'}
    },
    yaxis: {
      title: {text: 'Number of Bacteria'}
    }
  };

  // Render the Bubble Chart
  Plotly.newPlot('bubble', [bubble_trace], bubble_layout, params);
};

// BAR CHART BUILD
function barChart(arr, params) {
  // Get the otu_ids, otu_labels, and sample_values
  let ids = arr.otu_ids;
  let values = arr.sample_values;
  // let labels = arr.otu_labels;

  // Build a Bar Chart
  let bar_trace = {
    x: values.slice(0, 10).reverse(), // Slicing for Top 10 (Plotly pre-sorts) w/ rearrangement
    y: ids.map(id => `OTU ${id}`).slice(0, 10).reverse(),  // Mapping IDs to string & matching x-axis
    type: 'bar',
    orientation: 'h',
    // text: labels
  };

  // Build Bar Chart Layout
  let bar_layout = {
    title: {
      text: 'Top 10 Bacteria Cultures Found'
    },
    xaxis: {
      title: {text: 'Number of Bacteria'}
    }
  };
  params.displayModeBar = false;
  
  // Render the Bar Chart
  Plotly.newPlot('bar', [bar_trace], bar_layout, params);
};


// -- Page Builders -- 
// -------------------

// METADATA PANEL BUILD
function buildMetadata(sampleNum, json) {
  d3.json(json).then(data => {
      // Get the metadata field
      let metadata = data.metadata;

      // Filter the metadata for the object with the desired sample number
      metadata = metadata.filter((entry) => {
        if (entry.id == sampleNum) return entry;
      });

      // Use d3 to select the panel with id of `#sample-metadata`
      let panel = d3.select('#sample-metadata');

      // Use `.html("") to clear any existing metadata
      panel.html('');

      // Inside a loop, you will need to use d3 to append new
      // tags for each key-value in the filtered metadata.      
      for(let [key, value] of Object.entries(metadata[0])) {
        let text = `${key.toUpperCase()}: ${value}`;
        panel.append('div').text(text);
      };
    }
  );
};

// Function to build both charts
function buildCharts(sampleNum, json) {
  d3.json(json).then(data => {
      // Get the samples field
      let sample = data.samples;

      // Filter the samples for the object with the desired sample number
      sample = sample.filter(entry => {
        if (entry.id == sampleNum) return entry;
      });
      sample = sample[0];

    // Additional Parameters
    let params = {
      responsive: true,
      modeBarButtonsToRemove: ['lasso2d', 'select2d'],

    }

      barChart(sample, params);
      bubbleChart(sample, params);
    }
  )
};


// -- Page Core --
// ---------------

// Function to run on page load
function init() {
  const json_api = 'https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json'; 
  d3.json(json_api).then(data => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropDown = d3.select('#selDataset');

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (let i = 0; i < names.length; i++) {
      let name = names[i];
      dropDown.append('option').text(name);
    };

    // Get the first sample from the list
    let firstSample = names[0];

    // Build charts and metadata panel with the first sample
    buildMetadata(firstSample, json_api);
    buildCharts(firstSample, json_api);
    }
  );
}

// Function for event listener
function optionChanged(newSampleNum) {
  const json_api = 'https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json'; 

  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(newSampleNum, json_api);
  buildCharts(newSampleNum, json_api);
};

// Initialize the dashboard
init();