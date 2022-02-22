const { assert } = require('chai');
const config = require('config');
const CachingConsole = require('../modules/CachingConsole');
const ConsoleLogger = require('../modules/ConsoleLogger');
const JSONFormatter = require('../modules/JSONFormatter');
const Logger = require('../modules/Logger');
const LoggerLevel = require('../modules/LoggerLevel');
const LoggerFactory = require('../modules/LoggerFactory');

const loggr = LoggerFactory.getLogger('@alt-javascript/logger/test/ConsoleLogger_spec', config);

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

describe('ConsoleLogger Specification', () => {
  it('Instantiate - constructor args are set', () => {
    const logger = new ConsoleLogger(
      Logger.DEFAULT_CATEGORY,
      LoggerLevel.DEBUG,
      LoggerLevel.ENUMS, {}, new JSONFormatter(), new CachingConsole(10, true),
    );

    assert.equal(logger.category, Logger.DEFAULT_CATEGORY, 'logger.category === Logger.DEFAULT_CATEGORY');
    assert.equal(logger.levels, LoggerLevel.ENUMS, 'logger.levels === LoggerLevel.ENUMS');
    assert.equal(logger.level, LoggerLevel.ENUMS[LoggerLevel.DEBUG], 'logger.level === LoggerLevels.ENUMS[LoggerLevel.DEBUG]');
  });

  it('Instantiate - default constructor args are set', () => {
    const logger = new ConsoleLogger();

    assert.equal(logger.category, Logger.DEFAULT_CATEGORY, 'logger.category === Logger.DEFAULT_CATEGORY');
    assert.equal(logger.levels, LoggerLevel.ENUMS, 'logger.levels === LoggerLevel.ENUMS');
    assert.equal(logger.level, LoggerLevel.ENUMS[LoggerLevel.INFO], 'logger.level === LoggerLevels.ENUMS[LoggerLevel.INFO]');
    assert.exists(logger.meta, 'logger.meta exists');
    assert.isObject(logger.meta, 'logger.meta is object');
    assert.instanceOf(logger.formatter, JSONFormatter, 'logger.formatter instanceof JSONFormatter');
    assert.equal(logger.console, console, 'logger.console == console');
  });

  it('setLevel', () => {
    const logger = new ConsoleLogger(
      Logger.DEFAULT_CATEGORY,
      LoggerLevel.DEBUG,
      LoggerLevel.ENUMS, {}, new JSONFormatter(), new CachingConsole(10, true),
    );
    logger.setLevel(LoggerLevel.DEBUG);
    assert.equal(logger.level, LoggerLevel.ENUMS[LoggerLevel.DEBUG],
      'logger.level === LoggerLevels.ENUMS[LoggerLevel.DEBUG]');
  });

  it('Check levels - debug', () => {
    const logger = new ConsoleLogger(
      Logger.DEFAULT_CATEGORY,
      LoggerLevel.DEBUG,
      LoggerLevel.ENUMS, {}, new JSONFormatter(), new CachingConsole(10, true),
    );
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.DEBUG), 'Debug is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.VERBOSE), 'Verbose is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.INFO), 'Info is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.WARN), 'Warn is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.ERROR), 'Error is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.FATAL), 'Fatal is true');

    assert.isTrue(logger.isDebugEnabled(), 'Debug is true');
    assert.isTrue(logger.isVerboseEnabled(), 'Verbose is true');
    assert.isTrue(logger.isInfoEnabled(), 'Info is true');
    assert.isTrue(logger.isWarnEnabled(), 'Warn is true');
    assert.isTrue(logger.isErrorEnabled(), 'Error is true');
    assert.isTrue(logger.isFatalEnabled(), 'Fatal is true');
  });

  it('Check levels - verbose', () => {
    const logger = new ConsoleLogger(
      Logger.DEFAULT_CATEGORY,
      LoggerLevel.VERBOSE,
      LoggerLevel.ENUMS, {}, new JSONFormatter(), new CachingConsole(10, true),
    );
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.DEBUG), 'Debug is false');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.VERBOSE), 'Verbose is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.INFO), 'Info is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.WARN), 'Warn is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.ERROR), 'Error is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.FATAL), 'Fatal is true');

    assert.isFalse(logger.isDebugEnabled(), 'Debug is false');
    assert.isTrue(logger.isVerboseEnabled(), 'Verbose is true');
    assert.isTrue(logger.isInfoEnabled(), 'Info is true');
    assert.isTrue(logger.isWarnEnabled(), 'Warn is true');
    assert.isTrue(logger.isErrorEnabled(), 'Error is true');
    assert.isTrue(logger.isFatalEnabled(), 'Fatal is true');
  });

  it('Check levels - info', () => {
    const logger = new ConsoleLogger(
      Logger.DEFAULT_CATEGORY,
      LoggerLevel.INFO,
      LoggerLevel.ENUMS, {}, new JSONFormatter(), new CachingConsole(10, true),
    );
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.DEBUG), 'Debug is false');
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.VERBOSE), 'Verbose is false');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.INFO), 'Info is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.WARN), 'Warn is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.ERROR), 'Error is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.FATAL), 'Fatal is true');

    assert.isFalse(logger.isDebugEnabled(), 'Debug is false');
    assert.isFalse(logger.isVerboseEnabled(), 'Verbose is false');
    assert.isTrue(logger.isInfoEnabled(), 'Info is true');
    assert.isTrue(logger.isWarnEnabled(), 'Warn is true');
    assert.isTrue(logger.isErrorEnabled(), 'Error is true');
    assert.isTrue(logger.isFatalEnabled(), 'Fatal is true');
  });

  it('Check levels - warn', () => {
    const logger = new ConsoleLogger(
      Logger.DEFAULT_CATEGORY,
      LoggerLevel.WARN,
      LoggerLevel.ENUMS, {}, new JSONFormatter(), new CachingConsole(10, true),
    );
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.DEBUG), 'Debug is false');
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.VERBOSE), 'Verbose is false');
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.INFO), 'Info is false');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.WARN), 'Warn is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.ERROR), 'Error is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.FATAL), 'Fatal is true');

    assert.isFalse(logger.isDebugEnabled(), 'Debug is false');
    assert.isFalse(logger.isVerboseEnabled(), 'Verbose is false');
    assert.isFalse(logger.isInfoEnabled(), 'Info is false');
    assert.isTrue(logger.isWarnEnabled(), 'Warn is true');
    assert.isTrue(logger.isErrorEnabled(), 'Error is true');
    assert.isTrue(logger.isFatalEnabled(), 'Fatal is true');
  });

  it('Check levels - error', () => {
    const logger = new ConsoleLogger(
      Logger.DEFAULT_CATEGORY,
      LoggerLevel.ERROR,
      LoggerLevel.ENUMS, {}, new JSONFormatter(), new CachingConsole(10, true),
    );
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.DEBUG), 'Debug is false');
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.VERBOSE), 'Verbose is false');
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.INFO), 'Info is false');
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.WARN), 'Warn is false');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.ERROR), 'Error is true');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.FATAL), 'Fatal is true');

    assert.isFalse(logger.isDebugEnabled(), 'Debug is false');
    assert.isFalse(logger.isVerboseEnabled(), 'Verbose is false');
    assert.isFalse(logger.isInfoEnabled(), 'Info is false');
    assert.isFalse(logger.isWarnEnabled(), 'Warn is false');
    assert.isTrue(logger.isErrorEnabled(), 'Error is true');
    assert.isTrue(logger.isFatalEnabled(), 'Fatal is true');
  });

  it('Check levels - fatal', () => {
    const logger = new ConsoleLogger(
      Logger.DEFAULT_CATEGORY,
      LoggerLevel.FATAL,
      LoggerLevel.ENUMS, {}, new JSONFormatter(), new CachingConsole(10, true),
    );
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.DEBUG), 'Debug is false');
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.VERBOSE), 'Verbose is false');
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.INFO), 'Info is false');
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.WARN), 'Warn is false');
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.ERROR), 'Error is false');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.FATAL), 'Fatal is true');

    assert.isFalse(logger.isDebugEnabled(), 'Debug is false');
    assert.isFalse(logger.isVerboseEnabled(), 'Verbose is false');
    assert.isFalse(logger.isInfoEnabled(), 'Info is false');
    assert.isFalse(logger.isWarnEnabled(), 'Warn is false');
    assert.isFalse(logger.isErrorEnabled(), 'Error is false');
    assert.isTrue(logger.isFatalEnabled(), 'Fatal is true');
  });

  it('Log levels - debug', () => {
    const logger = new ConsoleLogger(
      Logger.DEFAULT_CATEGORY,
      LoggerLevel.DEBUG,
      LoggerLevel.ENUMS, {}, new JSONFormatter(), new CachingConsole(10, true),
    );
    logger.debug('message');
    logger.verbose('message');
    logger.info('message');
    logger.warn('message');
    logger.error('message');
    logger.fatal('message');

    assert.equal(logger.console.cache.length, 6,
      'logger.console.cache.length == 6');
    assert.isTrue(logger.console.cache[0].includes('"level":"debug","message":"message"'),
      'logger.console.cache[0].includes(\'"level":"debug","message":"message"\')');
    assert.isTrue(logger.console.cache[1].includes('"level":"verbose","message":"message"'),
      'logger.console.cache[0].includes(\'"level":"verbose","message":"message"\')');
    assert.isTrue(logger.console.cache[2].includes('"level":"info","message":"message"'),
      'logger.console.cache[0].includes(\'"level":"info","message":"message"\')');
    assert.isTrue(logger.console.cache[3].includes('"level":"warn","message":"message"'),
      'logger.console.cache[0].includes(\'"level":"warn","message":"message"\')');
    assert.isTrue(logger.console.cache[4].includes('"level":"error","message":"message"'),
      'logger.console.cache[0].includes(\'"level":"error","message":"message"\')');
    assert.isTrue(logger.console.cache[5].includes('"level":"fatal","message":"message"'),

      'logger.console.cache[0].includes(\'"level":"fatal","message":"message"\')');
  });

  it('Log levels - verbose', () => {
    const logger = new ConsoleLogger(
      Logger.DEFAULT_CATEGORY,
      LoggerLevel.VERBOSE,
      LoggerLevel.ENUMS, {}, new JSONFormatter(), new CachingConsole(10, true),
    );
    logger.debug('message');
    logger.verbose('message');
    logger.info('message');
    logger.warn('message');
    logger.error('message');
    logger.fatal('message');

    assert.equal(logger.console.cache.length, 5,
      'logger.console.cache.length == 6');
    assert.isTrue(logger.console.cache[0].includes('"level":"verbose","message":"message"'),
      'logger.console.cache[0].includes(\'"level":"verbose","message":"message"\')');
    assert.isTrue(logger.console.cache[1].includes('"level":"info","message":"message"'),
      'logger.console.cache[0].includes(\'"level":"info","message":"message"\')');
    assert.isTrue(logger.console.cache[2].includes('"level":"warn","message":"message"'),
      'logger.console.cache[0].includes(\'"level":"warn","message":"message"\')');
    assert.isTrue(logger.console.cache[3].includes('"level":"error","message":"message"'),
      'logger.console.cache[0].includes(\'"level":"error","message":"message"\')');
    assert.isTrue(logger.console.cache[4].includes('"level":"fatal","message":"message"'),
      'logger.console.cache[0].includes(\'"level":"fatal","message":"message"\')');
  });

  it('Log levels - info', () => {
    const logger = new ConsoleLogger(
      Logger.DEFAULT_CATEGORY,
      LoggerLevel.INFO,
      LoggerLevel.ENUMS, {}, new JSONFormatter(), new CachingConsole(10, true),
    );
    logger.debug('message');
    logger.verbose('message');
    logger.info('message');
    logger.warn('message');
    logger.error('message');
    logger.fatal('message');

    assert.equal(logger.console.cache.length, 4,
      'logger.console.cache.length == 6');
    assert.isTrue(logger.console.cache[0].includes('"level":"info","message":"message"'),
      'logger.console.cache[0].includes(\'"level":"info","message":"message"\')');
    assert.isTrue(logger.console.cache[1].includes('"level":"warn","message":"message"'),
      'logger.console.cache[0].includes(\'"level":"warn","message":"message"\')');
    assert.isTrue(logger.console.cache[2].includes('"level":"error","message":"message"'),
      'logger.console.cache[0].includes(\'"level":"error","message":"message"\')');
    assert.isTrue(logger.console.cache[3].includes('"level":"fatal","message":"message"'),
      'logger.console.cache[0].includes(\'"level":"fatal","message":"message"\')');
  });

  it('Log levels - warn', () => {
    const logger = new ConsoleLogger(
      Logger.DEFAULT_CATEGORY,
      LoggerLevel.WARN,
      LoggerLevel.ENUMS, {}, new JSONFormatter(), new CachingConsole(10, true),
    );
    logger.debug('message');
    logger.verbose('message');
    logger.info('message');
    logger.warn('message');
    logger.error('message');
    logger.fatal('message');

    assert.equal(logger.console.cache.length, 3, 'logger.console.cache.length == 6');
    assert.isTrue(logger.console.cache[0].includes('"level":"warn","message":"message"'),
      'logger.console.cache[0].includes(\'"level":"warn","message":"message"\')');
    assert.isTrue(logger.console.cache[1].includes('"level":"error","message":"message"'),
      'logger.console.cache[0].includes(\'"level":"error","message":"message"\')');
    assert.isTrue(logger.console.cache[2].includes('"level":"fatal","message":"message"'),
      'logger.console.cache[0].includes(\'"level":"fatal","message":"message"\')');
  });

  it('Log levels - error', () => {
    const logger = new ConsoleLogger(
      Logger.DEFAULT_CATEGORY,
      LoggerLevel.ERROR,
      LoggerLevel.ENUMS, {}, new JSONFormatter(), new CachingConsole(10, true),
    );
    logger.debug('message');
    logger.verbose('message');
    logger.info('message');
    logger.warn('message');
    logger.error('message');
    logger.fatal('message');

    assert.equal(logger.console.cache.length, 2, 'logger.console.cache.length == 6');
    assert.isTrue(logger.console.cache[0].includes('"level":"error","message":"message"'), 'logger.console.cache[0].includes(\'"level":"error","message":"message"\')');
    assert.isTrue(logger.console.cache[1].includes('"level":"fatal","message":"message"'), 'logger.console.cache[0].includes(\'"level":"fatal","message":"message"\')');
  });

  it('Log levels - fatal', () => {
    const logger = new ConsoleLogger(
      Logger.DEFAULT_CATEGORY,
      LoggerLevel.FATAL,
      LoggerLevel.ENUMS, {}, new JSONFormatter(), new CachingConsole(10, true),
    );
    logger.debug('message');
    logger.verbose('message');
    logger.info('message');
    logger.warn('message');
    logger.error('message');
    logger.fatal('message');

    assert.equal(logger.console.cache.length, 1, 'logger.console.cache.length == 6');
    assert.isTrue(logger.console.cache[0].includes('"level":"fatal","message":"message"'), 'logger.console.cache[0].includes(\'"level":"fatal","message":"message"\')');
  });
});
