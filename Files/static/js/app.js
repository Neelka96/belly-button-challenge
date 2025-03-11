// app.js - Belly Button Biodiversity Dashboard

// LABEL FIXER
function cleanLabels(arr) {
  let newArr = [];
  // Loop through label array
  for(let i = 0; i < arr.length; i++) {
    // Push Reformatted label sets to new arr
    let set = arr[i];
    newArr.push(set.replace(/;/g, '<br>'));
  };
  return newArr;
};

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
    hovertext: cleanLabels(json.otu_labels),
    hovertemplate:
      'ID #: <b>%{x}</b><br>' +
      'Count: <b>%{y}</b><br>' +
      '-----------------<br>' +
      '%{hovertext}' +
      '<extra></extra>'
  };

  // Build Bubble Chart Layout
  let layout = {
    title: {
      text: 'Bacteria Cultures Per Sample',
      font: {size: 22}
    },
    xaxis: {
      title: {
        text: 'OTU ID',
        font: {size: 19}
      }
    },
    yaxis: {
      title: {
        text: 'Number of Bacteria',
        font: {size: 19},
      }
    },
    hoverlabel: {
      font: {size: 15}
    }
  };

  // Render the Bubble Chart
  Plotly.newPlot('bubble', [trace], layout, params);

  return null;
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
  let slicedValues = values.slice(0, 10);
  let slicedIDs = ids.map(id => `OTU ${id}`).slice(0, 10);

  // Build a Bar Chart
  let trace = {
    x: slicedValues.reverse(),
    y: slicedIDs.reverse(),
    type: 'bar',
    orientation: 'h',
    hovertext: cleanLabels(labels),
    hovertemplate: 
      'Count: <b>%{x}</b><br>' + 
      '---------------<br>' +
      '%{hovertext}' + 
      '<extra></extra>'
  };

  // Build Bar Chart Layout
  let layout = {
    title: {
      text: 'Top 10 Bacteria Cultures Found',
      font: {size: 22}
    },
    xaxis: {
      title: {
        text: 'Number of Bacteria',
        font: {size: 19}
      },
      fixedrange: true // Non-zoomable
    },
    yaxis: {
      fixedrange: true  // Non-zoomable
    },
    dragmode: false,  // Non-draggable
    hoverlabel: {   // Custom tooltip
      bgcolor: 'rgb(200, 255, 255)',
      font: {size: 15.5}
    }
  };
  
  // Render the Bar Chart
  Plotly.newPlot('bar', [trace], layout, params);

  return null;
};


// -- Page Builders -- 
// -------------------

// DROPDOWN BUILDER
function buildDropDown(names_arr, target_id) {
  // Use d3 to select the dropdown with id of `#selDataset`
  let dropDown = d3.select(target_id);
  // Clear (if existing) any html
  dropDown.html('');

  // Create Doc Fragment to Hold Option Elements
  // (Approach of appending to the DOM only once was taken)
  let frag = document.createDocumentFragment();

  // For each name create an option element with that name
  // Append each one to the doc fragment
  names_arr.forEach(name => 
    {
      let opt = document.createElement('option');
      opt.text = name;
      frag.appendChild(opt);
    }
  );
  // Append the document fragment to the dropdown menu
  dropDown.node().appendChild(frag);

  return null;
};

// METADATA PANEL BUILD
function buildMetadata(sampleNum, json) {
  // Get the metadata field
  let metadata = json.metadata;

  // Filter the metadata for the object with the desired sample number
  metadata = metadata.filter(entry => 
    {
      if (entry.id == sampleNum) 
        return entry;
    }
  )[0];

  // Use d3 to select the panel with id of `#sample-metadata`
  let panel = d3.select('#sample-metadata');

  // Use `.html("") to clear any existing metadata
  panel.html('');

  // Inside a loop, you will need to use d3 to append new
  // tags for each key-value in the filtered metadata.      
  let text = '';
  for(let [key, value] of Object.entries(metadata)) {
    text += `${key.toUpperCase()}: ${value}<br>`;
  };
  panel.append('div').html(text);

  return null;
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

  return null;
};


// -- Page Core --
// ---------------

// Init. Global Var to Hold JSON
let globalJSON = null;

// Function to run on page load
function init() {
  const json_api = 'https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json'; 
  d3.json(json_api).then(data => 
    {
      // Store Full JSON for rebuilding plot later
      globalJSON = data;

      // Get the names field
      let names = data.names;

      // Build DropDown Menu
      // Use the list of sample names to populate the select options
      buildDropDown(names, '#selDataset');

      // Get the first sample from the list
      let firstSample = names[0];

      // Build charts and metadata panel with the first sample
      buildMetadata(firstSample, data);
      buildCharts(firstSample, data);
    }
  );
  return 0;
};

// -- EVENT LISTENERS -- 
// ---------------------

// Event when changing the subject ID selection
function sampleChange(newSampleNum) {
  // Build charts and metadata panel each time a new sample is selected
  // Use globally stored JSON instead of making another API call
  buildMetadata(newSampleNum, globalJSON);
  buildCharts(newSampleNum, globalJSON);
};

// Event when hitting the random subject ID button
function randomSelect() {
  // Randomly select index from array
  let ids = globalJSON.names;
  let index = Math.floor(Math.random() * ids.length);
  let rand = ids[index];
  
  // Call page builder for new option selection
  sampleChange(rand);

  // Set Dropdown select value to random ID
  d3.select('#selDataset').property('value', rand);

  return null;
};

// Event to change colors on certain pressables
function colorChange(element) {
  // Set list of colors (in bootstrap)
  colors = [
    'bg-success text-white',
    'bg-primary text-white',
    'bg-danger text-white',
    'bg-warning',
    'bg-info',
    'bg-secondary text-white',
    'bg-light',
    'bg-dark text-white'
  ];

  // Init Empty Colors
  let newColor = '';
  let oldColor = '';
  // Randomly select a color and then ensure it's new
  // LIMITATION: Slightly hardcoded for the elements it's linked to
  do { // Do-while so if it nails it on the first try the loop exits
    newColor = colors[Math.floor(Math.random() * colors.length)];
    oldColor = element.className.slice(element.classList[0].length + 1);
  } while (newColor == oldColor);

  // Setting the element's class (again slightly hardcoded)
  element.className = element.classList[0] + ' ' + newColor;

  return null;
};


// Initialize the dashboard
init();