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
const chalk = require('chalk'),
      minimist = require('minimist');

// Set up a list of modules with their respective folders
const modules = {
  // Module's slug (used in the CLI) associated to its purpose
  // This slug is also the module's filename (without its extension)
  book: 'Build the books'
};

// Parse the command-line arguments
const argv = minimist(process.argv.slice(2) /* Ignore Node.js call arguments */);

// Get the module's name to run
const modname = argv.module || argv._[0];

// If no module was specified...
if (typeof modname !== 'string')
  // ERROR
  error('No build module specified', 2);

// If the specified module is unknown...
if (! modules.hasOwnProperty(modname))
  // ERROR
  error(`Unknown build module "${modname}"`, 3);

// Exit with an error
error('Build tools are not ready yet');
