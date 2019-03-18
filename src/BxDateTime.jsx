import React from 'react';
import moment from 'moment';

class BxDateTime extends React.Component {
  static DEFAULT_FMT = 'lll Z';
  static COMPACT_FMT = 'lll Z';
  static ISO8601_FMT = 'YYYY/MM/DD HH:mm';

  static formatDateTime(dateTime, options) {
    let {fromNow, style, local} = (options || {});
    let theDateTime = moment.utc(dateTime);

    if (fromNow) {
      return moment(dateTime).fromNow();
    }

    if (!style) {
      style = BxDateTime.DEFAULT_FMT;
    }

    if (local) {
      theDateTime = theDateTime.local();
    }

    return theDateTime.format(style);
  }

  render() {
    return (
      <span title={this.props.dateTime}>
        {BxDateTime.formatDateTime(this.props.dateTime, this.props)}
      </span>
    );
  }
}

export default BxDateTime;
