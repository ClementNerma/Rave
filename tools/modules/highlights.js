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
    // Exit with an error
    error('Highlights module is not ready yet', 17);
  }
};