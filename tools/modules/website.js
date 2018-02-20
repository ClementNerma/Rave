// Enable strict mode
"use strict";

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
  arguments: [],

  /**
   * The module's help
   * @type {Array<string>}
   */
  help: [
    `Build the SilverNight's website`,
    ''
  ],

  /**
   * Clean function
   * @returns {void}
   */
  clean: () => rmdir('build/website'),

  /**
   * Build function
   */
  build: () => {
    // Exit with an error
    error('Website module is not ready yet', 28);
  }
};