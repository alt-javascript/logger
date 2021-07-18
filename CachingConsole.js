module.exports = class CachingConsole {
  constructor(cache, size) {
    this.cache = cache || [];
    this.size = size || 1000;
  }

  log(line) {
    this.cache.unshift(line);
    if (this.cache.length > this.size) {
      this.cache.pop();
    }
    // eslint-disable-next-line no-console
    console.log(line);
  }
};
