module.exports = class DelegatingLogger {
  constructor(provider) {
    this.provider = provider;
  }

  setLevel(level) {
    this.provider.setLevel(level);
  }

  log(level, message, meta) {
    this.provider.log(message, meta);
  }

  debug(message, meta) {
    this.provider.debug(message, meta);
  }

  verbose(message, meta) {
    this.provider.verbose(message, meta);
  }

  info(message, meta) {
    this.provider.info(message, meta);
  }

  warn(message, meta) {
    this.provider.warn(message, meta);
  }

  error(message, meta) {
    this.provider.error(message, meta);
  }

  fatal(message, meta) {
    this.provider.fatal(message, meta);
  }

  isLevelEnabled(level) {
    return this.provider.isLevelEnabled(level);
  }

  isFatalEnabled() {
    return this.provider.isFatalEnabled();
  }

  isErrorEnabled() {
    return this.provider.isErrorEnabled();
  }

  isWarnEnabled() {
    return this.provider.isWarnEnabled();
  }

  isInfoEnabled() {
    return this.provider.isInfoEnabled();
  }

  isDebugEnabled() {
    return this.provider.isDebugEnabled();
  }

  isVerboseEnabled() {
    return this.provider.isVerboseEnabled();
  }
};
