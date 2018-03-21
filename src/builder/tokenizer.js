/**
 * @file Tokenizer for SilverNight
 */

// Enable strict mode
"use strict";

// Error's width for debugging
const errorWidth = 20;

// List of token names
const Tokens_List = [
  'NEWLINE',
  'SPACE',
  'LITERAL_BOOLEAN',
  'LITERAL_NUMBER',
  'LITERAL_STRING',
  'LITERAL_NAME',
  'LITERAL_TEMPLATED_STRING',
  'QUOTE',
  'BACK_QUOTE',
  'PREPOST_OPERATOR',
  'LOGICAL_OPERATOR',
  'SHIFT_OPERATOR',
  'NEG_OPERATOR',
  'COMPARISON_OPERATOR',
  'MATH_OPERATOR',
  'STATICAL_REF_OPERATOR',
  'ASSIGNMENT_OPERATOR',
  'OPENING_PARENTHESIS',
  'CLOSING_PARENTHESIS',
  'OPENING_BRACE',
  'CLOSING_BRACE',
  'OPENING_BRACKET',
  'CLOSING_BRACKET',
  'TYPE_PREFIX_SYMBOL',
  'OPENING_SINGLE_LINE_COMMENT',
  'SINGLE_LINE_COMMENT',
  'OPENING_MULTI_LINE_COMMENT',
  'CLOSING_MULTI_LINE_COMMENT',
  'MULTI_LINE_COMMENT',
  'OPENING_DOCUMENTATION_COMMENT',
  'CLOSING_DOCUMENTATION_COMMENT',
  'DOCUMENTATION_COMMENT',
  'PROPERTY_SEPARATOR',
  'INSTRUCTION_END',
  'LET_STATEMENT',
  'CONST_STATEMENT',
  'FROZEN_STATEMENT',
  'PLAIN_STATEMENT',
  'IF_STATEMENT',
  'ELSE_STATEMENT',
  'FOR_STATEMENT',
  'WHILE_STATEMENT',
  'DO_STATEMENT',
  'UNTIL_STATEMENT',
  'UNLESS_STATEMENT',
  'ARROW_FUNCTION',
  'LIST_SEPARATOR',
  'DIRECTIVE',
  'AROBASE_SYMBOL',
  'NULLABLE_SYMBOL',
  'FUNCTION_STATEMENT',
  'LAMBDA_STATEMENT',
  'RETURN_STATEMENT',
  'LET_STATEMENT',
  'CONST_STATEMENT',
  'FROZEN_STATEMENT',
  'PLAIN_STATEMENT',
  'IF_STATEMENT',
  'ELSE_STATEMENT',
  'FOR_STATEMENT',
  'WHILE_STATEMENT',
  'DO_STATEMENT',
  'UNTIL_STATEMENT',
  'UNLESS_STATEMENT',
  'STRUCT_STATEMENT',
  'CLASS_STATEMENT',
  'DICTIONARY_STATEMENT',
  'INTERFACE_STATEMENT',
  'TRAIT_STATEMENT',
  'PUBLIC_DESCRIPTOR',
  'PROTECTED_DESCRIPTOR',
  'PRIVATE_DESCRIPTOR',
  'READONLY_DESCRIPTOR',
  'STATIC_DESCRIPTOR',
  'EXTERN_DESCRIPTOR',
  'ABSTRACT_DESCRIPTOR',
  'VIRTUAL_DESCRIPTOR',
  'FRIEND_DESCRIPTOR',
  'INHERITANCE_DESCRIPTOR',
  'IMPLEMENTS_DESCRIPTOR',
  'ALIAS_KEYWORD',
  'INFINITE_DESCRIPTOR'
];

// Generate the tokens
const T_ = {};

for (let token of Tokens_List)
  T_[token] = 'T_' + token;

// Entities that replaces literal names
const nameAltEntities = {
  'func'      : T_.FUNCTION_STATEMENT,
  'lambda'    : T_.LAMBDA_STATEMENT,
  'return'    : T_.RETURN_STATEMENT,
  'let'       : T_.LET_STATEMENT,
  'val'       : T_.CONST_STATEMENT,
  'frozen'    : T_.FROZEN_STATEMENT,
  'plain'     : T_.PLAIN_STATEMENT,
  'if'        : T_.IF_STATEMENT,
  'else'      : T_.ELSE_STATEMENT,
  'for'       : T_.FOR_STATEMENT,
  'while'     : T_.WHILE_STATEMENT,
  'do'        : T_.DO_STATEMENT,
  'until'     : T_.UNTIL_STATEMENT,
  'unless'    : T_.UNLESS_STATEMENT,
  'struct'    : T_.STRUCT_STATEMENT,
  'class'     : T_.CLASS_STATEMENT,
  'dict'      : T_.DICTIONARY_STATEMENT,
  'interface' : T_.INTERFACE_STATEMENT,
  'trait'     : T_.TRAIT_STATEMENT,
  'public'    : T_.PUBLIC_DESCRIPTOR,
  'protected' : T_.PROTECTED_DESCRIPTOR,
  'private'   : T_.PRIVATE_DESCRIPTOR,
  'readonly'  : T_.READONLY_DESCRIPTOR,
  'static'    : T_.STATIC_DESCRIPTOR,
  'extern'    : T_.EXTERN_DESCRIPTOR,
  'abstract'  : T_.ABSTRACT_DESCRIPTOR,
  'virtual'   : T_.VIRTUAL_DESCRIPTOR,
  'friend'    : T_.FRIEND_DESCRIPTOR,
  'extends'   : T_.INHERITANCE_DESCRIPTOR,
  'implements': T_.IMPLEMENTS_DESCRIPTOR,
  'as'        : T_.ALIAS_KEYWORD,
};

// Lower-case alphabet
const lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz';
// Upper-case alphabet
const upperAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Name symbol
const nameSymbol = lowerAlphabet + upperAlphabet + '_$';
// Name symbol with digits
const nameSymbolWithDigits = nameSymbol + '0123456789';

// Digits
const digits = '0123456789';
// Digits with point
const digitsWithPoint = digits + '.';

// List of non-breaking symbols
const NON_BREAKING_SYMBOLS = nameSymbolWithDigits;

// Group symbols and tokens
const groups = {
  '(': { name: 'parenthesis', openingSymbol: '(', closingSymbol: ')', openingToken: T_.OPENING_PARENTHESIS, closingToken: T_.CLOSING_PARENTHESIS },
  '[': { name: 'brace', openingSymbol: '[', closingSymbol: ']', openingToken: T_.OPENING_BRACKET, closingToken: T_.CLOSING_BRACKET },
  '{': { name: 'bracket', openingSymbol: '{', closingSymbol: '}', openingToken: T_.OPENING_BRACE, closingToken: T_.CLOSING_BRACE }
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
        if (buff_opening_token ? buff_opening_token[0] === T_.QUOTE : false)
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
        closeBuffer(char === '`' ? T_.BACK_QUOTE : T_.QUOTE, char);
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
    if (buff.number && !isIn(digitsWithPoint))
      // Close it
      closeBuffer();

    // If this symbol is a breaking one and a name buffer is opened...
    if (buff.name && ! isIn(NON_BREAKING_SYMBOLS))
      // Close it
      closeBuffer();

    // [MATCH] quote
    if (isIn('\'"`'))
      // Open a new buffer
      openBuffer('string', T_.LITERAL_STRING, null, char === '`' ? T_.BACK_QUOTE : T_.QUOTE, char);

    // [MATCH] name character (with digits only if buffer opened)
    else if (isIn(nameSymbol) || (isIn(nameSymbolWithDigits) && buff.name)) {
      // If a name buffer was already opened...
      if (buff.name)
        // Append the character to it
        buff.name += char;
      else {
        // Open a new buffer
        openBuffer('name', T_.LITERAL_NAME);

        // Append this character to it
        buff.name = char;
      }
    }

    // [MATCH] infinite descriptor
    else if (suite('.', '..'))
      push(T_.INFINITE_DESCRIPTOR);

    // [MATCH] property separator
    else if (char === '.')
      push(T_.PROPERTY_SEPARATOR);

    // [MATCH] instruction end
    else if (char === ';')
      push(T_.INSTRUCTION_END);

    // [MATCH] list separator
    else if (char === ',')
      push(T_.LIST_SEPARATOR)

    // [MATCH] arobase
    else if (char === '@')
      push(T_.AROBASE_SYMBOL);

    // [MATCH] nullable symbol
    else if (char === '?')
      push(T_.NULLABLE_SYMBOL);

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
        openBuffer('number', T_.LITERAL_NUMBER);

        // Append this character to it
        buff.number = char;
      }

      continue ;
    }

    // [MATCH] space
    else if (char === ' ')
      // Push it
      push(T_.SPACE);

    // [MATCH] newline
    else if (char === '\n')
      // Push it
      push(T_.NEWLINE);

    // [MATCH] single-line comment
    else if (suite('/', '/')) {
      // Push the symbol
      push(T_.OPENING_SINGLE_LINE_COMMENT);

      // Make a temporary comment buffer
      let comment = '';

      // Until the end of the line (or of the source code)...
      while (source[col + 1] !== '\n' && col < source.length - 1)
        // Add it to the buffer
        comment += goNextChars(1);

      // Push the comment
      push(T_.SINGLE_LINE_COMMENT, comment);
    }

    // [MATCH] multi-line comment and documentation comments
    else if (suite('/', '*')) {
      // Check if it's a documentation comment
      const doc = isNext('*');
    
      // Push the opening symbol
      push(doc ? T_.OPENING_DOCUMENTATION_COMMENT : T_.OPENING_MULTI_LINE_COMMENT);

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
      push(doc ? T_.DOCUMENTATION_COMMENT : T_.MULTI_LINE_COMMENT, comment);

      // Push the closing symbol
      push(doc ? T_.CLOSING_DOCUMENTATION_COMMENT : T_.CLOSING_MULTI_LINE_COMMENT);
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

    // [MATCH] directive
    else if (char === '#') {      
      // Match the next alphanumeric characters

      // Make a name buffer
      let directive = '';

      // While the current character is a letter...
      while (nameSymbol.includes(source[col + 1]))
        // Go to the next character and add it to the buffer
        directive += goNextChars(1);

      // Push the symbol
      push(T_.DIRECTIVE, directive);
    }

    // [MATCH] class statical operator
    else if (suite(':', ':'))
      // Push the operator
      push(T_.STATICAL_REF_OPERATOR);

    // [MATCH] type prefix symbol
    else if (char === ':')
      // Push the symbol
      push(T_.TYPE_PREFIX_SYMBOL);

    // [MATCH] assignments
    else if (char === '=')
      // Push the symbol
      push(T_.ASSIGNMENT_OPERATOR);

    // [MATCH] arrow symbol
    else if (suite('-', '>'))
      // Push the symbol
      push(T_.ARROW_FUNCTION);

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
      push(T_.NEG_OPERATOR);

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

    // Handle unexcepted symbols
    else
      fail(`Unexpected symbol: ${char} (ASCII code = ${char.charCodeAt(0)})`);
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
  
  // Treat some specials entities
  for (let i = 0; i < token_arr.length; i ++)
    // If it's a literal name and if it relies on another entity...
    if (token_arr[i][0] === T_.LITERAL_NAME && nameAltEntities.hasOwnProperty(token_arr[i][1]))
      // Replace the current token
      token_arr[i] = [ nameAltEntities[token_arr[i][1]] ];

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
  console.log(JSON.stringify(tokenize(content), null, 2));
}