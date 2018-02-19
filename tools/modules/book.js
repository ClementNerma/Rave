
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
      error(`File not found for book "${name}" (expecting file at "${book_path}")`, 8);
    
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

    // Generate the summary
    let summary = [];

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

        // If this is the first title...
        if (!summary.length) {
          // If this is not the main title...
          if (depth !== 1)
            // ERROR
            error(`Main title was not found in book "${name}"`, 9);
        }
        // If this is the main title
        else if (depth === 1)
          // ERROR
          error(`Duplicate main title detected for book "${name}"`, 10);

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

        // Push it to the summary
        summary.push(title_obj);

        // If this is the main title...
        if (depth === 1)
          // Set it as the main title's object
          mainTitle = title_obj;
        else
          // Push it into the section buffer
          sectionBuff.push(title_obj);
      }

      // Else, if this line is outside a section...
      else if (summary.length <= 1) {
        // If this line is not empty...
        if (line.trim())
          // ERROR
          error('Content not allowed outside sections (below ## titles and deeper)', 11);
      }

      // Else...
      else
        // Push it to the buffer
        titleBuff.push(line);
    }

    // Remove the 'END OF LINE' title from the summary
    summary.pop();

    // Determine the template folder path
    const tpl_folder_path = 'docs/books/template';

    // If the template folder is not found...
    if (! folderExists(tpl_folder_path))
      // ERROR
      error(`Template folder was not found (expecting folder at "${tpl_folder_path}")`, 12);

    // Determine the template's path
    const tpl_path = tpl_folder_path + '/index.html';

    // If the template file is not found...
    if (! fileExists(tpl_path))
      // ERROR
      error(`Template file was not found (expecting file at "${tpl_path}")`, 13);

    // Try to open the template
    let template;

    try {
      template = readFile(tpl_path);
    } catch (e) {
      // ERROR
      error(`Failed to read template file`, 14, e);
    }

    // Load the JavaScript minifier
    const babel = require('babel-core');

    // Load the CSS minifier
    const cleanCSS = new (require('clean-css'));

    // Set up wrappers for the resources
    const wrappers = {
      // JavaScript
      js: {
        left: '<script type="text/javascript">',
        right: '</script>',
        release: str => babel.transform(str, {
          presets: [
            [
              'env',
              {
                targets: {
                  browsers: ['last 5 versions']
                }
              }
            ],

            'minify'
          ]
        }).code
      },

      // CSS
      css: {
        left: '<style type="text/css">',
        right: '</style>',
        release: str => cleanCSS.minify(str).styles
      }
    };

    // Load the `handlebars` module
    const handlebars = require('handlebars');

    // Set up an helper to require files from the template
    handlebars.registerHelper('include', file => {
      // Determine the file's path
      const file_path = tpl_folder_path + '/' + file;

      // If the file is not found...
      if (! fileExists(file_path))
        // ERROR
        error(`Template's resource file "${file}" was not found`, 15);

      // Prepare a variable
      let resource;

      try {
        // Try to read the resource file
        resource = readFile(file_path);
      } catch (e) {
        // ERROR
        console.error(e);
        error(`Failed to read template's resource file "${file}"`, 16);
      }

      // Get the file extension
      const ext = (file.match(/\.([^\.]+)$/) || [''])[1].toLocaleLowerCase();

      // If a wrapper is found for this extension...
      if (wrappers.hasOwnProperty(ext)) {
        // If the release flag was provided
        // and if the wrapper has a release mode...
        if (RELEASE && wrappers[ext].release)
          // Prepare the resource for release
          resource = wrappers[ext].release(resource);

        // Wrap
        resource = wrappers[ext].left + resource + wrappers[ext].right;
      }

      // Return the resource file's content
      return resource;
    });

    // Transpile the template to HTML
    let html = handlebars.compile(template)({
      title: mainTitle,
      summary,
      sections
    });

    // Determine the output path
    const output_path = `build/books/${name}.book.html`;

    // Try to write the result in a file
    try {
      writeFile(output_path, html);
    } catch (e) {
      // ERROR
      error(`Failed to write output to the disk (attempted to write at: "${output_path}")`, 15);
    }

    // All went good :)
    success(`Book "${name}" was successfully built in "${output_path}".`);
  }
};
