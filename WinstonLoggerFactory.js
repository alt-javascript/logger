/* eslint-disable import/extensions */
import ConfigurableLogger from './ConfigurableLogger.js';
import LoggerFactory from './LoggerFactory.js';
import WinstonLogger from './WinstonLogger.js';

export default class WinstonLoggerFactory {
  static getLogger(category, config, winston, options, configPath, cache) {
    // constructor(category, level, levels, meta, winston, options)
    return new ConfigurableLogger(config,
      new WinstonLogger(category, null, null, null, winston, options),
      category,
      configPath,
      cache || LoggerFactory.loggerCategoryCache);
  }

  constructor(config, winston, options, cache, configPath) {
    this.config = config;
    this.winston = winston;
    this.options = options;
    this.cache = cache;
    this.configPath = configPath;
  }

  getLogger(category) {
    return new ConfigurableLogger(this.config,
      new WinstonLogger(category, null, null, null, this.winston, this.options),
      category,
      this.configPath,
      this.cache);
  }
}
