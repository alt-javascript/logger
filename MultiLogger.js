const Logger = require('./Logger');
const LoggerLevel = require('./LoggerLevel');
const JSONFormatter = require('./JSONFormatter');
const EphemeralLogSink = require('./EphemeralLogSink');

module.exports = class MultiLogger extends Logger {

  constructor(loggers, category,level, formatter, meta, levels) {
    super(category,level,levels);
    this.loggers = loggers || [];

    MultiLogger.prototype.setLevel = Logger.prototype.setLevel;
    MultiLogger.prototype.isLevelEnabled = Logger.prototype.isLevelEnabled;
    MultiLogger.prototype.isDebugEnabled = Logger.prototype.isDebugEnabled;
    MultiLogger.prototype.isVerboseEnabled = Logger.prototype.isVerboseEnabled;
    MultiLogger.prototype.isInfoEnabled = Logger.prototype.isInfoEnabled;
    MultiLogger.prototype.isWarnEnabled = Logger.prototype.isWarnEnabled;
    MultiLogger.prototype.isErrorEnabled = Logger.prototype.isErrorEnabled;
    MultiLogger.prototype.isFatalEnabled = Logger.prototype.isFatalEnabled;
  }

  log(level, message, meta) {
    if (this.levels[level] <= this.level) {
      for (let i=0;i<this.loggers.length;i++){
        this.loggers.log(level, message, meta);
      }
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
