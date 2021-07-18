const ConfigurableLogger = require('./ConfigurableLogger');
const LoggerFactory = require('./LoggerFactory');
const WinstonLogger = require('./WinstonLogger');

module.exports = class WinstonLoggerFactory {

    static getLogger(category, config, winston, options, configPath, registry) {
        return new ConfigurableLogger(config,
           new WinstonLogger(category,winston,options),
          category,
          configPath,
          registry || LoggerFactory.loggerRegistry);
    }

    constructor(config,winston,options,registry, configPath) {
        this.config = config;
        this.winston = winston;
        this.options = options;
        this.registry = registry;
        this.configPath = configPath;
    }

    getLogger(category) {
        return new ConfigurableLogger(this.config,
            new WinstonLogger(category,this.winston,this.options),
            category,
            this.configPath,
            this.registry
        );
    }
};
