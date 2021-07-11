const _ = require('lodash');
const Logger = require('./Logger');
const LoggerLevel = require('./LoggerLevel');

module.exports = class ConsoleLogger extends Logger {
  constructor(level, meta, levels) {
    super(levels, level);
    this.meta = meta || {};

    ConsoleLogger.prototype.setLevel = Logger.prototype.setLevel;
    ConsoleLogger.prototype.isLevelEnabled = Logger.prototype.isLevelEnabled;
    ConsoleLogger.prototype.isDebugEnabled = Logger.prototype.isDebugEnabled;
    ConsoleLogger.prototype.isVerboseEnabled = Logger.prototype.isVerboseEnabled;
    ConsoleLogger.prototype.isInfoEnabled = Logger.prototype.isInfoEnabled;
    ConsoleLogger.prototype.isWarnEnabled = Logger.prototype.isWarnEnabled;
    ConsoleLogger.prototype.isErrorEnabled = Logger.prototype.isErrorEnabled;
    ConsoleLogger.prototype.isFatalEnabled = Logger.prototype.isFatalEnabled;
  }

  log(level, message, meta) {
    if (this.levels[level] <= this.level) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(
        _.assignIn({ level, message, timestamp: (new Date()) },
          _.assignIn(meta, this.meta)),
      ));
    }
  }

  debug(message, meta) {
    this.log(LoggerLevel.DEBUG, message, meta);
  }

  verbose(message, meta) {
    this.log(LoggerLevel.VERBOSE, message, meta);
  }

  info(message, meta) {
    this.log(LoggerLevel.INFO, message, meta);
  }

  warn(message, meta) {
    this.log(LoggerLevel.WARN, message, meta);
  }

  error(message, meta) {
    this.log(LoggerLevel.ERROR, message, meta);
  }

  fatal(message, meta) {
    this.log(LoggerLevel.FATAL, message, meta);
  }
};
