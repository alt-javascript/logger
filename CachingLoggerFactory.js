const ConfigurableLogger = require('./ConfigurableLogger');
const CachingConsole = require('./CachingConsole');
const ConsoleLogger = require('./ConsoleLogger');
const LoggerFactory = require('./LoggerFactory');


module.exports = class CachingLoggerFactory extends LoggerFactory {

    static getLogger(category, configArg, configPath, cache) {
        let _configArg = (typeof category == 'object' ? category : configArg);
        let _category = (typeof category == 'object' ? '' : category);
        return new ConfigurableLogger(LoggerFactory.detectConfig(_configArg),
            new ConsoleLogger(_category,
                null,null,null,
                LoggerFactory.getFormatter(_configArg),
                new CachingConsole()),
            category,
            configPath,
            cache || LoggerFactory.loggerCategoryCache);
    }

    constructor(config, cache, configPath) {
        super (config, cache, configPath)
        CachingLoggerFactory.prototype.getFormatter = LoggerFactory.prototype.getFormatter;
    }

    getLogger(category) {
        return new ConfigurableLogger(this.config,
            new ConsoleLogger(category,
                null,null,null,
                this.getFormatter(this.config),
                new CachingConsole()),
            category,
            this.configPath,
            this.cache);
    }
};
