// Enable strict mode
"use strict";

// Export the scheme
scheme = {
  constants: {
    // Define build constants
    LANGUAGE: 'SilverNight',
    LOWERCASE_LANGUAGE: 'silvernight',
    EXTENSION: 'sn',
    VERSION: '0.8.2',
    LICENSE: 'MIT',
    REPOSITORY_TYPE: 'git',
    REPOSITORY_URL: 'https://github.com/ClementNerma/SilverNight',
    README: "# SilverNight\n\nSyntax highlighting package for the [SilverNight language](https://github.com/ClementNerma/SilverNight).",

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
          match: /@(note|same)\s+/,
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
      patterns: [],
      name: '${green}'
    },
    [
      // Declaration of variables
      /(?<!\.)\b(let)\s+((?:\*\s*)*)?([a-zA-Z_\$][a-zA-Z0-9_\$]*)\b/,
      'purple', 'red', 'cyan'
    ],
    [
      // Declaration of constants, frozens and values
      /(frozen|val|pln)\s+((?:\*\s*)*)?([a-zA-Z_\$][a-zA-Z0-9_\$]*)\b/,
      'purple', 'red', 'orange'
    ],
    [
      // DECLARE function, interface or class
      /(?<!\.)\b(decl)\s+(func|interface|class)\b/,
      'purple'
    ],
    [
      // DECLARE constants and frozens (plain or not)
      /(?<!\.)\b(decl)(\s+(?:public|protected|private))?\s+(val|frozen|pln)\s+((?:\*\s*)*)?([a-zA-Z_\$][a-zA-Z0-9_\$]*)\b/,
      'purple', 'purple', 'purple', 'red', 'orange'
    ],
    [
      // DECLARE
      /(?<!\.)\b(decl)(\s+(?:public|protected|private))?\s+(let)\s+((?:\*\s*)*)?([a-zA-Z_\$][a-zA-Z0-9_\$]*)\b/,
      'purple', 'purple', 'purple', 'red', 'cyan'
    ],
    [
      // Declaration statement in classes for constants and frozens (plain or not)
      /(?<!\.)\b(public|protected|private)(?!\s+(?:func|getter|setter|static|struct)\s+)\s+(val|frozen|pln)\s+((?:\*\s*)*)?([a-zA-Z_\$][a-zA-Z0-9_\$]*)\b/,
      'purple', 'purple', 'red', 'orange'
    ],
    [
      // Declaration statement in classes
      /(?<!\.)\b(public|protected|private)(?!\s+(?:func|getter|setter|static|struct)\s+)\s+(readonly\s+)?((?:\*\s*)*)?([a-zA-Z_\$][a-zA-Z0-9_\$]*)\b/,
      'purple', 'purple', 'red', 'cyan'
    ],
    [
      // Entity's name
      /(?<!\.)\b(struct|class|type|dict|namespace|package|trait|interface)\s+([a-zA-Z_\$][a-zA-Z0-9_\$]*)\b/,
      'purple', 'yellow'
    ],
    [
      // Match variable (_)
      /(?<!\.)_\b/,
      'purple'
    ],
    [
      // Function declaration with template
      /\b(func|lambda)\s+([a-zA-Z_\$][a-zA-Z0-9_\$]*)(?=\s*<)/,
      'purple', 'blue'
    ],
    [
      // Template usage
      /(?<!\.)\b(Cell)(?=<[^;]+>)/,
      'yellow'
    ],
    [
      // Plain data
      /(val)\s*(?=<[^;]+>)/,
      'purple'
    ],
    [
      // Overload declaration
      /(?<!\.)\b(func|public|protected|private|virtual)\s+(static\s+)?(@)([a-zA-Z_][a-zA-Z0-9_]+)\b/,
      'purple', 'purple', 'red', 'cyan'
    ],
    [
      // Setter/getter declaration
      /(public|protected|private)\s+(getter|setter)\s+([a-zA-Z_][a-zA-Z0-9_]+)\b/,
      'purple', 'purple', 'cyan'
    ],
    [
      // Function's or declaration's special type (not caught by the previous expressions)
      /(:)\s*((?:&\s*)*)(void|self|Any|class_ref|func_ref|var_ref|macro_ref|T|X|Y|Z|K|V)(?=\s*[\{\);=]|\s*->)/,
      'white', 'cyan', 'purple'
    ],
    [
      // Function's or declaration's (other) type
      /(:)\s*((?:&\s*)*)([a-zA-Z_\$][a-zA-Z0-9_\$]*)(?=\s*[\{\);=]|\s*->)/,
      'white', 'cyan', 'yellow'
    ],
    [
      // Arrow function
      /(->)/,
      'purple'
    ],
    [
      // Logical operators
      /(<=|>=|<|>|==|!=|&&|\|\|)/,
      'cyan'
    ],
    [
      // Declaration conditionnal operator
      /\?\?/,
      'cyan'
    ],
    [
      // Alphabetic logical operators
      /\b(is|isnt|and|or|nor|xor|not|nand|nor)\b/,
      'purple'
    ],
    [
      // Math assignments
      /(\+|-|\/|\*|%|\^|\*\*|<<|>>|\.)?=/,
      'cyan'
    ]
  ]
};
