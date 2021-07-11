// eslint-disable-next-line import/no-extraneous-dependencies
const winston = require('winston');
const Logger = require('./Logger');
const LoggerLevel = require('./LoggerLevel');

module.exports = class WinstonLogger extends Logger {
  constructor(options, level, meta, levels) {
    super(levels, level);
    this.meta = meta;
    this.options = options || {
      level: level || 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      defaultMeta: meta || {},
      transports: [
        new winston.transports.Console(),
      ],
      levels: levels || this.levels,
    };
    this.winston = winston.createLogger(this.options);

    WinstonLogger.prototype.isLevelEnabled = Logger.prototype.isLevelEnabled;
    WinstonLogger.prototype.isDebugEnabled = Logger.prototype.isDebugEnabled;
    WinstonLogger.prototype.isVerboseEnabled = Logger.prototype.isVerboseEnabled;
    WinstonLogger.prototype.isInfoEnabled = Logger.prototype.isInfoEnabled;
    WinstonLogger.prototype.isWarnEnabled = Logger.prototype.isWarnEnabled;
    WinstonLogger.prototype.isErrorEnabled = Logger.prototype.isErrorEnabled;
    WinstonLogger.prototype.isFatalEnabled = Logger.prototype.isFatalEnabled;
  }

  setLevel(level) {
    this.level = this.levels[level || LoggerLevel.INFO];
    this.options.level = level || 'info';
    this.winston = winston.createLogger(this.options);
  }

  log(level, message, meta) {
    this.winston.log({ level, message, meta });
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
