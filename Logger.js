const LoggerLevel = require('./LoggerLevel');

module.exports = class Logger {
  constructor(category, level, levels) {
    this.category = category || 'ROOT';
    this.levels = levels || LoggerLevel.ENUMS;
    this.level = this.levels[level || LoggerLevel.INFO];
  }

  setLevel(level) {
    this.level = this.levels[level || LoggerLevel.INFO];
  }

  isLevelEnabled(level) {
    return this.levels[level] <= this.level;
  }

  isFatalEnabled() {
    return this.isLevelEnabled(LoggerLevel.FATAL);
  }

  isErrorEnabled() {
    return this.isLevelEnabled(LoggerLevel.ERROR);
  }

  isWarnEnabled() {
    return this.isLevelEnabled(LoggerLevel.WARN);
  }

  isInfoEnabled() {
    return this.isLevelEnabled(LoggerLevel.INFO);
  }

  isDebugEnabled() {
    return this.isLevelEnabled(LoggerLevel.DEBUG);
  }

  isVerboseEnabled() {
    return this.isLevelEnabled(LoggerLevel.VERBOSE);
  }
};
