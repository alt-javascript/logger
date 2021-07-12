const _ = require('lodash');

module.exports = class JSONFormatter {
  // eslint-disable-next-line class-methods-use-this
  format(timestamp, category, level, message, meta) {
    return JSON.stringify(
      _.assignIn({
        level, message, timestamp, category,
      },
      _.assignIn(meta, this.meta)),
    );
  }
};
