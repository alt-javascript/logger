/* eslint-disable import/extensions */
import { assert } from 'chai';
import { EphemeralConfig } from '@alt-javascript/config';
import nodeconfig from 'config';
import CachingLoggerFactory from '../CachingLoggerFactory.js';
import ConfigurableLogger from '../ConfigurableLogger.js';
import Logger from '../Logger.js';
import LoggerFactory from '../LoggerFactory.js';
import LoggerCategoryCache from '../LoggerCategoryCache.js';

const loggr = LoggerFactory.getLogger('@alt-javascript/logger/test/LoggerFactory_spec', nodeconfig);

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

describe('LoggerFactory Specification', () => {
  it('Instantiate - constructor args are set', () => {
    const config = new EphemeralConfig({});
    const cache = new LoggerCategoryCache();
    const loggerFactory = new LoggerFactory(config, cache, ConfigurableLogger.DEFAULT_CONFIG_PATH);

    assert.equal(loggerFactory.config, config, 'loggerFactory.config === config');
    assert.equal(loggerFactory.cache, cache, 'loggerFactory.cache === cache');
    assert.equal(loggerFactory.configPath, ConfigurableLogger.DEFAULT_CONFIG_PATH, 'loggerFactory.configPath === configPath');
  });

  it('static getLogger', () => {
    const config = new EphemeralConfig({});
    const cache = new LoggerCategoryCache();
    const logger = LoggerFactory.getLogger(
      Logger.DEFAULT_CATEGORY, config, ConfigurableLogger.DEFAULT_CONFIG_PATH, cache,
    );

    assert.equal(logger.config, config, 'logger.config === config');
    assert.equal(logger.category, Logger.DEFAULT_CATEGORY, 'logger.category === Logger.DEFAULT_CATEGORY');
    assert.equal(logger.configPath, ConfigurableLogger.DEFAULT_CONFIG_PATH, 'logger.configPath === ConfigurableLogger.DEFAULT_CONFIG_PATH');
    assert.equal(logger.cache, cache, 'logger.cache === cache');
  });

  it('static getLogger Unable to detect config,', () => {
    assert.throws(() => { LoggerFactory.getLogger(); }, 'Unable to detect config, is \'config\' declared or provided?');
  });

  it('static getLogger global config is detected,', () => {
    const config = new EphemeralConfig({});
    global.config = config;
    const logger = LoggerFactory.getLogger();

    assert.equal(logger.config, config, 'logger.config === config');
    assert.equal(logger.category, Logger.DEFAULT_CATEGORY, 'logger.category === Logger.DEFAULT_CATEGORY');
    assert.equal(logger.configPath, ConfigurableLogger.DEFAULT_CONFIG_PATH, 'logger.configPath === ConfigurableLogger.DEFAULT_CONFIG_PATH');
    global.config = undefined;
  });

  it('static getLogger global browser config is detected,', () => {
    const config = new EphemeralConfig({});
    global.window = { config };
    const logger = LoggerFactory.getLogger();

    assert.equal(logger.config, config, 'logger.config === config');
    assert.equal(logger.category, Logger.DEFAULT_CATEGORY, 'logger.category === Logger.DEFAULT_CATEGORY');
    assert.equal(logger.configPath, ConfigurableLogger.DEFAULT_CONFIG_PATH, 'logger.configPath === ConfigurableLogger.DEFAULT_CONFIG_PATH');
    global.window = undefined;
  });

  it('static getLogger global boot config is detected', () => {
    const config = new EphemeralConfig({});
    global.boot = { contexts: { root: { config } } };
    const logger = LoggerFactory.getLogger();

    assert.equal(logger.config, config, 'logger.config === config');
    assert.equal(logger.category, Logger.DEFAULT_CATEGORY, 'logger.category === Logger.DEFAULT_CATEGORY');
    assert.equal(logger.configPath, ConfigurableLogger.DEFAULT_CONFIG_PATH, 'logger.configPath === ConfigurableLogger.DEFAULT_CONFIG_PATH');
    global.boot = undefined;
  });

  it('static getLogger browser boot config is detected', () => {
    const config = new EphemeralConfig({});
    global.window = { boot: { contexts: { root: { config } } } };
    const logger = LoggerFactory.getLogger();

    assert.equal(logger.config, config, 'logger.config === config');
    assert.equal(logger.category, Logger.DEFAULT_CATEGORY, 'logger.category === Logger.DEFAULT_CATEGORY');
    assert.equal(logger.configPath, ConfigurableLogger.DEFAULT_CONFIG_PATH, 'logger.configPath === ConfigurableLogger.DEFAULT_CONFIG_PATH');
    global.window = undefined;
  });

  it('static getLogger global logFactory is detected', () => {
    const config = new EphemeralConfig({});
    const cache = new LoggerCategoryCache();
    const loggerFactory = new CachingLoggerFactory(
      config, cache, ConfigurableLogger.DEFAULT_CONFIG_PATH,
    );
    global.loggerFactory = loggerFactory;
    const logger = LoggerFactory.getLogger();
    logger.info('message');

    assert.equal(logger.provider.console.cache.length, 1, 'logger.provider.console.cache.length === 1');
    global.loggerFactory = undefined;
  });

  it('static getLogger global loggerFactory is detected', () => {
    const config = new EphemeralConfig({});
    const cache = new LoggerCategoryCache();
    const loggerFactory = new CachingLoggerFactory(
      config, cache, ConfigurableLogger.DEFAULT_CONFIG_PATH,
    );
    global.loggerFactory = loggerFactory;
    const logger = LoggerFactory.getLogger();
    logger.info('message');

    assert.equal(logger.provider.console.cache.length, 1, 'logger.provider.console.cache.length === 1');
    global.loggerFactory = undefined;
  });

  it('static getLogger global browser loggerFactory is detected', () => {
    const config = new EphemeralConfig({});
    const cache = new LoggerCategoryCache();
    const loggerFactory = new CachingLoggerFactory(
      config, cache, ConfigurableLogger.DEFAULT_CONFIG_PATH,
    );
    global.window = { loggerFactory };
    const logger = LoggerFactory.getLogger();
    logger.info('message');

    assert.equal(logger.provider.console.cache.length, 1, 'logger.provider.console.cache.length === 1');
    global.window = undefined;
  });

  it('static getLogger global boot loggerFactory is detected', () => {
    const config = new EphemeralConfig({});
    const cache = new LoggerCategoryCache();
    const loggerFactory = new CachingLoggerFactory(
      config, cache, ConfigurableLogger.DEFAULT_CONFIG_PATH,
    );
    global.boot = { contexts: { root: { loggerFactory } } };
    const logger = LoggerFactory.getLogger();
    logger.info('message');

    assert.equal(logger.provider.console.cache.length, 1, 'logger.provider.console.cache.length === 1');
    global.boot = undefined;
  });

  it('static getLogger browser boot loggerFactory is detected', () => {
    const config = new EphemeralConfig({});
    const cache = new LoggerCategoryCache();
    const loggerFactory = new CachingLoggerFactory(
      config, cache, ConfigurableLogger.DEFAULT_CONFIG_PATH,
    );
    global.window = {
      boot:
          { contexts: { root: { loggerFactory } } },
    };
    const logger = LoggerFactory.getLogger();
    logger.info('message');

    assert.equal(logger.provider.console.cache.length, 1, 'logger.provider.console.cache.length === 1');
    global.window = undefined;
  });
});
