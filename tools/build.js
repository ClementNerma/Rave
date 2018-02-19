// Enable strict mode
"use strict";

/**
 * Exit with an error code
 * @param {string} message An error message
 * @param {number} [errcode] The error code (default: 1)
 * @param {Error} [error] An error object (displays only in verbose mode)
 * @returns {void}
 */
function error (message, errcode = 1, error = null) {
  // If an error was provided...
  // and if verbose mode is enabled...
  if (error && argv.verbose)
    // Display the error
    console.error(chalk.red(error.toString()));

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

/**
 * Write a file
 * @param {string} p The file's path
 * @param {string} str The content to write in the file
 * @returns {void}
 */
function writeFile(p, str) {
  // Read the file and return its content
  return fs.writeFileSync(here(p), str, 'utf8');
}

/**
 * Adapt a `minimist` arguments object
 * @param {Object} argv The `minimist` arguments object
 * @param {Array.<Object>} args List of arguments to format the object
 * @returns {Object} The adapted object
 */
function adaptArgv(argv, args) {
  // Prepare an arguments object
  let fargv = {}; // Final argv

  // For each argument the module can have...
  for (let arg of args) {
    // The argument's value
    let value;

    // If it has both a long and a short version...
    if (arg.long && arg.short)
      // Get its value considering this
      value = typeof argv[arg.long] !== 'undefined' ? argv[arg.long] : argv[arg.short];
    // Else, if it has only a long version...
    else if (arg.long)
      // Get its value from it
      value = argv[arg.long];
    // Else, if it has only a short version...
    else if (argv.short)
      // Get its value from it
      value = argv[arg.short];

    // If no value was retrieved but the argument can be provided inline...
    if (typeof value === 'undefined' && arg.inline)
      // Get the first inline value
      value = argv._.shift();

    // If there is still no value retrieved but this argument has a default value...
    if (typeof value === 'undefined' && typeof arg.default !== 'undefined')
      // Use its default value
      value = arg.default;

    // If there is still no value retrieved...
    if (typeof value === 'undefined')
      // Ignore this argument
      continue;

    // If the argument is a boolean and the value is not...
    if (arg.type === 'boolean' && typeof value !== 'boolean') {
      // If it's a stringified boolean...
      if (value === 'true' || value === 'false')
        // Convert it
        value = (value === 'true' ? true : false);
      // Else...
      else
        // Convert the current value to a boolean
        value = Boolean(value);
    }

    // If the argument is a number and the value is not...
    if (arg.type === 'number' && typeof value !== 'number') {
      // Try to parse it as a number...
      let num = parseFloat(value);

      // If it worked...
      if (!Number.isNaN(num))
        // Save it
        value = num;
      // Else...
      else
        // Convert the current value to a number
        value = Number(value);
    }

    // If it has a long version...
    if (arg.long)
      // Save its value
      fargv[arg.long] = value;

    // If it has a short version...
    if (arg.short)
      // Save its value
      fargv[arg.short] = value;
  }

  // Add unused inline arguments
  fargv._ = argv._.slice(0) /* Clone the array */;

  // Return final arguments
  return fargv;
}

/**
 * Load a module from the disk
 * @param {string} name Module's name
 * @param {Object} argv `minimist` arguments object
 * @returns {Object} Module's API
 */
function loadModule(name, argv) {
  // If the specified module is unknown...
  if (!modules.hasOwnProperty(name))
    // ERROR
    error(`Unknown build module "${name}"`, 3);

  // Get the path of the module's script
  const mod_path = `tools/modules/${name}.js`;

  // If the target's file is not found...
  if (!fileExists(mod_path))
    // ERROR
    error(`Build script was not found for target "${name}" (expecting to find file "${mod_path}")`, 4);
  
  // Try to read the module's script
  let script;

  try {
    script = readFile(mod_path);
  } catch (e) {
    error(`Failed to read module's file "${mod_path}"`, 5, e);
  }

  // Prepare a module object
  let _module = { exports: null };

  // Evaluate the module's script
  eval(script);

  // Return the module's exported data
  return _module.exports;
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
let m_argv = minimist(process.argv.slice(2) /* Ignore Node.js call arguments */);

// Set up the arguments for this main module and parse the provided arguments using them
const argv = adaptArgv(m_argv, [
  { long: 'module', inline: true, value: 'name', help: 'The build module to use' }
]);

// For each adapted argument...
for (let arg of Reflect.ownKeys(argv))
  // Excepted the inline arguments...
  // NOTE: Used inline arguments are automatically removed by the adaptArgv() function
  if (arg !== '_')
    // Remove it from the original arguments
    delete m_argv[arg];

// If no module was specified...
if (typeof argv.module !== 'string')
  // ERROR
  error('No build module specified', 2);

// If the specified module is unknown...
if (! modules.hasOwnProperty(argv.module))
  // ERROR
  error(`Unknown build module "${argv.module}"`, 3);

// Load the specified module and run the build function
loadModule(argv.module, m_argv).build();
