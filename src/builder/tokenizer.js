/**
 * @file Tokenizer for SilverNight
 */

// Enable strict mode
"use strict";

// List of token names
const Tokens_List = [
  'NEWLINE',
  'SPACE',
  'LITERAL_BOOLEAN',
  'LITERAL_NUMBER',
  'LITERAL_STRING',
  'NAME',
  'QUOTE',
  'PREPOST_OPERATOR',
  'LOGICAL_OPERATOR',
  'SHIFT_OPERATOR',
  'NEG_OPERATOR',
  'COMPARISON_OPERATOR',
  'MATH_OPERATOR'
];

// Generate the tokens
const T_ = {};

for (let token of Tokens_List)
  T_[token] = 'T_' + token;

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
   * Push a token
   * @param {string} token The token
   * @param {*} [data] The data that goes with it
   * @returns {void}
   */
  function push (token, data) {
    // Push the token
    token_arr.push(typeof data !== 'undefined' ? [ token, data ] : [ token ]);

    // Remember it as the last token
    last_token = token;
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

  /**
   * Check if the current symbol belongs to a group of symbols
   * @param {string} list The list of symbols to check
   * @returns {bool} `true` if the symbol is in the list, `false` else
   */
  function isIn (list) {
    return list.includes(char);
  }

  /**
   * Check if the current symbol is followed by a symbol or a group of symbols
   * @param {string} follow The list of symbols to check
   * @param {boolean} [ignoreNext] Ignore the next character if the test is true (default: true)
   * @returns {bool} `true` if the symbol is followed by the provided list, `false` else
   */
  function isNext (follow, ignoreNext = true) {
    // Do the test
    let test = source.substr(col + 1, follow.length) === follow;

    // If asked, ignore the next characters
    if (ignoreNext)
      col += follow.length;
    
    // Return the test's result
    return test;
  }

  /**
   * Run if the current symbol is in a list and if it is followed by another list of symbols
   * @param {string} in_list The list of symbols the current character should be in
   * @param {string} follow_list The list of symbols the current character should be followed by
   * @param {boolean} [ignoreNext] Ignore the next character if the test is true (default: true)
   * @returns {boolean} `true` if all tests succeed, `false` else
   */
  function suite (in_list, follow_list, ignoreNext = true) {
    // Do the tests and return the result
    // NOTE: This funny form is used to prevent `isNext()` from being called
    //       if `isIn()` returns `false`
    return isIn(in_list) ? isNext(follow_list, ignoreNext) : false;
  }

  // Normalize line breaks in the source code
  source = source.replace(/\r\n|\r/g, '\n');

  // The build tokens tree
  let token_arr = [];

  // The current column in the source code
  let col = 0;

  // The current character
  let char = '';

  // The last token
  let last_token = null;

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

    // If we are in a string...
    if (buff_type === 'string') {
      // If the current character is the opening quote...
      if (char === buff_opening_token[1]) {
        // Push the string
        closeBuffer(T_.QUOTE, char);
        // Reset the string buffer
        buff.string = '';
      } else
        // Push the character to the string buffer
        buff.string += char;

      continue ;
    }

    // If the current character...
    // [MATCH] quote
    if (isIn(`'"`)) {
      // Open a new buffer
      openBuffer('string', T_.LITERAL_STRING, null, T_.QUOTE, char);

      continue ;
    }

    // [MATCH] digit
    if (isIn('0123456789.')) {
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
        openBuffer('number', T_.LITERAL_NUMBER);

        // Open a number buffer
        buff.number = char;
      }

      continue ;
    }

    // If number is not a digit but a number buffer is opened...
    else if (buff.number)
      // Close it
      closeBuffer();

    // [MATCH] space
    if (char === ' ')
      // Push it
      push(T_.SPACE);

    // [MATCH] newline
    else if (char === '\n')
      // Push it
      push(T_.NEWLINE);

    // [MATCH] (pre/post) increment and decrement operators
    else if (suite('+-', char))
      // Push the operator
      push(T_.PREPOST_OPERATOR, char + char);
    
    // [MATCH] shift operators
    else if (suite('<', '<') || suite('>', '>'))
      // Push the operator
      push(T_.SHIFT_OPERATOR, char + char);

    // [MATCH] comparison operators
    else if (isIn('<>'))
      // Push the operator
      push(T_.COMPARISON_OPERATOR, char);

    // [MATCH] comparison operators
    else if (suite('<>', '='))
      // Push the operator
      push(T_.COMPARISON_OPERATOR, char);

    // [MATCH] logical operators
    else if (suite('&|', char))
      // Push the operator
      push(T_.LOGICAL_OPERATOR, char + char);

    // [MATCH] equality operators
    else if (suite('=!', '='))
      // Push the operator
      push(T_.COMPARISON_OPERATOR, char + '=');

    // [MATCH] negation operator
    else if (isIn('!'))
      // Push the operator
      push(T_.NEG_OPERATOR, char);

    // [MATCH] operators with two arguments
    else if (isIn('+-*/%^&|')) {
      // Handle the pow operator
      if (isIn('*') && isNext('*'))
        // Set the current symbol
        char += char;

      // Push the operator
      push(T_.MATH_OPERATOR, char);
    }

    // [MATCH] booleans
    else if (suite('t', 'rue'))
      push(T_.LITERAL_BOOLEAN, 'true');
    
    // [MATCH] booleans
    else if (suite('f', 'alse'))
      push(T_.LITERAL_BOOLEAN, 'false');

    // Handle unknown symbols
    else
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
  return token_arr;
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