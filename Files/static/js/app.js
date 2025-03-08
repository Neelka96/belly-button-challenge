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
      for(let [key, value] of Object.entries(metadata[0])) {
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
    });
    sample = sample[0];

    // Get the otu_ids, otu_labels, and sample_values
    let ids = sample.otu_ids;
    let labels = sample.otu_labels;
    let values = sample.sample_values;

    // Build a Bubble Chart
    let bubble_trace = {
      x: ids,
      y: values,
      mode: 'markers',
      marker: {
        size: values,
        color: ids
      },
      text: labels
    };
    let bubble_traces = [bubble_trace];

    // Render the Bubble Chart
    let bubble_layout = {
      title: {
        text: 'Bacteria Cultures Per Sample'
      },
      xaxis: {
        title: {text: 'OTU ID'}
      },
      yaxis: {
        title: {text: 'Number of Bacteria'}
      }
    };
    
    Plotly.newPlot('bubble', bubble_traces, bubble_layout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    // ---
    // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    // Use sample_values as the values for the bar chart.
    // Use otu_ids as the labels for the bar chart.
    // Use otu_labels as the hovertext for the chart.
    let bar_trace = {
      x: values,
      y: ids,
      type: 'bar',
      // mode: ,
      // marker: {

      // },
      orientation: 'h',
      text: labels
    };
    let bar_traces = [bar_trace];
    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart
    Plotly.newPlot('bar', bar_traces)
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
