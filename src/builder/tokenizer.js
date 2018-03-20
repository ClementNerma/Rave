/**
 * @file Tokenizer for SilverNight
 */

// Enable strict mode
"use strict";

// List of tokens
const T_NEWLINE          = 'T_NEWLINE';
const T_SPACE            = 'T_SPACE';
const T_LITERAL_BOOL     = 'T_LITERAL_BOOL';
const T_LITERAL_NUMBER   = 'T_LITERAL_NUMBER';
const T_LITERAL_STRING   = 'T_LITERAL_STRING';
const T_NAME             = 'T_NAME';
const T_QUOTE            = 'T_QUOTE';
const T_PREPOST_OPERATOR = 'T_PREPOST_OPERATOR';

/**
 * Tokenize a source code
 * @param {string} source The source code to tokenize
 * @returns {Array} A representation of the source code with tokens
 */
function tokenize (source) {
  /**
   * Throw an error
   * @param {string} message The error's message
   * @returns {void}
   */
  function fail (message) {
    // Display an error message
    console.error(`[ERROR] ${message}`);
  
    // Thrown an error
    throw new Error('Tokenization failed.');    
  }

  /**
   * Push a token to the tree
   * @param {string} token The token
   * @param {*} [data] The data that goes with it
   * @returns {void}
   */
  function push (token, data) {
    // Push the token to the tree
    tree.push(typeof data !== 'undefined' ? [ token, data ] : [ token ]);

    // Remember it as the last token
    last_token = token;
    
    // If this is NOT a breaking token
    if (T_BREAKING.includes(token))
      // Remember it as the last non-breaking token
      last_nb_token = token;
  }

  /**
   * Open a new buffer
   * @param {string} type The buffer's type
   * @param {string} type_token The buffer's type token
   * @param {Function} close_handler A callback to call before the buffer closes
   * @param {string} [token] The buffer's opening token
   * @param {*} [data] The data that goes with it
   * @returns {void}
   */
  function openBuffer (type, type_token, close_callback, token, data) {
    // Set the buffer's type
    buff_type = type;

    // Set the buffer's token type
    buff_token = type_token;

    // Store the close callback
    buff_close_callback = close_callback;

    // If an opening token was provided...
    if (token) {
      // Set the buffer's opening token
      buff_opening_token = [ token, data ];

      // Push the opening token and its data
      push(token, data);
    }
  }

  /**
   * Close the opened buffer
   * @param {string} [token] The buffer's closing token
   * @param {*} [data] The data that goes with it
   * @returns {void}
   */
  function closeBuffer (token, data) {
    // If there is a close handler...
    if (buff_close_callback) {
      // Call it and save its result
      const callback_result = buff_close_callback(buff[buff_type], token, data);

      // If something was returned...
      if (callback_result !== undefined)
        // Use it instead of the buffer
        buff[buff_type] = callback_result;
    }

    // Push the buffer
    // If there is a close handler, call it and use its return value instead
    push(buff_token, buff[buff_type]);

    // Reset the buffer
    buff[buff_type] = '';
    
    // If a buffer's closing token was provided...
    if (token)
      // Push it
      push(token, data);

    // Reset informations about the current buffer
    buff_type = null;
    buff_token = null;
    buff_opening_token = null;
    buff_close_callback = null;
  }

  // Normalize line breaks in the source code
  source = source.replace(/\r\n|\r/g, '\n');

  // The build tokens tree
  let tree = [];

  // The current column in the source code
  let col = 0;

  // The current character
  let char = '';

  // The next character
  let next = '';

  // The last token
  let last_token = null;

  // The last non-space and non-newline token
  let last_nb_token = null;

  // List of buffers
  let buff = {
    number: '',
    string: ''
  };

  // Current buffer type
  let buff_type = null;

  // Current buffer type token
  let buff_token = null;

  // Current buffer's opening token
  let buff_opening_token = null;

  // A callback to run when before the buffer is closed
  let buff_close_callback = null;

  // For each character...
  for (col = 0; col < source.length; col ++) {
    // Get the current character
    char = source[col];

    // Get the next character
    next = source[col + 1];

    // If we are in a string...
    if (buff_type === 'string') {
      // If the current character is the opening quote...
      if (char === buff_opening_token[1]) {
        // Push the string
        closeBuffer(T_QUOTE, char);
        // Reset the string buffer
        buff.string = '';
      } else
        // Push the character to the string buffer
        buff.string += char;

      continue ;
    }

    // If the current character...
    // [SYMBOL] quote
    if (`'"`.includes(char)) {
      // Open a new buffer
      openBuffer('string', T_LITERAL_STRING, null, T_QUOTE, char);

      continue ;
    }

    // [SYMBOL] digit
    if ('0123456789.'.includes(char)) {
      // If a number is already opened...
      if (buff.number) {
        // If it's a point and there's already a point in the buffer...
        if (char === '.' && buff.number.includes('.'))
          // Fail
          fail(`Cannot have two points in a number`);

        // Push the number to it
        buff.number += char;
      } else {
        // If this is a point...
        if (char === '.')
          // Fail
          fail(`A point must follow a digit`);

        // Open a new buffer
        openBuffer('number', T_LITERAL_NUMBER);

        // Open a number buffer
        buff.number = char;
      }

      continue ;
    }

    // If number is not a digit but a number buffer is opened...
    else if (buff.number)
      // Close it
      closeBuffer();

    // [SYMBOL] space
    if (char === ' ') {
      // Push it
      push(T_SPACE);
      continue ;
    }

    // [SYMBOL] newline
    if (char === '\n') {
      // Push it
      push(T_NEWLINE);
      continue ;
    }

    // [SYMBOL] (pre/post) increment and decrement operators
    if ('+-'.includes(char) && next === char) {
      // Ignore the next character
      col ++;
      // Push the operator
      push(T_PREPOST_OPERATOR, char + next);

      continue ;
    }

    // [SYMBOL] operators with two arguments
    if ('+-*/%^!'.includes(char)) {
      // Handle the pow operator
      if (char === '*' && next === '*') {
        // Ignore the next character
        col ++;
        // Set the current symbol
        char += next;
      }

      // Push the operator
      push(T_OPERATOR, char);

      continue ;
    }

    // Handle unknown symbols
    fail(`Unknown symbol: ${char} (char code = ${char.charCodeAt(0)} | ${char.length} bytes)`);
  }

  // If a number buff is opened...
  if (buff.number)
    // Close it
    closeBuffer();

  // If a buffer is opened...
  else if (buff_type)
    // Fail
    fail(`A ${buff_type} buffer was not closed`);

  // Return the tokens tree
  return tree;
}

// If a file was given as an argument...
if (process.argv[2]) {
  // Load some Node.js modules
  const fs = require('fs'),
        path = require('path');

  // Format the path
  const file = path.normalize(process.argv[2]);

  // Read it
  let content;

  try {
    content = fs.readFileSync(file, 'utf8');
  } catch (e) {
    throw new Error(`Failed to read argument file "${file}"`);
  }

  // Treat the file and display the result in the console
  console.log(tokenize(content));
}