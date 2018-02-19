
// Set up a list of available books
const books = {
  'hybrid': { title: 'The Hybrid Book', skill: 'advanced users' }
};

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
    // Get the book's name
    const name = self.argv.book;

    // If no book was specified...
    if (! name)
      // ERROR
      error('No book name provided', 6);
   
    // If the book is unknown...
    if (! books.hasOwnProperty(name))
      // ERROR
      error(`Unknown book "${name}"`, 7);

    // Determine its path
    let book_path = `docs/books/${name}.md`;

    // If the file does not exist...
    if (! fileExists(book_path))
      // ERROR
      error(`File not found for book "${name}" (expecting file at "${book_path}")`, 6);
    
    // Try to read the book's file
    let source;

    try {
      source = readFile(book_path);
    } catch (e) {
      // ERROR
      error(`Failed to read file for book "${name}"`, 7, e);
    }
  }
};
