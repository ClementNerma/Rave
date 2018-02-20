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
    { long: 'target', short: 't', placeholder: 'editor', inline: true, help: 'The editor to build an extension for' }
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
  }
};