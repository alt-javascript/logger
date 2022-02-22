import _ from 'lodash';

export default class JSONFormatter {
  // eslint-disable-next-line class-methods-use-this
  format(timestamp, category, level, message, meta) {
    return JSON.stringify(
      _.assignIn({
        level, message, timestamp, category,
      },
      _.isPlainObject(meta) ? meta : { meta }),
    );
  }
}
