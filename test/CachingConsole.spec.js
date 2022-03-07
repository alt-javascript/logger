/* eslint-disable import/extensions */
import { assert } from 'chai';
import config from 'config';
import CachingConsole from '../CachingConsole.js';
import LoggerFactory from '../LoggerFactory.js';

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

describe('CachingConsole Specification', () => {
  it('Instantiate - constructor args are set', () => {
    const cachingConsole = new CachingConsole(1, false);

    assert.equal(cachingConsole.size, 1, 'cachingConsole.size === 1');
    assert.equal(cachingConsole.quiet, false, 'cachingConsole.size === false');
  });

  it('Instantiate - default constructor args are set', () => {
    const cachingConsole = new CachingConsole();

    assert.equal(cachingConsole.size, CachingConsole.DEFAULT_SIZE, 'cachingConsole.size === CachingConsole.DEFAULT_SIZE');
    assert.equal(cachingConsole.quiet, true, 'cachingConsole.quiet === true');
  });

  it('log', () => {
    const cachingConsole = new CachingConsole();
    cachingConsole.log('line');
    assert.equal(cachingConsole.cache.length, 1, 'cachingConsole.cache.length === 1');
  });

  it('log - cache limit', () => {
    const cachingConsole = new CachingConsole(1);
    cachingConsole.log('one');
    cachingConsole.log('two');
    assert.equal(cachingConsole.cache.length, 1, 'cachingConsole.cache.length === 1');
    assert.equal(cachingConsole.cache[0], 'two', 'cachingConsole.cache[0]] === \'two\'');
  });

  it('log - clear', () => {
    const cachingConsole = new CachingConsole(1);
    cachingConsole.log('one');
    cachingConsole.log('two');
    cachingConsole.clear();
    assert.equal(cachingConsole.cache.length, 0, 'cachingConsole.cache.length === 0');
  });
});
