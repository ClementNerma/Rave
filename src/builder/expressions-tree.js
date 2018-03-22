/**
 * @file Expressions tree builder for SilverNight
 */

// Enable strict mode
"use strict";

// Error's width for debugging
const errorWidth = 20;

/**
 * Build an expressions tree from an array of tokens
 * No syntax checking is applied, excepted for operators with two arguments (ensuring the two arguments are provided)
 * @param {Array} token_arr An array of token from the tokenizer
 * @param {string} source The source code used by the tokenizer (used for debugging)
 * @param {string} [realSource] The real source code (automatically set)
 * @param {Number} [inc_line] The debug line (automatically set)
 * @param {Number} [inc_col] The debug column (automatically set)
 * @returns {Array} An expressions tree
 */
function build_expressions_tree (token_arr, source, realSource = source, inc_line = 0, inc_col = 0) {
  /**
   * Throw an error
   * @param {string} message The error's message
   * @returns {void}
   */
  function fail(message) {
    // === Set the message with debugging ===
    // Calculate the column increment
    let calc_inc_col = (line === 0 ? inc_col : 0);
    // Define the part to display
    let part = realSource.split('\n')[line + inc_line].substr(line_col + calc_inc_col < errorWidth ? 0 : line_col + calc_inc_col - errorWidth, 2 * errorWidth + 1);
    // Define the cursor's position
    // The Math.max() function is used here to prevent negative values if the
    // parser calculates a wrong cursor position.
    let cursor = Math.max(line_col + calc_inc_col < errorWidth ? line_col + calc_inc_col : errorWidth, 0);
    // Display the error message
    console.error(`ERROR : At line ${line + inc_line + 1}, column ${line_col + inc_col + 1} : \n\n${part}\n${' '.repeat(cursor)}^\n${' '.repeat(cursor)}${message}`);
    
    // Thrown an error
    throw new Error('Tokenization failed.');
  }

  // The expressions tree
  let tree = [];

  // Get all source code lines
  let lines = source.split('\n');

  // The current line
  let line = 0;

  // The current column
  let line_col = -1;

  // The waiting token
  let waiting_token = null;

  // The waiting operator
  let waiting_op = null;

  // For each token in the array...
  for (let token of token_arr) {
    // If the current token is a line break...
    if (token === 'T_NEWLINE') {
      // Increment the line index
      line ++;

      // Reset the column index
      line_col = 0;
    } else
      // Increase the column index
      line_col += (token[1] ? token[1].length : 1);

    // Code goes here
  }

  // Return the built tree
  return tree;
}

// If modules are supported...
if (module && typeof module === 'object')
  // Export the main function
  module.exports = build_expressions_tree;
