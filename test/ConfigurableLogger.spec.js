const { assert } = require('chai');
const {EphemeralConfig} = require ('@alt-javascript/config');
const CachingConsole = require('../CachingConsole');
const ConfigurableLogger = require('../ConfigurableLogger');
const ConsoleLogger = require('../ConsoleLogger');
const JSONFormatter = require('../JSONFormatter');
const Logger = require('../Logger');
const LoggerLevel = require('../LoggerLevel');
const LoggerFactory = require('../LoggerFactory');
const LoggerRegistry = require('../LoggerRegistry');

const config = require('config');
const loggr = LoggerFactory.getLogger('@alt-javascript/logger/test/ConfigurableLogger_spec',config);

before(async () => {
  loggr.debug('spec setup started');
  // ..
  loggr.debug('spec setup completed');
});

beforeEach(async () => {
  loggr.debug('spec setup started');
  // ..
  loggr.debug('spec setup completed');
});

after(async () => {
  loggr.debug('each teardown started');
  // ...
  loggr.debug('each teardown completed');
});

beforeEach(async () => {
  loggr.debug('each setup started');
  // ..
  loggr.debug('each setup completed');
});

describe('ConfigurableLogger Specification', () => {
  it('Instantiate - constructor args are set', () => {
    const config = new EphemeralConfig({});
    const consoleLogger = new ConsoleLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.DEBUG,LoggerLevel.ENUMS,{},new JSONFormatter(), new CachingConsole(10,true));
    const registry = new LoggerRegistry();
    const logger = new ConfigurableLogger(config,consoleLogger,Logger.DEFAULT_CATEGORY,ConfigurableLogger.DEFAULT_CONFIG_PATH,registry);

//  constructor(config, provider, category, configPath, registry) {
    assert.equal(logger.config, config, 'logger.config === config');
    assert.equal(logger.provider, consoleLogger, 'logger.provider === consoleLogger');
    assert.equal(logger.category, Logger.DEFAULT_CATEGORY, 'logger.category === Logger.DEFAULT_CATEGORY');
    assert.equal(logger.configPath, ConfigurableLogger.DEFAULT_CONFIG_PATH, 'logger.configPath === ConfigurableLogger.DEFAUL_CONFIG_PATH');
    assert.equal(logger.registry, registry, 'logger.registry === registry');
  });

  it('Instantiate - default constructor args are set', () => {
    const config = new EphemeralConfig({});
    const registry = new LoggerRegistry();
    const consoleLogger = new ConsoleLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.DEBUG,LoggerLevel.ENUMS,{},new JSONFormatter(), new CachingConsole(10,true));
    const logger = new ConfigurableLogger(config,consoleLogger,null,null,registry);

    assert.equal(logger.config, config, 'logger.config === config');
    assert.equal(logger.provider, consoleLogger, 'logger.provider === consoleLogger');
    assert.equal(logger.category, Logger.DEFAULT_CATEGORY, 'logger.category === Logger.DEFAULT_CATEGORY');
    assert.equal(logger.configPath, ConfigurableLogger.DEFAULT_CONFIG_PATH, 'logger.configPath === ConfigurableLogger.DEFAUL_CONFIG_PATH');
    assert.equal(logger.registry, registry, 'logger.registry === registry');
  });

  it('Instantiate - config is required', () => {
    const config = new EphemeralConfig({});
    const consoleLogger = new ConsoleLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.DEBUG,LoggerLevel.ENUMS,{},new JSONFormatter(), new CachingConsole(10,true));
    assert.throws(()=>{new ConfigurableLogger(null,consoleLogger,null,null,new LoggerRegistry())},'config is required');
  });

  it('Instantiate - provider is required', () => {
    const config = new EphemeralConfig({});
    const consoleLogger = new ConsoleLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.DEBUG,LoggerLevel.ENUMS,{},new JSONFormatter(), new CachingConsole(10,true));
    assert.throws(()=>{new ConfigurableLogger(config,null,null,null,new LoggerRegistry())},'provider is required');
  });

  it('Instantiate - provider is required', () => {
    const config = new EphemeralConfig({});
    const consoleLogger = new ConsoleLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.DEBUG,LoggerLevel.ENUMS,{},new JSONFormatter(), new CachingConsole(10,true));
    assert.throws(()=>{new ConfigurableLogger(config,consoleLogger,null,null)},'registry is required');
  });


  it('setLevel', () => {
    const consoleLogger = new ConsoleLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.DEBUG,LoggerLevel.ENUMS,{},new JSONFormatter(),new CachingConsole(10,true));
    const logger = new ConfigurableLogger(config,consoleLogger,null,null,new LoggerRegistry());
    logger.setLevel(LoggerLevel.DEBUG);
    assert.equal(logger.provider.level, LoggerLevel.ENUMS[LoggerLevel.DEBUG], 'logger.level === LoggerLevels.ENUMS[LoggerLevel.DEBUG]');
  });
  

  it('Check levels - debug', () => {
    const config = new EphemeralConfig({logging:{level:{'/':LoggerLevel.DEBUG}}});
    const consoleLogger = new ConsoleLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.DEBUG,LoggerLevel.ENUMS,{},new JSONFormatter(),new CachingConsole(10,true));
    const logger = new ConfigurableLogger(config,consoleLogger,null,null,new LoggerRegistry());
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.DEBUG), 'Debug is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.VERBOSE), 'Verbose is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.INFO), 'Info is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.WARN), 'Warn is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.ERROR), 'Error is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.FATAL), 'Fatal is true');

    assert.isTrue(logger.isDebugEnabled(), 'Debug is true');
    assert.isTrue(logger.isVerboseEnabled(), 'Verbose is true');
    assert.isTrue(logger.isInfoEnabled(), 'Info is true');
    assert.isTrue(logger.isWarnEnabled(), 'Warn is true');
    assert.isTrue(logger.isErrorEnabled(), 'Error is true');
    assert.isTrue(logger.isFatalEnabled(), 'Fatal is true');
  });

  it('Check levels - verbose', () => {
    const config = new EphemeralConfig({logging:{level:{'/':LoggerLevel.VERBOSE}}});
    const consoleLogger = new ConsoleLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.VERBOSE,LoggerLevel.ENUMS,{},new JSONFormatter(),new CachingConsole(10,true));
    const logger = new ConfigurableLogger(config,consoleLogger,null,null,new LoggerRegistry());
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.DEBUG), 'Debug is false');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.VERBOSE), 'Verbose is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.INFO), 'Info is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.WARN), 'Warn is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.ERROR), 'Error is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.FATAL), 'Fatal is true');

    assert.isFalse(logger.isDebugEnabled(), 'Debug is false');
    assert.isTrue(logger.isVerboseEnabled(), 'Verbose is true');
    assert.isTrue(logger.isInfoEnabled(), 'Info is true');
    assert.isTrue(logger.isWarnEnabled(), 'Warn is true');
    assert.isTrue(logger.isErrorEnabled(), 'Error is true');
    assert.isTrue(logger.isFatalEnabled(), 'Fatal is true');
  });

  it('Check levels - info', () => {
    const config = new EphemeralConfig({logging:{level:{'/':LoggerLevel.INFO}}});
    const consoleLogger = new ConsoleLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.INFO,LoggerLevel.ENUMS,{},new JSONFormatter(),new CachingConsole(10,true));
    const logger = new ConfigurableLogger(config,consoleLogger,null,null,new LoggerRegistry());
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.DEBUG), 'Debug is false');
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.VERBOSE), 'Verbose is false');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.INFO), 'Info is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.WARN), 'Warn is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.ERROR), 'Error is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.FATAL), 'Fatal is true');

    assert.isFalse(logger.isDebugEnabled(), 'Debug is false');
    assert.isFalse(logger.isVerboseEnabled(), 'Verbose is false');
    assert.isTrue(logger.isInfoEnabled(), 'Info is true');
    assert.isTrue(logger.isWarnEnabled(), 'Warn is true');
    assert.isTrue(logger.isErrorEnabled(), 'Error is true');
    assert.isTrue(logger.isFatalEnabled(), 'Fatal is true');
  });

  it('Check levels - warn', () => {
    const config = new EphemeralConfig({logging:{level:{'/':LoggerLevel.WARN}}});
    const consoleLogger = new ConsoleLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.WARN,LoggerLevel.ENUMS,{},new JSONFormatter(),new CachingConsole(10,true));
    const logger = new ConfigurableLogger(config,consoleLogger,null,null,new LoggerRegistry());
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.DEBUG), 'Debug is false');
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.VERBOSE), 'Verbose is false');
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.INFO), 'Info is false');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.WARN), 'Warn is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.ERROR), 'Error is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.FATAL), 'Fatal is true');

    assert.isFalse(logger.isDebugEnabled(), 'Debug is false');
    assert.isFalse(logger.isVerboseEnabled(), 'Verbose is false');
    assert.isFalse(logger.isInfoEnabled(), 'Info is false');
    assert.isTrue(logger.isWarnEnabled(), 'Warn is true');
    assert.isTrue(logger.isErrorEnabled(), 'Error is true');
    assert.isTrue(logger.isFatalEnabled(), 'Fatal is true');
  });

  it('Check levels - error', () => {
    const config = new EphemeralConfig({logging:{level:{'/':LoggerLevel.ERROR}}});
    const consoleLogger = new ConsoleLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.ERROR,LoggerLevel.ENUMS,{},new JSONFormatter(),new CachingConsole(10,true));
    const logger = new ConfigurableLogger(config,consoleLogger,null,null,new LoggerRegistry());
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.DEBUG), 'Debug is false');
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.VERBOSE), 'Verbose is false');
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.INFO), 'Info is false');
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.WARN), 'Warn is false');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.ERROR), 'Error is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.FATAL), 'Fatal is true');

    assert.isFalse(logger.isDebugEnabled(), 'Debug is false');
    assert.isFalse(logger.isVerboseEnabled(), 'Verbose is false');
    assert.isFalse(logger.isInfoEnabled(), 'Info is false');
    assert.isFalse(logger.isWarnEnabled(), 'Warn is false');
    assert.isTrue(logger.isErrorEnabled(), 'Error is true');
    assert.isTrue(logger.isFatalEnabled(), 'Fatal is true');
  });

  it('Check levels - fatal', () => {
    const config = new EphemeralConfig({logging:{level:{'/':LoggerLevel.FATAL}}});
    const consoleLogger = new ConsoleLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.FATAL,LoggerLevel.ENUMS,{},new JSONFormatter(),new CachingConsole(10,true));
    const logger = new ConfigurableLogger(config,consoleLogger,null,null,new LoggerRegistry());
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.DEBUG), 'Debug is false');
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.VERBOSE), 'Verbose is false');
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.INFO), 'Info is false');
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.WARN), 'Warn is false');
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.ERROR), 'Error is false');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.FATAL), 'Fatal is true');

    assert.isFalse(logger.isDebugEnabled(), 'Debug is false');
    assert.isFalse(logger.isVerboseEnabled(), 'Verbose is false');
    assert.isFalse(logger.isInfoEnabled(), 'Info is false');
    assert.isFalse(logger.isWarnEnabled(), 'Warn is false');
    assert.isFalse(logger.isErrorEnabled(), 'Error is false');
    assert.isTrue(logger.isFatalEnabled(), 'Fatal is true');
  });

  it('Log levels - debug', () => {
    const config = new EphemeralConfig({logging:{level:{'/':LoggerLevel.DEBUG}}});
    const consoleLogger = new ConsoleLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.DEBUG,LoggerLevel.ENUMS,{},new JSONFormatter(),new CachingConsole(10,true));
    const logger = new ConfigurableLogger(config,consoleLogger,null,null,new LoggerRegistry());
    logger.debug('message');
    logger.verbose('message');
    logger.info('message');
    logger.warn('message');
    logger.error('message');
    logger.fatal('message');

    assert.equal(logger.provider.console.cache.length,6,'logger.provider.console.cache.length == 6');
    assert.isTrue(logger.provider.console.cache[0].includes('"level":"debug","message":"message"'),'logger.provider.console.cache[0].includes(\'"level":"debug","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[1].includes('"level":"verbose","message":"message"'),'logger.provider.console.cache[0].includes(\'"level":"verbose","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[2].includes('"level":"info","message":"message"'),'logger.provider.console.cache[0].includes(\'"level":"info","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[3].includes('"level":"warn","message":"message"'),'logger.provider.console.cache[0].includes(\'"level":"warn","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[4].includes('"level":"error","message":"message"'),'logger.provider.console.cache[0].includes(\'"level":"error","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[5].includes('"level":"fatal","message":"message"'),'logger.provider.console.cache[0].includes(\'"level":"fatal","message":"message"\')');
  });

  it('Log levels - verbose', () => {
    const config = new EphemeralConfig({logging:{level:{'/':LoggerLevel.VERBOSE}}});
    const consoleLogger = new ConsoleLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.VERBOSE,LoggerLevel.ENUMS,{},new JSONFormatter(),new CachingConsole(10,true));
    const logger = new ConfigurableLogger(config,consoleLogger,null,null,new LoggerRegistry());
    logger.debug('message');
    logger.verbose('message');
    logger.info('message');
    logger.warn('message');
    logger.error('message');
    logger.fatal('message');

    assert.equal(logger.provider.console.cache.length,5,'logger.provider.console.cache.length == 6');
    assert.isTrue(logger.provider.console.cache[0].includes('"level":"verbose","message":"message"'),'logger.provider.console.cache[0].includes(\'"level":"verbose","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[1].includes('"level":"info","message":"message"'),'logger.provider.console.cache[0].includes(\'"level":"info","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[2].includes('"level":"warn","message":"message"'),'logger.provider.console.cache[0].includes(\'"level":"warn","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[3].includes('"level":"error","message":"message"'),'logger.provider.console.cache[0].includes(\'"level":"error","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[4].includes('"level":"fatal","message":"message"'),'logger.provider.console.cache[0].includes(\'"level":"fatal","message":"message"\')');
  });

  it('Log levels - info', () => {
    const config = new EphemeralConfig({logging:{level:{'/':LoggerLevel.INFO}}});
    const consoleLogger = new ConsoleLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.INFO,LoggerLevel.ENUMS,{},new JSONFormatter(),new CachingConsole(10,true));
    const logger = new ConfigurableLogger(config,consoleLogger,null,null,new LoggerRegistry());
    logger.debug('message');
    logger.verbose('message');
    logger.info('message');
    logger.warn('message');
    logger.error('message');
    logger.fatal('message');

    assert.equal(logger.provider.console.cache.length,4,'logger.provider.console.cache.length == 6');
    assert.isTrue(logger.provider.console.cache[0].includes('"level":"info","message":"message"'),'logger.provider.console.cache[0].includes(\'"level":"info","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[1].includes('"level":"warn","message":"message"'),'logger.provider.console.cache[0].includes(\'"level":"warn","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[2].includes('"level":"error","message":"message"'),'logger.provider.console.cache[0].includes(\'"level":"error","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[3].includes('"level":"fatal","message":"message"'),'logger.provider.console.cache[0].includes(\'"level":"fatal","message":"message"\')');
  });

  it('Log levels - warn', () => {
    const config = new EphemeralConfig({logging:{level:{'/':LoggerLevel.WARN}}});
    const consoleLogger = new ConsoleLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.WARN,LoggerLevel.ENUMS,{},new JSONFormatter(),new CachingConsole(10,true));
    const logger = new ConfigurableLogger(config,consoleLogger,null,null,new LoggerRegistry());
    logger.debug('message');
    logger.verbose('message');
    logger.info('message');
    logger.warn('message');
    logger.error('message');
    logger.fatal('message');

    assert.equal(logger.provider.console.cache.length,3,'logger.provider.console.cache.length == 6');
    assert.isTrue(logger.provider.console.cache[0].includes('"level":"warn","message":"message"'),'logger.provider.console.cache[0].includes(\'"level":"warn","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[1].includes('"level":"error","message":"message"'),'logger.provider.console.cache[0].includes(\'"level":"error","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[2].includes('"level":"fatal","message":"message"'),'logger.provider.console.cache[0].includes(\'"level":"fatal","message":"message"\')');
  });

  it('Log levels - error', () => {
    const config = new EphemeralConfig({logging:{level:{'/':LoggerLevel.ERROR}}});
    const consoleLogger = new ConsoleLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.ERROR,LoggerLevel.ENUMS,{},new JSONFormatter(),new CachingConsole(10,true));
    const logger = new ConfigurableLogger(config,consoleLogger,null,null,new LoggerRegistry());
    logger.debug('message');
    logger.verbose('message');
    logger.info('message');
    logger.warn('message');
    logger.error('message');
    logger.fatal('message');

    assert.equal(logger.provider.console.cache.length,2,'logger.provider.console.cache.length == 6');
    assert.isTrue(logger.provider.console.cache[0].includes('"level":"error","message":"message"'),'logger.provider.console.cache[0].includes(\'"level":"error","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[1].includes('"level":"fatal","message":"message"'),'logger.provider.console.cache[0].includes(\'"level":"fatal","message":"message"\')');
  });

  it('Log levels - fatal', () => {
    const config = new EphemeralConfig({logging:{level:{'/':LoggerLevel.FATAL}}});
    const consoleLogger = new ConsoleLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.FATAL,LoggerLevel.ENUMS,{},new JSONFormatter(),new CachingConsole(10,true));
    const logger = new ConfigurableLogger(config,consoleLogger,null,null,new LoggerRegistry());
    logger.debug('message');
    logger.verbose('message');
    logger.info('message');
    logger.warn('message');
    logger.error('message');
    logger.fatal('message');

    assert.equal(logger.provider.console.cache.length,1,'logger.provider.console.cache.length == 6');
    assert.isTrue(logger.provider.console.cache[0].includes('"level":"fatal","message":"message"'),'logger.provider.console.cache[0].includes(\'"level":"fatal","message":"message"\')');
  });

  it('Log levels - stacked', () => {
    const config = new EphemeralConfig({logging:{
      level: {
        '/': LoggerLevel.FATAL,
        'one': LoggerLevel.ERROR,
        'two': LoggerLevel.WARN
      }}});
    let consoleLogger = new ConsoleLogger('one',LoggerLevel.FATAL,LoggerLevel.ENUMS,{},new JSONFormatter(),new CachingConsole(10,true));
    let logger = new ConfigurableLogger(config,consoleLogger,'one',null,new LoggerRegistry());
    logger.debug('message');
    logger.verbose('message');
    logger.info('message');
    logger.warn('message');
    logger.error('message');
    logger.fatal('message');

    assert.equal(logger.provider.console.cache.length,2,'logger.provider.console.cache.length == 2');
    assert.isTrue(logger.provider.console.cache[0].includes('"level":"error","message":"message"'),'logger.provider.console.cache[0].includes(\'"level":"error","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[1].includes('"level":"fatal","message":"message"'),'logger.provider.console.cache[0].includes(\'"level":"fatal","message":"message"\')');

    consoleLogger = new ConsoleLogger('two',LoggerLevel.FATAL,LoggerLevel.ENUMS,{},new JSONFormatter(),new CachingConsole(10,true));
    logger = new ConfigurableLogger(config,consoleLogger,'two',null,new LoggerRegistry());
    logger.debug('message');
    logger.verbose('message');
    logger.info('message');
    logger.warn('message');
    logger.error('message');
    logger.fatal('message');

    assert.equal(logger.provider.console.cache.length,3,'logger.provider.console.cache.length == 3');
    assert.isTrue(logger.provider.console.cache[0].includes('"level":"warn","message":"message"'),'logger.provider.console.cache[0].includes(\'"level":"warn","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[1].includes('"level":"error","message":"message"'),'logger.provider.console.cache[0].includes(\'"level":"error","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[2].includes('"level":"fatal","message":"message"'),'logger.provider.console.cache[0].includes(\'"level":"fatal","message":"message"\')');

  });
});