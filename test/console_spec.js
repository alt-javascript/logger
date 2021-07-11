const { assert } = require('chai');
const LoggerFactory = require('../LoggerFactory');
const LoggerLevel = require('../LoggerLevel');

const logger = LoggerFactory.getLogger('@alt/logger/test/console_spec');
const defaultLogger = LoggerFactory.getLogger();
defaultLogger.registry.add('logging.level./', LoggerLevel.DEBUG);
const altDefaultLogger = LoggerFactory.getLogger();

const verbose = LoggerFactory.getLogger('@alt/logger/test/console_spec/verbose');

assert.isFalse(logger.isVerboseEnabled(), 'Verbose is false');
logger.setLevel(null);

if (logger.isDebugEnabled()) {
  // ..  do some heavy work
}

const spec = logger.category;

before(async () => {
  logger.debug(`${spec} spec setup started`);
  // ..
  logger.debug(`${spec} spec setup completed`);
});

beforeEach(async () => {
  logger.debug(`${spec} spec setup started`);
  // ..
  logger.debug(`${spec} spec setup completed`);
});

after(async () => {
  logger.debug(`${spec} each teardown started`);
  // ...
  logger.debug(`${spec} each teardown completed`);
});

beforeEach(async () => {
  logger.debug(`${spec} each setup started`);
  // ..
  logger.debug(`${spec} each setup completed`);
});

describe('Console Log Package Tests', () => {
  it('Log levels', () => {
    logger.log(LoggerLevel.INFO, `${spec} this is a log message`);
    logger.debug(`${spec} this is a debug message`);
    logger.verbose(`${spec} this is a verbose message`);
    logger.info(`${spec} this is an info message`);
    logger.warn(`${spec} this is a warn message`);
    logger.error(`${spec} this is an error message`);
    logger.fatal(`${spec} this is a fatal message`);
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
    defaultLogger.debug(`${spec} this is a debug message`);
    defaultLogger.verbose(`${spec} this is a verbose message`);
    defaultLogger.info(`${spec} this is an info message`);
    defaultLogger.warn(`${spec} this is a warn message`);
    defaultLogger.error(`${spec} this is an error message`);
    defaultLogger.fatal(`${spec} this is a fatal message`);
    assert.isFalse(defaultLogger.isDebugEnabled(), 'debug is false');
    assert.isTrue(altDefaultLogger.isDebugEnabled(), 'debug is true for alt');
    assert.isFalse(defaultLogger.isVerboseEnabled(), 'Verbose is false');
    assert.isTrue(defaultLogger.isInfoEnabled(), 'Verbose is false');
    assert.isTrue(defaultLogger.isWarnEnabled(), 'Warn is true');
    assert.isTrue(defaultLogger.isErrorEnabled(), 'Error is true');
    assert.isTrue(defaultLogger.isFatalEnabled(), 'Fatal is true');
  });

  it('Verbose Logger', () => {
    verbose.debug(`${spec} this is a debug message`);
    verbose.verbose(`${spec} this is a verbose message`);
  });
});
