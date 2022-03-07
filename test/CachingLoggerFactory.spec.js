/* eslint-disable import/extensions */
import { assert } from 'chai';
import { EphemeralConfig } from '@alt-javascript/config';
import nodeconfig from 'config';
import CachingLoggerFactory from '../CachingLoggerFactory.js';
import ConfigurableLogger from '../ConfigurableLogger.js';
import Logger from '../Logger.js';
import LoggerFactory from '../LoggerFactory.js';
import LoggerCategoryCache from '../LoggerCategoryCache.js';

const loggr = LoggerFactory.getLogger('@alt-javascript/logger/test/CachingLoggerFactory_spec', nodeconfig);

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
    const cache = new LoggerCategoryCache();
    const cachingLoggerFactory = new CachingLoggerFactory(
      config, cache, ConfigurableLogger.DEFAULT_CONFIG_PATH,
    );

    assert.equal(cachingLoggerFactory.config, config, 'cachingLoggerFactory.config === config');
    assert.equal(cachingLoggerFactory.cache, cache, 'cachingLoggerFactory.cache === cache');
    assert.equal(cachingLoggerFactory.configPath, ConfigurableLogger.DEFAULT_CONFIG_PATH,
      'cachingLoggerFactory.configPath === configPath');
  });

  it('static getLogger', () => {
    const config = new EphemeralConfig({});
    const cache = new LoggerCategoryCache();
    const logger = CachingLoggerFactory.getLogger(Logger.DEFAULT_CATEGORY,
      config, ConfigurableLogger.DEFAULT_CONFIG_PATH,
      cache);

    assert.equal(logger.config, config, 'logger.config === config');
    assert.equal(logger.category, Logger.DEFAULT_CATEGORY, 'logger.category === Logger.DEFAULT_CATEGORY');
    assert.equal(logger.configPath, ConfigurableLogger.DEFAULT_CONFIG_PATH, 'logger.configPath === ConfigurableLogger.DEFAULT_CONFIG_PATH');
    assert.equal(logger.cache, cache, 'logger.cache === cache');
  });

  it('static getLogger Unable to detect config,', () => {
    assert.throws(() => { CachingLoggerFactory.getLogger(); }, 'Unable to detect config, is \'config\' declared or provided?');
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
    global.window = { config };
    const logger = CachingLoggerFactory.getLogger();

    assert.equal(logger.config, config, 'logger.config === config');
    assert.equal(logger.category, Logger.DEFAULT_CATEGORY, 'logger.category === Logger.DEFAULT_CATEGORY');
    assert.equal(logger.configPath, ConfigurableLogger.DEFAULT_CONFIG_PATH, 'logger.configPath === ConfigurableLogger.DEFAULT_CONFIG_PATH');
    global.window = undefined;
  });

  it('static getLogger global boot config is detected', () => {
    const config = new EphemeralConfig({});
    global.boot = { contexts: { root: { config } } };
    const logger = CachingLoggerFactory.getLogger();

    assert.equal(logger.config, config, 'logger.config === config');
    assert.equal(logger.category, Logger.DEFAULT_CATEGORY, 'logger.category === Logger.DEFAULT_CATEGORY');
    assert.equal(logger.configPath, ConfigurableLogger.DEFAULT_CONFIG_PATH, 'logger.configPath === ConfigurableLogger.DEFAULT_CONFIG_PATH');
    global.boot = undefined;
  });

  it('static getLogger browser boot config is detected', () => {
    const config = new EphemeralConfig({});
    global.window = { boot: { contexts: { root: { config } } } };
    const logger = CachingLoggerFactory.getLogger();

    assert.equal(logger.config, config, 'logger.config === config');
    assert.equal(logger.category, Logger.DEFAULT_CATEGORY, 'logger.category === Logger.DEFAULT_CATEGORY');
    assert.equal(logger.configPath, ConfigurableLogger.DEFAULT_CONFIG_PATH, 'logger.configPath === ConfigurableLogger.DEFAULT_CONFIG_PATH');
    global.window = undefined;
  });
});
