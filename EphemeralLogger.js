const Logger = require('./Logger');
const LoggerLevel = require('./LoggerLevel');
const JSONFormatter = require('./JSONFormatter');
const EphemeralLogSink = require('./EphemeralLogSink');

module.exports = class EphemeralLogger extends Logger {

  constructor(category,level, formatter, meta, levels) {
    super(category,level,levels);
    this.formatter = formatter || new JSONFormatter();
    this.meta = meta || {};
    this.sink = new EphemeralLogSink();

    EphemeralLogger.prototype.setLevel = Logger.prototype.setLevel;
    EphemeralLogger.prototype.isLevelEnabled = Logger.prototype.isLevelEnabled;
    EphemeralLogger.prototype.isDebugEnabled = Logger.prototype.isDebugEnabled;
    EphemeralLogger.prototype.isVerboseEnabled = Logger.prototype.isVerboseEnabled;
    EphemeralLogger.prototype.isInfoEnabled = Logger.prototype.isInfoEnabled;
    EphemeralLogger.prototype.isWarnEnabled = Logger.prototype.isWarnEnabled;
    EphemeralLogger.prototype.isErrorEnabled = Logger.prototype.isErrorEnabled;
    EphemeralLogger.prototype.isFatalEnabled = Logger.prototype.isFatalEnabled;
  }

  log(level, message, meta) {
    if (this.levels[level] <= this.level) {
      this.sink.log(this.formatter.format((new Date()),this.category,level,message,meta));
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
