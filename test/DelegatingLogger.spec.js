/* eslint-disable import/extensions */
import { assert } from 'chai';
import config from 'config';
import CachingConsole from '../CachingConsole.js';
import ConsoleLogger from '../ConsoleLogger.js';
import DelegatingLogger from '../DelegatingLogger.js';
import JSONFormatter from '../JSONFormatter.js';
import Logger from '../Logger.js';
import LoggerLevel from '../LoggerLevel.js';
import LoggerFactory from '../LoggerFactory.js';

const loggr = LoggerFactory.getLogger('@alt-javascript/logger/test/DelegatingLogger_spec', config);

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

describe('DelegatingLogger Specification', () => {
  it('Instantiate - constructor args are set', () => {
    const consoleLogger = new ConsoleLogger(
      Logger.DEFAULT_CATEGORY,
      LoggerLevel.DEBUG,
      LoggerLevel.ENUMS, {}, new JSONFormatter(), new CachingConsole(10, true),
    );
    const logger = new DelegatingLogger(consoleLogger);

    assert.equal(logger.provider, consoleLogger, 'logger.provider === consoleLogger');
  });

  it('Instantiate - provider is required', () => {
    // eslint-disable-next-line no-new
    assert.throws(() => { new DelegatingLogger(); }, 'provider is required');
  });

  it('setLevel', () => {
    const logger = new DelegatingLogger(
      new ConsoleLogger(
        Logger.DEFAULT_CATEGORY,
        LoggerLevel.DEBUG,
        LoggerLevel.ENUMS, {}, new JSONFormatter(), new CachingConsole(10, true),
      ),
    );
    logger.setLevel(LoggerLevel.DEBUG);
    assert.equal(logger.provider.level, LoggerLevel.ENUMS[LoggerLevel.DEBUG],
      'logger.provider.level === LoggerLevels.ENUMS[LoggerLevel.DEBUG]');
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
    const logger = new DelegatingLogger(
      new ConsoleLogger(
        Logger.DEFAULT_CATEGORY,
        LoggerLevel.VERBOSE,
        LoggerLevel.ENUMS, {}, new JSONFormatter(), new CachingConsole(10, true),
      ),
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
    const logger = new DelegatingLogger(
      new ConsoleLogger(
        Logger.DEFAULT_CATEGORY,
        LoggerLevel.INFO,
        LoggerLevel.ENUMS, {}, new JSONFormatter(), new CachingConsole(10, true),
      ),
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
    const logger = new DelegatingLogger(
      new ConsoleLogger(
        Logger.DEFAULT_CATEGORY,
        LoggerLevel.WARN,
        LoggerLevel.ENUMS, {}, new JSONFormatter(), new CachingConsole(10, true),
      ),
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
    const logger = new DelegatingLogger(
      new ConsoleLogger(
        Logger.DEFAULT_CATEGORY,
        LoggerLevel.ERROR,
        LoggerLevel.ENUMS, {}, new JSONFormatter(), new CachingConsole(10, true),
      ),
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
    const logger = new DelegatingLogger(
      new ConsoleLogger(
        Logger.DEFAULT_CATEGORY,
        LoggerLevel.FATAL,
        LoggerLevel.ENUMS, {}, new JSONFormatter(), new CachingConsole(10, true),
      ),
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
    const logger = new DelegatingLogger(
      new ConsoleLogger(
        Logger.DEFAULT_CATEGORY,
        LoggerLevel.DEBUG,
        LoggerLevel.ENUMS, {}, new JSONFormatter(), new CachingConsole(10, true),
      ),
    );
    logger.debug('message');
    logger.verbose('message');
    logger.info('message');
    logger.warn('message');
    logger.error('message');
    logger.fatal('message');

    assert.equal(logger.provider.console.cache.length, 6, 'logger.console.cache.length == 6');
    assert.isTrue(logger.provider.console.cache[0].includes('"level":"debug","message":"message"'),
      'logger.provider.console.cache[0].includes(\'"level":"debug","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[1].includes('"level":"verbose","message":"message"'),
      'logger.provider.console.cache[0].includes(\'"level":"verbose","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[2].includes('"level":"info","message":"message"'),
      'logger.provider.console.cache[0].includes(\'"level":"info","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[3].includes('"level":"warn","message":"message"'),
      'logger.provider.console.cache[0].includes(\'"level":"warn","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[4].includes('"level":"error","message":"message"'),
      'logger.provider.console.cache[0].includes(\'"level":"error","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[5].includes('"level":"fatal","message":"message"'),
      'logger.provider.console.cache[0].includes(\'"level":"fatal","message":"message"\')');
  });

  it('Log levels - verbose', () => {
    const logger = new DelegatingLogger(
      new ConsoleLogger(
        Logger.DEFAULT_CATEGORY,
        LoggerLevel.VERBOSE,
        LoggerLevel.ENUMS, {}, new JSONFormatter(), new CachingConsole(10, true),
      ),
    );
    logger.debug('message');
    logger.verbose('message');
    logger.info('message');
    logger.warn('message');
    logger.error('message');
    logger.fatal('message');

    assert.equal(logger.provider.console.cache.length, 5, 'logger.console.cache.length == 6');
    assert.isTrue(logger.provider.console.cache[0].includes('"level":"verbose","message":"message"'), 'logger.provider.console.cache[0].includes(\'"level":"verbose","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[1].includes('"level":"info","message":"message"'), 'logger.provider.console.cache[0].includes(\'"level":"info","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[2].includes('"level":"warn","message":"message"'), 'logger.provider.console.cache[0].includes(\'"level":"warn","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[3].includes('"level":"error","message":"message"'), 'logger.provider.console.cache[0].includes(\'"level":"error","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[4].includes('"level":"fatal","message":"message"'), 'logger.provider.console.cache[0].includes(\'"level":"fatal","message":"message"\')');
  });

  it('Log levels - info', () => {
    const logger = new DelegatingLogger(
      new ConsoleLogger(
        Logger.DEFAULT_CATEGORY,
        LoggerLevel.INFO,
        LoggerLevel.ENUMS, {}, new JSONFormatter(), new CachingConsole(10, true),
      ),
    );
    logger.debug('message');
    logger.verbose('message');
    logger.info('message');
    logger.warn('message');
    logger.error('message');
    logger.fatal('message');

    assert.equal(logger.provider.console.cache.length, 4,
      'logger.console.cache.length == 6');
    assert.isTrue(logger.provider.console.cache[0].includes('"level":"info","message":"message"'),
      'logger.provider.console.cache[0].includes(\'"level":"info","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[1].includes('"level":"warn","message":"message"'),
      'logger.provider.console.cache[0].includes(\'"level":"warn","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[2].includes('"level":"error","message":"message"'),
      'logger.provider.console.cache[0].includes(\'"level":"error","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[3].includes('"level":"fatal","message":"message"'),
      'logger.provider.console.cache[0].includes(\'"level":"fatal","message":"message"\')');
  });

  it('Log levels - warn', () => {
    const logger = new DelegatingLogger(
      new ConsoleLogger(
        Logger.DEFAULT_CATEGORY,
        LoggerLevel.WARN,
        LoggerLevel.ENUMS, {}, new JSONFormatter(), new CachingConsole(10, true),
      ),
    );
    logger.debug('message');
    logger.verbose('message');
    logger.info('message');
    logger.warn('message');
    logger.error('message');
    logger.fatal('message');

    assert.equal(logger.provider.console.cache.length, 3, 'logger.console.cache.length == 6');
    assert.isTrue(logger.provider.console.cache[0].includes('"level":"warn","message":"message"'), 'logger.provider.console.cache[0].includes(\'"level":"warn","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[1].includes('"level":"error","message":"message"'), 'logger.provider.console.cache[0].includes(\'"level":"error","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[2].includes('"level":"fatal","message":"message"'), 'logger.provider.console.cache[0].includes(\'"level":"fatal","message":"message"\')');
  });

  it('Log levels - error', () => {
    const logger = new DelegatingLogger(
      new ConsoleLogger(
        Logger.DEFAULT_CATEGORY,
        LoggerLevel.ERROR,
        LoggerLevel.ENUMS, {}, new JSONFormatter(), new CachingConsole(10, true),
      ),
    );
    logger.debug('message');
    logger.verbose('message');
    logger.info('message');
    logger.warn('message');
    logger.error('message');
    logger.fatal('message');

    assert.equal(logger.provider.console.cache.length, 2, 'logger.console.cache.length == 6');
    assert.isTrue(logger.provider.console.cache[0].includes('"level":"error","message":"message"'), 'logger.provider.console.cache[0].includes(\'"level":"error","message":"message"\')');
    assert.isTrue(logger.provider.console.cache[1].includes('"level":"fatal","message":"message"'), 'logger.provider.console.cache[0].includes(\'"level":"fatal","message":"message"\')');
  });

  it('Log levels - fatal', () => {
    const logger = new DelegatingLogger(
      new ConsoleLogger(
        Logger.DEFAULT_CATEGORY,
        LoggerLevel.FATAL,
        LoggerLevel.ENUMS, {}, new JSONFormatter(), new CachingConsole(10, true),
      ),
    );
    logger.debug('message');
    logger.verbose('message');
    logger.info('message');
    logger.warn('message');
    logger.error('message');
    logger.fatal('message');

    assert.equal(logger.provider.console.cache.length, 1, 'logger.console.cache.length == 6');
    assert.isTrue(logger.provider.console.cache[0].includes('"level":"fatal","message":"message"'), 'logger.provider.console.cache[0].includes(\'"level":"fatal","message":"message"\')');
  });
});
