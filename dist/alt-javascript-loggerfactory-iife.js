var LoggerFactory = (function () {

  class DelegatingLogger {
    constructor(provider) {
      this.provider = provider;
      if (!this.provider) {
        throw new Error('provider is required');
      }
    }

    setLevel(level) {
      this.provider.setLevel(level);
    }

    log(level, message, meta) {
      this.provider.log(message, meta);
    }

    debug(message, meta) {
      this.provider.debug(message, meta);
    }

    verbose(message, meta) {
      this.provider.verbose(message, meta);
    }

    info(message, meta) {
      this.provider.info(message, meta);
    }

    warn(message, meta) {
      this.provider.warn(message, meta);
    }

    error(message, meta) {
      this.provider.error(message, meta);
    }

    fatal(message, meta) {
      this.provider.fatal(message, meta);
    }

    isLevelEnabled(level) {
      return this.provider.isLevelEnabled(level);
    }

    isFatalEnabled() {
      return this.provider.isFatalEnabled();
    }

    isErrorEnabled() {
      return this.provider.isErrorEnabled();
    }

    isWarnEnabled() {
      return this.provider.isWarnEnabled();
    }

    isInfoEnabled() {
      return this.provider.isInfoEnabled();
    }

    isDebugEnabled() {
      return this.provider.isDebugEnabled();
    }

    isVerboseEnabled() {
      return this.provider.isVerboseEnabled();
    }
  }

  var LoggerLevel = {
    ENUMS: {
      fatal: 0, error: 1, warn: 2, info: 3, verbose: 4, debug: 5,
    },
    DEBUG: 'debug',
    VERBOSE: 'verbose',
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error',
    FATAL: 'fatal',
  };

  /* eslint-disable import/extensions */

  class Logger {
    static DEFAULT_CATEGORY = 'ROOT'

    constructor(category, level, levels) {
      this.category = category || Logger.DEFAULT_CATEGORY;
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
  }

  /* eslint-disable import/extensions */

  class ConfigurableLogger extends DelegatingLogger {
    static DEFAULT_CONFIG_PATH = 'logging.level';

    constructor(config, provider, category, configPath, cache) {
      super(provider);
      this.config = config;
      if (!this.config) {
        throw new Error('config is required');
      }
      this.category = category || Logger.DEFAULT_CATEGORY;
      this.configPath = configPath || ConfigurableLogger.DEFAULT_CONFIG_PATH;
      this.cache = cache;
      if (!this.cache) {
        throw new Error('cache is required');
      }
      this.provider.setLevel(
        ConfigurableLogger.getLoggerLevel(
          this.category,
          this.configPath,
          this.config,
          this.cache,
        ),
      );

      ConfigurableLogger.prototype.setLevel = DelegatingLogger.prototype.setLevel;
      ConfigurableLogger.prototype.log = DelegatingLogger.prototype.log;
      ConfigurableLogger.prototype.debug = DelegatingLogger.prototype.debug;
      ConfigurableLogger.prototype.verbose = DelegatingLogger.prototype.verbose;
      ConfigurableLogger.prototype.info = DelegatingLogger.prototype.info;
      ConfigurableLogger.prototype.warn = DelegatingLogger.prototype.warn;
      ConfigurableLogger.prototype.error = DelegatingLogger.prototype.error;
      ConfigurableLogger.prototype.fatal = DelegatingLogger.prototype.fatal;

      ConfigurableLogger.prototype.isLevelEnabled = DelegatingLogger.prototype.isLevelEnabled;
      ConfigurableLogger.prototype.isDebugEnabled = DelegatingLogger.prototype.isDebugEnabled;
      ConfigurableLogger.prototype.isVerboseEnabled = DelegatingLogger.prototype.isVerboseEnabled;
      ConfigurableLogger.prototype.isInfoEnabled = DelegatingLogger.prototype.isInfoEnabled;
      ConfigurableLogger.prototype.isWarnEnabled = DelegatingLogger.prototype.isWarnEnabled;
      ConfigurableLogger.prototype.isErrorEnabled = DelegatingLogger.prototype.isErrorEnabled;
      ConfigurableLogger.prototype.isFatalEnabled = DelegatingLogger.prototype.isFatalEnabled;
    }

    static getLoggerLevel(category, configPath, config, cache) {
      let level = 'info';
      const path = configPath || ConfigurableLogger.DEFAULT_CONFIG_PATH;
      const categories = (category || '').split('/');
      let pathStep = path;

      const root = `${pathStep}./`;
      if (cache.get(root)) {
        level = cache.get(root);
      } else if (config.has(root)) {
        level = config.get(root);
        cache.put(root, level);
      }

      for (let i = 0; i < categories.length; i++) {
        pathStep = `${pathStep}${i === 0 ? '.' : '/'}${categories[i]}`;
        if (cache.get(pathStep)) {
          level = cache.get(pathStep);
        } else if (config.has(pathStep)) {
          level = config.get(pathStep);
          cache.put(pathStep, level);
        }
      }
      return level;
    }
  }

  class JSONFormatter {
    static getTag(value) {
      if (value == null) {
        return value === undefined ? '[object Undefined]' : '[object Null]';
      }
      return toString.call(value);
    }

    static isObjectLike(value) {
      return typeof value === 'object' && value !== null;
    }

    static isPlainObject(value) {
      if (!JSONFormatter.isObjectLike(value) || JSONFormatter.getTag(value) !== '[object Object]') {
        return false;
      }
      if (Object.getPrototypeOf(value) === null) {
        return true;
      }
      let proto = value;
      while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
      }
      return Object.getPrototypeOf(value) === proto;
    }

    // eslint-disable-next-line class-methods-use-this
    format(timestamp, category, level, message, meta) {
      return JSON.stringify(
        {
          level,
          message,
          timestamp,
          category,
          ...(JSONFormatter.isPlainObject(meta) ? meta : { meta }),
        },
      );
    }
  }

  /* eslint-disable import/extensions */

  class ConsoleLogger extends Logger {
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

  class LoggerCategoryCache {
    constructor() {
      this.cache = {};
    }

    get(category) {
      return this.cache[category];
    }

    put(category, level) {
      this.cache[category] = level;
    }
  }

  class PlainTextFormatter {
    // eslint-disable-next-line class-methods-use-this
    format(timestamp, category, level, message, meta) {
      return `${timestamp}:${category}:${level}:${message}${meta || ''}`;
    }
  }

  /* eslint-disable import/extensions */

  class LoggerFactory {
      static loggerCategoryCache = new LoggerCategoryCache();

      static getGlobalRef() {
        let $globalref = null;
        if (LoggerFactory.detectBrowser()) {
          $globalref = window;
        } else {
          $globalref = global;
        }
        return $globalref;
      }

      static getGlobalRoot(key) {
        const $globalref = LoggerFactory.getGlobalRef();
        let $key = ($globalref && $globalref.boot);
        $key = $key && $key.contexts;
        $key = $key && $key.root;
        $key = $key && $key[`${key}`];
        return $key;
      }

      static detectBrowser() {
        const browser = !(typeof window === 'undefined');
        return browser;
      }

      static detectConfig(configArg) {
        let $config = null;
        if (!(typeof config === 'undefined')) {
          // eslint-disable-next-line no-undef
          $config = config;
        }
        if (LoggerFactory.getGlobalRoot('config')) {
          $config = LoggerFactory.getGlobalRoot('config');
        }
        if (LoggerFactory.detectBrowser() && window?.config) {
          $config = window.config;
        }
        $config = configArg || $config;
        if ($config) {
          return $config;
        }

        throw new Error('Unable to detect config, is \'config\' declared or provided?');
      }

      static detectLoggerFactory() {
        let $loggerFactory = null;
        if (!(typeof loggerFactory === 'undefined')) {
          // eslint-disable-next-line no-undef
          $loggerFactory = loggerFactory;
        }
        if (!(typeof global === 'undefined') && global?.boot?.contexts?.root?.loggerFactory) {
          $loggerFactory = global.boot.contexts.root.loggerFactory;
        }
        if (LoggerFactory.detectBrowser() && window?.loggerFactory) {
          $loggerFactory = window.loggerFactory;
        }
        if (LoggerFactory.detectBrowser() && window?.boot?.contexts?.root?.loggerFactory) {
          $loggerFactory = window.boot.contexts.root.loggerFactory;
        }
        return $loggerFactory;
      }

      static getFormatter(configArg) {
        let format = 'json';
        const $config = this.detectConfig(configArg);
        if (LoggerFactory.detectBrowser()) {
          format = 'text';
        }
        if ($config.has('logging.format')) {
          format = $config.get('logging.format');
        }
        const formatter = (format.toLowerCase() === 'text') ? new PlainTextFormatter() : new JSONFormatter();
        return formatter;
      }

      static getLogger(category, configArg, configPath, cache) {
        const loggerFactory = this.detectLoggerFactory();
        if (loggerFactory) {
          return loggerFactory.getLogger(category);
        }
        const $configArg = (typeof category === 'object' ? category : configArg);
        const $category = (typeof category === 'object' ? '' : category);
        return new ConfigurableLogger(LoggerFactory.detectConfig($configArg),
          new ConsoleLogger($category,
            null, null, null,
            LoggerFactory.getFormatter($configArg),
            null),
          $category,
          configPath,
          cache || LoggerFactory.loggerCategoryCache);
      }

      constructor(config, cache, configPath) {
        this.config = config;
        this.cache = cache;
        this.configPath = configPath || ConfigurableLogger.DEFAULT_CONFIG_PATH;
        if (!this.config) {
          throw new Error('config is required');
        }
        if (!this.cache) {
          throw new Error('cache is required');
        }
      }

      getLogger(categoryArg) {
        const category = (typeof categoryArg === 'string') ? categoryArg
          : (categoryArg && categoryArg.qualifier)
            || (categoryArg && categoryArg.name)
            || (categoryArg && categoryArg.constructor && categoryArg.constructor.name);
        return new ConfigurableLogger(this.config,
          new ConsoleLogger(category,
            null, null, null,
            this.getFormatter(),
            null),
          category,
          this.configPath,
          this.cache);
      }

      getFormatter() {
        let format = 'json';
        if (LoggerFactory.detectBrowser()) {
          format = 'text';
        }
        if (this.config.has('logging.format')) {
          format = this.config.get('logging.format');
        }
        const formatter = (format.toLowerCase() === 'text') ? new PlainTextFormatter() : new JSONFormatter();
        return formatter;
      }
  }

  return LoggerFactory;

})();
