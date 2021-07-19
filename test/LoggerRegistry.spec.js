const { assert } = require('chai');

const LoggerLevel = require('../LoggerLevel');
const LoggerFactory = require('../LoggerFactory');
const LoggerRegistry = require('../LoggerRegistry');

const config = require('config');
const loggr = LoggerFactory.getLogger('@alt-javascript/logger/test/CachingConsole_spec',config);

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

describe('LoggerRegistry Specification', () => {
  it('Instantiate - constructor args are set', () => {
    const loggerRegistry = new LoggerRegistry();

    assert.isObject(loggerRegistry.cache, 1, 'loggerRegistry.cache is object');
  });

  it('add', () => {
    const loggerRegistry = new LoggerRegistry();
    loggerRegistry.add('ROOT', LoggerLevel.DEBUG);
    assert.equal(loggerRegistry.get('ROOT'), LoggerLevel.DEBUG, 'loggerRegistry.get(\'ROOT\') === LoggerLevel.DEBUG');
  });

});
