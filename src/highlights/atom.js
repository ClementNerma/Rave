// Enable strict mode
"use strict";

// Export the target
source = {
  /**
   * Build function
   * @param {Object} scheme The final scheme object
   */
  build: scheme => {},

  // Installation helper
  install: (BUILD_CONSTANTS) => {
    // Get the path of Atom's packages folder
    let atomFolder = path.join(os.homedir(), '.atom', 'packages');
    
    // If this folder does not exist...
    if (! folderExists(atomFolder))
      // ERROR
      error(`Atom's packages folder was not found (expecting folder at "${atomFolder}")`, 32);
    
    // Get the path of the installation folder
    let installFolder = path.join(atomFolder, 'language-' + BUILD_CONSTANTS.LOWERCASE_LANGUAGE);

    // Copy the build data into it
    copy(
      BUILD_CONSTANTS.OUTPUT,
      installFolder,
      true,
      'Installing SilverNight extension for Atom'
    );

    // Return path of the installation folder
    return atomFolder;
  },

  // Installation instructions
  installTxt: [
    "1) Rename \"${OUTPUT}\" to \"language-${LOWERCASE_LANGUAGE}\"",
    "2) Move it under \"~/.atom/packages\""
  ],

  // Package's content
  tree: {
    grammars: {
      files: {
        "language-${LOWERCASE_LANGUAGE}.json": {
          content: {
            name: "${LANGUAGE}",
            scopeName: "source.${EXTENSION}",
            fileTypes: [
              "${EXTENSION}"
            ],
            patterns: "$INSERT_PATTERNS_Q$",
            repository: "$INSERT_REPOSITORY_Q$"
          }
        }
      }
    },

    "package.json": {
      content: {
        name: "language-${LOWERCASE_LANGUAGE}",
        version: "${VERSION}",
        description: "${LANGUAGE} language support in Atom",
        engines: {
          atom: "*",
          node: "*"
        },
        license: "${LICENSE}"
      }
    },

    settings: {
      files: {
        "language-${LOWERCASE_LANGUAGE}.json": {
          content: {
            ".source.${EXTENSION}": {
              editor: {
                nonWordCharacters: "/\\()\"'`:,.;<>~!#@%^&*|+=[]{}`?-…",
                commentStart: "// ",
                foldEndPattern: "^\\s*\\}|^\\s*\\]|^\\s*\\)",
                increaseIndentPattern: "(?x) \\{ [^}\"'`]* $ | \\[ [^\\]\"'`]* $ | \\( [^)\"'`]* $",
                decreaseIndentPattern: "(?x) ^ \\s* (\\s* /[*] .* [*]/ \\s*)* [}\\])]"
              }
            }
          }
        }
      }
    }
  }
};
