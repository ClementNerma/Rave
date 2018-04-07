// Enable strict mode
"use strict";

// Set up a list of available editors
const editors = {
  atom: 'Atom',
  vscode: 'Visual Studio Code',
  sublime: 'Sublime Text'
};

// Export API
self = {
  /**
   * Arguments given by the build tools
   */
  argv: {},

  /**
   * The module's arguments
   * @type {Array<Object>}
   */
  arguments: [
    { long: 'target', short: 't', placeholder: 'editor', inline: true, help: 'The editor to build an extension for' },
    { long: 'output', short: 'o', placeholder: 'folder', help: 'Extension output path' },
    { long: 'install-help', help: 'Display a help text about how to install the extension' },
    { long: 'auto-install', short: 'i', help: 'Automatically install the built extension' }
  ],

  /**
   * The module's help
   */
  help: [
    'Build syntax highlighting extension for code editors',
    yellow('List of available editors:\n========================\n\n') +
    Reflect.ownKeys(editors)
      .map(name => green(` * ${name} - ${editors[name]}`))
      .join('\n')
  ],

  /**
   * Clean function
   * @returns {void}
   */
  clean: () => rmdir('build/highlights'),

  /**
   * Build function
   */
  build: () => {
    // Get the editor's name
    const name = self.argv.target;

    // If no editor was specified...
    if (! name || name === true)
      // ERROR
      error('No editor name provided', 18);

    // If the editor is unknown...
    if (! editors.hasOwnProperty(name))
      // ERROR
      error(`Unknown editor "${name}"`, 19);

    // Determine its path
    let target_path = `src/highlights/${name}.js`;

    // If the file does not exist...
    if (!fileExists(target_path))
      // ERROR
      error(`File not found for editor "${name}" (expecting file at "${target_path}")`, 20);

    // Try to read the book's file
    let source;

    try {
      source = readFile(target_path, `"${name}" editor's package file`);
    } catch (e) {
      // ERROR
      error(`Failed to read file for editor "${name}"`, 21, e);
    }

    // Try to parse it as JSON
    try {
      source = eval(source);
    } catch (e) {
      // ERROR
      error(`Failed to parse editor's scheme file as JSON`, 22, e);
    }

    // Determine its path
    let scheme_path = `src/highlights/_scheme.js`;

    // If the file does not exist...
    if (!fileExists(scheme_path))
      // ERROR
      error(`Scheme file not found (expecting file at "${scheme_path}")`, 23);

    // Try to read the book's file
    let scheme;

    try {
      scheme = readFile(scheme_path, 'scheme file');
    } catch (e) {
      // ERROR
      error(`Failed to read scheme file "${name}"`, 24, e);
    }

    // Try to evaluate it as an object
    verb('Evaluating it as a script...');

    try {
      scheme = eval(scheme);
    } catch (e) {
      // ERROR
      error(`Failed to evaluate scheme file`, 25, e);
    }

    // Extract constants
    const BUILD_CONSTANTS = scheme.constants;

    /**
     * Treat a group of patterns
     * @param {Array.<Object>} patterns The patterns to treat
     * @param {string} group The patterns group's name
     * @returns {Array.<Object>} The patterns, treated
     */
    function treatPatterns(patterns, group) {
      // Stringify RegExps and treat colors in all patterns
      verb(`Treating regular expressions and colors in ${group}...`);
      patterns = regexpAndColors(patterns);

      // Format patterns
      verb(`Treating ${group}...`);
      patterns = patterns.map(
        // Given a pattern...
        pattern =>
          // If a simple pattern is provided...
          Array.isArray(pattern) ?
            // Make a single-level match object
            merge(
              { match: pattern[0] },
              // Convert all colors in this pattern
              buildColors(pattern.slice(1))
            ) :
            // Else, let the pattern as it is
            pattern
      );

      // Return the treated patterns
      return patterns;
    }

    // Determine the output path
    const output_path = self.argv.output
      ? path.normalize(self.argv.output)
      : `build/highlights/${name}-${BUILD_CONSTANTS.VERSION}`;

    // If this folder exists...
    if (folderExists(output_path))
      // Remove it
      rmdir(output_path);

    // (Re-)create the output folder
    mkdir(output_path);

    // Treat native patterns
    scheme.patterns = treatPatterns(scheme.patterns, 'patterns');

    // For each group in the repository...
    for (let group of Reflect.ownKeys(scheme.repository))
      // Treat it too
      scheme.repository[group].patterns = treatPatterns(scheme.repository[group].patterns, `group of patterns "${group}"`)

    /**
     * Merge two objects
     */
    function merge(left, right) {
      // For each of the second object...
      for (let key of Object.getOwnPropertyNames(right))
        // Merge it to the first one
        left[key] = right[key];

      // Return the first object
      return left;
    };

    /**
     * Format all constants in a string
     * @param {string} str The string to format
     * @returns {string} The formatted string
     */
    function formatConstants(str) {
      // Format the string and return it
      return str.replace(/\${(DISK:)?([a-zA-Z_\$][a-zA-Z0-9_\$]*)}/g, (m, disk, name) => {
        // If this constant is unknown...
        if (! BUILD_CONSTANTS.hasOwnProperty(name))
          // ERROR
          error(`Unknown build constant "${name}".`);

        // If the content must be written in a file...
        if (disk) {          
          // Generate the file
          // NOTE: diskbc = disk build constants
          writeFile(output_path + '/.diskbc/cst-' + name + '.plain', BUILD_CONSTANTS[name], `Temporary file for build constant "${name}"`);

          // Return its path
          return '.diskbc/cst-' + name + '.plain';
        } else
          // Else, simply replace the call by its value
          return BUILD_CONSTANTS[name];
      });
    }

    /**
     * Build colors object
     * @param {Array<string>} colors A list of colors to convert
     * @returns {Object<string, Array<string>>} An object with the converted list of colors
     */
    function buildColors(colors) {
      // If there is only one color to format...
      if (colors.length === 1)
        // Return it as a single-level object
        return { 'name': BUILD_CONSTANTS.hasOwnProperty(colors[0]) ? BUILD_CONSTANTS[colors[0]] : colors[0] };

      // Prepare an object
      let json = {};

      // For each color to convert...
      for (let i = 0; i < colors.length; i++)
        // Convert it and put it in the final object
        json[(i + 1).toString()] = { 'name': BUILD_CONSTANTS.hasOwnProperty(colors[i]) ? BUILD_CONSTANTS[colors[i]] : colors[i] };

      // Return a three-level built object
      return { 'captures': json };
    };

    /**
     * Convert all regular expressions to string and convert colors
     * @param {Object} obj The object to do the conversions in
     * @return {Object} The same object, with converted values
     */
    function regexpAndColors(obj) {
      // A temporary variable for matches
      let match;

      // Explore the object (array supported)
      // For each property...
      for (let i of (Array.isArray(obj) ? obj.keys() : Object.getOwnPropertyNames(obj))) {
        // If it's a regular expression...
        if (obj[i] instanceof RegExp)
          // Convert it to a string
          obj[i] = obj[i].toString().split('').slice(1, -1).join('');

        // If it's a string...
        else if (typeof obj[i] === 'string')
          // Format all constants in it...
          obj[i] = formatConstants(obj[i]);

        // If it's a sub-object (array or object)...
        else if (Array.isArray(obj[i]) || (typeof obj[i] === 'object' && obj[i] !== null))
          // Do the same replacement in it
          regexpAndColors(obj[i]);
      }

      // Return the converted object
      return obj;
    };

    /**
     * Treat all files in the build tree
     * @param {Object} tree The build treee
     * @param {Array<Object>} patterns The patterns object
     * @param {Object} repository The repository object
     * @returns {Object} The build tree, treated
     */
    function treatTree(tree, patterns, repository) {
      // Declare a variable for formatted items' name
      let newName;

      // Declare a variable for object moving
      let move;

      // For each item in the build object...
      for (let item of Reflect.ownKeys(tree)) {
        // Format name
        let newName = formatConstants(item);

        // If the new name is different from the original one...
        if (item !== newName) {
          // Backup the original item
          move = tree[item];
          // Delete it in the object
          delete tree[item];
          // Move it to its new name
          tree[newName] = move;
        }

        // If it's a file...
        if (tree[newName].hasOwnProperty('content')) {
          // If the content is an object...
          if (typeof tree[newName].content === 'object')
            // Stringify it
            tree[newName].content = JSON.stringify(tree[newName].content);

          // Format all constants in it
          tree[newName] = formatConstants(tree[newName].content)
            // Insert patterns if asked to
            .replace(/\$INSERT_PATTERNS\$|"\$INSERT_PATTERNS_Q\$"/g, () => JSON.stringify(patterns))
            // Insert the repository if asked to
            .replace(/\$INSERT_REPOSITORY\$|"\$INSERT_REPOSITORY_Q\$"/g, () => JSON.stringify(repository));
        } else
          // Else, it's a folder
          // Treat it
          tree[newName] = treatTree(tree[newName].files, patterns, repository);
      }

      return tree;
    }

    /**
     * Convert all variables and constants in a build object and merge patterns
     * Then extract the folders and files to the real filesystem
     * @param {string} dest The build folder
     * @param {Object} tree The build tree
     */
    function execBuild(dest, tree) {
      // Verbose
      verb(`Running the build() function inside "${dest}"...`);

      // For each item in the build object...
      for (let item of Reflect.ownKeys(tree)) {
        // If it's a file...
        if (typeof tree[item] === 'string') {
          // Try to write it
          try {
            writeFile(path.join(dest, item), tree[item]);
          } catch (e) {
            // ERROR
            error('Failed to write a package file', 26, e);
          }
        } else {
          // Else, it's a folder
          // Create a (real) folder
          try {
            mkdir(path.join(dest, item));
          } catch (e) {
            // ERROR
            error('Failed to make a package folder', 27, e);
          }

          // Write it
          execBuild(path.join(dest, item), tree[item]);
        }
      }
    }

    // Format the build file
    source.tree = treatTree(source.tree, scheme.patterns, scheme.repository);
    
    // Verbose
    verb('Running the target\'s build function...');

    // Run the target's build function
    source.build(source, BUILD_CONSTANTS);

    // Write the build files to the disk
    execBuild(output_path, source.tree);

    // If asked to...
    if (self.argv['auto-install']) {
      // Add a new constant
      BUILD_CONSTANTS.OUTPUT = output_path;

      // Call the help function
      say(cyan(`Installing extension for ${green('"' + editors[name] + '"')}...`));
      let installdir = source.install(BUILD_CONSTANTS);

      // Display a success message
      say(green(BUILD_CONSTANTS.LANGUAGE + ` extension for ${editors[name]} was successfully installed` + (installdir ? ` in "~${path.sep + path.relative(os.homedir(), installdir)}"` : '')));
    }

    // If asked to...
    if (self.argv['install-help']) {
      // Add a new constant
      BUILD_CONSTANTS.OUTPUT = output_path;

      // Display a help text
      say(
        cyan('Extension was successfully built.\n' + 
        'To install it, follow these steps and run the specified commands in your terminal:\n') +
        '\n' +
        yellow(' ' + source.installTxt.map(i => formatConstants(i)).join('\n ')) +
        '\n'
      );
    }

    // All went good :)
    success(`Extension successfully built for editor "${name}" in "${output_path}".`, output_path, self.argv.SYS_NO_EXIT);
  },

  /**
   * Build everything
   * @returns {void}
   */
  buildAll: () => {
    // For each editor...
    for (let editor of Reflect.ownKeys(editors)) {
      say(yellow('>>') + cyan(' Building extension for ' + green(`"${editor}"`) + ' editor...'));
      // Set this editor as the current one
      self.argv.target = editor;
      // Build it
      self.build();
    }
  }
};