/* eslint-disable import/extensions */
import Logger from './Logger.js';
import LoggerLevel from './LoggerLevel.js';
import JSONFormatter from './JSONFormatter.js';

export default class ConsoleLogger extends Logger {
  constructor(category, level, levels, meta, formatter, consoleArg) {
    super(category, level, levels);
    this.formatter = formatter || new JSONFormatter();
    this.meta = meta || {};
    this.console = consoleArg || console;

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
      this.console.log(this.formatter.format((new Date()), this.category, level, message, meta));
    }
  }

  debug(message, meta) {
    if (this.levels[LoggerLevel.DEBUG] <= this.level) {
      // eslint-disable-next-line no-console
      this.console.debug(
        this.formatter.format((new Date()), this.category, LoggerLevel.DEBUG, message, meta),
      );
    }
  }

  verbose(message, meta) {
    if (this.levels[LoggerLevel.VERBOSE] <= this.level) {
      // eslint-disable-next-line no-console
      this.console.info(
        this.formatter.format((new Date()), this.category, LoggerLevel.VERBOSE, message, meta),
      );
    }
  }

  info(message, meta) {
    if (this.levels[LoggerLevel.INFO] <= this.level) {
      // eslint-disable-next-line no-console
      this.console.info(
        this.formatter.format((new Date()), this.category, LoggerLevel.INFO, message, meta),
      );
    }
  }

  warn(message, meta) {
    if (this.levels[LoggerLevel.WARN] <= this.level) {
      // eslint-disable-next-line no-console
      this.console.warn(
        this.formatter.format((new Date()), this.category, LoggerLevel.WARN, message, meta),
      );
    }
  }

  error(message, meta) {
    if (this.levels[LoggerLevel.ERROR] <= this.level) {
      // eslint-disable-next-line no-console
      this.console.error(
        this.formatter.format((new Date()), this.category, LoggerLevel.ERROR, message, meta),
      );
    }
  }

  fatal(message, meta) {
    if (this.levels[LoggerLevel.FATAL] <= this.level) {
      // eslint-disable-next-line no-console
      this.console.error(
        this.formatter.format((new Date()), this.category, LoggerLevel.FATAL, message, meta),
      );
    }
  }
}
