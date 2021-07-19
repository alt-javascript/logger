const ConfigurableLogger = require('./ConfigurableLogger');
const CachingConsole = require('./CachingConsole');
const ConsoleLogger = require('./ConsoleLogger');
const LoggerFactory = require('./LoggerFactory');


module.exports = class CachingLoggerFactory extends LoggerFactory {

    static getLogger(category, configArg, configPath, registry) {
        let _configArg = (typeof category == 'object' ? category : configArg);
        let _category = (typeof category == 'object' ? '' : category);
        return new ConfigurableLogger(LoggerFactory.detectConfig(_configArg),
            new ConsoleLogger(_category,
                null,null,null,
                LoggerFactory.getFormatter(_configArg),
                new CachingConsole()),
            category,
            configPath,
            registry || LoggerFactory.loggerRegistry);
    }

    constructor(config, registry, configPath) {
        super (config, registry, configPath)
        CachingLoggerFactory.prototype.getFormatter() = LoggerFactory.prototype.getFormatter();
    }

    getLogger(category) {
        return new ConfigurableLogger(this.config,
            new ConsoleLogger(category,
                null,null,null,
                this.getFormatter(_configArg),
                new CachingConsole()),
            category,
            this.configPath,
            this.registry);
    }
};
