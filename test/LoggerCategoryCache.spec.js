/* eslint-disable import/extensions */
import { assert } from 'chai';
import config from 'config';
import LoggerLevel from '../LoggerLevel.js';
import LoggerFactory from '../LoggerFactory.js';
import LoggerCategoryCache from '../LoggerCategoryCache.js';

const loggr = LoggerFactory.getLogger('@alt-javascript/logger/test/CachingConsole_spec', config);

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

describe('LoggerCategoryCache Specification', () => {
  it('Instantiate - constructor args are set', () => {
    const loggerCategoryCache = new LoggerCategoryCache();

    assert.isObject(loggerCategoryCache.cache, 1, 'loggerCategoryCache.cache is object');
  });

  it('add', () => {
    const loggerCategoryCache = new LoggerCategoryCache();
    loggerCategoryCache.put('ROOT', LoggerLevel.DEBUG);
    assert.equal(loggerCategoryCache.get('ROOT'), LoggerLevel.DEBUG, 'loggerCategoryCache.get(\'ROOT\') === LoggerLevel.DEBUG');
  });
});
