/**
 * @file This file modifies the book's HTML page by showing only one section at a time and making a dynamic summary
 * @author Clément Nerma
 * @license Apache-2.0
 */

// Enable strict mode
"use strict";

/**
 * Get an element using a query selector
 * @param {string} selector The selector
 * @returns {HTMLElement|null} A DOM element
 */
function q(selector) {
  // Get the element and return it
  return document.querySelector(selector);
}

/**
 * Make an array from a query selector's output
 * @param {string} selector The selector
 * @returns {Array<HTMLElement>} An HTML array
 */
function qa(selector) {
  // Make the query, convert its result to an array and return it
  return Array.from(document.querySelectorAll(selector));
}

/**
 * Refresh the active link in the summary
 * @returns {void}
 */
function refreshActive() {
  // Get the current active link
  let active = q('nav .active');

  // If there is one...
  if (active) {
    // Remove its special class
    active.classList.remove('active');

    // Remove the current section's special class
    q('nav .current').classList.remove('current');
  }

  /**
   * Set the active link
   * @param {HTMLElement} target The target of the link to set active
   * @returns {void}
   */
  function setActive (target) {
    // Get the link
    let link = q(`nav [href="#${target}"]`);

    // Give to the link a specific class
    link.classList.add('active');

    // Get the link's parent
    link = link.parentElement;

    // While the element is not a section link...
    while (link.getAttribute('data-depth') !== '1')
      // Get the previous element
      link = link.previousElementSibling;

    // Give it a specific class
    link.classList.add('current');

    // For unhandheld devices only...
    if (Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    ) > 640)
      // Scroll to the current part's link to always keep it visible
      link.scrollIntoView();
  }

  // For each title in the current section (reversed order to start from the bottom of the section)...
  for (let title of Array.from(currentSection.querySelectorAll('h1, h2, h3')).reverse())
    // If this title is visible
    // and if this one is located below the current scroll's position...
    if (title.offsetTop > 0 && window.scrollY > title.offsetTop - title.offsetHeight) {
      // Mark this title as active in the summary
      setActive(title.getAttribute('data-id'));
      // Exit the function (break the loop)
      return;
    }

  // If the code below is ran, then there is no active link currently
  // Make the section's title link active
  setActive(currentSection.getAttribute('data-slug'));
}

/**
 * Display a section
 * @param {string|number|HTMLElement} id The section's name, ID or DOM element
 * @returns {void}
 */
function showSection(id) {
  // If an ID was gave...
  if (typeof id === 'number') {
    // Get its name
    id = sections[id];

    // If no section has this ID...
    if (!id)
      // Exit the function
      return;
  }

  // If there is a current section...
  if (currentSection) {
    // If this is the current section...
    if (id instanceof HTMLElement ? id === currentSection : id === currentSection.getAttribute('data-slug'))
      // Go to the top of the window and ignore the request
      return void (window.scrollTo(0, 0));

    // Hide the current section
    currentSection.classList.add('inactive');
  }

  // Set the new current section
  currentSection = (id instanceof HTMLElement) ? id : q(`section[data-slug="${id}"]`);
  // Show this one
  currentSection.classList.remove('inactive');

  // Save its number
  currentSectionID = sections.indexOf(currentSection);

  // If this is the first section...
  if (currentSectionID === 0)
    // Hide the "Previous" link
    previous.classList.add('hidden');
  // Else...
  else
    // Show it
    previous.classList.remove('hidden');

  // If this is the last section...
  if (currentSectionID === sections.length - 1)
    // Hide the "Next" link
    next.classList.add('hidden');
  // Else...
  else
    // Show it
    next.classList.remove('hidden');

  // Get the current section's slug
  const currentSlug = currentSection.getAttribute('data-slug');
    
  // Set the window's hash
  window.location.hash = '#' + currentSection.getAttribute('data-slug');

  // Go to the beginning of this section
  window.scrollTo(0, 0);

  // Refresh the active link in the summary
  refreshActive();
}

/**
 * Toggle the summary's visibility
 * @returns {void}
 */
function toggleSummary () {
  // Toggle summary's visibility
  summary.classList.toggle('hidden');
  // Toggle article's full-width state
  article.classList.toggle('full-width');
  // Toggle hide summary's button's full-width indicator
  hideNav.classList.toggle('force-left');
  // Same with the dark mode toggle button
  darkModeToggle.classList.toggle('force-left');
  // Toggle the "previous" button position
  previous.classList.toggle('force-left');

  // If the summary is now visible...
  if (summary.classList.contains('hidden')) {    
    // Remember this state in the local storage
    try {
      localStorage.setItem('sn-book-hidden-summary', 'true');
    } catch (e) {
      // Display the error in the console, to debug it
      console.error(e);
    }
  } else {
    // Remove the boolean from the local storage
    try {
      localStorage.removeItem('sn-book-hidden-summary');
    } catch (e) {
      // Display the error in the console, to debug it
      console.error(e);
    }
  }
}

// For each title in the page...
for (let title of qa('h1, h2, h3, h4, h5, h6'))
  // If it has an ID...
  if (title.hasAttribute('id')) {
    // Backup it
    let id = title.getAttribute('id');
    // Remove it
    title.removeAttribute('id');
    // Give it a "data-id" attribute instead
    title.setAttribute('data-id', id);
  }

// Get the list of all sections
const sections = qa('body > article section');

// For each section of the book...
for (let section of sections)
  // Hide it
  section.classList.add('inactive');

// Get all of the summary's links
const nav_links = qa('nav a').slice(1) /* Ignore the main title */;

// For each link in the summary...
for (let link of nav_links) {
  // Get its target
  let target = link.getAttribute('href').substr(1) /* Remove the '#' symbol */;

  // Get its depth
  let depth = parseInt(link.parentElement.getAttribute('data-depth'));

  // Get the section's name it belongs to
  let parent;

  // Link to its parent (moved here to avoid bugs due to minification)
  let el;

  // If it is points to a section...
  if (depth === 1)
    // Set it
    parent = target;
  // Else...
  else {
    // Get its parent element
    el = link.parentElement;

    // While the element does not point to a section...
    while (el.getAttribute('data-depth') !== '1')
      // Get its parent
      el = el.previousElementSibling;

    // Set the section it points to
    parent = el.querySelector('a').getAttribute('href').substr(1);
  }

  // When it is clicked...
  link.addEventListener('click', e => {
    // If possible...
    if (typeof e.preventDefault === 'function')
      // Cancel the click
      e.preventDefault();

    // Show the section it points to
    showSection(parent);

    // If its target is not the section...
    if (target !== parent)
      // Get its target and scroll to it
      q(`[data-id="${target}"]`).scrollIntoView();

    // Another way to ignore the click
    return false;
  });
}

// Make a variable to store the current section
let currentSection;

// Make a variable to store the current section's number
let currentSectionID;

// Create a "previous" link
let previous = document.createElement('a');
// Set its ID
previous.setAttribute('id', 'previous');
// Set its content
previous.innerHTML = '&#10094;';
// When it is clicked, go to the previous section
previous.addEventListener('click', () => showSection(currentSectionID - 1));
// Append it to the page's body
document.body.appendChild(previous);

// Create a "next" link
let next = document.createElement('a');
// Set its ID
next.setAttribute('id', 'next');
// Set its content
next.innerHTML = '&#10095;';
// When it is clicked, go to the next section
next.addEventListener('click', () => showSection(currentSectionID + 1));
// Append it to the page's body
document.body.appendChild(next);

// For every code block in the page...
for (let block of qa('pre')) {
  // Create a link
  let link = document.createElement('a');
  // Give it a class
  link.className = 'copy';
  // When is it clicked...
  link.addEventListener('click', () => {
    // Create a fake textearea
    let fake = document.createElement('textarea');
    // Get the code block's content
    const code = link.parentElement.innerText;
    // As a content give to the textarea the codeblock's one
    fake.value = code.substr(0, code.length - 1) /* Remove a useless newline symbol */;
    // Make it invisible
    fake.style.zIndex = -1;
    // Append it to the DOM
    document.body.appendChild(fake);
    // Select
    fake.select();
    // Copy to the clipboard
    document.execCommand('copy');
    // Remove the fake element from the DOM
    fake.remove();
    
    // Update the link's legend
    link.classList.add('triggered');

    // After 2 seconds...
    setTimeout(() =>
      // Go back to its original legend
      link.classList.remove('triggered')
    , 2000);
  });
  // Append the link to the codeblock
  block.appendChild(link);
}

// Store the summary's DOM element into a variable
let summary = q('body > nav');
// Store the article's DOM element into a variable
let article = q('body > article');

// Create a button to hide the summary
let hideNav = document.createElement('a');
// Give it an ID
hideNav.setAttribute('id', 'hide-summary');
// Give it a help text
hideNav.setAttribute('title', 'Toggle the summary');
// Give it a legend
hideNav.innerHTML = '&#9776;';
// When it is clicked...
hideNav.addEventListener('click', toggleSummary);
// Append it to the <body>
document.body.appendChild(hideNav);

// Create a button to toggle the dark mode
let darkModeToggle = document.createElement('a');
// Give it an ID
darkModeToggle.setAttribute('id', 'dark-toggle');
// Give it a help text
darkModeToggle.setAttribute('title', 'Toggle the dark mode');
// Give it a legend
darkModeToggle.innerHTML = '&#9789;';
// When it is clicked...
darkModeToggle.addEventListener('click', () =>
  // Toggle <body>'s dark mode's class
  document.body.classList.toggle('dark')
);
// Append it to the <body>
document.body.appendChild(darkModeToggle);

try {
  // If the book summary is marked as hidden in the local storage...
  if (localStorage.getItem('sn-book-hidden-summary') === 'true')
    // Hide it
    toggleSummary();
} catch (e) {
  // Display the error, to debug it
  console.error(e);
}

// If a hash was specified in the URL
// and if it targets an existing section...
if (window.location.hash && q(`[data-slug="${window.location.hash.substr(1)}"]`))
  // Show this section
  showSection(window.location.hash.substr(1) /* Ignore the '#' symbol */);
// Else...
else
  // Show the first section
  showSection(sections[0].getAttribute('data-slug'));

// When the page is scrolled...
window.addEventListener('scroll', () => refreshActive());

// When a key is pressed...
window.addEventListener('keydown', e => {
  // If the "arrow left" key was pressed...
  if (e.keyCode === 37)
    // Go to the previous section
    showSection(currentSectionID - 1);

  // If the "arrow right" key was pressed...
  if (e.keyCode === 39)
    // Go to the next section
    showSection(currentSectionID + 1);

  // If the "lower than" key was pressed...
  if (e.keyCode === 226)
    // Toggle the summary
    toggleSummary();
});

// Now the page is ready, show it
document.body.style.display = 'block';
