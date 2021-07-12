module.exports = class PlainTextFormatter {
  // eslint-disable-next-line class-methods-use-this
  format(timestamp, category, level, message, meta) {
    return `${timestamp}:${category}:${level}:${message}${meta || ''}`;
  }
};
