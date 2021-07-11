const CONFIG = require('config');
const DelegatingLogger = require('./DelegatingLogger');

module.exports = class ConfigurableLogger extends DelegatingLogger {
  constructor(provider, category, configPath, registry, config) {
    super(provider);
    this.config = config || CONFIG;
    this.category = category;
    this.configPath = configPath;
    this.registry = registry;
    this.provider.setLevel(
      ConfigurableLogger.getLoggerLevel(
        this.category,
        this.configPath,
        this.config,
        this.registry,
      ),
    );

    ConfigurableLogger.prototype.setLevel = DelegatingLogger.prototype.setLevel;
    ConfigurableLogger.prototype.log = DelegatingLogger.prototype.log;
    ConfigurableLogger.prototype.debug = DelegatingLogger.prototype.debug;
    ConfigurableLogger.prototype.verbose = DelegatingLogger.prototype.verbose;
    ConfigurableLogger.prototype.info = DelegatingLogger.prototype.info;
    ConfigurableLogger.prototype.warn = DelegatingLogger.prototype.warn;
    ConfigurableLogger.prototype.error = DelegatingLogger.prototype.error;
    ConfigurableLogger.prototype.fatal = DelegatingLogger.prototype.fatal;

    ConfigurableLogger.prototype.isLevelEnabled = DelegatingLogger.prototype.isLevelEnabled;
    ConfigurableLogger.prototype.isDebugEnabled = DelegatingLogger.prototype.isDebugEnabled;
    ConfigurableLogger.prototype.isVerboseEnabled = DelegatingLogger.prototype.isVerboseEnabled;
    ConfigurableLogger.prototype.isInfoEnabled = DelegatingLogger.prototype.isInfoEnabled;
    ConfigurableLogger.prototype.isWarnEnabled = DelegatingLogger.prototype.isWarnEnabled;
    ConfigurableLogger.prototype.isErrorEnabled = DelegatingLogger.prototype.isErrorEnabled;
    ConfigurableLogger.prototype.isFatalEnabled = DelegatingLogger.prototype.isFatalEnabled;
  }

  static getLoggerLevel(category, configPath, config, registry) {
    let level = 'info';
    const path = configPath || 'logging.level';
    const categories = (category || '').split('/');
    let pathStep = path;

    const root = `${pathStep}./`;
    if (registry.get(root)) {
      level = registry.get(root);
    } else if (config.has(root)) {
      level = config.get(root);
      registry.add(root, level);
    }

    for (let i = 0; i < categories.length; i++) {
      pathStep = `${pathStep}${i === 0 ? '.' : '/'}${categories[i]}`;
      if (registry.get(pathStep)) {
        level = registry[pathStep];
      } else if (config.has(pathStep)) {
        level = config.get(pathStep);
        registry.add(pathStep, level);
      }
    }
    return level;
  }
};
