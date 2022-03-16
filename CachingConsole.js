export default class CachingConsole {
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

  debug(line) {
    this.cache.push(line);
    if (this.cache.length > this.size) {
      this.cache.shift();
    }
    if (!this.quiet) {
      // eslint-disable-next-line no-console
      console.debug(line);
    }
  }

  info(line) {
    this.cache.push(line);
    if (this.cache.length > this.size) {
      this.cache.shift();
    }
    if (!this.quiet) {
      // eslint-disable-next-line no-console
      console.info(line);
    }
  }

  warn(line) {
    this.cache.push(line);
    if (this.cache.length > this.size) {
      this.cache.shift();
    }
    if (!this.quiet) {
      // eslint-disable-next-line no-console
      console.warn(line);
    }
  }

  error(line) {
    this.cache.push(line);
    if (this.cache.length > this.size) {
      this.cache.shift();
    }
    if (!this.quiet) {
      // eslint-disable-next-line no-console
      console.error(line);
    }
  }

  clear() {
    this.cache = [];
  }
}
