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
    say('Packaging the extension...');

    // Package the extension
    try {
      child_process.execSync('vsce package', {
        cwd: BUILD_CONSTANTS.OUTPUT,
        stdio: [0, 1, 2]
      });
    } catch (e) {
      // ERROR
      error('Failed to package the extension. Is the "vsce" command available?', 34);
    }

    say('Installing the extension...');

    // Install it
    try {
      child_process.execSync(
        'code --install-extension language-' +
        BUILD_CONSTANTS.LOWERCASE_LANGUAGE + '-' +
        BUILD_CONSTANTS.VERSION + '.vsix',
        {
          cwd: BUILD_CONSTANTS.OUTPUT,
          stdio: [0, 1, 2]
        }
      );
    } catch (e) {
      // ERROR
      error('Failed to install the extension', 35);
    }
  },

  // Installation instructions
  installTxt: [
    "npm install vsce -g",
    "cd ${OUTPUT}",
    "vsce package",
    "code --install-extension language-${LOWERCASE_LANGUAGE}-${VERSION}.vsix"
  ],

  // Package's content
  tree: {
    ".gitignore": {
      content: "node_modules\n.vsix\n"
    },
    ".vscode": {
      files: {
        "launch.json": {
          content: {
            version: "${VERSION}",
            configurations: [
              {
                name: "Extension",
                type: "extensionHost",
                request: "launch",
                runtimeExecutable: "${execPath}",
                args: [
                  "--extensionDevelopmentPath=${workspaceRoot}"
                ]
              }
            ]
          }
        }
      }
    },

    "language-configuration.json": {
      content: {
        comments: {
          lineComment: "//",
          blockComment: [ "/*", "*/" ]
        },
        brackets: [
          [ "{", "}" ],
          [ "[", "]" ],
          [ "(", ")" ]
        ],
        autoClosingPairs: [
          [ "{", "}" ],
          [ "[", "]" ],
          [ "(", ")" ],
          [ "'", "'" ],
          [ '"', '"' ],
          [ "`", "`" ]
        ],
        surroundingPairs: [
          [ "{", "}" ],
          [ "[", "]" ],
          [ "(", ")" ],
          [ "'", "'" ],
          [ '"', '"' ],
          [ "`", "`" ]
        ]
      }
    },

    "package.json": {
      content: {
        name: "language-${LOWERCASE_LANGUAGE}",
        displayName: "${LANGUAGE}",
        description: "Syntax highlighting for the ${LANGUAGE} programming language",
        version: "${VERSION}",
        publisher: "clement-nerma",
        icon: "${BUILTIN:icon.png}",
        engines: {
          vscode: "^1.19.0"
        },
        categories: [
          "Languages"
        ],
        repository: {
          type: "${REPOSITORY_TYPE}",
          url: "${REPOSITORY_URL}"
        },
        contributes: {
          languages: [
            {
              id: "${LOWERCASE_LANGUAGE}",
              aliases: [
                "${LANGUAGE}",
                "${LOWERCASE_LANGUAGE}"
              ],
              extensions: [
                ".${EXTENSION}"
              ],
              configuration: "./language-configuration.json"
            }
          ],
          grammars: [
            {
              language: "${LOWERCASE_LANGUAGE}",
              scopeName: "source.${EXTENSION}",
              path: "./syntaxes/${LOWERCASE_LANGUAGE}.tmLanguage.json"
            },
            {
              scopeName: "markdown.silvernight.codeblock",
              path: "./syntaxes/codeblock.json",
              injectTo: [
                "text.html.markdown"
              ],
              embeddedLanguages: {
                "meta.embedded.block.silvernight": "silvernight"
              }
            }
          ]
        }
      }
    },

    "README.md": {
      content: "${README}"
    },
    
    syntaxes: {
      files: {
        "${LOWERCASE_LANGUAGE}.tmLanguage.json": {
          content: {
            $schema: "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json",
            name: "${LANGUAGE}",
            scopeName: "source.${EXTENSION}",
            patterns: "$INSERT_PATTERNS_Q$",
            repository: "$INSERT_REPOSITORY_Q$"
          }
        },

        "codeblock.json": {
          content: {
            fileTypes: [],
            injectionSelector: "L:markup.fenced_code.block.markdown",
            patterns: [
              {
                include: "#silvernight-code-block"
              }
            ],
            repository: {
              "silvernight-code-block": {
                begin: "(?:silvernight|sn)(\\s+[^`~]*)?$",
                end: "(^|\\G)(?=\\s*[`~]{3,}\\s*$)",
                contentName: "meta.embedded.block.silvernight",
                patterns: [
                  {
                    include: "source.sn"
                  }
                ]
              }
            },
            scopeName: "markdown.silvernight.codeblock"
          }
        }
      }
    }
  }
};
