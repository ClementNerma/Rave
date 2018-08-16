/**
 * @file This file modifies the book's HTML page by showing only one section at a time and making a dynamic summary
 * @author Clément Nerma
 * @license Apache-2.0
 */

// Enable strict mode
"use strict";

// Get timestamp to measure performances later
const started = performance.now();

// Is the page ready?
let ready = false;

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
 * Get an element's tag name (lowercase)
 * @param {HTMLElement} el An element
 * @returns The element's tag name (lowercase)
 */
function tagOf(el) {
  return el.tagName.toLocaleLowerCase();
}

/**
 * Update the scrollbar
 * @param {HTMLElement} scrollbar The scrollbar to update
 * @param {HTMLElement} target The scrollbar's target
 * @returns {void}
 */
function updateScrollbar (scrollbar, target) {
  // If the page is not ready yet...
  if (! ready)
    // Do not update
    return ;

  // Get the track (alias)
  const track = scrollbar;

  // Get the handle
  const handle = track.firstElementChild;

  // Update the handle's height
  handle.style.height = Math.round(
    window.innerHeight / target.scrollHeight * track.scrollHeight
  ) + 'px';

  handle.style.marginTop = Math.round(target.scrollTop / (target.scrollHeight - window.innerHeight) * (track.clientHeight - handle.clientHeight)) + 'px';
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
    if (! id)
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
    currentSection.classList.remove('active');
  }

  // Set the new current section
  currentSection = (id instanceof HTMLElement) ? id : q(`section[data-slug="${id}"]`);
  // Show this one
  currentSection.classList.add('active');

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

  // Set the window's hash
  window.location.hash = '#' + currentSection.getAttribute('data-slug');

  // Update the article scrollbar
  scrollbarUpdaters.article();

  // Go to the beginning of this section
  window.scrollTo(0, 0);

  // If the page is ready...
  if (ready)
    // Refresh the active link in the summary
    refreshActive();
}

/**
 * Restore an option from the local storage
 * @param {string} name The option's name
 * @param {Function} callback A function to call if the option is enabled
 * @returns {void}
 */
function restore (name, callback) {
  try {
    // If the dark option is marked as enabled in the local storage...
    if (localStorage.getItem('sn-book-' + name) === 'true')
      // Run the provided callback
      callback();
  } catch (e) {
    // Display the error, to debug it
    console.error(e);
  }
}

/**
 * Save an option to the local storage
 * @param {string} name The option's name
 * @param {boolean} value The option's value
 * @returns {void}
 */
function save (name, value) {
  // If the value is 'true'...
  if (value) {
    // Remember this state in the local storage
    try {
      localStorage.setItem('sn-book-' + name, 'true');
    } catch (e) {
      // Display the error in the console, to debug it
      console.error(e);
    }
  } else {
    // Remove the option from the local storage
    try {
      localStorage.removeItem('sn-book-' + name);
    } catch (e) {
      // Display the error in the console, to debug it
      console.error(e);
    }
  }
}

/**
 * Toggle the summary's visibility
 * @returns {void}
 */
function toggleSummary () {
  // Toggle the full-width state
  document.body.classList.toggle('full-width');

  // Save the summary's visilibity
  save('hidden-summary', document.body.classList.contains('full-width'));
}

/**
 * Toggle the dark mode
 * @returns {void}
 */
function toggleDarkMode () {
  // Toggle <body>'s dark mode's class
  document.body.classList.toggle('dark');

  // Save the dark mode's state
  save('dark-mode', document.body.classList.contains('dark'));
}

/**
 * Toggle the search bar
 * @returns {void}
 */
function toggleSearchBox () {
  // Toggle the search box's visibility
  searchBox.classList.toggle('hidden');

  // If it's now visible...
  if (! searchBox.classList.contains('hidden'))
    // Give it the focus
    searchBar.focus();
}

/*
  Adapted from Mozilla Developer's Network polyfill
  Original code: https://developer.mozilla.org/en-US/docs/Web/Events/wheel#Listening_to_this_event_across_browser#Listening_to_this_event_across_browser
*/

/**
 * Capture the mouse wheels' movements on an element
 * @param {HTMLElement} elem The element to capture the mouse wheels' movements on
 * @param {*} callback A callback to trigger when the mouse wheel is used on it 
 * @param {*} useCapture Same parameter as for traditional event capturing
 * @returns {void}
 */
function addWheelsListener(elem, callback, useCapture = false) {
  // Detect the supported mouse wheel capture event
  const eventName = 'onwheel' in document.createElement('div') ? 'wheel' : // Modern browsers support 'wheel'
    document.onmousewheel !== undefined ? 'mousewheel' : // Webkit and IE support at least 'mousewheel'
      'DOMMouseScroll'; // let's assume that remaining browsers are older Firefox

  // Register the callback under another name for the 'DOMMouseScroll' event
  if (eventName == 'DOMMouseScroll')
    addWheelsListener(elem, eventName, 'MozMousePixelScroll', useCapture);

  // Look for passive events support
  let supportsPassive = false;
  document.createElement('div').addEventListener('test', _ => { }, { get passive() { supportsPassive = true } });

  // Register the event listener on the provided element
  elem[window.addEventListener ? 'addEventListener' : 'attachEvent'](
    (window.addEventListener ? '' : 'on') + eventName,
    eventName == 'wheel' ? callback : originalEvent => {
      !originalEvent && (originalEvent = window.event);

      // create a normalized event object
      let event = {
        // keep a ref to the original event object
        originalEvent: originalEvent,
        target: originalEvent.target || originalEvent.srcElement,
        type: 'wheel',
        deltaMode: originalEvent.type == 'MozMousePixelScroll' ? 0 : 1,
        deltaX: 0,
        deltaY: 0,
        deltaZ: 0,
        preventDefault: () => {
          originalEvent.preventDefault ?
            originalEvent.preventDefault() :
            originalEvent.returnValue = false;
        }
      };

      // Calculate deltaY (and deltaX) according to the event
      if (eventName == 'mousewheel') {
        event.deltaY = - 1 / 40 * originalEvent.wheelDelta;
        // Webkit also supports wheelDeltaX
        originalEvent.wheelDeltaX && (event.deltaX = - 1 / 40 * originalEvent.wheelDeltaX);
      } else
        event.deltaY = originalEvent.deltaY || originalEvent.detail;

      // Trigger the callback with the event
      return callback(event);

    },
    supportsPassive && !useCapture ? { passive: true } : useCapture
  );
}

/**
 * Perform a search in the current book
 * @param {string} query The text to look for
 * @returns {void}
 */
function search (query) {
  // NOTE: This search method is particular but allows to indicate exactly where the
  //        occurences are found

  // Get the timestamp to measure performances
  const started = Date.now();

  /**
   * Look for the query in an element
   * @param {HTMLElement} el An element
   * @param {number} startFrom The position to start the search at
   * @param {boolean} noLeftAbbrev Do not put a left abbreviation symbol ([...]) 
   * @param {number} limit The maximum number of characters
   * @returns The search's result
   */
  function look (el, startFrom = 0, limit = 200, noLeftAbbrev = false) {
    // The output element (containing the element's text with the query highlighted)
    let output = document.createElement(tagOf(el));

    // If there is text before the start position...
    // And if not forbidden...
    if (startFrom > 0 && ! noLeftAbbrev) {
      // Create an element
      let symbol = document.createElement('span');
      // Give it a class
      symbol.classList.add('abbrev-symbol');
      // Make it empty
      symbol.innerHTML = '';
      // Append it to the output
      output.appendChild(symbol);
    }
    
    // The number of times the query is found in this element
    let occurences = 0;

    // Get the element's text (normalize spaces)
    let elText;

    // HACK: Code blocks' .innerText strangely removes line breaks when the element is hidden (tested on Chrome + Firefox)
    // NOTE: Also, <ul> blocks get a new blank line at their .innerText's beginning when hidden (tested on Chrome)
    if (tagOf(el) === 'pre')
      elText = Array.from(el.children).map(line => line.innerText).join('\n').replace(nonBreakingSpaceRegExp, ' ');
    else
      elText = el.innerText.replace(nonBreakingSpaceRegExp, ' ');

    // Get the element's text (lowercase)
    const lcText = elText.toLocaleLowerCase();

    // For each character in this element...
    for (let i = startFrom; i < elText.length; i ++) {
      // If the query is found since this character...
      if (lcText.substr(i, query.length) === query) {
        // If the limit has been exceeded...
        if (i > startFrom + limit) {
          // Just increase the number of occurences
          occurences ++;
          // Continue the loop
          continue ;
        }

        // Create an highlight element
        let item = document.createElement('strong');
        // Set it the query's text
        item.innerText = elText.substr(i, query.length);
        // Append it to the output element
        output.appendChild(item);
        // Ignore the query's characters from this position, until the query's end
        i += query.length - 1;
        // Increase the number of occurences
        occurences ++;
      } else if (i <= startFrom + limit) {
        // Get the character code
        const code = elText.charCodeAt(i);

        // Add this character to the output
        output.innerHTML += (code === 10 || code === 13) ? '<br/>' : (code === 32 || code === 160 ? '&nbsp;' : elText.charAt(i));
      }
    }

    // If there is text after the end of the extract...
    if (elText.length - startFrom > limit) {
      // Create an element
      let symbol = document.createElement('span');
      // Give it a class
      symbol.classList.add('abbrev-symbol');
      // Make it empty
      symbol.innerHTML = '';
      // Append it to the output
      output.appendChild(symbol);
    }

    // Create a wrapper element
    let wrapper = document.createElement('div');

    // Put the output inside
    wrapper.appendChild(output);

    // Return the result
    return [wrapper, occurences];
  }

  /**
   * Get an extract since an element
   * @param {HTMLElement} el An element
   * @param {number} startFrom The position to start the extract it
   * @param {number} length The number of characters to get
   * @param {boolean} noFirstLeftAbbrev Do not put a left abbreviation symbol ([...]) for the first element
   * @returns The extract (with the query highlighted in it)
   */
  function getExtract (el, startFrom = 0, length = Infinity, noFirstLeftAbbrev = false) {
    // The extract
    let output = document.createElement('p');

    // The number of occurences
    let occurences = 0;

    // Is it the first element?
    let firstElement = true;

    // While the extract contains less than the required number of characters...
    while (output.innerText.length < length) {
      // If the the element is 'null'...
      if (el === null)
        // Break the loop
        break ;

      // If this is an <h2> or an <h3> title...
      if (tagOf(el) === 'h2' || tagOf(el) === 'h3')
        // Stop the extraction
        break ;

      // Look for the query in the current element
      const result = look(
        el,
        firstElement ? startFrom : 0, // Use the start position for the first occurence (the original element)
        length - output.innerText.length - (firstElement ? 1 : 0), // The space we'll add since the 2nd element,
        firstElement && noFirstLeftAbbrev // If wanted, prevent adding an abbrevation symbol on the left for te first element
      );
      
      // Add its content to the extract
      output.innerHTML += result[0].innerHTML;

      // Update the number of occurences
      occurences += result[1];

      // Get the next element
      el = el.nextElementSibling;

      // Indicate this is not the first element anymore
      firstElement = false;
    }

    // Return the result
    return [ output, occurences ];
  }

  // Make the query lowercase and normalize its spaces
  query = query.toLocaleLowerCase().replace(nonBreakingSpaceRegExp, ' ');

  // The current search path
  let path = [
    null, // <h2>
    null, // <h3>
    null, // <h4>
    null, // <h5>
    null  // <h6>
  ];

  // The search's results
  let results = [];

  // Keep a list of (exclusively) used <h2> titles to avoid duplicates in search results
  // NOTE: "exclusively" means a search has been found under the <h2> title but not under an <h3> itself
  let usedH2 = [];

  // Keep a list of used <h3> titles to avoid duplicates in search results
  let usedH3 = [];

  // Indicator to stop the search
  let stop = false;

  // Remove all results from the previous search
  searchResults.innerHTML = '';

  // For each section...
  for (let section of sections) {

    // For each element in it...
    for (let el of section.children) {
      // Check if the element is a title
      const isTitle = (['h2', 'h3', 'h4', 'h5', 'h6']).includes(tagOf(el));

      // If the element is a title...
      if (isTitle) {
        // Get its level (decreased by 2 to be an array of the 'path' array)
        const level = parseInt(tagOf(el).charAt(1)) - 2;

        // Remember this title in the search path
        path[level] = el;

        // Erase any title deeper than this one in the path
        for (let i = level + 1; i < 5; i ++)
          path[i] = null;
      }

      // If we are (exlusively) under an already used <h2> element...
      // NOTE: This condition also greatly increases performances depending on cases
      if (path[0] && usedH2.includes(path[0]))
        // Don't search in it
        continue;

      // If we are under an already used <h3> element...
      // NOTE: This condition also greatly increases performances depending on cases
      if (path[1] && usedH3.includes(path[1]))
        // Don't search in it
        continue ;

      // Get the element's text (lowercase + normalized spaces)
      const elText = el.innerText.toLocaleLowerCase().replace(nonBreakingSpaceRegExp, ' ');

      // Look for the query (normalize spaces)...
      if (elText.includes(query)) {
        // Get the index to start the search at
        const startFrom = elText.indexOf(query) < 20 ? elText.indexOf(query) : elText.indexOf(query) - 20;

        // Perform a search and get the results
        const result = look(el, startFrom);

        // An extract following this element
        const extract = isTitle ?
          // Titles: get the extract from the next element (200 characters)
          getExtract(el.nextElementSibling, 0, 200, true) :
          // Paragraphs: get the extract from this element (200 characters - the length of this result)
          getExtract(el, startFrom + result[0].innerText.length, 200 - result[0].innerText.length, true);

        // Compute the content to show in the results
        let content;

        // For titles...
        if (isTitle)
          // The content is the extract
          content = extract[0].innerHTML;
        else {
          // If the extract is not empty...
          if (extract[0].firstElementChild) {
            // Integrate its first element to the original result
            result[0].firstElementChild.innerHTML += extract[0].firstElementChild.innerHTML;
            // Remove the first element from the extract
            extract[0].removeChild(extract[0].firstElementChild);
          }

          // Set the content
          content = result[0].innerHTML + extract[0].innerHTML;
        }

        // Push the result
        results.push({
          // The extract to show in the results (textual)
          content,
          // The titles path up to the nearest one above this element
          path: path.slice(0).filter(title => title !== null),
          // A link to this element
          linkTo: el,
          // Indicate if the result was found in a title
          // And its place in the path (the lowest, the more relevant)
          inTitle: isTitle ? path.length - path.indexOf(el) : 0,
          // The result's relevance (= number of occurences)
          relevance: result[1] + extract[1]
        });

        // If we are under an <h3> title...
        if (path[1])
          // Mark it as used
          usedH3.push(path[1]);
        // Else, if we are (exclusively) under an <h2> title...
        else if (path[0])
          // Mark it as used
          usedH2.push(path[0]);

        // After 30 results...
        if (results.length === 30) {
          // Stop the search (less relevant but still required)
          stop = true;
          break ;
        }
      }
    }

    // If the searched must be stopped...
    if (stop)
      // Break the loop
      break ;
  }

  // Measure performances
  const foundAfter = Date.now() - started;

  // Get the timestamp to measure rendering performances
  const startedRendering = Date.now();

  // Sort the results by decreasing relevance
  results = results.sort((a, b) => {
    if (a.inTitle > b.inTitle)
      return -1;

    if (a.inTitle < b.inTitle)
      return 1;

    if (a.relevance > b.relevance)
      return -1;
    
    if (a.relevance < b.relevance)
      return 1;
    
    return 0; // Equality
  });

  // For each of result...
  for (let result of results) {
    // Create a result item
    let item = document.createElement('div');

    // Create a title path
    let path = document.createElement('h3');

    // For each part of the title...
    for (let part of result.path) {
      // Except for the first part...
      if (path.children.length > 0) {
        // Create a directional item
        let dir = document.createElement('span');
        // Give it a content
        dir.innerHTML = '&#10095;';
        // Append it to the path
        path.appendChild(dir);
      }

      // Create a part item
      let partItem = document.createElement('a');
      // Give it a content
      partItem.innerHTML = part.innerHTML;

      // Except for <h4>, <h5> and <h6>...
      if (! (['h4', 'h5', 'h6']).includes(tagOf(part))) {
        // When it is clicked...
        partItem.addEventListener('click', e => {
          // Hide the search box
          toggleSearchBox();

          // Trigger the real link's click
          linkCallback.get(q('nav li[data-real-target="' + part.getAttribute('data-id') + '"] a'))(e);
        });
      } else
        // Add a specific class to it
        partItem.classList.add('inactive');

        // Append it to the path
      path.appendChild(partItem);
    }

    // Append the path to the result item
    item.appendChild(path);

    // Create a container for the content
    const container = document.createElement('p');
    // Give it a content
    container.innerHTML = result.content;
    // Remove the last letters (to avoid word breaking)
    container.lastElementChild.innerHTML = container.lastElementChild.innerHTML.replace(/\s?[a-zA-Z]+$/, '');

    // Append it to the result item
    item.appendChild(container);

    // Append the item to the search box's results
    searchResults.appendChild(item);
  }

  // Calculate performances
  const renderingTook = Date.now() - startedRendering;

  // Log the performances
  console.debug(
    `Performed a search (${query.length} bytes) : found ${results.length} results\n` +
    `Search took ${foundAfter} ms\n` +
    `Rendering took ${renderingTook} ms\n` +
    `Whole search took ${foundAfter + renderingTook} ms`
  );
}

/**
 * Add a scrollbar linked to an element
 * @param {string} name The target's name ('data-target' attribute)
 * @param {HTMLElement} getTarget A function to get the target element, real-time
 * @param {HTMLElement} scrollFrom The element to handle the scroll from
 * @param {HTMLElement} mouseWheelFrom The element to handle the mouse wheels from
 * @returns {HTMLElement} The scrollbar
 */
function addScrollbar (name, getTarget, scrollFrom, mouseWheelFrom) {
  // Create the scrollbar's track
  let track = document.createElement('div');
  // Give it a target
  track.setAttribute('data-target', name);
  // Give it a class
  track.classList.add('scrollbar');
  
  // Create the scrollbar's handle
  let handle = document.createElement('div');
  // By default, display it at the top
  handle.style.marginTop = '0px';
  // Append it to the track
  track.appendChild(handle);

  // Append it to the <body>
  document.body.appendChild(track);

  /* Movement handling */

  // Is the scrollbar being moved?
  // If so, contains the start Y position
  let startY = false;

  // The same, but with the scrollbar's Y position
  let startScrollY = false;

  // When it is clicked...
  handle.addEventListener('mousedown', e => {
    // It is now moving
    startY = e.clientY;
    startScrollY = parseInt(handle.style.marginTop.replace(/px$/, ''));

    // Cancel the event
    e.preventDefault();
  });

  // When the button is released anywhere on the page...
  document.documentElement.addEventListener('mouseup', () => {
    // It is not moving anymore
    startY = false;
    startScrollY = false;
  });

  // When the mouse is moved...
  document.documentElement.addEventListener('mousemove', e => {
    // If the scrollbar has not been registered as moving...
    if (! startY)
      // Ignore this event
      return ;

    // Move the scrollbar as well as its target
    setScrollbarY(track, getTarget(), startScrollY + (e.clientY - startY), 200);
  });

  /* Attach a scroll updater to the scrollbar */

  // Set a scroll updater for this scrollbar
  scrollbarUpdaters[name] = () =>
    // Update the scrollbar
    updateScrollbar(track, scrollFrom);

  // Handle the element's scrolls
  scrollFrom.addEventListener('scroll', scrollbarUpdaters[name]);

  /* Handle mouse wheels */
  
  addWheelsListener(mouseWheelFrom, e => moveScrollbarBy(track, getTarget(), e.deltaY, 200));

  // Return the scrollbar
  return track;
}

/**
 * Move the scrollbar by an amount given of pixels (Y axis)
 * @param {HTMLElement} scrollbar The scrollbar's element
 * @param {HTMLElement} target Its target
 * @param {number} y The number of pixels to scroll down in the target (can be negative)
 * @param {number} duration The animation's duration, in miliseconds
 * @returns {void}
 */
function moveScrollbarBy (scrollbar, target, y, duration) {
  // HACK: The `.scrollTop` property is not writable for <section> elements, strangely (tested on Chrome)
  // If the target is a <section>...
  if (tagOf(target) === 'section')
    // Replace it by the document element
    target = document.documentElement;

  // Move the scrollbar as well as its target
  setScrollbarY(
    scrollbar,
    target,
    // Get the scrollbar's current Y position
    parseInt(scrollbar.firstElementChild.style.marginTop.replace(/px$/, '')) +
      // Add it the relative move needed to make the container moving of the provided deltaY value
      // e.g. if the mouse wheels move from 100px, calculate how many pixels the scrollbar have
      //  to move from in order to make its target getting a 100px move
      (y / target.scrollHeight * scrollbar.clientHeight),
    duration
  );
}

/**
 * Set a scrollbar's position (also updates its target)
 * @param {HTMLElement} scrollbar The scrollbar's element
 * @param {HTMLElement} target Its target
 * @param {number} y The Y value to assign
 * @param {number} duration The animation's duration, in miliseconds
 * @returns {void}
 */
function setScrollbarY (scrollbar, target, y, duration) {
  // If an animation is pending...
  if (animating) {
    // Get the arguments as an array
    const args = Array.from(arguments);

    // Ask to stop it
    stopAnimationCallback = () => setScrollbarY(...args);

    // Exit the function for now
    return ;
  }

  // Indicate the page is being animated
  animating = true;

  // Get the scrollbar's track (alias)
  const track = scrollbar;

  // Get the scrollbar's handle
  const handle = track.firstElementChild;

  // HACK: The `.scrollTop` property is not writable for <section> elements, strangely (tested on Chrome)
  // If it's a <section>...
  if (tagOf(target) === 'section')
    // Use instead the document element, which is correctly scrollable
    target = document.documentElement;

  // Get the initial Y position of the scrollbar
  const startY = parseInt(handle.style.marginTop.replace(/px$/, ''));

  // Compute the final Y position
  const finalY = Math.round(
    Math.min(
      Math.max(
        y,
        0
      ),

      track.clientHeight - handle.clientHeight
    )
  );

  /**
   * Update the scrollbar's position as well as it's target's one
   * @param {boolean} lastFrame Indicate if the function must exit after this frame
   * @returns {void}
   */
  function animate (lastFrame = false) {
    // Compute elapsed time
    const elapsed = Math.round(performance.now() - started);

    // Increase the frame counter
    frame ++;

    // Compute its new Y position
    const currentY = Math.floor(Math.min(
      Math.max(
        lastFrame ? finalY : startY + Math.min(f(elapsed / duration), 1) * (finalY - startY),
        0
      ),

      track.clientHeight - handle.clientHeight
    ));

    // If no movement has been done during this frame...
    if (currentY === lastY)
      // Mark this frame as motionless
      motionlessFrames.push(frame + 1 /* Starts at 1 */);

    // Memorize the last position
    lastY = currentY;

    // Move the scrollbar
    handle.style.marginTop = currentY + 'px';

    // Get the scrollbar's purcentage (between 0 and 1)
    const p = currentY / (track.clientHeight - handle.clientHeight);

    // Compute the Y position to scroll to, and then scroll to it
    target.scrollTop = Math.round(target.clientTop + p * (target.scrollHeight - window.innerHeight));

    // If the animation must be stopped now...
    if (stopAnimationCallback) {
      // If the animation is not finished yet...
      if (currentY !== finalY)
        // Request a last frame to conclude the animation
        requestFrame(() => animate(true));
      else {
        // Animation has ended
        animating = false;

        // Else, get the callback
        const callback = stopAnimationCallback;

        // Remove it from the indicator
        stopAnimationCallback = null;

        // Run it
        callback();
      }

      // Exit the function
      return ;
    }

    // Compute elapsed time again (update)
    // If the animation is not finished yet...
    if (Math.round(performance.now() - started) <= duration)
      // Request a new frame
      // NOTE: `requestFrame(animate);` would have introduce a bug because the callback receives
      //        an argument - and we don't one as it indicates the last frame
      requestFrame(() => animate());
    // Else, if the duration has been reached but the animation is still not finished...
    else if (currentY !== finalY && ! lastFrame)
      // Request a last frame to conclude the animation
      requestFrame(() => animate(true));
    else {
      // Animation has ended
      animating = false;

      // Debug
      console.debug(`Moved by ${Math.round(finalY - startY)} pixels in ${duration} ms using ${frame} frames.`);

      // If there were more than 10 motionless frames...
      if (motionlessFrames.length > 10)
        // Display a warning
        console.warn(
          `WARNING: ${motionlessFrames.length} motionless frames have been detected.\n` +
          `Frames number: ` + motionlessFrames.slice(0, 10).join(';') +
          (motionlessFrames.length > 10 ? ` (${motionlessFrames.length - 10} other frames)` : '')
        );

      // Exit the function
      return;
    }
  }

  // Set up a frames counter
  let frame = 0;

  // Set up a motionless frames counter
  let motionlessFrames = [];

  // Memorize the last Y position
  let lastY = startY;

  // Set up an animation function (ease-in-out-cubic)
  const f = t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  
  // Start the timer
  const started = performance.now();

  // Launch the animation
  requestFrame(() => animate());
}

// Set up a regular expression to detect all non-breaking spaces
const nonBreakingSpaceRegExp = new RegExp(String.fromCharCode(160), 'g');

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

/**
 * Request an animation frame
 * @type {Function}
 */
const requestFrame = window.requestAnimationFrame ||
                     window.mozRequestAnimationFrame ||
                     window.webkitRequestAnimationFrame ||
                     window.msRequestAnimationFrame ||
                     window.setImmediate ||
                     (c => setTimeout(c, 0));

/**
 * Is the page being animated?
 * @type {boolean}
 */
let animating = false;

/**
 * The callback to run after the current animation
 */
let stopAnimationCallback = null;

/**
 * The current section
 * @type {HTMLElement}
 */
let currentSection;

/**
 * The current section's ID
 * @type {number}
 */
let currentSectionID;

/**
 * Did the search bar just caught a key?
 * @type {boolean}
 */
let justGotSearchKey = false;

/**
 * The last search's content
 * @type {string}
 */
let lastSearch = '';

/**
 * The updater associated to each scrollbar
 * @type {Object.<HTMLElement, Function>}
 */
let scrollbarUpdaters = {};

/**
 * The callback associated to each link
 * HTMLElement -> Function
 */
let linkCallback = new Map();

// Get the list of all sections
const sections = qa('body > article section');

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

  // Assign a callback to this link
  linkCallback.set(link, e => {
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

  // When it is clicked...
  link.addEventListener('click', linkCallback.get(link));
}

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
      link.classList.remove('triggered'),
      2000
    );
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
darkModeToggle.addEventListener('click', toggleDarkMode);
// Append it to the <body>
document.body.appendChild(darkModeToggle);

// Restore the summary's visibility
restore('hidden-summary', toggleSummary);

// Restore the dark mode's state
restore('dark-mode', toggleDarkMode);

// Create a button to search in the book
let searchButton = document.createElement('a');
// Give it an ID
searchButton.setAttribute('id', 'search-button');
// Give it a help text
searchButton.setAttribute('title', 'Search in this book');
// Give it a legend
searchButton.innerHTML = '&#128270;';
// When it is clicked...
searchButton.addEventListener('click', toggleSearchBox);
// Append it to the <body>
document.body.appendChild(searchButton);

// Create a search box
let searchBox = document.createElement('div');
// Give it an ID
searchBox.setAttribute('id', 'search-box');
// Make it hidden by default
searchBox.classList.add('hidden');
// Append it to the <body>
document.body.appendChild(searchBox);

// Create a search bar
let searchBar = document.createElement('input');
// Give it a placeholder
searchBar.setAttribute('placeholder', 'Search in this book...');
// When a key is pressed in it...
searchBar.addEventListener('keydown', e => {
  // Indicate the search bar just got this key
  justGotSearchKey = true;

  // If this was the 'Escape' key...
  if (e.keyCode === 27)
    // Close the search box
    toggleSearchBox();
});
// When a key is pressed in it...
searchBar.addEventListener('input', () => {
  // If the content has not changed since the last time...
  if (lastSearch === searchBar.value) {
    // Update the last search
    lastSearch = searchBar.value;

    // Ignore the event
    return ;
  }

  // If the query is less than 3 characters-long...
  if (searchBar.value.length < 3) {
    // Remove all results from the previous search
    searchResults.innerHTML = '';

    // Update the last search
    lastSearch = searchBar.value;

    // Ignore it
    return ;
  }

  // Perform the search
  search(searchBar.value);

  // Update the last search
  lastSearch = searchBar.value;
});
// Append it to the search box
searchBox.appendChild(searchBar);

// Create a container for the search's results
let searchResults = document.createElement('div');
// Append it to the search box
searchBox.appendChild(searchResults);

// Add a scrollbar to the summary
addScrollbar('summary', () => summary, summary, summary);

// Add a scrollbar to the content
let articleScrollbar = addScrollbar('article', () => currentSection, document.documentElement, article);

// If a hash was specified in the URL
// and if it targets an existing section...
if (window.location.hash && q(`[data-slug="${window.location.hash.substr(1)}"]`))
  // Show this section
  showSection(window.location.hash.substr(1) /* Ignore the '#' symbol */);
// Else...
else
  // Show the first section
  showSection(sections[0].getAttribute('data-slug'));

// When the page is resized...
window.addEventListener('resize', () => {
  // Update the scrollbars (requires the page to be visible)
  for (let name of Reflect.ownKeys(scrollbarUpdaters))
    scrollbarUpdaters[name]();
});

// When the page is scrolled...
window.addEventListener('scroll', refreshActive);

// When a key is pressed...
window.addEventListener('keydown', e => {
  // If the search bar just got this key...
  if (justGotSearchKey) {
    // Reset the boolean
    justGotSearchKey = false;

    // Ignore this event
    return ;
  }
  
  // If the control key and/or the alt key was pressed...
  if (e.ctrlKey || e.altKey)
    // Ignore this event
    return ;

  // Was the key captured?
  let captured = true;

  // If the "arrow left" key was pressed...
  if (e.keyCode === 37)
    // Go to the previous section
    showSection(currentSectionID - 1);

  // If the "arrow right" key was pressed...
  else if (e.keyCode === 39)
    // Go to the next section
    showSection(currentSectionID + 1);

  // If the "s" (for "summary") key was pressed...
  else if (e.keyCode === 83)
    // Toggle the summary
    toggleSummary();

  // If the "d" (for "dark") key was pressed...
  else if (e.keyCode === 68)
    // Toggle the dark mode
    toggleDarkMode();

  // If the "f" (for "find") key was pressed...
  else if (e.keyCode === 70)
    // Toggle the search bar
    toggleSearchBox();
  
  // If the "arrow up" key was pressed...
  else if (e.keyCode === 38)
    // Move up 40 pixels
    moveScrollbarBy(articleScrollbar, currentSection, -40, 50);

  // If the "arrow down" key was pressed...
  else if (e.keyCode === 40)
    // Move down 40 pixels
    moveScrollbarBy(articleScrollbar, currentSection, 40, 50);

  // If the "page up" key was pressed...
  else if (e.keyCode === 33)
    // Move up 75% of the screen
    moveScrollbarBy(articleScrollbar, currentSection, - window.innerHeight * 0.75, 200);

  // If the "page down" key was pressed...
  else if (e.keyCode === 34)
    // Move down 75% of the screen
    moveScrollbarBy(articleScrollbar, currentSection, window.innerHeight * 0.75, 200);

  // If the "space bar" key was pressed...
  else if (e.keyCode === 32)
    // Move down (or up if the "shift" key was pressed too) 75% of the screen
    moveScrollbarBy(articleScrollbar, currentSection, (e.shiftKey ? - 0.75 : 0.75) * window.innerHeight, 200);

  else
    // No action is binded to this key
    captured = false;

  // If the key has been captured...
  if (captured)
    // Cancel its event
    e.preventDefault();
});

// Indicate the scripts are working
document.body.setAttribute('data-scripts', 'true');

// Show the page now it's ready
document.body.style.display = 'block';

// Indicate the page is ready
ready = true;

// Refresh the active link in the summary
refreshActive();

// Update the scrollbars (requires the page to be visible)
for (let name of Reflect.ownKeys(scrollbarUpdaters))
  scrollbarUpdaters[name]();

// Measure performances
console.debug(`Script execution took ${Math.round(performance.now() - started)} ms.`);
