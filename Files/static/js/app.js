// app.js - Belly Button Biodiversity Dashboard


// -- CHART TRACERS --
// -------------------

// BUBBLE CHART BUILD
function bubbleChart(json, params) {
  // Build a Bubble Chart
  // No modification of original array occuring - So no copy is needed
  let trace = {
    x: json.otu_ids,
    y: json.sample_values,
    mode: 'markers',
    marker: {
      size: json.sample_values,
      color: json.otu_ids,
      colorscale: 'Viridis'
    },
    text: json.otu_labels
  };

  // Build Bubble Chart Layout
  let layout = {
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
  Plotly.newPlot('bubble', [trace], layout, params);
};

// BAR CHART BUILD
function barChart(json, params) {
  // Get the otu_ids, otu_labels, and sample_values
  let ids = json.otu_ids;
  let values = json.sample_values;
  let labels = json.otu_labels;

  // Format Arrays for Barchart
  // Slicing for Top 10 OTU Values (Plotly pre-sorts) w/ rearrangement &
  // mapping IDs to string & matching value axis
  values = values.slice(0, 10).reverse()
  ids = ids.map(id => `OTU ${id}`).slice(0, 10).reverse()
  
  // Build a Bar Chart
  let trace = {
    x: values,
    y: ids,
    type: 'bar',
    orientation: 'h',
    hovertext: {text: labels}
    // text: labels
  };

  // Build Bar Chart Layout
  let layout = {
    title: {
      text: 'Top 10 Bacteria Cultures Found'
    },
    xaxis: {
      title: {text: 'Number of Bacteria'}
    }
  };
  
  // Render the Bar Chart
  // params.displayModeBar = false;
  Plotly.newPlot('bar', [trace], layout, params);
};


// -- Page Builders -- 
// -------------------

// METADATA PANEL BUILD
function buildMetadata(sampleNum, json) {
  // Get the metadata field
  let metadata = json.metadata;

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
};

// MAIN CHART BUILDER
function buildCharts(sampleNum, json) {
  // Get the samples field
  let sample = json.samples;

  // Filter the samples for the object with the desired sample number
  sample = sample.filter(entry => {
    if (entry.id == sampleNum) return entry;
  });
  sample = sample[0];

  // Additional Parameters
  let params = {
    responsive: true,
    modeBarButtonsToRemove: ['lasso2d', 'select2d'],
  };

  barChart(sample, params);
  bubbleChart(sample, params);
};


// -- Page Core --
// ---------------

// Function to run on page load
function init() {
  const json_api = 'https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json'; 
  d3.json(json_api).then(data => 
    {
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
      buildMetadata(firstSample, data);
      buildCharts(firstSample, data);
    }
  );
};

// Function for event listener
function optionChanged(newSampleNum) {
  const json_api = 'https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json'; 
  d3.json(json_api).then(data => 
    {
      // Build charts and metadata panel each time a new sample is selected
      buildMetadata(newSampleNum, data);
      buildCharts(newSampleNum, data);
    }
  );
};

// Initialize the dashboard
init();