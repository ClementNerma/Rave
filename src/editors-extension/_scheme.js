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
    VERSION: '0.2.0',
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
              match: /@superdoc\b/,
              captures: {
                '0': {
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
        [
          // Numerical bounds
          /[a-zA-Z0-9_\.\$]+(u|(?:[pfd]|u?[bsl]?))\.\.\.?[a-zA-Z0-9_\.\$]+(?:[pfd]|u?[bsl]?)/,
          'orange'
        ],
        [
          // Booleans
          /\b(true|false)\b/,
          'orange'
        ],
        [
          // Constant numbers
          /(?<!\.)\b(0_*d_*)?(\d_*)+(\._*(\d_*)+)?(?:[pfd]|u?[bsl]?)\b/,
          'orange'
        ],
        [
          // Constant binary numbers
          /(?<!\.)\b0_*b_*(([01]_*)+)(\._*([01]_*)+)?(?:[pfd]|u?[bsl]?)\b/,
          'orange'
        ],
        [
          // Constant octal numbers
          /(?<!\.)\b0_*o_*(([0-7]_*)+)(\._*([0-7]_*)+)?(?:[pfd]|u?[bsl]?)\b/,
          'orange'
        ],
        [
          // Constant hexadecimal numbers
          /(?<!\.)\b0_*x_*(([a-zA-Z0-9]_*)+)(\._*([a-zA-Z0-9]_*)+[pfd]?u?[bsl]?)\b/,
          'orange'
        ],
        {
          // Single-line strings (simple quotes)
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
          // Single-line strings (double quotes)
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
            },
            {
              include: '#strings-symbols'
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
          // Static context operator
          /\bstatic(?= *<)/,
          'purple'
        ],
        [
          // Overload context operator
          /\boverload(?= *<)/,
          'purple'
        ],
        [
          // Force to keep the following entity
          /\bkeep\b/,
          'purple'
        ],
        [
          // Declaration of variables
          /\b(let)\s+([a-zA-Z_\$][a-zA-Z0-9_\$]*)\b/,
          'purple', 'cyan'
        ],
        [
          // Declaration of constants (plain or not)
          /(val|pln|proxy\!?|bindings|prxmodel)\s+([a-zA-Z_\$][a-zA-Z0-9_\$]*)\b/,
          'purple', 'orange'
        ],
        [
          // Type symbol
          /(?<!:)(:)/,
          'cyan'
        ],
        [
          // Lazy overloads
          /\b(public)\s+(pln)\s+(%)(lazy_(?:clone|serialize|unserialize|serial_fields))(?=\s*=)/,
          'purple', 'purple', 'red', 'cyan'
        ],
        [
          // Declaration statement in classes for flexs
          /\b(public|protected|private)\s+(static\s+)?(async\s+)?(iter\s+)?(flex)\s+([a-zA-Z_\$][a-zA-Z0-9_\$]*)\b/,
          'purple', 'purple', 'purple', 'purple', 'purple', 'orange'
        ],
        [
          // Declaration statement in classes for constants (plain or not)
          /\b(public|protected|private)\s+(static\s+)?(?!(?:func|getter|setter|struct|enum)\s+)(readonly\s+)?(val|pln|proxy\!?)\s+([a-zA-Z_\$][a-zA-Z0-9_\$]*)\b/,
          'purple', 'purple', 'purple', 'purple', 'orange'
        ],
        [
          // Setters/getters declaration
          /\b(public|protected|private)(\s+static)?(\s+async)?(\s+iter)?\s+(getter|setter)\s+([a-zA-Z\$_][a-zA-Z0-9\$_]*)\b/,
          'purple', 'purple', 'purple', 'purple', 'purple', 'purple', 'cyan'
        ],
        [
          // Declaration statement in classes for not-assignable entities
          /\b(public|protected|private)(\s+static)?(?=\s+struct|enum|interface|trait)/,
          'purple', 'purple', 'purple'
        ],
        [
          // Declaration statement in classes for functions
          /\b(public|protected|private)(\s+static)?(\s+async)?(\s+iter)?(?=\s+func)/,
          'purple', 'purple', 'purple', 'purple'
        ],
        [
          // Declaration statement in classes for assignable entities
          /\b(public|protected|private)\s+(static\s+)?(?!(?:func|getter|setter|struct|enum)\s+)(readonly\s+)?([a-zA-Z_\$][a-zA-Z0-9_\$]*)\b/,
          'purple', 'purple', 'purple', 'cyan'
        ],
        [
          // Overload declaration
          /\b(func|public|protected|private)\s+(static\s+)?(%)([a-zA-Z_\$][a-zA-Z0-9_]+)\b/,
          'purple', 'purple', 'red', 'cyan'
        ],
        [
          // Overload call
          /(?<=\.)(%)([a-zA-Z_\$][a-zA-Z0-9_]+)(?=\s*\()/,
          'red', 'cyan'
        ],
        [
          // Entity's name
          /\b(struct|enum|class|type|dict|trait|interface)\s+([a-zA-Z_\$][a-zA-Z0-9_\$]*)\b/,
          'purple', 'yellow'
        ],
        [
          // Namespace declaration
          /\b(namespace)\s+([a-zA-Z_][a-zA-Z0-9_\$]*)\b/,
          'purple', 'green'
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
          // Function declaration
          /\b(func)\s+([a-zA-Z_\$][a-zA-Z0-9_\$]*)\b/,
          'purple', 'blue'
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
          /([\*&])(mut\b)?/,
          'cyan', 'purple'
        ],
        [
          // Logical operators
          /(<=|>=|<|>|==|!=|&&?|~|\|\|?)/,
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
          /\b(inherits|parentof)\s+([a-zA-Z_\$][a-zA-Z0-9_\$\.]*)\b/,
          'purple', 'green'
        ],
        [
          // Implementation (interfaces) and usage (traits)
          /\b(implements|uses)\s+([a-zA-Z_\$][a-zA-Z0-9_\$\.]*)((?:\s*,\s*[a-zA-Z_\$][a-zA-Z0-9_\$\.]*)*)\b/,
          'purple', 'green', 'green'
        ],
        [
          // Shortened typechecking
          /(~)\s*([a-zA-Z_\$][a-zA-Z0-9_\$\.]*)((?:\s*,\s*[a-zA-Z_\$][a-zA-Z0-9_\$\.]*)*)\b/,
          'cyan', 'green', 'green'
        ],
        [
          // Child checking
          /\b(haschild)\s+([a-zA-Z_\$][a-zA-Z0-9_\$\.]*)\b/,
          'purple', 'green'
        ],
        [
          // Implementation of traits
          /\b(use)\s+([a-zA-Z_\$][a-zA-Z0-9_\$\.]*)(\s*,\s*([a-zA-Z_\$][a-zA-Z0-9_\$\.]*))*\s*;/,
          'purple', 'green', 'white', 'green'
        ],
        [
          // Throw declaration
          /\b(throws)\s+([a-zA-Z_\$][a-zA-Z0-9_\$\.]*)((?:\s*,\s*[a-zA-Z_\$][a-zA-Z0-9_\$\.]*)*)\b/,
          'purple', 'green', 'green'
        ],
        [
          // Extension
          /\bextension\b/,
          'purple'
        ],
        [
          // 'instanceof' and 'instanceofsuper' operator
          /\s+(instanceof|instanceofsuper)\s+/,
          'purple'
        ],
        [
          // IMPORT flex call (closed or not)
          /\b(import!)\s*\((?:\s*(\\?[a-zA-Z_\$][a-zA-Z0-9_]*(?:(::)[a-zA-Z_\$][a-zA-Z0-9_]*)*)\s*[\)]?)?/,
          'purple', 'green', 'cyan'
        ],
        {
          // Imports
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
          // Usage of a namespace
          /((?:\b|\\?)[a-zA-Z_\$][a-zA-Z0-9_\$]*)(::)\b/,
          'green', 'cyan'
        ],
        [
          // Native types and classes
          /\b(Boolean|bool|[Nn]umber|VirtualInteger|VirtualFloatingPoint|SignedInteger|UnsignedInteger|(Unsigned?:)Integer(?:|8|16|32|64)|FloatingPoint(?:32|64)|[ui](?:8|16|32|64)|u?int|f(?:32|64)|[ui]size|[Ss]tring|Primitive|BooleanConvertible|IntegerConvertible|FloatConvertible|Numerizable|Stringifyable|Clonable|Freezable|Serializable|Randomizable|Primitivable|Collection|Dictionary|Vector|Array|List|Error|ErrorStep|RegExp|console)(\?)?\b/,
          'yellow', 'cyan'
        ],
        [
          // Special native types
          /(?<!\.)\b(void|Any|lambda|T|X|Y|Z|K|V|Class|Function|Structure|Enumeration|Interface|Trait)\b/,
          'purple', 'cyan'
        ],
        [
          // Resolution operators
          /(_this|_self|_super)(<>|\b)/,
          'purple'
        ],
        [
          // Key + value iterators in `for`
          /(for)\s+([a-zA-Z_\$][a-zA-Z0-9_\$]*)\s*(->)\s*([a-zA-Z_\$][a-zA-Z0-9_\$]*)(?:\s+(in)\s+([a-zA-Z_\$][a-zA-Z0-9_\$]*))?\b/,
          'purple', 'cyan', 'purple', 'cyan', 'purple', 'orange'
        ],
        [
          // Iterator in `for`
          /(for)\s+([a-zA-Z_\$][a-zA-Z0-9_\$]*)(?:\s*=|\s+(in|of)\s+([a-zA-Z_\$][a-zA-Z0-9_\$]*\b)?)/,
          'purple', 'cyan', 'purple', 'orange'
        ],
        [
          // Abstract classes don't exist
          /\b(abstract)\s+(public|protected|private)\s+(class)\b/,
          'invalid', 'purple'
        ],
        [
          // Virtual methods don't exist
          /\b(virtual)\s+(public|protected|private)\s+(func|iter|async)\b/,
          'invalid', 'purple'
        ],
        [
          // Keywords
          /(?<!\.)\b(func|lambda|do|if|ift|else|elsif|for|while|loop|unless|until|break|continue|match|default|try|catch|finally|segment|delete)(?!\s*:)\b/,
          'purple'
        ],
        [
          // Keywords needing a separator
          /(?<!\.)\b(let|val|pln|proxy\!?|public|protected|private|friend|static|abstract|final|unique|virtual|open|extern|readonly|in|export|return|async|iter|yield|flex|await|sync|resolve|reject|throw|with|new|include)(?=\s+|$)/,
          'purple'
        ],
        [
          // Already specified keywords, written here to have partial syntax highlighting
          /(?<!\.)\b(namespace|struct|enum|class|type|dict|trait|interface|implements|throws|use|uses|inherits|parentof|haschild|instanceofsuper|scope|import|from|instanceof)(?!\s*:)\b/,
          'purple'
        ],
        [
          // Types and classes from oftenly-used packages
          /\b(DOM|document|window|Element)\b/,
          'yellow'
        ],
        [
          // Flexs call
          /\b([a-zA-Z_\$][a-zA-Z0-9_\$]*)\!(?=\s*\()/,
          'cyan'
        ],
        [
          // Native function
          /\b(min|max|sum|free|freeze|clone|serialize|unserialize|toBoolean|toFloat|toString|toNumber|toPrimitive|get|set|unset|has|keys|values|random|is_ptr|cast|try_cast|fly_ptr|fly_mut_ptr|nullable|strict)(\!)/,
          'cyan', 'cyan'
        ],
        [
          // Functions call
          /\b([a-zA-Z_\$][a-zA-Z0-9_\$]*)(?=\s*\(|\s*<.*>\s*\()/,
          'blue'
        ],
        [
          // Flexs name, with template
          /\b([a-zA-Z_\$][a-zA-Z0-9_\$]*\!)(?=\s*<(.*?)>\s*)/,
          'cyan'
        ],
        [
          // Constants
          /\b([A-Z_\$][A-Z0-9_\$]+)\b/,
          'orange'
        ],
        [
          // Arguments expansion
          /\b[a-zA-Z_\$][a-zA-Z0-9_\$]*\.\.\./,
          'red'
        ],
        [
          // Array of type
          /\b([A-Z][a-zA-Z0-9_\$]*)(\?)?(?=\s*\[)/,
          'yellow', 'cyan'
        ],
        [
          // Static operator applied on a class
          /(@?[A-Z][a-zA-Z0-9_\$]*)(\?)?(?=[\.\[])/,
          'yellow', 'cyan'
        ],
        [
          // Object followed by a child property
          /(@?[a-z_\$][a-zA-Z0-9_\$]*)(\?)?(?=[\.\[])/,
          'red', 'cyan'
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
          // Object's flex function's call
          /(\.)([a-zA-Z_\$][a-zA-Z0-9_\$]*!)(?=\s*\()/,
          'white', 'cyan'
        ],
        [
          // Object's flex function's call with a template
          /(\.)([a-zA-Z_\$][a-zA-Z0-9_\$]*!)(?=\s*<(.*?)>\s*\s*\()/,
          'white', 'cyan'
        ],
        [
          // Object's *constant* property
          /(\.)([A-Z_\$][A-Z0-9_\$]*)(?=\b)/,
          'white', 'orange'
        ],
        [
          // Object's property
          /(\.)([a-zA-Z_\$][a-zA-Z0-9_\$]*)/,
          'white', 'red'
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
          // Object assignment symbol
          /:/,
          'cyan'
        ],
        [
          // Infinite values notation
          /\.\.\.[a-zA-Z_\$][a-zA-Z0-9_\$]*\b/,
          'red'
        ],
        [
          // Constrained types
          /\b([a-zA-Z_\$][a-zA-Z0-9_\$]*)(\?)?\s+(?=with\s+\()/,
          'yellow', 'cyan'
        ],
        [
          // Head directives
          /#\[(module|extern)\] *;/,
          'orange'
        ],
        [
          // Line directives
          /#(dict) *;/,
          'orange'
        ],
        [
          // Future attributes indicator
          /#future(?= +|\r|\n| *;)/,
          'orange'
        ],
        [
          // Super abstraction indicator
          /#superabstract(?= +|\r|\n| *;)/,
          'orange'
        ],
        [
          // Magic callable directives
          /#__magic_(?:iterate_tuple|clone|serialize|unserialize|cast|cast_unsafe|proxy|flex_proxy|is_same|import|reference_level|arguments|return_type|set_primitive|random_primitive|parse_string|todo)/,
          'orange'
        ],
        [
          // Exact type indicator
          /#=/,
          'purple'
        ],
        [
          // Class directives
          /#(supercstr)/,
          'orange'
        ],
        [
          // Inline directives
          /#(alias|bind|raw_indent|if|elsif|else|end|wrap|string)\b/,
          'orange'
        ],
        [
          // Inclusion directive
          /#include/,
          'purple'
        ],
        [
          // Type directives for flexs
          /#(raw|var|noptr|name|reduced|class)\b/,
          'purple'
        ],
        [
          // Typed directives with templates for flexs
          /#(pln|exact)(?=\s*<)/,
          'purple'
        ],
        [
          // All other directives
          /#([a-zA-Z_\$][a-zA-Z0-9_\$]+)( *;)?/,
          'invalid'
        ],
        [
          // Inferred Structured Typing dictionary symbol
          /#(?=[^a-zA-Z_])/,
          'orange'
        ],
        [
          // Type names
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