const config = require('config');
const { assert } = require('chai');
const WinstonLoggerFactory = require('../WinstonLoggerFactory');
const LoggerLevel = require('../LoggerLevel');
const winston = require('winston');
const WinstonLogger = require('../WinstonLogger');

const logger = WinstonLoggerFactory.getLogger( '@alt-javascript/logger/test/winston_spec',config,winston);
const verbose = WinstonLoggerFactory.getLogger( '@alt-javascript/logger/test/winston_spec/verbose',config,winston);

assert.isFalse(logger.isVerboseEnabled(), 'Verbose is false');
logger.setLevel(null);

before(async () => {
  logger.debug('spec setup started');
  // ..
  logger.debug('spec setup completed');
});

beforeEach(async () => {
  logger.debug('spec setup started');
  // ..
  logger.debug('spec setup completed');
});

after(async () => {
  logger.debug('each teardown started');
  // ...
  logger.debug('each teardown completed');
});

beforeEach(async () => {
  logger.debug('each setup started');
  // ..
  logger.debug('each setup completed');
});

describe('Winston Log Package Tests', () => {
  it('Log levels', () => {
    // logger.log(LoggerLevel.Info,`this is a log message`);
    logger.debug('this is a debug message');
    logger.verbose('this is a verbose message');
    logger.info('this is an info message');
    logger.warn('this is a warn message');
    logger.error('this is an error message');
    logger.fatal('this is a fatal message');
  });
  it('Log levels enabled', () => {
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.DEBUG), 'debug is false');
    assert.isFalse(logger.isDebugEnabled(), 'debug is false');
    assert.isFalse(logger.isVerboseEnabled(), 'Verbose is false');
    assert.isTrue(logger.isInfoEnabled(), 'Info is true');
    assert.isTrue(logger.isWarnEnabled(), 'Warn is true');
    assert.isTrue(logger.isErrorEnabled(), 'Error is true');
    assert.isTrue(logger.isFatalEnabled(), 'Fatal is true');
  });

  it('Verbose Logger', () => {
    verbose.debug('this is a debug message');
    verbose.verbose('this is a verbose message');
  });
});
