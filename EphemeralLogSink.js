module.exports = class EphemeralLogSink {
  constructor(loglines, maxlines) {
    this.loglines = loglines || [];
    this.maxlines = maxlines || 1000;
  }

  log(line) {
    this.loglines.unshift(line);
    if (this.loglines.length > this.maxlines) {
      this.loglines.pop();
    }
  }
};
