
// Export API
let self = _module.exports = {
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
   * Build function
   * @returns {void}
   */
  build: () => {
    error(`"book" build module is not ready yet`, 6);
  }
};
