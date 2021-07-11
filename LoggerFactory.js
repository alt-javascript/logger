const ConfigurableLogger = require('./ConfigurableLogger');
const ConsoleLogger = require('./ConsoleLogger');
const LoggerRegistry = require('./LoggerRegistry');

module.exports = class LoggerFactory {
    static loggerRegistry = new LoggerRegistry();

    static getLogger(category, configPath, provider, registry) {
      return new ConfigurableLogger(
        provider || new ConsoleLogger(),
        category,
        configPath,
        registry || LoggerFactory.loggerRegistry,
      );
    }
};
