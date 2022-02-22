import _ from 'lodash';
import Logger from './modules/Logger';
import LoggerLevel from './modules/LoggerLevel';

export default class WinstonLogger extends Logger {
  // category, level, levels, meta, formatter, consoleArg
  constructor(category, level, levels, meta, winston, options) {
    super(category, level, levels);
    this.winston = winston;
    if (!this.winston) {
      throw new Error('winston is required');
    }
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
    this.winstonLogger = winston.createLogger(this.options);

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
    this.winstonLogger = this.winston.createLogger(this.options);
  }

  log(level, message, meta) {
    const metaWithCategory = _.assignIn({}, _.assignIn(meta, { category: this.category }));
    this.winstonLogger.log({ level, message, meta: metaWithCategory });
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
}
