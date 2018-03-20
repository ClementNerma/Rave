// Enable strict mode
"use strict";

// Export the target
source = {
  /**
   * Build function
   * @param {Object} scheme The final scheme object
   */
  build: scheme => {},

  // Installation instructions
  install: [
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
                nonWordCharacters: "/\\()\"':,.;<>~!#@%^&*|+=[]{}`?-…",
                commentStart: "// ",
                foldEndPattern: "^\\s*\\}|^\\s*\\]|^\\s*\\)",
                increaseIndentPattern: "(?x) \\{ [^}\"']* $ | \\[ [^\\]\"']* $ | \\( [^)\"']* $",
                decreaseIndentPattern: "(?x) ^ \\s* (\\s* /[*] .* [*]/ \\s*)* [}\\])]"
              }
            }
          }
        }
      }
    }
  }
};