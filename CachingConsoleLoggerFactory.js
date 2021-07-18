const ConfigurableLogger = require('./ConfigurableLogger');
const CachingConsole = require('./CachingConsole');
const LoggerFactory = require('./LoggerFactory');


module.exports = class CachingConsoleLoggerFactory extends LoggerFactory {

    static getLogger(configArg, category, configPath, registry) {
        let _configArg = (typeof category == 'string' ? configArg : category);
        return new ConfigurableLogger(LoggerFactory.detectConfig(_configArg),
            new ConsoleLogger(category,
                LoggerFactory.getFormatter(_configArg),
                null,null,null,
                new CachingConsole()),
            category,
            configPath,
            registry || LoggerFactory.loggerRegistry);
    }

    constructor(config, registry, configPath) {
        this.config = config;
        this.registry = registry;
        this.configPath = configPath;
        CachingConsoleLoggerFactory.prototype.getFormatter() = LoggerFactory.prototype.getFormatter();
    }

    getLogger(category) {
        return new ConfigurableLogger(this.config,
            new ConsoleLogger(category,
                this.getFormatter(_configArg),
                null,null,null,
                new CachingConsole()),
            category,
            this.configPath,
            this.registry);
    }
};
