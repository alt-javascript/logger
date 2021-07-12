// eslint-disable-next-line import/no-extraneous-dependencies
const winston = require('winston');
const _ = require('lodash');
const Logger = require('./Logger');
const LoggerLevel = require('./LoggerLevel');

module.exports = class WinstonLogger extends Logger {
  constructor(category, options, level, meta, levels) {
    super(category, level, levels);
    this.meta = meta || {};
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
    const metaWithCategory = _.assignIn({}, _.assignIn(meta, { category: this.category }));
    this.winston.log({ level, message, meta: metaWithCategory });
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
