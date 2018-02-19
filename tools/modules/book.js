
// Set up a list of available books
const books = {};

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
  arguments: [
    { long: 'book', short: 'b', placeholder: 'name', inline: true, help: 'The book to build' }
  ],

  /**
   * The module's help
   * @type {Array<string>}
   */
  help: [
    'Build a book as a single HTML page',
    yellow('List of available books:\n========================\n\n') +
    Reflect.ownKeys(books)
      .map(name => green(` * ${name} - ${books[name].title} (for ${books[name].skill})`))
      .join('\n')
  ],

  /**
   * Build function
   * @returns {void}
   */
  build: () => {
    error(`"book" build module is not ready yet`, 6);
  }
};
