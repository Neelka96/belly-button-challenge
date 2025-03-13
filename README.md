# Belly Button Biodiversity Dashboard

**Module 14 Challenge**  
**EdX/UT Data Analytics and Visualization Bootcamp**  
**Cohort UTA-VIRT-DATA-PT-11-2024-U-LOLC**  
**Author:** Neel Agarwal

## Table of Contents
1. [Project Description](#project-description)
2. [Assignment/Rubric Requirements](#assignmentrubric-requirements)
3. [Enhancements and Extra Features](#enhancements-and-extra-features)
4. [File and Directory Structure](#file-and-directory-structure)
5. [Usage Instructions](#usage-instructions)
6. [Technologies Used](#technologies-used)
7. [Key Functions & Code Notes](#key-functions--code-notes)
8. [References and Citations](#references-and-citations)

---

## Project Description
This repository contains an interactive dashboard that explores the **Belly Button Biodiversity** dataset. The goal is to visualize the bacteria found in human belly buttons by subject ID, displaying both a bar chart of the top bacterial species and a bubble chart of all bacterial cultures. This assignment deviates from typical Python-focused projects by relying primarily on **JavaScript, HTML, and CSS** (plus libraries like **D3.js** and **Plotly.js**) to create a dynamic web-based visualization experience.

---

## Assignment/Rubric Requirements
Below are the core requirements (as stated or implied by the Module 14 Challenge rubric) and how each one is addressed in this project:

1. **Create a Horizontal Bar Chart**  
   - **Rubric Requirement:** Display the top 10 (or more) bacterial species (OTUs) found in each volunteer’s navel.  
   - **Implementation:**  
     - Bar chart is generated in `app.js` by slicing and reversing the relevant data arrays (`otu_ids`, `sample_values`, `otu_labels`).  
     - The chart is rendered via Plotly to a `<div id="bar">`.  
   - **Location:** See `barChart(json, params)` function in `app.js`.

2. **Create a Bubble Chart**  
   - **Rubric Requirement:** Visualize the overall distribution of bacterial species for each individual.  
   - **Implementation:**
       - Bubble chart uses `otu_ids` for the x-axis, `sample_values` for the y-axis and marker sizes, and color scales the bubbles by `otu_ids`.  
       - Rendered via Plotly to `<div id="bubble">`.  
   - **Location:** See `bubbleChart(json, params)` function in `app.js`.

3. **Populate a Demographic Info Panel**  
   - **Rubric Requirement:** Display each volunteer’s demographic information (ID, age, location, etc.).  
   - **Implementation:**  
       - A `<div id="sample-metadata">` in `index.html` is updated dynamically using the `buildMetadata()` function.  
       - Data is filtered by the volunteer’s ID; key-value pairs are appended into that `<div>` for an at-a-glance summary.  
   - **Location:** See `buildMetadata(sampleNum, json)` in `app.js`.

4. **Dynamic Input/Dropdown**  
   - **Rubric Requirement:** Provide a dropdown to select volunteer IDs, and upon user change, redraw charts.  
   - **Implementation:**  
       - `<select id="selDataset" />` in `index.html` triggers `sampleChange(this.value)` in `app.js`.  
       - The data is retrieved/filtered, and the charts and panel are updated accordingly.  
   - **Location:** `buildDropDown()` and `sampleChange()` in `app.js`.

5. **README**  
   - **Rubric Requirement:** An updated README that describes the purpose, process, dependencies, usage instructions, etc.  
   - **Implementation:**  
       - This document provides an overview of all the above features, instructions, and references.

---

## Enhancements and Extra Features
In addition to the rubric requirements, the following enhancements go **beyond** the minimal scope:

1. **Random Subject Selector**  
   - A “Randomize” button that picks a random subject ID to demonstrate dynamic chart rendering.

2. **Dynamic Bar Limit**  
   - A custom dropdown (`id="barLimit"`) to let users choose how many bars to display (e.g., top 5, top 10, or “all”).

3. **Real-time Alerts/Warnings**  
   - If the data set for a particular subject ID is too small—or if you request more bars than available—the UI displays a warning message (`displayWarnings()` in `app.js`).

4. **Loading Spinner / Overlay**  
   - A loader UI that appears while fetching or updating data (`showLoader()` / `hideLoader()` in `app.js`).

5. **Color Change Interactions**  
   - Some elements dynamically change color or background on click, providing a more interactive and modern user experience.

6. **Optimized Code Structure**  
   - The code is split into smaller, reusable helper functions (e.g., `cleanLabels()`, `buildDropDown()`, etc.) for maintainability.

---

## File and Directory Structure
Below is a simplified view of the project layout. You may adjust folder names to suit your preferences:

```
BellyButtonBiodiversity/
│
├── index.html
├── static/
│   └── js/
│       └── app.js
├── data/
│   └── samples.json     (Not included in this repo but assumed per instructions)
├── README.md            (This file)
└── .gitignore           (if applicable)
```

**Key Files**  
- **`index.html`**  
   - Contains the webpage structure, layout with Bootstrap columns, dropdowns, and `<div>` placeholders for charts.  
- **`app.js`**  
   - The main JavaScript logic. Connects to the JSON data, populates dropdowns, updates charts, and displays the demographic info.

---

## Usage Instructions
1. **Clone or Download** this repository.  
2. **Locate `index.html`** in your local folder.  
3. **Open `index.html` in a browser** (Chrome/Firefox recommended).  
4. The page loads with a default test subject (or the first ID).  
5. **Use the dropdown** menu to pick a subject ID—charts and info update automatically.  
6. Optionally, click **“Subject ID Randomizer”** to see a random subject.  
7. Adjust the **“Number of Bars to Show”** dropdown to see fewer/more bar segments.

> **Note:** If data is being fetched from a local `samples.json`, ensure that file is present in the correct relative path or served via local server (some browsers block local JSON fetch for security).

---

## Technologies Used
- **JavaScript (ES6+)**  
- **HTML5 / CSS3**  
- **D3.js v7**  
- **Plotly.js**  
- **Bootstrap 5**  
- (Optional) **fetch / d3.json** for data loading

---

## Key Functions & Code Notes
- **`sampleChange(selectedID)`**  
   - Main orchestration function for updating charts and metadata each time the user changes the dropdown.  
- **`buildMetadata(sampleNum, data)`**  
   - Dynamically populates the demographic info panel.  
- **`barChart(jsonData, plotlyParams)` & `bubbleChart(jsonData, plotlyParams)`**  
   - Construct the respective Plotly visualizations with the chosen data arrays.  
- **`displayWarnings(total, requested, alertBoxID)`**  
   - Posts warnings/alerts if the user tries to show more bars than exist or if the sample size is too small.  
- **`showLoader()` / `hideLoader()`**  
   - Control the loading spinner overlay for a smoother UX.  

Feel free to explore these functions in `app.js` and adapt them for your future projects.

---

## References and Citations
- **edX/2U** Bootcamp materials for the “Belly Button Biodiversity” dataset and assignment instructions.  
- **Plotly.js Official Docs**: [https://plotly.com/javascript/](https://plotly.com/javascript/)  
- **D3.js** Documentation: [https://d3js.org/](https://d3js.org/)  
- **Bootstrap** Documentation: [https://getbootstrap.com/](https://getbootstrap.com/)  
- **Random** code snippets for event handling, arrow functions, etc., derived from [MDN Web Docs](https://developer.mozilla.org/) and personal experience.