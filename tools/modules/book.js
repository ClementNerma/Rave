
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

    // Remove all comments from the source
    source = source.replace(/<!--((.|\r\n|\r|\n)*?)-->/g, '');

    // Load the "markdown-it" module
    const mdIt = require('markdown-it')({});

    // Is a section opened?
    let opened = false;

    // Generate the sections
    let sections = [];

    // The section buffer
    let sectionBuff = [];

    // The title buffer
    let titleBuff = [];

    // The main title
    let mainTitle;

    // The last title's slug
    let lastSlug = '';

    // Make a counter for each level of title
    let counter = [0, 0, 0, 0, 0];

    // Is this the first section?
    let firstSection = true;

    // For each line in the source code...
    for (let line of source.split(/\r\n|\r|\n/g).concat('## END OF FILE') /* To close the last section */) {
      // If this is a title...
      if (line.startsWith('#')) {
        // Use a RegExp to extract informations from it
        const match = line.match(/^(#+) *(.*)$/);

        // Get the title's depth
        const depth = match[1].length;

        // Get the title's content
        const title = match[2];

        // Generate a slug for this title
        const slug = title.toLocaleLowerCase()
          // Replace spaces by dashes
          .replace(/ /g, '-')
          // Remove special characters
          .replace(/[^a-z0-9-_]/g, '');

        // If this is not the main title
        // and if the buffer is not empty...
        if (depth >= 2) {
          // Generate the HTML associated to the buffer
          const html = mdIt.render(titleBuff.join('\n'));

          // If the HTML is not empty...
          if (html.trim())
            // Push the title buffer the output
            sectionBuff.push({
              _CONTENT: true,
              html
            });

          // Reset the section buffer
          titleBuff = [];
        }

        // If this is a section's title
        if (depth === 2) {
          // If this is the first one...
          if (firstSection)
            // Remove the "first section" marker
            firstSection = false;
          // Else...
          else {
            // Push the section buffer to the output
            sections.push({
              slug: lastSlug,
              content: sectionBuff
            });

            // Reset the section buffer
            sectionBuff = [];
          }

          // Remember this title's slug
          lastSlug = slug;
        }

        // If this is NOT the main title...
        if (depth !== 1) {
          // Increase the counter for this level of title
          counter[depth] ++;

          // For every counter with a level higher than this one...
          for (let i = depth + 1; i < counter.length; i++)
            // Reset the counter
            counter[i] = 0;
        }

        // Make the title's object
        let title_obj = {
          _TITLE: true,
          text: mdIt.renderInline(title), // Without the "<p>...</p>" wrapping
          slug,
          depth,
          depth_dec: depth - 1,
          prettydepth: (depth === 1) ? '0.' : counter.filter(c => c > 0).join('.') + '.'
        };

        // If this is the main title...
        if (depth === 1)
          // Set it as the main title's object
          mainTitle = title_obj;
        else
          // Push it into the section buffer
          sectionBuff.push(title_obj);
      }

      // Else...
      else
        // Push it to the buffer
        titleBuff.push(line);
    }
  }
};
