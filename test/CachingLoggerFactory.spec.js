const { assert } = require('chai');
const {EphemeralConfig} = require ('@alt-javascript/config');
const CachingLoggerFactory = require('../CachingLoggerFactory');
const ConfigurableLogger = require('../ConfigurableLogger');
const Logger = require('../Logger');
const LoggerFactory = require('../LoggerFactory');
const LoggerRegistry = require('../LoggerRegistry');

const nodeconfig = require('config');
const loggr = LoggerFactory.getLogger('@alt-javascript/logger/test/CachingLoggerFactory_spec',nodeconfig);

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

describe('CachingLoggerFactory Specification', () => {

  it('Instantiate - constructor args are set', () => {
    const config = new EphemeralConfig({});
    const registry = new LoggerRegistry();
    const cachingLoggerFactory = new CachingLoggerFactory(config,registry,ConfigurableLogger.DEFAULT_CONFIG_PATH);

    assert.equal(cachingLoggerFactory.config, config, 'cachingLoggerFactory.config === config');
    assert.equal(cachingLoggerFactory.registry, registry, 'cachingLoggerFactory.registry === registry');
    assert.equal(cachingLoggerFactory.configPath, ConfigurableLogger.DEFAULT_CONFIG_PATH, 'cachingLoggerFactory.configPath === configPath');
  });

  it('static getLogger', () => {

    const config = new EphemeralConfig({});
    const registry = new LoggerRegistry();
    const logger = CachingLoggerFactory.getLogger(Logger.DEFAULT_CATEGORY,config,ConfigurableLogger.DEFAULT_CONFIG_PATH,registry);

    assert.equal(logger.config, config, 'logger.config === config');
    assert.equal(logger.category, Logger.DEFAULT_CATEGORY, 'logger.category === Logger.DEFAULT_CATEGORY');
    assert.equal(logger.configPath, ConfigurableLogger.DEFAULT_CONFIG_PATH, 'logger.configPath === ConfigurableLogger.DEFAULT_CONFIG_PATH');
    assert.equal(logger.registry, registry, 'logger.registry === registry');
  });

  it('static getLogger Unable to detect config,', () => {

    const config = new EphemeralConfig({});
    assert.throws(()=>{CachingLoggerFactory.getLogger()},'Unable to detect config, is \'config\' declared or provided?');
  });

  it('static getLogger global config is detected,', () => {
    const config = new EphemeralConfig({});
    global.config = config;
    const logger = CachingLoggerFactory.getLogger();

    assert.equal(logger.config, config, 'logger.config === config');
    assert.equal(logger.category, Logger.DEFAULT_CATEGORY, 'logger.category === Logger.DEFAULT_CATEGORY');
    assert.equal(logger.configPath, ConfigurableLogger.DEFAULT_CONFIG_PATH, 'logger.configPath === ConfigurableLogger.DEFAULT_CONFIG_PATH');
    global.config = undefined;
  });

  it('static getLogger global browser config is detected,', () => {
    const config = new EphemeralConfig({});
    global.window = {config: config};
    const logger = CachingLoggerFactory.getLogger();

    assert.equal(logger.config, config, 'logger.config === config');
    assert.equal(logger.category, Logger.DEFAULT_CATEGORY, 'logger.category === Logger.DEFAULT_CATEGORY');
    assert.equal(logger.configPath, ConfigurableLogger.DEFAULT_CONFIG_PATH, 'logger.configPath === ConfigurableLogger.DEFAULT_CONFIG_PATH');
    global.window = undefined;
  });

  it('static getLogger global boot config is detected', () => {
    const config = new EphemeralConfig({});
    global.boot = { contexts : {root:{config:config}}};
    const logger = CachingLoggerFactory.getLogger();

    assert.equal(logger.config, config, 'logger.config === config');
    assert.equal(logger.category, Logger.DEFAULT_CATEGORY, 'logger.category === Logger.DEFAULT_CATEGORY');
    assert.equal(logger.configPath, ConfigurableLogger.DEFAULT_CONFIG_PATH, 'logger.configPath === ConfigurableLogger.DEFAULT_CONFIG_PATH');
    global.boot = undefined;
  });

  it('static getLogger browser boot config is detected', () => {
    const config = new EphemeralConfig({});
    global.window = { boot :{contexts : {root:{config:config}}}};
    const logger = CachingLoggerFactory.getLogger();

    assert.equal(logger.config, config, 'logger.config === config');
    assert.equal(logger.category, Logger.DEFAULT_CATEGORY, 'logger.category === Logger.DEFAULT_CATEGORY');
    assert.equal(logger.configPath, ConfigurableLogger.DEFAULT_CONFIG_PATH, 'logger.configPath === ConfigurableLogger.DEFAULT_CONFIG_PATH');
    global.window = undefined;
  });

});
