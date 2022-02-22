import ConfigurableLogger from './ConfigurableLogger';
import CachingConsole from './CachingConsole';
import ConsoleLogger from './ConsoleLogger';
import LoggerFactory from './LoggerFactory';

export default class CachingLoggerFactory extends LoggerFactory {
  static getLogger(category, configArg, configPath, cache) {
    const $configArg = (typeof category === 'object' ? category : configArg);
    const $category = (typeof category === 'object' ? '' : category);
    return new ConfigurableLogger(LoggerFactory.detectConfig($configArg),
      new ConsoleLogger($category,
        null, null, null,
        LoggerFactory.getFormatter($configArg),
        new CachingConsole()),
      category,
      configPath,
      cache || LoggerFactory.loggerCategoryCache);
  }

  constructor(config, cache, configPath) {
    super(config, cache, configPath);
    CachingLoggerFactory.prototype.getFormatter = LoggerFactory.prototype.getFormatter;
  }

  getLogger(category) {
    return new ConfigurableLogger(this.config,
      new ConsoleLogger(category,
        null, null, null,
        this.getFormatter(this.config),
        new CachingConsole()),
      category,
      this.configPath,
      this.cache);
  }
}
