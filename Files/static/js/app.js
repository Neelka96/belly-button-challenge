// Build the metadata panel
function buildMetadata(sampleNum, json) {
  d3.json(json).then((data) => 
    {
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
      metadata = metadata[0]; // Correct for array resulting from filter
      
      let iter = Object.entries(metadata);
      // TODO: CONDENSE LATER
      for(let [key, value] of iter) {
        let text = `${key.toUpperCase()}: ${value}`;
        panel.append('div').text(text);
      }
    }
  );
}

// Function to build both charts
function buildCharts(sampleNum, json) {
  d3.json(json).then((data) => {

    // Get the samples field
    let sample = data.samples;

    // Filter the samples for the object with the desired sample number
    sample = sample.filter(entry => {
      if (entry.id == sampleNum) return entry;
    })

    // Get the otu_ids, otu_labels, and sample_values
    console.log(sample);

    // Build a Bubble Chart


    // Render the Bubble Chart


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart

    }
  );
}

// Function to run on page load
function init() {
  const api_json = 'https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json' 
  d3.json(api_json).then(data => {

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
    }

    // Get the first sample from the list
    let firstSample = names[0];

    // Build charts and metadata panel with the first sample

    buildMetadata(firstSample, api_json);
    buildCharts(firstSample, api_json);
    }
  );
}

// Function for event listener
function optionChanged(newSampleNum) {
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
