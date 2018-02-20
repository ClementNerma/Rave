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
    // Determine the map file's path
    let map_path = `src/website/map.json`;

    // If the file does not exist...
    if (!fileExists(map_path))
      // ERROR
      error(`Website's map file not found (expecting file at "${map_path}")`, 29);

    // Try to read the book's file
    let map;

    try {
      map = readFile(map_path);
    } catch (e) {
      // ERROR
      error(`Failed to read website's map file`, 30, e);
    }

    // Try to parse it as JSON
    try {
      map = JSON.parse(map);
    } catch (e) {
      // ERROR
      error(`Failed to parse website's map file as JSON`, 31, e);
    }

    // Determine the output folder
    const output_folder = 'build/website';

    // If this folder already exists...
    if (folderExists(output_folder))
      // Remove it
      rmdir(output_folder);

    // Determine the temporary build folder's path
    const tmp_build_folder = output_folder + '/' + map.buildPath;

    // For each build to do...
    for (let build of map.build)
      // Do the build
      loadModule(
        build.module,
        Object.assign(
          { output: tmp_build_folder + '/' + build.module },
          build.arguments
        )
      ).build();
    
    // If the build folder must be removed...
    if (map.removeBuild)
      // Remove it
      rmdir(tmp_build_folder);
  }
};