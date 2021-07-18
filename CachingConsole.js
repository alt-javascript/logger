module.exports = class CachingConsole {
  constructor(cache, size,quiet) {
    this.cache = cache || [];
    this.size = size || 1000;
    this.quiet = quiet;
  }

  log(line) {
    this.cache.unshift(line);
    if (this.cache.length > this.size) {
      this.cache.pop();
    }
    if (!this.quiet){
      // eslint-disable-next-line no-console
      console.log(line);
    }
  }
};
