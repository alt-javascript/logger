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
        let _config = null;
        if (!(typeof config == 'undefined')){
            _config = config;
        }
        if (global?.boot?.contexts?.root?.config){
            _config = global.boot.contexts.root.config;
        }
        if (LoggerFactory.detectBrowser() && window?.config){
            _config = window.config;
        }
        if (LoggerFactory.detectBrowser() && window?.boot?.contexts?.root?.config){
            _config = window.boot.contexts.root.config;
        }
        _config = configArg || _config;
        if (_config){
            return _config;
        }
        else {
            throw new Error('Unable to detect config, is \'config\' declared or provided?')
        }
    }

    static detectLoggerFactory(){
        let _loggerFactory = null;
        if (!(typeof loggerFactory == 'undefined')){
            _loggerFactory = loggerFactory;
        }
        if (global?.boot?.contexts?.root?.loggerFactory){
            _loggerFactory = global.boot.contexts.root.loggerFactory;
        }
        if (LoggerFactory.detectBrowser() && window?.loggerFactory){
            _loggerFactory = window.loggerFactory;
        }
        if (LoggerFactory.detectBrowser() && window?.boot?.contexts?.root?.loggerFactory){
            _loggerFactory = window.boot.contexts.root.loggerFactory;
        }
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
          new ConsoleLogger(_category,
              null,null,null,
              LoggerFactory.getFormatter(_configArg),
              null),
            _category,
          configPath,
          registry || LoggerFactory.loggerRegistry);
    }

    constructor(config, registry, configPath) {
        this.config = config;
        this.registry = registry;
        this.configPath = configPath || ConfigurableLogger.DEFAULT_CONFIG_PATH;
        if (!this.config){
            throw new Error ('config is required');
        }
        if (!this.registry) {
            throw new Error ('registry is required');
        }
    }

    getLogger(category) {
        return new ConfigurableLogger(this.config,
            new ConsoleLogger(category,
                null,null,null,
                this.getFormatter(),
                null),
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
