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
    // Determine the website's path
    const website_path = 'src/website';

    // Determine the map file's path
    const map_file = 'map.json';

    // Determine the map file's path
    const map_path = website_path + '/' + map_file;

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

    // For each existing item at the root of the website's source folder...
    for (let item of readFolder(website_path))
      // If this is not the map file
      if (item !== map_file)
        // Copy the item
        copy(website_path + '/' + item, output_folder + '/' + item);

    // Determine the temporary build folder's path
    const tmp_build_folder = output_folder + '/' + map.buildPath;

    // For each build to do...
    for (let build of map.build)
      // Do the build
      loadModule(
        build.module,
        Object.assign(
          { output: tmp_build_folder + '/' + build.module, SYS_NO_EXIT: true },
          build.arguments
        )
      ).build();

    // For each map...
    for (let item of Reflect.ownKeys(map.map))
      // Copy the item
      copy(output_folder + '/' + map.map[item], output_folder + '/' + item, true);
    
    // If the build folder must be removed...
    if (map.removeBuild)
      // Remove it
      rmdir(tmp_build_folder);

    // All went good :)
    if (! self.argv.SYS_NO_EXIT)
      success(`Website was successfully built in "${output_folder}".`);
  }
};