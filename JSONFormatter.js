export default class JSONFormatter {
  static getTag(value) {
    if (value == null) {
      return value === undefined ? '[object Undefined]' : '[object Null]';
    }
    return toString.call(value);
  }

  static isObjectLike(value) {
    return typeof value === 'object' && value !== null;
  }

  static isPlainObject(value) {
    if (!JSONFormatter.isObjectLike(value) || JSONFormatter.getTag(value) !== '[object Object]') {
      return false;
    }
    if (Object.getPrototypeOf(value) === null) {
      return true;
    }
    let proto = value;
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(value) === proto;
  }

  // eslint-disable-next-line class-methods-use-this
  format(timestamp, category, level, message, meta) {
    return JSON.stringify(
      {
        level,
        message,
        timestamp,
        category,
        ...(JSONFormatter.isPlainObject(meta) ? meta : { meta }),
      },
    );
  }
}
