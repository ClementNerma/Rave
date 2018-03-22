/**
 * @file Tokenizer for SilverNight
 */

// Enable strict mode
"use strict";

// Error's width for debugging
const errorWidth = 20;

// Digits
const digits = '0123456789';

// Name symbol
const nameSymbol = 'abcdefghijklmnopqrstuvwxyz' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + '_$';

// Name symbol with digits
const nameSymbolWithDigits = nameSymbol + digits;

// List of non-breaking symbols
const NON_BREAKING_SYMBOLS = nameSymbolWithDigits;

// Group symbols and tokens
const groups = {
  '(': { name: 'parenthesis', openingSymbol: '(', closingSymbol: ')', openingToken: 'T_OPENING_PARENTHESIS', closingToken: 'T_CLOSING_PARENTHESIS' },
  '[': { name: 'brace', openingSymbol: '[', closingSymbol: ']', openingToken: 'T_OPENING_BRACKET', closingToken: 'T_CLOSING_BRACKET' },
  '{': { name: 'bracket', openingSymbol: '{', closingSymbol: '}', openingToken: 'T_OPENING_BRACE', closingToken: 'T_CLOSING_BRACE' }
};

// List of groups' opening symbols
const group_opening_symbols = '([{';

// Complete the list of group symbols and tokens with the closing tokens
groups[')'] = groups['('];
groups[']'] = groups['['];
groups['}'] = groups['{'];

// List of groups' closing symbols
const group_closing_symbols = ')]}';

/**
 * Tokenize a source code
 * The returned analysis assures all groups (parenthesis, brackets...) have a match and are put in the right order
 * Literals are put into buffers (including spaces)
 * No other syntax checking is performed
 * @param {string} source The source code to analysis
 * @returns {Array.<Array>} A literal analysis (array of tokens)
 */
function tokenize (source) {
  /**
   * Throw an error
   * @param {string} message The error's message
   * @returns {void}
   */
  function fail (message) {
    // === Set the message with debugging ===
    // Define the part to display
    let part = line.substr(line_col < errorWidth ? 0 : line_col - errorWidth, 2 * errorWidth + 1);
    // Define the cursor's position
    // The Math.max() function is used here to prevent negative values if the
    // parser calculates a wrong cursor position.
    let cursor = Math.max(line_col < errorWidth ? line_col : errorWidth, 0);
    // Display the error message
    console.error(`ERROR : At line ${source.split('\n').length - lines.length + 1}, column ${line_col + 1} : \n\n${part}\n${' '.repeat(cursor)}^\n${' '.repeat(cursor)}${message}`);

    // Thrown an error
    throw new Error('Tokenization failed.');    
  }

  /**
   * Go to a next character
   * @param {Number} step The number of characters to pass
   * @returns {string} The last got character
   */
  function goNextChars (step) {
    // For each step...
    for (let i = 0; i < step; i ++) {
      // Increase the global source code index
      col ++;

      // If the current character is a line break...
      if (source[col] === '\n') {
        // If an *inline* string buffer was opened...
        if (buff_opening_token ? buff_opening_token[0] === 'T_QUOTE' : false)
          // Fail
          fail('Quote was not closed before the end of the line');

        // Refresh the line buffer
        line = lines.shift();
        // Reset the line's column index
        line_col = -1;
      } else
        // Increase the line column index
        line_col ++;
    }

    // Return the new current character
    return source[col];
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
      goNextChars(follow.length);
    
    // Return the test's result
    return test;
  }

  /**
   * Run if the current symbol is in a list and if it is followed by another list of symbols
   * @param {string} in_list The list of symbols the current character should be in
   * @param {string} follow_list The list of symbols the current character should be followed by
   * @param {string} not_follow_sym A list of symbols that musn't follow `follow_list`
   * @param {boolean} [ignoreNext] Ignore the next character if the test is true (default: true)
   * @returns {boolean} `true` if all tests succeed, `false` else
   */
  function suite (in_list, follow_list, not_follow_sym = '', ignoreNext = true) {
    // If the character is not in the provided list...
    if (! isIn(in_list))
      return false;
    
    // If the character is not followed by the provided list...
    if (! isNext(follow_list, false))
      return false;

    // If the character is followed by a forbidden symbol...
    if (not_follow_sym.includes(source.charAt(col + follow_list.length + 1)))
      return false;
    
    // Test is `true`

    // If next characters must be ignored...
    if (ignoreNext)
      // Increase the column index
      goNextChars(follow_list.length + (not_follow_sym ? 1 : 0));

    return true;
  }

  // Normalize line breaks in the source code
  source = source.replace(/\r\n|\r/g, '\n');

  // The build tokens tree
  let token_arr = [];

  // The current column in the source code
  let col = -1;

  // Get all lines
  let lines = source.split('\n');

  // The current line
  let line = lines.shift();

  // The current column in the line
  let line_col = -1;

  // The current character
  let char = '';

  // The last token
  let last_token = null;

  // List of buffers
  let buff = {
    number: '',
    string: '',
    name: ''
  };

  // Current buffer type
  let buff_type = null;

  // Current buffer type token
  let buff_token = null;

  // Current buffer's opening token
  let buff_opening_token = null;

  // A callback to run when before the buffer is closed
  let buff_close_callback = null;

  // ['string' buffer] Is the last character a backslash?
  let will_escape = false;

  // Groups stack
  let groups_stack = [];

  // For each character...
  while (col < source.length - 1) {
    // Go to the next character
    char = goNextChars(1);

    // If we are in a string...
    if (buff_type === 'string') {
      // If the last character was NOT an escape backslash and...
      // If the current character is the opening quote...
      if (! will_escape && char === buff_opening_token[1]) {
        // Push the string
        closeBuffer(char === '`' ? 'T_BACK_QUOTE' : 'T_QUOTE', char);
        // Reset the string buffer
        buff.string = '';
      } else
        // Push the character to the string buffer
        buff.string += char;

      // If the current character is a backslash...
      if (char === '\\')
        // Revert the escape boolean
        // NOTE: If the last character was a backslash, then simply cancel them
        //       If it was note, this symbol will escape the next one
        will_escape = ! will_escape;
      else
        // The next character will not be escaped
        will_escape = false;

      continue ;
    }

    // If the current symbol is not a digit but a number buffer is opened...
    if (buff.number && !isIn(digits + '.'))
      // Close it
      closeBuffer();

    // If this symbol is a breaking one and a name buffer is opened...
    if (buff.name && ! isIn(NON_BREAKING_SYMBOLS))
      // Close it
      closeBuffer();

    // [MATCH] quote
    if (isIn('\'"`'))
      // Open a new buffer
      openBuffer('string', 'T_LITERAL_STRING', null, char === '`' ? 'T_BACK_QUOTE' : 'T_QUOTE', char);

    // [MATCH] name character (with digits only if buffer opened)
    else if (isIn(nameSymbol) || (isIn(nameSymbolWithDigits) && buff.name)) {
      // If a name buffer was already opened...
      if (buff.name)
        // Append the character to it
        buff.name += char;
      else {
        // Open a new buffer
        openBuffer('name', 'T_LITERAL_NAME');

        // Append this character to it
        buff.name = char;
      }
    }

    // [MATCH] digit
    else if (isIn('0123456789.')) {
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
        openBuffer('number', 'T_LITERAL_NUMBER');

        // Append this character to it
        buff.number = char;
      }
    }

    // [MATCH] space
    else if (char === ' ' || char === '\t') {
      // Set up a counter
      let counter = (char === '\t' ? 2 : 1);

      // While the next character is a space...
      while (source[col + 1] === ' ' || source[col + 1] === '\t') {
        // Increment the counter
        counter += (source[col + 1] === '\t' ? 2 : 1);

        // Go to the next character
        goNextChars(1);
      }

      // Push the token
      push('T_SPACE', ' '.repeat(counter));
    }

    // [MATCH] newline
    else if (char === '\n')
      // Push it
      push('T_NEWLINE');

    // [MATCH] single-line comment
    else if (suite('/', '/')) {
      // Push the symbol
      push('T_OPENING_SINGLE_LINE_COMMENT');

      // Make a temporary comment buffer
      let comment = '';

      // Until the end of the line (or of the source code)...
      while (source[col + 1] !== '\n' && col < source.length - 1)
        // Add it to the buffer
        comment += goNextChars(1);

      // Push the comment
      push('T_SINGLE_LINE_COMMENT', comment);
    }

    // [MATCH] multi-line comment and documentation comments
    else if (suite('/', '*')) {
      // Check if it's a documentation comment
      const doc = isNext('*');
    
      // Push the opening symbol
      push(doc ? 'T_OPENING_DOCUMENTATION_COMMENT' : 'T_OPENING_MULTI_LINE_COMMENT');

      // Make a temporary comment buffer
      let comment = '';
      // Until the end of the comment...
      while (source[col + 1] !== '*' || source[col + 2] !== '/') {
        // If the end of the source code was reached...
        if (col === source.length - 2)
          // Fail
          fail('Unclosed multi-line comment');

        // Go to the next character and add it to the buffer
        comment += goNextChars(1);
      }

      // Increase the column number twice
      goNextChars(2);

      // Push the comment
      push(doc ? 'T_DOCUMENTATION_COMMENT' : 'T_MULTI_LINE_COMMENT', comment);

      // Push the closing symbol
      push(doc ? 'T_CLOSING_DOCUMENTATION_COMMENT' : 'T_CLOSING_MULTI_LINE_COMMENT');
    }

    // [MATCH] group opening symbol
    else if (isIn(group_opening_symbols)) {
      // Open a group
      groups_stack.push({ char, name: groups[char].name, closingToken: groups[char].closingToken });

      // Push the symbol
      push(groups[char].openingToken);
    }

    // [MATCH] group closing symbol
    else if (isIn(group_closing_symbols)) {
      // If no group is opened...
      if (! groups_stack.length)
        // Fail
        fail(`Found a closing ` + groups[char].name + ' but no matching opening symbol was found');

      // If the last opened group does not match with this symbol...
      if (groups_stack[groups_stack.length - 1].closingToken !== groups[char].closingToken)
        // Fail
        fail(`Expected a closing ` + groups_stack[groups_stack.length - 1].name +
             ' but got a closing ' + groups[char].name);

      // Close the group
      groups_stack.pop();

      // Push the symbol
      push(groups[char].closingToken);
    }
    
    // [MATCH] shift operators
    else if (suite('<', '<') || suite('>', '>'))
      // Push the operator
      push('T_FLY_OPERATOR', char + char);

    // [MATCH] comparison operators
    else if (suite('<>', '', char))
      // Push the operator
      push('T_FLY_OPERATOR', char);

    // [MATCH] comparison operators
    else if (suite('<>', '='))
      // Push the operator
      push('T_FLY_OPERATOR', char);

    // [MATCH] logical operators
    else if (suite('&|', char))
      // Push the operator
      push('T_FLY_OPERATOR', char + char);

    // [MATCH] equality operators
    else if (suite('=!', '='))
      // Push the operator
      push('T_FLY_OPERATOR', char + '=');

    // [MATCH] negation operator
    else if (isIn('!'))
      // Push the operator
      push('T_FLY_OPERATOR');

    // [MATCH] operators with two arguments
    else if (isIn('+-*/%^&|')) {
      // Handle the pow operator
      if (isIn('*') && isNext('*'))
        // Set the current symbol
        char += char;

      // Push the operator
      push('T_FLY_OPERATOR', char);
    }

    // Handle other symbols
    else {
      // If the last token was a plain symbol too...
      if (last_token === 'T_PLAIN')
        // Merge this one to it
        token_arr[token_arr.length - 1][1] += char;
      else
        // Push the token
        token_arr.push('T_PLAIN', char);
    }
  }

  // If a number or a name buff is opened...
  if (buff.number || buff.name)
    // Close it
    closeBuffer();

  // If a buffer is opened...
  else if (buff_type)
    // Fail
    fail(`A ${buff_type} buffer was not closed`);

  // If (at least) one parenthesis was not closed...
  else if (groups_stack.length)
    // Fail
    fail('There ' + (groups_stack.length === 1 ? 'is' : 'are') + ' ' +
         groups_stack.length + ' unclosed group(s) - last is a missing ' +
         groups_stack[groups_stack.length - 1].name);

  // Return the tokens tree
  return token_arr;
}

// If modules are supported...
if (module && typeof module === 'object')
  // Export the main function
  module.exports = tokenize;
