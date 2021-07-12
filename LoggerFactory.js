const ConfigurableLogger = require('./ConfigurableLogger');
const ConsoleLogger = require('./ConsoleLogger');
const LoggerRegistry = require('./LoggerRegistry');

module.exports = class LoggerFactory {
    static loggerRegistry = new LoggerRegistry();

    static getLogger(category, provider, configPath, registry) {
      return new ConfigurableLogger(
        provider || new ConsoleLogger(category),
        category,
        configPath,
        registry || LoggerFactory.loggerRegistry,
      );
    }
};
