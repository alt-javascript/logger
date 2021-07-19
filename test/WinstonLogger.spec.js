const { assert } = require('chai');
const CachingConsole = require('../CachingConsole');
const Logger = require('../Logger');
const LoggerLevel = require('../LoggerLevel');
const LoggerFactory = require('../LoggerFactory');
const winston = require('winston');
const WinstonLogger = require('../WinstonLogger');

const config = require('config');
const loggr = LoggerFactory.getLogger('@alt-javascript/logger/test/WinstonLogger_spec',config);

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

describe('WinstonLogger Specification', () => {
  it('Instantiate - constructor args are set', () => {
    const options = {};
    const logger = new WinstonLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.DEBUG,LoggerLevel.ENUMS,{},winston,options);

    assert.equal(logger.category, Logger.DEFAULT_CATEGORY, 'logger.category === Logger.DEFAULT_CATEGORY');
    assert.equal(logger.levels, LoggerLevel.ENUMS, 'logger.levels === LoggerLevel.ENUMS');
    assert.equal(logger.level, LoggerLevel.ENUMS[LoggerLevel.DEBUG], 'logger.level === LoggerLevels.ENUMS[LoggerLevel.DEBUG]');
    assert.equal(logger.winston,winston,'logger.winston == winston');
    assert.equal(logger.options, options, 'logger.options == options');
  });

  it('Instantiate - default constructor args are set', () => {
    const logger = new WinstonLogger(null,null,null,null,winston);

    assert.equal(logger.category, Logger.DEFAULT_CATEGORY, 'logger.category === Logger.DEFAULT_CATEGORY');
    assert.equal(logger.levels, LoggerLevel.ENUMS, 'logger.levels === LoggerLevel.ENUMS');
    assert.equal(logger.level, LoggerLevel.ENUMS[LoggerLevel.INFO], 'logger.level === LoggerLevels.ENUMS[LoggerLevel.INFO]');
    assert.exists(logger.meta, 'logger.meta exists');
    assert.isObject(logger.meta, 'logger.meta is object');
    assert.equal(logger.winston,winston,'logger.winston == null');
    assert.isObject(logger.options, 'logger.options is object');
  });

  it('Instantiate - winston is required', () => {
    assert.throws(()=>{new WinstonLogger()},'winston is required');
  });

  it('setLevel', () => {
    const logger = new WinstonLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.DEBUG,LoggerLevel.ENUMS,{},winston);
    logger.setLevel(LoggerLevel.DEBUG);
    assert.equal(logger.level, LoggerLevel.ENUMS[LoggerLevel.DEBUG], 'logger.level === LoggerLevels.ENUMS[LoggerLevel.DEBUG]');
  });

  it('Check levels - debug', () => {
    const logger = new WinstonLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.DEBUG,LoggerLevel.ENUMS,{},winston);
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
    const logger = new WinstonLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.VERBOSE,LoggerLevel.ENUMS,{},winston);
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
    const logger = new WinstonLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.INFO,LoggerLevel.ENUMS,{},winston);
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
    const logger = new WinstonLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.WARN,LoggerLevel.ENUMS,{},winston);
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
    const logger = new WinstonLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.ERROR,LoggerLevel.ENUMS,{},winston);
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
    const logger = new WinstonLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.FATAL,LoggerLevel.ENUMS,{},winston);
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.DEBUG), 'Debug is false');
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.VERBOSE), 'Verbose is false');
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.INFO), 'Info is false');
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.WARN), 'Warn is false');
    assert.isFalse(logger.isLevelEnabled(LoggerLevel.ERROR), 'Error is false');
    assert.isTrue(logger.isLevelEnabled(LoggerLevel.FATAL), 'Fatal is true');
  });

  it('Log levels - debug', () => {
    const logger = new WinstonLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.DEBUG,LoggerLevel.ENUMS,{},winston);
    logger.debug('message');
    logger.verbose('message');
    logger.info('message');
    logger.warn('message');
    logger.error('message');
    logger.fatal('message');
  });

  it('Log levels - verbose', () => {
    const logger = new WinstonLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.VERBOSE,LoggerLevel.ENUMS,{},winston);
    logger.debug('message');
    logger.verbose('message');
    logger.info('message');
    logger.warn('message');
    logger.error('message');
    logger.fatal('message');
  });

  it('Log levels - info', () => {
    const logger = new WinstonLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.INFO,LoggerLevel.ENUMS,{},winston);
    logger.debug('message');
    logger.verbose('message');
    logger.info('message');
    logger.warn('message');
    logger.error('message');
    logger.fatal('message');
  });

  it('Log levels - warn', () => {
    const logger = new WinstonLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.WARN,LoggerLevel.ENUMS,{},winston);
    logger.debug('message');
    logger.verbose('message');
    logger.info('message');
    logger.warn('message');
    logger.error('message');
    logger.fatal('message');
  });

  it('Log levels - error', () => {
    const logger = new WinstonLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.ERROR,LoggerLevel.ENUMS,{},winston);
    logger.debug('message');
    logger.verbose('message');
    logger.info('message');
    logger.warn('message');
    logger.error('message');
    logger.fatal('message');
  });

  it('Log levels - fatal', () => {
    const logger = new WinstonLogger(Logger.DEFAULT_CATEGORY,LoggerLevel.FATAL,LoggerLevel.ENUMS,{},winston);
    logger.debug('message');
    logger.verbose('message');
    logger.info('message');
    logger.warn('message');
    logger.error('message');
    logger.fatal('message');
  });
});