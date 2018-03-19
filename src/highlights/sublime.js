// Enable strict mode
"use strict";

/**
 * Convert a package object into XML
 * @param {Object} obj An object from the package file
 * @param {Number} [indent] String identation (default: 0)
 * @returns {string} Its string representation
 */
function xmlify(obj, indent = 0) {
  // The final string, as an array
  let str = [];

  // Prepare an array to list the object's property
  let props = [];

  // If the object is an array...
  if (Array.isArray(obj)) {
    // Make a counter
    let counter = 0;

    // For each key...
    for (let i = 0; i < obj.length; i ++)
      // Increment it
      props.push(i);
  } else
    // Get the object's properties
    props = Reflect.ownKeys(obj);

  // For each item...
  for (let item of props) {
    // Get the item's value
    let value = obj[item];

    // Get the value, as a string with escaped HTML entities
    let valueStr = typeof value === 'object' ? null : value
      .toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

    // If the object is NOT an array...
    if (! Array.isArray(obj))
      // Push the item as a key name
      str.push(`<key>${item}</key>`);
    
    // If it's a string...
    if (typeof value === 'boolean')
      str.push(value === true ? '<true />' : '<false />');

    // If it's a boolean...
    else if (typeof value === 'number')
      str.push(`<integer>${valueStr}</integer>`);

    // If it's a string...
    else if (typeof value === 'string')
      str.push(`<string>${valueStr}</string>`);

    // If it's an array...
    else if (Array.isArray(value)) {
      // Open a block
      str.push('<array>');
      // Treat the object
      str.push(xmlify(value, indent + 2).substr(indent));
      // Close the block
      str.push('</array>');
    }

    // If it's an object...
    else if (typeof value === 'object') {
      // Open a block
      str.push('<dict>');
      // Treat the object
      str.push(xmlify(value, indent + 2).substr(indent));
      // Close the block
      str.push('</dict>');
    }
  }

  // Make the indentation a string
  indent = ' '.repeat(indent);
  // Return the final string
  return indent + str.join('\n' + indent);
}

// Export the target
source = {
  /**
   * Build function
   * @param {Object} source The final source object
   * @param {Object} BUILD_CST The build constants
   * @returns {void}
   */
  build: (source, BUILD_CST) => {
    // Remember the .tmLanguage filename
    const tmLanguageFile = BUILD_CST.LANGUAGE + '.tmLanguage';

    // Extrat the scheme
    let scheme = JSON.parse(source.tree[tmLanguageFile]);

    

    // Treat the patterns
    source.tree[tmLanguageFile] = 
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n' +
      '<plist version="1.0">\n' +
      '  <dict>\n' +
        xmlify(scheme, 4) + '\n' +
      '  </dict>\n' +
      '</plist>';
  },

  // Installation instructions
  install: [
    "Copy \"${OUTPUT}/${LANGUAGE}.JSON-tmLanguage\" to your Sublime Text's \"Packages/User\" directory"
  ],

  // Package's content
  tree: {
    "${LANGUAGE}.tmLanguage": {
      content: {
        name: "${LANGUAGE}",
        scopeName: "source.${EXTENSION}",
        fileTypes: [
          "${EXTENSION}"
        ],
        patterns: "$INSERT_PATTERNS_Q$",
        repository: "$INSERT_REPOSITORY_Q$",
        uuid: "d22fd9c1-a4f3-4618-b8e9-28a9f2a7b2b4"
      }
    }
  }
};