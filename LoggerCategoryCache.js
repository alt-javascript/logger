module.exports = class LoggerCategoryCache {
  constructor() {
    this.cache = {};
  }

  get(category) {
    return this.cache[category];
  }

  add(category, level) {
    this.cache[category] = level;
  }
};
