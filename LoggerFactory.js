const ConfigurableLogger = require('./ConfigurableLogger');
const ConsoleLogger = require('./ConsoleLogger');
const LoggerCategoryCache = require('./LoggerCategoryCache');
const JSONFormatter = require('./JSONFormatter');
const PlainTextFormatter = require('./PlainTextFormatter');

module.exports = class LoggerFactory {
    static loggerCategoryCache = new LoggerCategoryCache();

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
      if (global?.boot?.contexts?.root?.config) {
        $config = global.boot.contexts.root.config;
      }
      if (LoggerFactory.detectBrowser() && window?.config) {
        $config = window.config;
      }
      if (LoggerFactory.detectBrowser() && window?.boot?.contexts?.root?.config) {
        $config = window.boot.contexts.root.config;
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
      if (global?.boot?.contexts?.root?.loggerFactory) {
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

    getLogger(category) {
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
};
