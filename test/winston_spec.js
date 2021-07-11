const { assert } = require('chai');
const LoggerFactory = require('../LoggerFactory');
const LoggerLevel = require('../LoggerLevel');
const WinstonLogger = require('../WinstonLogger');

const logger = LoggerFactory.getLogger('@alt-javascript/logger/test/winston_spec', new WinstonLogger());
const verbose = LoggerFactory.getLogger('@alt-javascript/logger/test/winston_spec/verbose',  new WinstonLogger());

assert.isTrue(logger.isVerboseEnabled(), 'Verbose is false');
logger.setLevel(null);

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

describe('Winston Log Package Tests', () => {
  it('Log levels', () => {
    // logger.log(LoggerLevel.Info,`${spec} this is a log message`);
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

  it('Verbose Logger', () => {
    verbose.debug(`${spec} this is a debug message`);
    verbose.verbose(`${spec} this is a verbose message`);
  });
});
