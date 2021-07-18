const ConfigurableLogger = require('./ConfigurableLogger');
const ConsoleLogger = require('./ConsoleLogger');
const LoggerRegistry = require('./LoggerRegistry');
const JSONFormatter = require('./JSONFormatter');
const PlainTextFormatter = require('./PlainTextFormatter');

module.exports = class LoggerFactory {
    static loggerRegistry = new LoggerRegistry();

     static detectBrowser(){
        let browser = !(typeof window == 'undefined');
        return browser;
    }

    static detectConfig(configArg){
        let outerConfig = null;
        if (!(typeof config == 'undefined')){
            outerConfig = config;
        }
        let _config = configArg || outerConfig;

        if (_config){
            return _config;
        }
        else {
            throw new Error('Unable to detect config, is \'config\' declared or provided?')
        }
    }

    static detectLoggerFactory(){
        let _loggerFactory = null;
        let outerLoggerFactory = null;
        if (global?.boot?.contexts?.root?.loggerFactory){
            _loggerFactory = global.boot.contexts.root.loggerFactory;
        }
        if (LoggerFactory.detectBrowser() && window?.boot?.contexts?.root?.loggerFactory){
            _loggerFactory = window.boot.contexts.root.loggerFactory;
        }
        if (!(typeof loggerFactory == 'undefined')){
            outerLoggerFactory = loggerFactory;
        }
        _loggerFactory = outerLoggerFactory;
        return _loggerFactory;
    }

    static getFormatter(configArg){
        let format = 'json';
        let _config = this.detectConfig(configArg);
        if (LoggerFactory.detectBrowser()){
            format='text';
        }
        if (_config.has('logging.format')){
            format=_config.get('logging.format');
        }
        let formatter = (format.toLowerCase() === 'text') ? new PlainTextFormatter() : new JSONFormatter();
        return formatter
    }

    static getLogger(category, configArg, configPath, registry) {
        let loggerFactory = this.detectLoggerFactory();
        if (loggerFactory){
            return loggerFactory.getLogger(category);
        }
        let _configArg = (typeof category == 'object' ? category : configArg);
        let _category = (typeof category == 'object' ? '' : category);
        return new ConfigurableLogger(this.detectConfig(_configArg),
          new ConsoleLogger(_category,LoggerFactory.getFormatter(_configArg)),
            _category,
          configPath,
          registry || LoggerFactory.loggerRegistry);
    }

    constructor(config, registry, configPath) {
        this.config = config;
        this.registry = registry;
        this.configPath = configPath;
    }

    getLogger(category) {
        return new ConfigurableLogger(this.config,
            new ConsoleLogger(category,this.getFormatter()),
            category,
            this.configPath,
            this.registry);
    }

    getFormatter(){
        let format = 'json';
        if (LoggerFactory.detectBrowser()){
            format='text';
        }
        if (this.config.has('logging.format')){
            format=this.config.get('logging.format')
        }
        let formatter = (format.toLowerCase() === 'text') ? new PlainTextFormatter() : new JSONFormatter();
        return formatter;
    }
};
