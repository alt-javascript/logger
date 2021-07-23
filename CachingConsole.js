module.exports = class CachingConsole {
  static DEFAULT_SIZE = 1000;

  constructor(size, quiet) {
    this.cache = [];
    this.size = size || CachingConsole.DEFAULT_SIZE;
    this.quiet = quiet == null ? true : quiet;
  }

  log(line) {
    this.cache.push(line);
    if (this.cache.length > this.size) {
      this.cache.shift();
    }
    if (!this.quiet) {
      // eslint-disable-next-line no-console
      console.log(line);
    }
  }

  clear() {
    this.cache = [];
  }
};
