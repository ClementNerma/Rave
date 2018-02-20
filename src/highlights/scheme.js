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
    ]
  ]
};
