// Enable strict mode
"use strict";

/**
 * Write a message in the log file
 * @param {string} message The message to write
 * @param {boolean} [verbose] Is is a verbose message? (default: false)
 * @returns {string} The input message
 */
function log (message, verbose) {
  // If log file is enabled,
  // and if verbose logging is enabled if it's a verbose message...
  if (argv.logfile && (! verbose || (verbose && argv.logverbose)))
    // Log the message
    fs.appendFileSync(
      argv.logfile,
      // The message, without ANSI characters (like colors) and a timestamp + new line symbol
      `[${Date.now()}] ` + message.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '') + '\r\n',
      'utf8'
    );
  
  // Return the original message
  return message;
}

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
    console.error(log(red(error.toString())));

  // Display the error in the console
  console.error(log(red(`ERROR: `) + yellow(message)));
  // Exit the process safely with this error code
  process.exit(errcode);
}

/**
 * Exit the build successfully
 * @param {string} message The success message to display
 * @param {string} [output_folder] The module's build folder
 * @param {boolean} [dontExit] Do not exit the process (default: false)
 * @returns {void}
 */
function success(message, output_folder, dontExit = false) {
  // Display the success message
  say(chalk.green(message), ! CHILD /* Force displaying, even in quiet mode, for the main process */);

  // If files must be served,
  // and if this is not a child process created by the watcher
  // and if no "NO_EXIT" order has been gave...
  if (argv.serve && ! CHILD && ! dontExit) {
    // If an output folder was provided...
    if (output_folder) {
      // Display a message
      say(cyan('Statically delivering output folder on port ' + yellow(argv.serve) + '...'));

      // Serve it
      staticServe(output_folder, argv.serve);
    } else
      // Else, display an error message
      console.error(log(red('Cannot serve files: the module did not provide an output folder')));
  }
  else if (! dontExit)
    // If not, and if exiting is not forbidden, exit safely and without an error code
    process.exit(0);
}

/**
 * Display a message in the console
 * @param {string} message The message to display
 * @param {boolean} [evenIfQuiet] Display the message even in quiet mode (default: false)
 * @returns {void}
 */
function say(message, evenIfQuiet = false) {
  // If the quiet mode is not enabled,
  // or if the message must be displayed even in quiet mode...
  if (! argv.quiet || evenIfQuiet)
    // Display the message in the console
    console.log(message);

  // Log it anyway
  log(message);
}

/**
 * Display a message in verbose mode
 * @param {string} message The message to display
 * @param {string} p A path related to the message
 * @returns {void}
 */
function verb(message, p) {
  // Prepare the message (do not put the timestamp here because the log function add ones anyway)
  message = (p ? `${message} | \`${path.relative(ROOT_PATH, p)}\`` : message);

  // If the verbose mode is enabled...
  if (argv.verbose && ! argv.quiet) // The quiet mode is prior to the verbose mode
    // Display the message in the console
    console.log(`[${Date.now()}] ` + message);
  
  // Log it anyway
  log(message, true);
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
 * @param {string} verbmsg A message for the verbose mode
 * @returns {boolean} `true` if the path is a folder, `false` else
 */
function folderExists(p, verbmsg) {
  // Verbose
  verb(`Checking folder existence` + (verbmsg ? ` (${verbmsg})` : ''), p);

  // Format the path to avoid doing it twice
  p = here(p);

  // Perform the check and return the result
  return fs.existsSync(p) && fs.lstatSync(p).isDirectory();
}

/**
 * Make a folder, recursively
 * @param {string} p The path of the folder to make
 * @param {string} verbmsg A message for the verbose mode
 * @returns {void}
 */
function mkdir(p, verbmsg) {
  // Verbose
  verb(`Making folder recursively` + (verbmsg ? ` (${verbmsg})` : ''), p);

  // Make the folder, recursively
  fs.mkdirpSync(here(p));
}

/**
 * Get the list of items in a folder's root
 * @param {string} p The path of the folder to read from
 * @param {string} verbmsg A message for the verbose mode
 * @returns {Array<string>}
 */
function readFolder(p, verbmsg) {
  // Verbose
  verb(`Reading folder's root` + (verbmsg ? ` (${verbmsg})` : ''), p);

  // Read the folder and return the result
  return fs.readdirSync(here(p));
}

/**
 * Remove a folder, recursively
 * @param {string} p The path of the folder to remove
 * @param {string} verbmsg A message for the verbose mode
 * @returns {void}
 */
function rmdir(p, verbmsg) {
  // Verbose
  verb(`Removing folder recursively` + (verbmsg ? ` (${verbmsg})` : ''), p);

  // Remove the folder, recursively
  fs.removeSync(here(p));
}

/**
 * Check if a file exists
 * @param {string} p The path to check
 * @param {string} verbmsg A message for the verbose mode
 * @returns {boolean} `true` if the path is a file, `false` else
 */
function fileExists(p, verbmsg) {
  // Verbose
  verb(`Checking file existence` + (verbmsg ? ` (${verbmsg})` : ''), p);

  // Format the path to avoid doing it twice
  p = here(p);

  // Perform the check and return the result
  return fs.existsSync(p) && fs.lstatSync(p).isFile();
}

/**
 * Read a file
 * @param {string} p The file's path
 * @param {string} verbmsg A message for the verbose mode
 * @returns {string} The file's content
 */
function readFile(p, verbmsg) {
  // Verbose
  verb(`Reading file` + (verbmsg ? ` (${verbmsg})` : ''), p);

  // Read the file and return its content
  return fs.readFileSync(here(p), 'utf8');
}

/**
 * Write a file
 * @param {string} p The file's path
 * @param {string} str The content to write in the file
 * @param {string} verbmsg A message for the verbose mode
 * @returns {void}
 */
function writeFile(p, str, verbmsg) {
  // Verbose
  verb(`Writing file with ${(str.length / 1024).toFixed(2)} Kb of data` + (verbmsg ? ` (${verbmsg})` : ''), p);

  // Make the path absolute
  p = here(p);
  // Determine its parent folder
  const parent = path.dirname(p);

  // If its parent folder does not exist...
  if (! folderExists(parent))
    // Make it
    mkdir(parent);

  // Read the file and return its content
  return fs.writeFileSync(p, str, 'utf8');
}

/**
 * Copy an item (file or folder) to another location
 * @param {string} src The source item
 * @param {string} dest The destination item
 * @param {boolean} [copytoroot] Don't make a sub-folder to copy source folder's content
 * @param {string} verbmsg A message for the verbose mode
 * @returns {void}
 */
function copy (src, dest, copytoroot = false, verbmsg) {
  // Verbose
  verb(`Copying from "${src}" (${copytoroot ? 'copying root' : 'making a sub-folder if needed'})` + (verbmsg ? ` (${verbmsg})` : ''), dest);

  // Adapt the source path
  src = here(src);
  // Adapt the destination path
  dest = here(dest);

  // If the source is a folder...
  if (! copytoroot && folderExists(src)) {    
    // Add its basename to the destination
    // NOTE: See https://github.com/jprichardson/node-fs-extra/issues/537
    dest += path.sep + path.basename(src);
    // Make the destination sub-folder
    mkdir(dest);
  }

  // Copy the source item to its destination
  fs.copySync(src, dest);
}

/**
 * Open an item in the browser
 * @param {string} p The path to open
 * @param {Function} [callback] A function to call when the browser is opened
 * @returns {void}
 */
function openBrowser (p, callback) {
  // Verbose
  verb('Opening item in the browser', p);

  // Open the item in the browser
  opn(here(p)).then(callback);
}

/**
 * Make a static web server
 * @param {string} folder The web server's static folder
 * @param {number} port The port number to deliver the folder on
 * @param {string} verbmsg A message for the verbose mode
 * @returns {void}
 */
function staticServe (folder, port = 80, verbmsg) {
    // Create an Express application
  verb('Creating an Express application');
  const app = express();

  // Make the path absolute
  folder = here(folder);

  // Serve static files
  verb(`Preparing to serve statically a folder` + (verbmsg ? ` (${verbmsg})` : ''), folder);

  // If the given path is a folder...
  if (folderExists(folder))
    // Deliver it statically
    app.use(express.static(folder));
  else
    // Else, it's a file
    // Deliver it as a single file
    // NOTE: The file is read each time the server's root path is requested
    app.get('/', (req, res) => res.send(readFile(folder)));

  // Listen on the provided port
  server = app.listen(port, () => void say(`Server listening on port ${port}...`));
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

  // By security, assume the '_' field is present
  argv._ = argv._ || [];

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

    // If the argument is not the same type than the provided value...
    // and if the value is `true`...
    // and if a specific default value exists for this argument...
    if (arg.type !== typeof value && value === true && arg.defaultIfTrue)
      // Use this value instead
      value = arg.defaultIfTrue;

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

  // For each given argument...
  for (let name of Reflect.ownKeys(argv))
    // If it's a "must-be-kept" argument...
    if (name.startsWith('SYS_'))
      // Keep it
      fargv[name] = argv[name];

  // Add unused inline arguments
  fargv._ = argv._.slice(0) /* Clone the array */;

  // Return final arguments
  return fargv;
}

/**
 * Get a help text from an array of arguments
 * @param {Array<Object>} args Array of arguments
 * @returns {Array<Array<string>>} Generated help text (two lines per argument)
 */
function getArgumentsHelp (args) {
  // Treat each argument individually and return the global result
  return args.map(arg =>
    [
      // Argument's name
      yellow((arg.long && arg.short) ? `[--${arg.long}|-${arg.short}]` : (arg.long ? '--' + arg.long : '-' + arg.short)) +
      // Argument's value
      yellow('=') + green('<' + (arg.value || (arg.type === 'boolean' ? 'true|false' : 'value')) + '>') +
      // Argument's default value
      (arg.default ? blue(` [default: ${String(arg.default)}]`) : '') +
      // Argument's alternative syntax
      (typeof arg.inline === 'number' ? blue(' (works as inline argument too)') : ''),
      // Argument's help
      cyan(arg.help || chalk.italic('No help provided for this argument'))
    ]
  );
}

/**
 * Generate a stylized help text about a module
 * @param {Object} mod The module to get help about
 * @returns {string} The help text
 */
function getHelp (mod) {
  // Generate a help text and return it
  return cyan(
    // Introduction
    'Help for module ' + green(`"${mod.name}"`) + cyan(':') + green('\n> ') + mod.help[0] +
    // Arguments section
    yellow('\n\nArguments\n=========\n\n') +
    // Get help for each argument
    '  ' + getArgumentsHelp(mod.arguments).map(arg => arg.join('\n    ')).join('\n\n  ') +
    // Optional additional help
    (mod.help[1] ? '\n\n\n' + cyan(mod.help[1]) : '')
  );
}

/**
 * Get the list of available build modules
 * @returns {Array<string>} A list of available build modules
 */
function listModules() {
  // Read the folder
  return readFolder('tools/modules')
    // Keep only JavaScript files
    .filter(filename => filename.endsWith('.js'))
    // Remove file extension
    .map(filename => path.basename(filename, path.extname(filename)));
}

/**
 * Load a module from the disk
 * @param {string} name Module's name
 * @param {Object} argv `minimist` arguments object
 * @returns {Object} Module's API
 */
function loadModule(name, argv) {
  // Get the path of the module's script
  const mod_path = `tools/modules/${name}.js`;

  // If the target's file is not found...
  if (!fileExists(mod_path))
    // ERROR
    error(`Build script was not found for target "${name}" (expecting to find file "${mod_path}")`, 4);

  // Try to read the module's script
  let script;
  verb(`Trying to read module's file "${mod_path}"...`);

  try {
    script = readFile(mod_path);
  } catch (e) {
    error(`Failed to read module's file "${mod_path}"`, 5, e);
  }

  // Declare a variable to store the module's API
  let self;

  // Evaluate the module's script
  verb(`Attempting to evaluate the module's script...`);
  eval(script);

  // Attach the module's name to its API
  self.name = name;

  // Adapt the provided arguments to the module
  verb(`Parsing module's arguments...`);
  self.argv = adaptArgv(argv, self.arguments);

  // Return the module's exported data
  return self;
}

// Load some built-in modules
const path = require('path'),
      child_process = require('child_process'),
      os = require('os');

// Load some Yarn modules
const chalk = require('chalk'),
      minimist = require('minimist'),
      fs = require('fs-extra'),
      express = require('express'),
      opn = require('opn');

// Extract colors and styling functions from the "chalk" module
const {
  // Style
  bold,
  underline,

  // Colors
  black,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  gray
} = chalk;

// Get the tools' path
const TOOLS_PATH = __dirname;

// Get the repository's root path
const ROOT_PATH = path.join(TOOLS_PATH, '..');

// Remember if this process is a child created by a main build process
const CHILD = process.argv.slice(2).includes('--child');

// Parse the command-line arguments
let m_argv = minimist(process.argv.slice(2) /* Ignore Node.js call arguments */);

// Set up a module object
const main_mod = {
  name: 'main',
  arguments: [
    { long: 'module', inline: true, value: 'name', help: 'The build module to use' },
    { long: 'all', type: 'boolean', help: 'Build everything. If specified with a module\'s name, will build everything for this module only.' },
    { long: 'help', type: 'boolean', help: 'Display help about a module' },
    { long: 'list', type: 'boolean', help: 'List available targets for the provided module' },
    { long: 'verbose', type: 'boolean', help: 'Display verbose messages' },
    { long: 'quiet', short: 'q', type: 'boolean', help: 'Reduce console outputs' },
    { long: 'release', short: 'r', type: 'boolean', default: true, help: 'Optimize and improve the compatibility of the build' },
    { long: 'fast', short: 'f', type: 'boolean', help: 'Produce an unoptimized code - speed up the build' },
    { long: 'clean', short: 'c', type: 'boolean', help: 'Clean module\'s data' },
    { long: 'serve', type: 'number', defaultIfTrue: process.env.PORT || 80, help: 'Run a web server to deliver statically the output folder' },
    { long: 'watch', short: 'w', value: 'folders', defaultIfTrue: '.', help: 'Build each time a file is changed in the folders (folders are separated by a comma)' },
    { long: 'live-reload', short: 'r', type: 'boolean', help: 'Serve the output each time the build is triggerd (requires `--watch`)' },
    { long: 'logfile', short: 'l', value: 'file', help: 'Write all log messages in a file' },
    { long: 'logverbose', type: 'boolean', default: false, help: 'If `--logfile` is enabled, log all verbose messages (can be heavy)' },
    { long: 'test', type: 'boolean', default: false, help: 'Run the test (build everything and clean)' },
    { long: 'no-colors', type: 'boolean', default: false, help: 'Disable colors in the console' } // Automatically handled by the "chalk" module
  ]
};

// Set up the arguments for this main module and parse the provided arguments using them
const argv = main_mod.argv = adaptArgv(m_argv, main_mod.arguments);

// Set up constants for the modules
const RELEASE = argv.release && ! argv.fast;
const FAST = argv.fast;

// The running Express server
let server = null;

// For each adapted argument...
for (let arg of Reflect.ownKeys(argv))
  // Excepted the inline arguments...
  // NOTE: Used inline arguments are automatically removed by the adaptArgv() function
  if (arg !== '_')
    // Remove it from the original arguments
    delete m_argv[arg];

// If a "build everything" order has been gave...
if (argv.all)
  // Add a "NO_EXIT" order
  m_argv.SYS_NO_EXIT = true;

// If a log file was provided...
if (argv.logfile)
  // Resolve it to save time (avoiding doing it each time we path is used)
  argv.logfile = path.resolve(argv.logfile);

// If a test order has been gave,
// and if this is not a child process...
if (argv.test && ! CHILD) {
  // Set up the processes options
  const options = {
    cwd: process.cwd(),
    stdio: [0, 1, 2, 'ipc']
  };

  // Tell the test will start
  say('Starting the test...');

  // Start a "build everything" process
  child_process.fork(process.argv[1], [ '--all', '--child' ].concat(process.argv.slice(2)), options).on('exit', code => {
    // If an error occured...
    if (code)
      // ERROR
      error(`Test failed while building everything. Process exited with code ${code}`, 29);

    // Start a "clean" process
    child_process.fork(process.argv[1], [ '--clean', '--child' ].concat(process.argv.slice(2)), options).on('exit', code => {
      // If an error occured...
      if (code)
        // ERROR
        error(`Test failed while cleaning. Process exited with code ${code}`, 33);
      else
        // Success!
        success(yellow('Test result: finished successfully.'));
    });
  });
}

// If a watch order was emitted,
// and if this is not a child process created by the watcher...
else if (argv.watch && ! CHILD) {
  // Get the list of folders by splitting the ',' folder (ignore espaced ones)
  const folders = argv.watch.split(/(?<!\\),/);

  // Moment where the watch listener was triggered
  // This is useful to avoid duplicate watch events (e.g. on Windows)
  let last = Date.now();

  // Is a build process already running?
  let building = false;

  // Has a file changed during the build?
  let waiting = null;

  /**
   * Start a new build process
   * @returns {void}
   */
  function buildNow () {
    // Remember there is a build process running
    building = true;

    // Run a new build process
    let p = child_process.fork(
      // This module's path
      process.argv[1],
      // The arguments, plus a 'ignore orders' order.
      // A new process is started with exactly the same arguments as this one to keep all the
      //  provided options, so the '--watch' option needs to be ignored.
      process.argv.slice(2).concat('--child'),
      {
        cwd: process.cwd(),
        stdio: [ 0, 1, 2, 'ipc' ]
      }
    );

    // When the process ends...
    p.on('exit', () => {
      // No process is running anymore
      building = false;

      // If the "live reload" option has been provided...
      if (argv['live-reload']) {
        // If a server was already running...
        if (server) {
          // Verbose
          verb('Closing server to prepare live reload...');

          // Stop the server
          server.close();
        }
        
        // Verbose
        verb('Going to serve the build folder locally...');

        // Serve the build folder locally
        staticServe('build');
      }

      // If a file was waiting...
      if (waiting) {
        // Tell it
        say(yellow('>') + ' Running delayed build for file ' + cyan(waiting) + '.');
        // It's not waiting anymore
        waiting = null;
        // Start a new build process
        buildNow();
      }
    });
  }

  // For each folder...
  for (let folder of folders) {
    // Replace escaped commas by simple commas in the folder's path
    folder = folder.replace(/\\,/g, ',');

    // Watch this folder
    fs.watch(here(folder), { recursive: true }, (eventType, filename) => {
      // If the file is under the ".git", "build" or "node_modules" directory...
      if (path.resolve(filename).startsWith(here('.git')) ||
          path.resolve(filename).startsWith(here('build')) ||
          path.resolve(filename).startsWith(here('node_modules')))
        // Ignore it
        return ;

      // If less than 200ms passed since the last change...
      if (Date.now() - last < 200)
        // Ignore this call
        return ;

      // Memorize the current timestamp
      last = Date.now();

      // If a build is running...
      if (building) {
        // Tell it
        say(yellow('>') + ` File ${cyan(filename)} has changed | ${yellow('DELAYED')} because a build is already running`);
        // Remember a new build must be done
        waiting = filename;
        // Exit the listener
        return ;
      }
     
      // Else, do the build!
      say(yellow('>') + ` File ${cyan(filename)} has changed.`);

      // Start a new build process
      buildNow();
    });

    // Verbose
    verb(`Now watching folder`, folder);
  }

  // Log
  say('Triggering a first build...');

  // Build a first time
  buildNow();

  // Ready!
  say('Now watching.');
}

// Else, if no module was specified...
else if (typeof argv.module !== 'string') {
  // If help is asked...
  if (argv.help) {
    // Attach a help text to the module object
    main_mod.help = [
      'Build the sources through modules',
      yellow('List of available modules:\n========================\n\n') +
      fs.readdirSync(here('tools/modules'))
        .map(name => {
          // Remove the extension from the filename
          name = path.basename(name, path.extname(name));
          // Load the module ; get its help ; generate an item for the list and return it
          return green(` * ${name} - ${loadModule(name, m_argv).help[0]}`);
        })
        .join('\n')
    ]

    // Display the help
    say(getHelp(main_mod));
  }

  // If all modules are asked to run...
  else if (argv.all) {
    // For each module...
    for (let name of listModules()) {
      say(yellow('* Building with module ' + `"${name}"` + '...'));
      // Load the module, then run its clean function
      loadModule(name, m_argv).buildAll();
      
      // If not in quiet mode...
      if (! argv.quiet)
        // Put a blank line
        console.log('');
    }

    // Success
    success('All builds were done successfully.');
  }

  // If clean operation is asked...
  else if (argv.clean) {
    // For each module...
    for (let name of listModules()) {
      say(cyan('* Starting clean operation for module ' + green(`"${name}"`) + '...'));
      // Load the module, then run its clean function
      loadModule(name, m_argv).clean();
    }

    // Success
    success('Build data cleaned.');
  }

  // For everything else...
  else
    // Display a short help text
    say('Syntax:\n  yarn build <module> <...options>\n  npm run build -- <module> <...options>\n\nTo see more help, write "yarn build --help" / "npm run build -- --help"');
} else {
  // If the specified module is unknown...
  if (!fileExists('tools/modules/' + argv.module + '.js'))
    // ERROR
    error(`Unknown build module "${argv.module}"`, 3);

  // Retrieve the module's API
  verb(`Loading module "${argv.module}" (command-line: ${process.argv.slice(2).join(' ')})...`)
  let mod = loadModule(argv.module, m_argv);

  // If help is asked...
  if (argv.help)
    // Display help about the specified module
    say(getHelp(mod));

  // If the list of available targets is asked...
  else if (argv.list) {
    // If such a list exists...
    if (mod.help[1])
      // Display it
      say(mod.help[1]);
    else
      // ERROR
      error('There is no list of available targets for this module', 28);
  }


  // If clean is asked...
  else if (argv.clean)
    // Run the module's clean function
    mod.clean();

  // If no special argument was used to call this program...
  else
    // Run the module's build function
    mod[argv.all ? 'buildAll' : 'build']();
}
