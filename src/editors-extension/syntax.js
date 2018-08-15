/**
 * Syntax file for the language
 * This file is post-processed in a TextMate-compatible which is the format of most
 *  code editors.
 */

// NOTE: This scheme is currently limited to the "One Dark Pro" theme. Any other theme **may not work** well
//       with it (strange and unharmonic colors...)

// Enable strict mode to accelerate processing
"use strict";

/**
 * Build constants
 * @type {Object.<string, string>}
 */
BUILD_CONSTANTS = {
  LANGUAGE: 'SilverNight',
  LOWERCASE_LANGUAGE: 'silvernight',
  EXTENSION: 'sn',
  VERSION: '0.2.0',
  LICENSE: 'Apache-2.0',
  REPOSITORY_TYPE: 'git',
  REPOSITORY_URL: 'https://github.com/ClementNerma/SilverNight-draft',

  // Visual Studio Code-specific variables
  execPath: '${execPath}',
  workspaceRoot: '${workspaceRoot}',

  // Define all native colors
  blue: 'entity.name.function.sn',
  cyan: 'support.function.sn',
  gray: 'comment.block.sn.sn',
  green: 'entity.other.inherited-class.sn',
  orange: 'constant.other.sn',
  purple: 'storage.type.var.sn',
  red: 'variable.language.sn',
  white: 'unknown.must.be.white.sn',
  yellow: 'entity.name.type.class.sn',
  invalid: 'invalid.illegal.sn',
};

/**
 * The syntax object
 * @type {Object.<string, Array.<Object>>}
 */
SYNTAX = {
  patterns: [
    {
      // Import all global patterns
      include: '#global'
    }
  ],

  repository: {
    // Global patterns
    global: {
      patterns: [
        {
          // Single-line comments
          begin: /\/\//,
          beginCaptures: {
            '0': {
              name: 'punctuation.definition.comment.begin.sn'
            }
          },
          end: /$/,
          name: 'comment.line.double-slash.sn',
          patterns: [
            {
              match: /\b(NOTE|OPTIMIZE|TODO|HACK|FIXME|BUG)\b/,
              name: '${purple}'
            }
          ]
        },
        {
          // Documentation comments
          begin: /\/\*\*/,
          end: /\*\//,
          name: '${gray}',
          patterns: [
            {
              match: /\b(NOTE|OPTIMIZE|TODO|HACK|FIXME|BUG)\b/,
              name: '${purple}'
            },
            {
              match: /@class\b/,
              captures: {
                '0': {
                  name: '${green}'
                }
              }
            },
            {
              match: /(@classname\s*\()\s*(.*)\s*(\))/,
              captures: {
                '1': {
                  name: '${purple}'
                },
                '2': {
                  name: '${green}'
                },
                '3': {
                  name: '${purple}'
                }
              }
            },
            {
              match: /(@(?:param|template))\s+([a-zA-Z_\$][a-zA-Z0-9_\$]*)\s+/,
              captures: {
                '1': {
                  name: '${purple}'
                },
                '2': {
                  name: '${red}'
                }
              }
            },
            {
              match: /(@throws)\s+([A-Z_\$][a-zA-Z0-9_\$]*)\s+/,
              captures: {
                '1': {
                  name: '${purple}'
                },
                '2': {
                  name: '${green}'
                }
              }
            },
            {
              match: /@(note|samedef)\s+/,
              name: '${purple}'
            },
            {
              match: /(@returns)\s+/,
              name: '${purple}'
            },
            {
              match: /(@(?:condition|example))\s+(.*)$/,
              captures: {
                '1': {
                  name: '${purple}'
                },
                '2': {
                  name: '${cyan}'
                }
              }
            },
            {
              match: /(@file)\s+(.*)$/,
              captures: {
                '1': {
                  name: '${purple}'
                },
                '2': {
                  name: '${cyan}'
                }
              }
            },
            {
              match: /(@author)\s+(.*)$/,
              captures: {
                '1': {
                  name: '${purple}'
                },
                '2': {
                  name: '${red}'
                }
              }
            },
            {
              match: /(@license)\s+(.*)$/,
              captures: {
                '1': {
                  name: '${purple}'
                },
                '2': {
                  name: '${yellow}'
                }
              }
            },
            {
              match: /\*((?:\s*>)+)/,
              captures: {
                '1': {
                  name: '${blue}'
                }
              }
            }
          ],
          name: 'comment.block.sn'
        },
        {
          // Multi-line comments
          begin: /\/\*/,
          end: /\*\//,
          name: '${gray}',
          patterns: [
            {
              match: /\b(NOTE|OPTIMIZE|TODO|HACK|FIXME|BUG)\b/,
              name: '${purple}'
            }
          ]
        },
        {
          // Single-line strings (with simple quotes)
          begin: /'/,
          end: /'|(?=\r\n|\r|\n)/,
          patterns: [
            {
              // Escaped characters
              match: /\\./,
              name: '${cyan}'
            }
          ],
          name: '${green}'
        },
        {
          // Single-line strings (with double quotes)
          begin: /"/,
          end: /"|(?=\r\n|\r|\n)/,
          patterns: [
            {
              // Escaped characters
              match: /\\./,
              name: '${cyan}'
            }
          ],
          name: '${green}'
        },
        {
          // Multi-line strings (templated)
          begin: /`/,
          end: /`/,
          patterns: [
            {
              // Expressions
              begin: /\${/,
              end: /}/,
              name: '${red}',
              patterns: [
                {
                  include: '#global'
                }
              ]
            },
            {
              // Characters escapement
              match: /\\./,
              name: '${cyan}'
            }
          ],
          name: '${green}'
        },
        {
          // Regular expressions
          begin: '(?<=[\\[=(?:+,!]|^|return|=>|&&|\\|\\|)\\s*(/)(?![/*+?])(?=.*/)',
          beginCaptures: {
            '1': {
              name: '${green}'
            }
          },
          end: '(/)([gimsuy]*)',
          endCaptures: {
            '1': {
              name: '${green}'
            },
            '2': {
              name: '${purple}'
            }
          },
          name: '${red}', // Pointless since the color is decided by #regexp
          patterns: [
            {
              include: '#regexp'
            }
          ]
        },
        [
          // Native types and classes
          /(?<!\.)\b(bool|number|v[su]?int|vfloat|[ui](?:8|16|32|64)|u?int|f(?:32|64)|usize|string|Primitive|BooleanConvertible|IntegerConvertible|FloatConvertible|Numerizable|Stringifyable|Clonable|Serializable|Randomizable|RandomizableWithBounds|Primitivable|Dictionary|Collection|Vector|Array|List|Error|BacktraceInstant|Output)(\?)?\b/,
          'yellow', 'cyan'
        ],
        [
          // Special native types
          /(?<!\.)\b(void|Any|T|X|Y|Z|K|V|Type|Function|Structure|Enumeration|Interface|Trait|Class)\b/,
          'purple', 'cyan'
        ],
        [
          // Name of constants
          /\b([A-Z_\$][A-Z0-9_\$]+)\b/,
          'orange'
        ],
        [
          // Name of classes
          /\b([A-Z][a-zA-Z0-9_\$]*)\b/,
          'yellow'
        ],
        [
          // Plain boolean
          /\b(true|false)\b/,
          'orange'
        ],
        [
          // Plain numbers
          /\b(0_*d_*)?(\d_*)+(\._*(\d_*)+)?(?:[pfd]|u?[bsl]?)\b/,
          'orange'
        ],
        [
          // Plain binary numbers
          /\b0_*b_*(([01]_*)+)(\._*([01]_*)+)?(?:[pfd]|u?[bsl]?)\b/,
          'orange'
        ],
        [
          // Plain octal numbers
          /\b0_*o_*(([0-7]_*)+)(\._*([0-7]_*)+)?(?:[pfd]|u?[bsl]?)\b/,
          'orange'
        ],
        [
          // Plain hexadecimal numbers
          /\b0_*x_*(([a-zA-Z0-9]_*)+)(\._*([a-zA-Z0-9]_*)+[pfd]?u?[bsl]?)\b/,
          'orange'
        ],
        [
          // Plain voids
          /\b(null)\b/,
          'orange'
        ],
        [
          // Resolution operators
          /\b(this|self|super)\b/,
          'yellow'
        ],
        [
          // Static resolution proxy
          /\bstatic\!(?= *<)/,
          'purple'
        ],
        [
          // Static resolution operators
          /\b(_this|_self|_super)\b/,
          'purple', 'purple'
        ],
        [
          // Implicit numerical iterator
          /[a-zA-Z0-9_\.\$]+(u|(?:[pfd]|u?[bsl]?))\.\.\.?[a-zA-Z0-9_\.\$]+(?:[pfd]|u?[bsl]?)/,
          'orange'
        ],
        [
          // Conversation keyword
          /\bkeep\b/,
          'purple'
        ],
        [
          // Declaration of mutable containers
          /\b(let)\s+([a-zA-Z_\$][a-zA-Z0-9_\$]*)\b/,
          'purple', 'cyan'
        ],
        [
          // Declaration of immutable containers (plain or not)
          /(val|pln|proxy\!?|bindings|prxmodel)\s+([a-zA-Z_\$][a-zA-Z0-9_\$]*)\b/,
          'purple', 'orange'
        ],
        [
          // Type symbol / object property symbol
          // Also package accessor when doubled
          /:/,
          'cyan'
        ],
        [
          // Declaration statement for model entities
          /\b(struct|enum|class|type|dict|trait|interface)\s+([a-zA-Z_\$][a-zA-Z0-9_\$]*)\b/,
          'purple', 'yellow'
        ],
        [
          // Special case: namespaces
          /\b(namespace)\s+([a-zA-Z_][a-zA-Z0-9_\$]*)\b/,
          'purple', 'green'
        ],
        [
          // Namespace usage
          /((?:\b|\\?)[a-zA-Z_\$][a-zA-Z0-9_\$]*)(::)\b/,
          'green', 'cyan'
        ],
        [
          // Lazy overloads
          /\b(pln)\s+(%)(lazy_(?:clone|serialize|unserialize|serial_fields))\b/,
          'purple', 'red', 'cyan'
        ],
        [
          // Immutable containers declaration in classes
          /\b(public|protected|private)\s+(static\s+)?(?!(?:func|iter|setter|struct|enum)\s+)(val|pln|proxy\!?)\s+([a-zA-Z_\$][a-zA-Z0-9_\$]*)\b/,
          'purple', 'purple', 'purple', 'orange'
        ],
        [
          // Models declaration in classes
          /\b(public|protected|private)(\s+static)?(?=\s+func|struct|enum|interface|trait)\b/,
          'purple', 'purple'
        ],
        [
          // Mutable containers declaration in classes
          /\b(public|protected|private)\s+(static\s+)?(?!(?:func|iter|struct|enum)\s+)(readonly\s+)?([a-zA-Z_\$][a-zA-Z0-9_\$]*)\b/,
          'purple', 'purple', 'purple', 'cyan'
        ],
        [
          // Overload methods declaration (in classes)
          /\b(static\s+)?(func\s+)(%)(construct|free|clone|serialize|unserialize|call|to|equal|greater|smaller|plus|less|times|divide|pow|modulo|random|get|set|size|unset|has|contains|keys|values)\b/,
          'purple', 'purple', 'red', 'cyan'
        ],
        [
          // Getting overload method
          /(?<=\.)(%)(clone|serialize|unserialize|call|to|equal|greater|smaller|plus|less|times|divide|pow|modulo|random|get|set|size|unset|has|contains|keys|values)\b/,
          'red', 'cyan'
        ],
        [
          // Calling constructor and destructor (internally)
          /(?<=[^a-zA-Z0-9_\$]this\.)(%)(construct|free)\b/,
          'red', 'cyan'
        ],
        [
          // Calling constructor and destructor (internally)
          /(?<=[^a-zA-Z0-9_\$]self\.)(%)(construct|free)\b/,
          'red', 'cyan'
        ],
        [
          // Calling constructor and destructor (internally)
          /(?<=[^a-zA-Z0-9_\$]super\.)(%)(construct|free)\b/,
          'red', 'cyan'
        ],
        [
          // Match variable (_)
          // 'with' value (_)
          /\b_\b/,
          'purple'
        ],
        [
          // Flex declaration
          /\b(flex)\s+([a-zA-Z_\$][a-zA-Z0-9_\$]*\s*)/,
          'purple', 'orange'
        ],
        [
          // Flexs call
          /\b([a-zA-Z_\$][a-zA-Z0-9_\$]*)\!(?=\s*\()/,
          'cyan'
        ],
        [
          // Flexs name, with template
          /\b([a-zA-Z_\$][a-zA-Z0-9_\$]*\!)(?=\s*<(.*?)>\s*)/,
          'cyan'
        ],
        [
          // Function declaration
          /\b(func)\s+([a-zA-Z_\$][a-zA-Z0-9_\$]*)\b/,
          'purple', 'blue'
        ],
        [
          // Superoverload declaration
          /\b(func)\s+(%)(equal|greater|smaller|plus|less|times|divide|pow|modulo)\b/,
          'purple', 'red', 'cyan'
        ],
        [
          // Arrow function symbol
          /(=>)/,
          'purple'
        ],
        [
          // Directional symbol
          /(->)/,
          'purple'
        ],
        [
          // Logical operators
          /(<=|>=|<|>|==|!=|&&?|\|\|?|~~)/,
          'cyan'
        ],
        [
          // Alphabetic logical operators
          /\b(nor|xor|nand|nor)\b/,
          'purple'
        ],
        [
          // Math operators
          /(\+|-|\/|\*|%|\^|\*\*|<<|>>|\?)/,
          'cyan'
        ],
        [
          // Assignment operator
          /=/,
          'cyan'
        ],
        [
          // Type comparison operators
          /\b(is|isnt)\b/,
          'purple'
        ],
        [
          // Reference
          /([\*&])(mut\b)?/,
          'cyan', 'purple'
        ],
        {
          // Instanciation
          begin: /\b(new)( *~)?\b/,
          beginCaptures: {
            '1': {
              name: '${purple}'
            },
            '2': {
              name: '${cyan}'
            }
          },
          patterns: [
            {
              match: /(?<!\\)(\\?[a-zA-Z_\$][a-zA-Z0-9_\$]*)(::)/,
              captures: {
                '1': {
                  name: '${green}'
                },
                '2': {
                  name: '${cyan}'
                }
              }
            }
          ],
          end: /([a-zA-Z_\$][a-zA-Z0-9_\$]*)(?=\s*[^ :a-zA-Z0-9_\$])/,
          endCaptures: {
            '1': {
              name: '${yellow}'
            }
          }
        },
        [
          // Inheritance and reversed inheritance
          /\b(extends|parentof)\s+([a-zA-Z_\$][a-zA-Z0-9_\$\.]*)\b/,
          'purple', 'green'
        ],
        {
          begin: /\b(implements|uses?)\s+/,
          beginCaptures: {
            '1': {
              name: '${purple}'
            }
          },
          patterns: [
            {
              begin: /([a-zA-Z_\$][a-zA-Z0-9_\$::]+)\s*(<)/,
              beginCaptures: {
                '1': {
                  name: '${green}'
                },
                '2': {
                  name: '${cyan}'
                }
              },
              patterns: [
                {
                  include: '#global'
                }
              ],
              end: />/,
              endCaptures: {
                '0': {
                  name: '${cyan}'
                }
              }
            },
            {
              match: /[a-zA-Z_\$][a-zA-Z0-9_\$::]+\s*(?=,|\b)/,
              name: '${green}'
            },
          ],
          end: /(?=[>\{\}\[\]\(\)\r\n;])/,
          endCaptures: {}
        },
        [
          // Shortened typechecking
          /(~)\s*([a-zA-Z_\$][a-zA-Z0-9_\$\.]*)\b/,
          'cyan', 'green'
        ],
        [
          // Type exclusion
          /\bnot\b/,
          'purple'
        ],
        [
          // Throw declaration
          /\b(throws)\s+([a-zA-Z_\$][a-zA-Z0-9_\$\.<>]*)((?:\s*,\s*[a-zA-Z_\$][a-zA-Z0-9_\$\.<>]*)*)\b/,
          'purple', 'green', 'green'
        ],
        [
          // Extension keyword
          /\bextension\b/,
          'purple'
        ],
        [
          // 'instanceof' and 'instanceofsuper' operator
          /\b(instanceof|instanceofsuper)\b/,
          'purple'
        ],
        {
          // Import statements
          begin: /\b(scope\s+)?(import)\s+/,
          beginCaptures: {
            '1': {
              name: '${purple}'
            },
            '2': {
              name: '${purple}'
            }
          },
          patterns: [
            {
              match: /([a-zA-Z_\$][a-zA-Z0-9_\$]*)(?=::)/,
              captures: {
                '1': {
                  name: '${green}'
                }
              }
            },
            {
              match: /(::)([a-zA-Z_\$][a-zA-Z0-9_\$]*)/,
              captures: {
                '1': {
                  name: '${cyan}'
                },
                '2': {
                  name: '${green}'
                }
              }
            },
            {
              match: /([a-zA-Z_][a-zA-Z0-9_\$]*)(?=\s*[,;]|\s*from|\s*as)/,
              captures: {
                '1': {
                  name: '${green}'
                }
              }
            },
            {
              match: /\s*(,)\s*/,
              captures: {
                '1': {
                  name: '${cyan}'
                }
              }
            },
            {
              match: /\b(from|as)\b/,
              captures: {
                '1': {
                  name: '${purple}'
                }
              }
            }
          ],
          end: /\s*(?=;)/,
          endCaptures: {}
        },
        [
          // Iterating with key and value
          /(for)\s+([a-zA-Z_\$][a-zA-Z0-9_\$]*)\s*(->)\s*([a-zA-Z_\$][a-zA-Z0-9_\$]*)(?:\s+(in)\s+([a-zA-Z_\$][a-zA-Z0-9_\$]*))?\b/,
          'purple', 'cyan', 'purple', 'cyan', 'purple', 'orange'
        ],
        [
          // Iterator with key or value
          /(for)\s+([a-zA-Z_\$][a-zA-Z0-9_\$]*)(?:\s*=|\s+(in|of)\s+([a-zA-Z_\$][a-zA-Z0-9_\$]*\b)?)/,
          'purple', 'cyan', 'purple', 'orange'
        ],
        [
          // Abstract classes don't exist
          /\b(abstract)\s+(class)\b/,
          'invalid', 'purple'
        ],
        [
          // Virtual members don't exist
          /\b(virtual)\s+(public|protected|private)\b/,
          'invalid', 'purple'
        ],
        [
          // Keywords
          /(?<!\.)\b(func|lambda|do|if|ift|else|elsif|for|while|loop|unless|until|break|continue|match|default|try|catch|finally|segment|delete|mut|let|val|pln|proxy\!?|public|protected|private|friend|static|abstract|final|unique|virtual|open|extern|readonly|in|keyof|export|return|async|iter|yield|flex|await|sync|resolve|reject|throw|with|new|include|namespace|struct|enum|class|type|dict|trait|interface|implements|throws|use|uses|extends|parentof|instanceof|instanceofsuper|scope|import|from|as|typepath)(?!\s*:)\b/,
          'purple'
        ],
        [
          // Functions call
          /\b([a-zA-Z_\$][a-zA-Z0-9_\$]*)(?=\s*\(|\s*<.*>\s*\()/,
          'blue'
        ],
        [
          // Infinite argument
          /\.\.\.[a-zA-Z_\$][a-zA-Z0-9_\$]*\b/,
          'red'
        ],
        [
          // Arguments expansion
          /\b[a-zA-Z_\$][a-zA-Z0-9_\$]*\.\.\./,
          'red'
        ],
        [
          // 'this.' shortened syntax
          /(@?[a-zA-Z_\$][a-zA-Z0-9_\$]*)(\?)?(?=[\.\[])/,
          'red', 'cyan'
        ],
        [
          // ...followed by a child property
          /(@?[a-z_\$][a-zA-Z0-9_\$]*)(\?)?(?=[\.\[])/,
          'red', 'cyan'
        ],
        [
          // Object's function's call
          /(@)([a-zA-Z_\$][a-zA-Z0-9_\$]*)(\?)?(?=\s*\()/,
          'red', 'blue', 'cyan'
        ],
        [
          // Object's function's call with a template
          /(@)([a-zA-Z_\$][a-zA-Z0-9_\$]*)(\?)?(?=\s*<(.*?)>\s*\s*\()/,
          'red', 'blue', 'cyan'
        ],
        [
          // Object's *constant* property
          /(@)([A-Z_\$][A-Z0-9_\$]*)(\?)?(?=\s*[[\.]|@]\b)/,
          'red', 'orange', 'cyan'
        ],
        [
          // Object's property
          /(@)([a-zA-Z_\$][a-zA-Z0-9_\$]*)/,
          'red'
        ],
        [
          // Object property
          /(@[a-zA-Z_\$][a-zA-Z0-9_\$]*)\b/,
          'red'
        ],
        [
          // Object's function's call
          /(\.)([a-zA-Z_\$][a-zA-Z0-9_\$]*)(?=\s*\()/,
          'white', 'blue'
        ],
        [
          // Object's function's call with a template
          /(\.)([a-zA-Z_\$][a-zA-Z0-9_\$]*)(?=\s*<(.*?)>\s*\s*\()/,
          'white', 'blue'
        ],
        [
          // Object's flex call
          /(\.)([a-zA-Z_\$][a-zA-Z0-9_\$]*!)(?=\s*\()/,
          'white', 'cyan'
        ],
        [
          // Object's flex call with a template
          /(\.)([a-zA-Z_\$][a-zA-Z0-9_\$]*!)(?=\s*<(.*?)>\s*\s*\()/,
          'white', 'cyan'
        ],
        [
          // Object's constant property
          /(\.)([A-Z_\$][A-Z0-9_\$]*)(?=\b)/,
          'white', 'orange'
        ],
        [
          // Object's property
          /(\.)([a-zA-Z_\$][a-zA-Z0-9_\$]*)/,
          'white', 'red'
        ],
        [
          // Head directives
          /#\[(module|extern)\] *;/,
          'orange'
        ],
        [
          // Future attributes indicator
          /#future(?= +|\r|\n| *;)/,
          'orange'
        ],
        [
          // Automatic typecasting overload indicator
          /#auto(?= +|\r|\n| *;)/,
          'orange'
        ],
        [
          // Exact type directive
          /#=/,
          'purple'
        ],
        [
          // Constructors inheritance
          /#(supercstr)/,
          'orange'
        ],
        [
          // Conditional directives
          /#(if|elsif|else|end)\b/,
          'orange'
        ],
        [
          // Inclusion directive
          /#include/,
          'purple'
        ],
        [
          // Reduced functions directive
          /#reduced\b/,
          'purple'
        ],
        [
          // Bindings directive
          /(#bind)\s+([a-zA-Z_\$][a-zA-Z0-9_\$]*)\b/,
          'orange', 'purple'
        ],
        [
          // 'Plain value' templated type directive
          /#pln(?=\s*<)/,
          'purple'
        ],
        [
          // All other directives are invalid
          /#([a-zA-Z_\$][a-zA-Z0-9_\$]+)( *;)?/,
          'invalid'
        ],
        [
          // Inferred Structured Typing dictionary symbol
          /#(?=[^a-zA-Z_])/,
          'orange'
        ],
        [
          // Name of types
          /\b([A-Z][a-zA-Z0-9_\$]*)(?!\s*:)\b/,
          'yellow'
        ],
      ]
    },

    // Regular expressions patterns
    // Taken from: https://github.com/atom/language-javascript/blob/master/grammars/regular%20expressions%20(javascript).cson
    'regex-character-class': {
      patterns: [
        {
          match: /\\[wWsSdDtrnvf]|\./,
          name: '${red}'
        },
        {
          match: /\\([0-7]{3}|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4})/,
          name: '${orange}'
        },
        {
          match: /\\c[A-Z]/,
          name: '${orange}'
        },
        {
          match: /\\./,
          name: '${cyan}'
        }
      ]
    },

    regexp: {
      patterns: [
        {
          match: /\\[bB]|\^|\$/,
          name: '${purple}'
        },
        {
          match: /\\[1-9]\d*|\\k<[a-zA-Z_$][\w$]*>/,
          name: '${purple}'
        },
        {
          match: /[?+*]|\{(\d+,\d+|\d+,|,\d+|\d+)\}\??/,
          name: '${orange}'
        },
        {
          match: /\|/,
          name: '${white}'
        },
        {
          begin: /(\()(?:(\?=)|(\?!)|(\?<=)|(\?<!))/,
          beginCaptures: {
            '1': {
              name: '${cyan}'
            },
            '2': {
              name: '${cyan}'
            },
            '3': {
              name: '${cyan}'
            },
            '4': {
              name: '${cyan}'
            },
            '5': {
              name: '${cyan}'
            }
          },
          end: /(\))/,
          endCaptures: {
            '1': {
              name: '${cyan}'
            }
          },
          name: '${cyan}',
          patterns: [
            {
              include: '#regexp'
            }
          ]
        },
        {
          begin: /\(((\?:)|(\?<[a-zA-Z_$][\w$]*>))?/,
          beginCaptures: {
            '0': {
              name: '${cyan}'
            }
          },
          end: /\)/,
          endCaptures: {
            '0': {
              name: '${cyan}'
            }
          },
          name: '${cyan}',
          patterns: [
            {
              include: '#regexp'
            }
          ]
        },
        {
          begin: /(\[)(\^)?/,
          beginCaptures: {
            '1': {
              name: '${orange}'
            },
            '2': {
              name: '${white}'
            }
          },
          end: /(\])/,
          endCaptures: {
            '1': {
              name: '${orange}'
            }
          },
          name: '${orange}',
          patterns: [
            {
              'captures': {
                '1': {
                  name: '${orange}'
                },
                '2': {
                  name: '${orange}'
                },
                '3': {
                  name: '${orange}'
                },
                '4': {
                  name: '${orange}'
                },
                '5': {
                  name: '${orange}'
                },
                '6': {
                  name: '${orange}'
                }
              },
              match: /(?:.|(\\(?:[0-7]{3}|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}))|(\\c[A-Z])|(\\.))\-(?:[^\]\\]|(\\(?:[0-7]{3}|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}))|(\\c[A-Z])|(\\.))/,
              name: '${orange}'
            },
            {
              include: '#regex-character-class'
            }
          ]
        },
        {
          include: '#regex-character-class'
        }
      ]
    }
  }
};
