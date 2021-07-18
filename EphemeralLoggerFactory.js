const ConfigurableLogger = require('./ConfigurableLogger');
const EphemeralLogger = require('./EphemeralLogger');
const LoggerFactory = require('./LoggerFactory');


module.exports = class EphemeralLoggerFactory extends LoggerFactory {

    static getLogger(configArg, category, configPath, registry) {
        let _configArg = (typeof category == 'string' ? configArg : category);
        return new ConfigurableLogger(LoggerFactory.detectConfig(_configArg),
            new EphemeralLogger(category,LoggerFactory.getFormatter(_configArg)),
            category,
            configPath,
            registry || LoggerFactory.loggerRegistry);
    }

    constructor(config, registry, configPath) {
        this.config = config;
        this.registry = registry;
        this.configPath = configPath;
        EphemeralLoggerFactory.prototype.getFormatter() = LoggerFactory.prototype.getFormatter();
    }

    getLogger(category) {
        return new ConfigurableLogger(this.config,
            new EphemeralLogger(category,this.getFormatter()),
            category,
            this.configPath,
            this.registry);
    }
};
