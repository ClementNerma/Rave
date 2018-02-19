// Enable strict mode
"use strict";

/**
 * Exit with an error code
 * @param {string} message An error message
 * @param {number} [errcode] The error code (default: 1)
 * @returns {void}
 */
function error (message, errcode = 1) {
  // Display the error in the console
  console.error(chalk.red(`ERROR: `) + chalk.yellow(message));
  // Exit the process safely with this error code
  process.exit(errcode);
}

// Load some Yarn modules
const chalk = require('chalk');

// Exit with an error
error('Build tools are not ready yet');
