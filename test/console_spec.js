const { assert } = require('chai');
const LoggerFactory = require('../LoggerFactory');
const LoggerLevel = require('../LoggerLevel');
const config = require('config');
const logger = LoggerFactory.getLogger(config,'@alt-javascript/logger/test/console_spec');
const defaultLogger = LoggerFactory.getLogger(config);
defaultLogger.registry.add('logging.level./', LoggerLevel.DEBUG);
const altDefaultLogger = LoggerFactory.getLogger(config);

const verbose = LoggerFactory.getLogger(config,'@alt-javascript/logger/test/console_spec/verbose');

assert.isFalse(logger.isVerboseEnabled(), 'Verbose is false');
logger.setLevel(null);

if (logger.isDebugEnabled()) {
  // ..  do some heavy work
}

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

describe('Console Log Package Tests', () => {
  it('Log levels', () => {
    logger.log(LoggerLevel.INFO, 'this is a log message');
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

  it('Default Logger', () => {
    defaultLogger.debug('this is a debug message');
    defaultLogger.verbose('this is a verbose message');
    defaultLogger.info('this is an info message');
    defaultLogger.warn('this is a warn message');
    defaultLogger.error('this is an error message');
    defaultLogger.fatal('this is a fatal message');
    assert.isFalse(defaultLogger.isDebugEnabled(), 'debug is false');
    assert.isTrue(altDefaultLogger.isDebugEnabled(), 'debug is true for alt');
    assert.isFalse(defaultLogger.isVerboseEnabled(), 'Verbose is false');
    assert.isTrue(defaultLogger.isInfoEnabled(), 'Verbose is false');
    assert.isTrue(defaultLogger.isWarnEnabled(), 'Warn is true');
    assert.isTrue(defaultLogger.isErrorEnabled(), 'Error is true');
    assert.isTrue(defaultLogger.isFatalEnabled(), 'Fatal is true');
  });

  it('Verbose Logger', () => {
    verbose.debug('this is a debug message');
    verbose.verbose('this is a verbose message');
  });
});
