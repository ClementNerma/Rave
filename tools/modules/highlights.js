// Enable strict mode
"use strict";

// Set up a list of available editors
const editors = {
  atom: 'Atom (from GitHub)',
  vscode: 'Visual Studio Code (from Microsoft)'
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
    { long: 'output', short: 'o', placeholder: 'folder', help: 'Output path for the package' }
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
   * Build function
   */
  build: () => {
    // Get the editor's name
    const name = self.argv.target;

    // If no editor was specified...
    if (! name)
      // ERROR
      error('No editor name provided', 18);

    // If the editor is unknown...
    if (! editors.hasOwnProperty(name))
      // ERROR
      error(`Unknown editor "${name}"`, 19);

    // Determine its path
    let target_path = `src/highlights/${name}.json`;

    // If the file does not exist...
    if (!fileExists(target_path))
      // ERROR
      error(`File not found for editor "${name}" (expecting file at "${target_path}")`, 20);

    // Try to read the book's file
    let source;

    try {
      source = readFile(target_path);
    } catch (e) {
      // ERROR
      error(`Failed to read file for editor "${name}"`, 21, e);
    }

    // Try to parse it as JSON
    try {
      source = JSON.parse(source);
    } catch (e) {
      // ERROR
      error(`Failed to parse editor's scheme file as JSON`, 22, e);
    }

    // Determine its path
    let scheme_path = `src/highlights/scheme.js`;

    // If the file does not exist...
    if (!fileExists(scheme_path))
      // ERROR
      error(`Scheme file not found (expecting file at "${scheme_path}")`, 23);

    // Try to read the book's file
    let scheme;

    try {
      scheme = readFile(scheme_path);
    } catch (e) {
      // ERROR
      error(`Failed to read scheme file "${name}"`, 24, e);
    }

    // Try to evaluate it as an object
    try {
      scheme = eval(scheme);
    } catch (e) {
      // ERROR
      error(`Failed to evaluate scheme file`, 25, e);
    }

    // Extract constants
    const BUILD_CONSTANTS = scheme.constants;

    // Extract patterns
    let patterns = scheme.patterns;

    // Stringify RegExps and treat colors in all patterns
    patterns = regexpAndColors(patterns);

    // Format patterns
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
      return str.replace(/\${([a-zA-Z_\$][a-zA-Z0-9_\$]*)}/g, (m, name) => {
        // If this constant is known...
        if (BUILD_CONSTANTS.hasOwnProperty(name))
          // Replace the call by its value
          return BUILD_CONSTANTS[name];

        // ERROR
        error(`Unknown build constant "${name}".`);
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
     * Convert all variables and constants in a build object and merge patterns
     * Then extract the folders and files to the real filesystem
     * @param {string} dest The build folder
     * @param {Object} build The build object
     * @param {Array<Object>} patterns The patterns object
     * @returns {Object} The build object, formatted
     */
    function execBuild(dest, build, patterns) {
      // Declare a variable for formatted items' name
      let newName;

      // Declare a variable for object moving
      let move;

      // For each item in the build object...
      for (let item of Object.getOwnPropertyNames(build)) {
        // Format name
        let newName = formatConstants(item);

        // If the new name is different from the original one...
        if (item !== newName) {
          // Backup the original item
          move = build[item];
          // Delete it in the object
          delete build[item];
          // Move it to its new name
          build[newName] = move;
        }

        // If it's a file...
        if (build[newName].hasOwnProperty('content')) {
          // If the content is an object...
          if (typeof build[newName].content === 'object')
            // Stringify it
            build[newName].content = JSON.stringify(build[newName].content);

          // Format all constants in it
          build[newName] = formatConstants(build[newName].content)
            // Insert patterns if asked to
            .replace(/\$INSERT_PATTERNS\$|"\$INSERT_PATTERNS_Q\$"/g, () => JSON.stringify(patterns));

          // Write it
          fs.writeFileSync(path.join(dest, newName), build[newName], 'utf8');
        } else {
          // Else, it's a folder
          // Create a (real) folder
          fs.mkdirpSync(path.join(dest, newName));
          // Treat it
          build[newName] = execBuild(path.join(dest, newName), build[newName].files, patterns);
        }
      }

      // Return the final object
      return build;
    }

    // Format the build file and write it to the output
    execBuild(output_path, source, patterns);

    // All went good :)
    success(`Extension successfully built for editor "${name}" in "${output_path}".`);
  }
};