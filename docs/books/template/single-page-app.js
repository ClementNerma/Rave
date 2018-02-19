/**
 * @file This file modified the book's HTML page by showing only one section at a time and making a dynamic summary
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
