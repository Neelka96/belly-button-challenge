# Belly Button Biodiversity Dashboard

**Module 14 Challenge**  
**EdX/UT Data Analytics and Visualization Bootcamp**  
**Cohort UTA-VIRT-DATA-PT-11-2024-U-LOLC**  
**Author:** Neel Agarwal

## Table of Contents
1. [Project Description](#project-description)
2. [Assignment Requirements](#assignment-requirements)
   - [Base Rubric](#base-rubric)
   - [Enhancements & Extra Features](#enhancements--extra-features)
3. [Directory Structure](#directory-structure)
   - [Directory Tree](#directory-tree)
   - [Key Files](#key-files)
4. [Usage Instructions](#usage-instructions)
   - [Technologies Used](#technologies-used)
5. [Key Functions & Code Notes](#key-functions--code-notes)
6. [GitHub Pages Deployment](#github-pages-deployment)  
7. [References and Citations](#references-and-citations)

---

## Project Description
This repository contains an interactive dashboard that explores the **Belly Button Biodiversity** dataset. The goal is to visualize the bacteria found in human belly buttons by subject ID, displaying both a bar chart of the top bacterial species and a bubble chart of all bacterial cultures. This assignment deviates from typical Python-focused projects by relying primarily on **JavaScript, HTML, and CSS** (plus libraries like **D3.js** and **Plotly.js**) to create a dynamic web-based visualization experience. While this project goes beyond the basic requirements for this module, it doesn't interfere with the fulfillment of any of those requirements in creating extra functionality.

---

## Assignment Requirements
The assignment's base requirements and extra features are separated and summarized in the section below!  


### Base Rubric
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


### Enhancements & Extra Features
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

7. **Regex Text Cleaning**
   - The demographic info is cleaned before presentation per each request for new data, to allow for consistent presentation and potential storage of data.

8. **More CSS Libraries**
   - Introduced CSS libraries to enhance existing Bootstrap styling and create favicon icons.


[:arrow_up: Return to TOC](#table-of-contents)  


---


## Directory Structure

### Directory Tree
Below is a simplified view of the project layout:

```
BellyButtonBiodiversity/
│
├── index.html
├── static/
│   └── js/
│       └── app.js
│
├── README.md
└── .gitignore
```

### Key Files  
- **`index.html`**  
   - Contains the webpage structure, layout with Bootstrap columns, dropdowns, and `<div>` placeholders for charts.  
- **`app.js`**  
   - The main JavaScript logic. Connects to the JSON data, populates dropdowns, updates charts, and displays the demographic info.  


[:arrow_up: Return to TOC](#table-of-contents)  


---

## Usage Instructions
1. **Clone or Download** this repository.  
2. **Locate `index.html`** in your local folder.  
3. **Open `index.html` in a browser** (Chrome/Firefox recommended).  
4. The page loads with a default test subject (or the first ID).  
5. **Use the dropdown** menu to pick a subject ID—charts and info update automatically.  
6. Optionally, click **“Subject ID Randomizer”** to see a random subject.  
7. Adjust the **“Number of Bars to Show”** dropdown to see fewer/more bar segments.

<h3>OR!</h3>  

1. Visit the GitHub Page to visit the tool preloaded in your web-browser by [clicking here!](https://neelka96.github.io/belly-button-challenge/)  
2. You can also explore more information about how this tool was set up in [this section](#github-pages-deployment) of the README!  

> [!NOTE]  
> If data is being fetched from a local `samples.json`, ensure that file is present in the correct relative path  
> or served via local server (some browsers block local JSON fetch for security).

### Technologies Used
- **JavaScript (ES6+)**  
- **HTML5 / CSS3**  
- **D3.js v7**  
- **Plotly.js**  
- **Bootstrap 5**  
- (Optional) **fetch / d3.json** for data loading  
- (Optional) **Bootstrap Bundle** for custom shading and boxing
- (Optional) **Awesome Font's Favicon CSS Library**  


[:arrow_up: Return to TOC](#table-of-contents)  


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


[:arrow_up: Return to TOC](#table-of-contents)  


---

## GitHub Pages Deployment

This project is also hosted via **GitHub Pages**, allowing anyone to view the interactive dashboard directly in their browser without cloning or running a local server. Here’s how you can check it out—or set it up yourself if you haven’t already:

1. **View Live Dashboard**  
   - You can access the deployed dashboard at [https://neelka96.github.io/belly-button-challenge/](https://neelka96.github.io/belly-button-challenge/).  
   - Once there, you’ll see the homepage (`index.html`) loaded with the interactive charts.

2. **How to Deploy on GitHub Pages**  
   + **Push Code to GitHub**: Make sure your `index.html`, `app.js`, and other files are on your main branch.  
   + **Enable Pages**:  
      - Go to your repository’s **Settings** tab on GitHub.  
      - In the left-hand menu, click on **Pages**.  
      - Under **Source**, choose the branch you want to deploy (e.g., `main`) and the `/root` folder.  
      - Click **Save**.  
   + **Wait for Build**: It may take a minute or two for GitHub to build the site. Once successful, you’ll see a green bar with the URL of your hosted site.  
   + **Visit the Deployed Dashboard**: Click or navigate to the URL (e.g., `https://YourGitHubUsername.github.io/YourRepoName`) to see the live site.

3. **Updating the Deployment**  
   - Whenever you push additional commits to the chosen branch, GitHub automatically rebuilds and updates your Pages site.  
   - Just wait a minute or two for changes to propagate, then refresh your live URL.

4. **Notes**  
   - GitHub Pages only serves static content. Your JavaScript and data files should be relative paths in your HTML (e.g., `./static/js/app.js` or similar) to ensure everything loads correctly.  
   - If using local JSON or other data, ensure it’s included in the repository and references in `app.js` or HTML with a relative file path.  
   - If you run into CORS issues or “404 Not Found,” double-check spelling, capitalization, and folder organization.


[:arrow_up: Return to TOC](#table-of-contents)  


---

## References and Citations
- **edX/2U** Bootcamp materials for the “Belly Button Biodiversity” dataset and assignment instructions.  
- **README.md**: Created using OpenAI's [ChatGPT LLM](https://www.chatgpt.com), trained using prior READMEs, all the deliverables, and the provided rubric given by edX/2U  
- **Plotly.js Official Docs**: [https://plotly.com/javascript/](https://plotly.com/javascript/)  
- **D3.js** Documentation: [https://d3js.org/](https://d3js.org/)  
- **Bootstrap** Documentation: [https://getbootstrap.com/](https://getbootstrap.com/)  
- **Font Awesome** Documentation: [https://fontawesome.com/v4/](https://fontawesome.com/v4/)  
- **Random** code snippets for event handling, arrow functions, etc., derived from [MDN Web Docs](https://developer.mozilla.org/) and personal experience.  


[:arrow_up: Return to TOC](#table-of-contents)  