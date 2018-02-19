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

/**
 * Make paths relative to the `ROOT` folder
 * Paths that are already absolute won't be affected
 * @example
 * here('relative/path') === path.join(ROOT_PATH, 'relative/path')
 * here('/my/absolute/path') === '/my/absolute/path'
 * @param {...string} str The path to adapt
 * @returns {string} The adapted path
 */
function here(...str) {
  // Join the strings
  str = path.join(...str);

  // If the path is absolute...
  if (path.isAbsolute(str))
    // Return it without any modification
    return str;
  else
    // Return the given path relatively to the ROOT
    return path.join(ROOT_PATH, str);
}

/**
 * Check if a folder exists
 * @param {...string} p The path to check
 * @returns {boolean} `true` if the path is a folder, `false` else
 */
function folderExists(p) {
  // Format the path to avoid doing it twice
  p = here(p);

  // Perform the check and return the result
  return fs.existsSync(p) && fs.lstatSync(p).isDirectory();
}

/**
 * Make a folder, recursively
 * @param {string} p The path of the folder to make
 * @returns {void}
 */
function mkdir(p) {
  // Make the folder, recursively
  fs.mkdirpSync(here(p));
}

/**
 * Check if a file exists
 * @param {string} p The path to check
 * @returns {boolean} `true` if the path is a file, `false` else
 */
function fileExists(p) {
  // Format the path to avoid doing it twice
  p = here(p);

  // Perform the check and return the result
  return fs.existsSync(p) && fs.lstatSync(p).isFile();
}

/**
 * Read a file
 * @param {string} p The file's path
 * @returns {string} The file's content
 */
function readFile(p) {
  // Read the file and return its content
  return fs.readFileSync(here(p), 'utf8');
}

// Load some built-in modules
const path = require('path'),
      fs = require('fs-extra');

// Load some Yarn modules
const chalk = require('chalk'),
      minimist = require('minimist');

// Set up a list of modules with their respective folders
const modules = {
  // Module's slug (used in the CLI) associated to its purpose
  // This slug is also the module's filename (without its extension)
  book: 'Build the books'
};

// Get the tools' path
const TOOLS_PATH = __dirname;

// Get the repository's root path
const ROOT_PATH = path.join(TOOLS_PATH, '..');

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
