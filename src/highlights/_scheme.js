/**
 * @file Syntax highlighting scheme for SilverNight (TextMate preprocessor format)
 */

// NOTE: This scheme is currently limited to the "One Dark Pro" theme. Any other theme **may not work** well
//       with it (strange and unharmonic colors...)

// Enable strict mode
"use strict";

// Export the scheme
scheme = {
  constants: {
    // Define build constants
    LANGUAGE: 'SilverNight',
    LOWERCASE_LANGUAGE: 'silvernight',
    EXTENSION: 'sn',
    VERSION: '0.23.0',
    LICENSE: 'MIT',
    REPOSITORY_TYPE: 'git',
    REPOSITORY_URL: 'https://github.com/ClementNerma/SilverNight-draft',
    README: "# SilverNight\n\nSyntax highlighting package for the [SilverNight language](https://github.com/ClementNerma/SilverNight-draft).",

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

    // Visual Studio Code specific variables
    execPath: '${execPath}',
    workspaceRoot: '${workspaceRoot}'
  },

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
              match: /\b(NOTE|TODO|FIXME|BUG)\b/,
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
              match: /\b(NOTE|TODO|FIXME|BUG)\b/,
              name: '${purple}'
            },
            {
              match: /(@(?:param|template))\s+([a-zA-Z_][a-zA-Z0-9_\$]*)\s+/,
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
              match: /\b(NOTE|TODO|FIXME|BUG)\b/,
              name: '${purple}'
            }
          ]
        },
        [
          // Numerical bounds
          /[a-zA-Z0-9_\.\$]+\.\.\.?[a-zA-Z0-9_\.\$]+/,
          'orange'
        ],
        [
          // Booleans
          /\b(true|false)\b/,
          'orange'
        ],
        [
          // Constant numbers
          /(?<!\.)\b(0_*d_*)?(\d_*)+(\._*(\d_*)+)?\b/,
          'orange'
        ],
        [
          // Constant binary numbers
          /(?<!\.)\b0_*b_*(([01]_*)+)(\._*([01]_*)+)?\b/,
          'orange'
        ],
        [
          // Constant octal numbers
          /(?<!\.)\b0_*o_*(([0-7]_*)+)(\._*([0-7]_*)+)?\b/,
          'orange'
        ],
        [
          // Constant hexadecimal numbers
          /(?<!\.)\b0_*x_*(([a-zA-Z0-9]_*)+)(\._*([a-zA-Z0-9]_*)+)?\b/,
          'orange'
        ],
        [
          // Single-line strings
          // Taken from: http://blog.stevenlevithan.com/archives/match-quoted-string
          /(["'])(?:(?=(\\?))\2.)*?\1/,
          "green"
        ],
        {
          // Multi-line strings
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
            }
          ],
          name: '${green}'
        },
        {
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
          // Null value and null pointer
          /\b(null)\b/,
          'orange'
        ],
        [
          // Class references
          /\b(this|self|super)\b/,
          'yellow'
        ],
        [
          // Declaration of variables
          /\b(let)\s+([a-zA-Z_][a-zA-Z0-9_\$]*)\b/,
          'purple', 'cyan'
        ],
        [
          // Declaration of constants (plain or not)
          /(val|pln)\s+([a-zA-Z_][a-zA-Z0-9_\$]*)\b/,
          'purple', 'orange'
        ],
        [
          // Type symbol
          /(?<!:)(:)/,
          'cyan'
        ],
        [
          // Other types
          /(?<!:)(:)\s*([a-zA-Z_][a-zA-Z0-9_\$]*)\b/,
          'cyan', 'yellow'
        ],
        [
          // Lazy overloads
          /\b(public)\s+(pln)\s+(%)(lazy_(?:clone|serialize|unserialize|serial_fields))(?=\s*=)/,
          'purple', 'purple', 'red', 'cyan'
        ],
        [
          // Declaration statement in classes for constants (plain or not)
          /\b(public|protected|private)\s+(static\s+)?(?!(?:func|getter|setter|struct)\s+)(readonly\s+)?(val|pln)\s+([a-zA-Z_][a-zA-Z0-9_\$]*)\b/,
          'purple', 'purple', 'purple', 'purple', 'orange'
        ],
        [
          // Setters/getters declaration
          /\b(public|protected|private)(\s+static)?(\s+macro)?(\s+async)?(\s+iter)?\s+(getter|setter)\s+([a-zA-Z\$_][a-zA-Z0-9\$_]*)\b/,
          'purple', 'purple', 'purple', 'purple', 'purple', 'purple', 'cyan'
        ],
        [
          // Declaration statement in classes for not-assignable entities
          /\b(public|protected|private)(\s+static)?(?=\s+struct|interface|trait)/,
          'purple', 'purple', 'purple'
        ],
        [
          // Declaration statement in classes for functions
          /\b(public|protected|private)(\s+static)?(\s+macro)?(\s+async)?(\s+iter)?(?=\s+func)/,
          'purple', 'purple', 'purple', 'purple'
        ],
        [
          // Declaration statement in classes for assignable entities
          /\b(public|protected|private)\s+(static\s+)?(?!(?:func|getter|setter|struct)\s+)(readonly\s+)?([a-zA-Z_][a-zA-Z0-9_\$]*)\b/,
          'purple', 'purple', 'purple', 'cyan'
        ],
        [
          // Overload declaration
          /\b(func|public|protected|private)\s+(static\s+)?(%)([a-zA-Z_][a-zA-Z0-9_]+)\b/,
          'purple', 'purple', 'red', 'cyan'
        ],
        [
          // Entity's name
          /\b(struct|class|type|dict|namespace|package|trait|interface)\s+([a-zA-Z_][a-zA-Z0-9_\$]*)\b/,
          'purple', 'yellow'
        ],
        [
          // Match variable (_)
          /\b_\b/,
          'purple'
        ],
        [
          // Macro declaration
          /\b(macro)\s+(func)\s+([a-zA-Z_][a-zA-Z0-9_\$]*)\s*(\!)/,
          'purple', 'purple', 'cyan', 'orange'
        ],
        [
          // Invalid declaration
          /\b(macro)\s+(func)\s+([a-zA-Z_][a-zA-Z0-9_\$]*)(?!\s*\!)/,
          'purple', 'purple', 'invalid'
        ],
        [
          // Function declaration
          /\b(func|lambda)\s+([a-zA-Z_][a-zA-Z0-9_\$]*)\b/,
          'purple', 'blue'
        ],
        [
          // Function call with template
          /\b([a-zA-Z_][a-zA-Z0-9_\$]*)(?=\s*<.*>\s*\()/,
          'blue'
        ],
        [
          // Arrow function
          /(=>)/,
          'purple'
        ],
        [
          // Directional symbol
          /(->)/,
          'purple'
        ],
        [
          // Pointers
          /([\*&])(mut)?/,
          'cyan', 'purple'
        ],
        [
          // Logical operators
          /(<=|>=|<|>|==|!=|&&|\|\|)/,
          'cyan'
        ],
        [
          // Alphabetic logical operators
          /\b(is|isnt|and|or|nor|xor|not|nand|nor)\b/,
          'purple'
        ],
        [
          // Math assignments
          /(\+|-|\/|\*|%|\^|\*\*|<<|>>|\.|\?)?=/,
          'cyan'
        ],
        [
          // Math operators
          /(\+|-|\/|\*|%|\^|\*\*|<<|>>|\?)/,
          'cyan'
        ],
        {
          // Instanciation
          begin: /\b(new)\b/,
          beginCaptures: {
            '1': {
              name: '${purple}'
            }
          },
          patterns: [
            {
              match: /([a-z_][a-zA-Z0-9_\$]*)(::)/,
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
          end: /([a-zA-Z_][a-zA-Z0-9_\$]*)(?=\s*[^ :a-zA-Z0-9_\$])/,
          endCaptures: {
            '1': {
              name: '${yellow}'
            }
          }
        },
        [
          // Inheritance and aliases
          /\b(extends|from|as)\s+([a-zA-Z_][a-zA-Z0-9_\$\.]*)\b/,
          'purple', 'green'
        ],
        [
          // Implementation
          /\b(implements)\s+([a-zA-Z_][a-zA-Z0-9_\$\.]*)((?:\s*,\s*[a-zA-Z_][a-zA-Z0-9_\$\.]*)*)\b/,
          'purple', 'green', 'green'
        ],
        [
          // Implementation of traits
          /\b(use)\s+([a-zA-Z_][a-zA-Z0-9_\$\.]*)(\s*,\s*([a-zA-Z_][a-zA-Z0-9_\$\.]*))*\s*;/,
          'purple', 'green', 'white', 'green'
        ],
        [
          // 'instanceof' operator (special types)
          /\b(instanceof)\s+(void|self|Any|class_ref|func_ref|var_ref|macro_ref|lambda|T|X|Y|Z|K|V)\b/,
          'purple', 'purple'
        ],
        [
          // 'instanceof' operator
          /\b(instanceof)\s+([a-zA-Z_][a-zA-Z0-9_\$\.]*)\b/,
          'purple', 'yellow'
        ],
        [
          // IMPORT macro call (closed or not)
          /\b(import!)\s*\((?:\s*([a-zA-Z_][a-zA-Z0-9_]*(?:(::)[a-zA-Z_][a-zA-Z0-9_]*)*)\s*[\)]?)?/,
          'purple', 'green', 'cyan'
        ],
        {
          // Instanciation
          begin: /\b(scope\s+)?(import)\s+\b/,
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
              match: /([a-z_][a-zA-Z0-9_\$]*)(?=::)/,
              captures: {
                '1': {
                  name: '${green}'
                }
              }
            },
            {
              match: /(::)([a-z_][a-zA-Z0-9_\$]*)/,
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
              match: /([a-z_][a-zA-Z0-9_\$]*)(?=\s*[,;]|\s*from)/,
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
            }
          ],
          end: /\s*(?=;|from)/,
          endCaptures: {}
        },
        [
          // Usage of a package/module
          /\b([a-z_][a-zA-Z0-9_]*)(::)\b/,
          'green', 'cyan'
        ],
        [
          // Native types and classes
          /\b(bool|u?int(?:|1|8|16|32|64)|u?byte|float|double|string|Primitive|BooleanConvertible|IntegerConvertible|FloatConvertible|NumberConvertible|Stringifyable|Clonable|Freezable|Serializable|Randomizable|Primitivable|Collection|Dictionary|Vector|Array|List|Error|ErrorStep|RegExp|console)(\?)?\b/,
          'yellow', 'cyan'
        ],
        [
          // Special native types
          /(?<!\.)\b(void|self|Any|class_ref|func_ref|var_ref|macro_ref|lambda|T|X|Y|Z|K|V)(?!\s*:)\b/,
          'purple', 'cyan'
        ],
        [
          // Key + value iterators in `for`
          /(for)(?:\s*\(\s*|\s+)([a-zA-Z_][a-zA-Z0-9_\$]*)\s*(->)\s*([a-zA-Z_][a-zA-Z0-9_\$]*)(?:\s+(in)\s+([a-zA-Z_][a-zA-Z0-9_\$]*))?\b/,
          'purple', 'cyan', 'purple', 'cyan', 'purple', 'orange'
        ],
        [
          // Iterator in `for`
          /(for)(?:\s*\(\s*|\s+)([a-zA-Z_][a-zA-Z0-9_\$]*)(?:\s+(in)\s+([a-zA-Z_][a-zA-Z0-9_\$]*))?\b/,
          'purple', 'cyan', 'purple', 'orange'
        ],
        [
          // Keywords
          /(?<!\.)\b(func|lambda|do|if|else|elsif|for|while|loop|unless|until|break|continue|when|default|try|catch)(?!\s*:)\b/,
          'purple'
        ],
        [
          // Keywords needing a separator
          /(?<!\.)\b(let|pln|val|public|protected|private|friend|static|abstract|final|unique|virtual|extern|readonly|in|export|return|async|iter|yield|macro|await|resolve|reject|throw|with|new|include)(?=\s+|$)/,
          'purple'
        ],
        [
          // Already specified keywords, written here to have partial syntax highlighting
          /(?<!\.)\b(struct|class|type|dict|package|trait|interface|implements|extends|scope|import|from|instanceof)(?!\s*:)\b/,
          'purple'
        ],
        [
          // Types and classes from oftenly-used packages
          /\b(DOM|document|window|Element)\b/,
          'yellow'
        ],
        [
          // Macros call
          /\b([a-zA-Z_][a-zA-Z0-9_\$]*)\!(?=\s*\()/,
          'cyan'
        ],
        [
          // Functions call
          /\b([a-zA-Z_][a-zA-Z0-9_\$]*)(?=\s*\()/,
          'blue'
        ],
        [
          // Macros name, with template
          /\b([a-zA-Z_][a-zA-Z0-9_\$]*\!)(?=\s*<(.*?)>\s*)/,
          'cyan'
        ],
        [
          // Constants
          /\b([A-Z_\$][A-Z0-9_\$]*)\b/,
          'orange'
        ],
        [
          // Static operator for classes
          /\b([A-Z][a-zA-Z0-9_\$]*)(::)(?=[a-zA-Z_])/,
          'yellow', 'cyan'
        ],
        [
          // Arguments expansion
          /\b[a-zA-Z_][a-zA-Z0-9_\$]*\.\.\./,
          'red'
        ],
        [
          // Array of type
          /\b([A-Z][a-zA-Z0-9_\$]*)(\?)?(?=\s*\[)/,
          'yellow', 'cyan'
        ],
        [
          // Object followed by a child property
          /(@?[a-zA-Z_][a-zA-Z0-9_\$]*)(\?)?(?=[\.\[])/,
          'red', 'cyan'
        ],
        [
          // Classes' native functions' call
          /(\.)(construct|free|toBoolean|toString|toInteger|toFloat|get|set|unset|has|keys|values|toNumber|plus|less|times|divide|modulo|pow|equal|inequal|greater|smaller|truncate|round|fPart|approx|charAt|charCodeAt|codePointAt|count|cut|endsWith|firstWord|indexOf|isInteger|isFloat|lastIndexOf|lastWord|includes|isIn|repeat|startsWith|split|substr|toBase64|toArray|toList|toLowerCase|toUpperCase|trim|trimLeft|trimRight|withoutAccents|word|words|set|get|has|fill|fillDynamic|filter|forEach|join|map|random|reduce|slice|unset|concat|pop|push|clear|reverse|shift|sort|shuffle|splice|unshift|isEqualTo|merge|then|catch|addFlag|removeFlag|getGroups|match|matchAll)(?=(?:\s*<(.*?)>)?\s*\()/,
          'white', 'cyan'
        ],
        [
          // Object's function's call
          /(\.)([a-zA-Z_][a-zA-Z0-9_\$]*)(?=\s*\()/,
          'white', 'blue'
        ],
        [
          // Object's function's call with a template
          /(\.)([a-zA-Z_][a-zA-Z0-9_\$]*)(?=\s*<(.*?)>\s*\s*\()/,
          'white', 'blue'
        ],
        [
          // Object's macro function's call
          /(\.)([a-zA-Z_][a-zA-Z0-9_\$]*!)(?=\s*\()/,
          'white', 'cyan'
        ],
        [
          // Object's macro function's call with a template
          /(\.)([a-zA-Z_][a-zA-Z0-9_\$]*!)(?=\s*<(.*?)>\s*\s*\()/,
          'white', 'cyan'
        ],
        [
          // Object's *constant* property
          /(\.)([A-Z_\$][A-Z0-9_\$]*)(?=\b)/,
          'white', 'orange'
        ],
        [
          // Object's property
          /(\.)([a-zA-Z_][a-zA-Z0-9_\$]*)/,
          'white', 'red'
        ],
        [
          // Object's function's call
          /(@)([a-zA-Z_][a-zA-Z0-9_\$]*)(\?)?(?=\s*\()/,
          'red', 'blue', 'cyan'
        ],
        [
          // Object's function's call with a template
          /(@)([a-zA-Z_][a-zA-Z0-9_\$]*)(\?)?(?=\s*<(.*?)>\s*\s*\()/,
          'red', 'blue', 'cyan'
        ],
        [
          // Object's *constant* property
          /(@)([A-Z_\$][A-Z0-9_\$]*)(\?)?(?=\s*[[\.]|@]\b)/,
          'red', 'orange', 'cyan'
        ],
        [
          // Object's property
          /(@)([a-zA-Z_][a-zA-Z0-9_\$]*)/,
          'red'
        ],
        [
          // Object property
          /(@[a-zA-Z_][a-zA-Z0-9_\$]*)\b/,
          'red'
        ],
        [
          // Object assignment symbol
          /:/,
          'cyan'
        ],
        [
          // Infinite values notation
          /\.\.\.[a-zA-Z_][a-zA-Z0-9_\$]*\b/,
          'red'
        ],
        [
          // Constrained types
          /\b([a-zA-Z_][a-zA-Z0-9_\$]*)(\?)?\s+(?=with\s+\()/,
          'yellow', 'cyan'
        ],
        [
          // Head directives
          /#\[(module|extern)\] *;/,
          'orange'
        ],
        [
          // Line directives
          /#(growable) *;/,
          'orange'
        ],
        [
          // Inline directives
          /#(alias|bind|makebindings|raw_indent|if|elsif|else|end|wrap|string)\b/,
          'orange'
        ],
        [
          // Inclusion directive
          /#include/,
          'purple'
        ],
        [
          // Type directives for macros
          /#(raw|var|noptr|name|reduced)\b/,
          'purple'
        ],
        [
          // Typed directives with templates for macros
          /#(pln|mustbe)(?=\s*<)/,
          'purple'
        ],
        [
          // All other directives
          /#([a-zA-Z_][a-zA-Z0-9_\$]+)( *;)?/,
          'invalid'
        ],
        [
          // Type names
          /\b([A-Z][a-zA-Z0-9_\$]*)\b/,
          'yellow'
        ],
        [
          // Macro arguments
          /(?<![a-zA-Z0-9_\$])(\$[a-zA-Z_][a-zA-Z0-9_\$]*)(?![a-zA-Z0-9_\$])/,
          'purple'
        ]
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