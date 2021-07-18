const { assert } = require('chai');
const Logger = require('../Logger');
const LoggerLevel = require('../LoggerLevel');
const LoggerFactory = require('../LoggerFactory');

const config = require('config');
const loggr = LoggerFactory.getLogger('@alt-javascript/logger/test/Logger_spec',config);

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

describe('LoggerLevel Specification', () => {
  it('Object is exported - values are set', () => {
    assert.equal(LoggerLevel.DEBUG, 'debug', 'LoggerLevel.DEBUG === \'debug\'');
    assert.equal(LoggerLevel.VERBOSE, 'verbose', 'LoggerLevel.VERBOSE === \'verbose\'');
    assert.equal(LoggerLevel.INFO, 'info', 'LoggerLevel.INFO === \'info\'');
    assert.equal(LoggerLevel.WARN, 'warn', 'LoggerLevel.WARN === \'warn\'');
    assert.equal(LoggerLevel.ERROR, 'error', 'LoggerLevel.ERROR === \'error\'');
    assert.equal(LoggerLevel.FATAL, 'fatal', 'LoggerLevel.FATAL === \'fatal\'');

    assert.equal(LoggerLevel.ENUMS[LoggerLevel.DEBUG], 5, 'LoggerLevel.ENUMS[LoggerLevel.DEBUG] === 5');
    assert.equal(LoggerLevel.ENUMS[LoggerLevel.VERBOSE], 4, 'LoggerLevel.ENUMS[LoggerLevel.VERBOSE] === 4');
    assert.equal(LoggerLevel.ENUMS[LoggerLevel.INFO], 3, 'LoggerLevel.ENUMS[LoggerLevel.INFO] === 3');
    assert.equal(LoggerLevel.ENUMS[LoggerLevel.WARN], 2, 'LoggerLevel.ENUMS[LoggerLevel.WARN] === 2');
    assert.equal(LoggerLevel.ENUMS[LoggerLevel.ERROR], 1, 'LoggerLevel.ENUMS[LoggerLevel.ERROR] === 1');
    assert.equal(LoggerLevel.ENUMS[LoggerLevel.FATAL], 0, 'LoggerLevel.ENUMS[LoggerLevel.FATAL] === 0');
  });
});
