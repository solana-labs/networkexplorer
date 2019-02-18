import React from 'react';
import moment from 'moment';

class BxDateTime extends React.Component {
  static formatDateTime(dateTime, fromnow) {
    if (fromnow) {
      return moment(dateTime).fromNow();
    }

    return moment(dateTime).format('LLL Z');
  }

  render() {
    const {dateTime, fromNow} = this.props;

    return (
      <span title={dateTime}>
        {BxDateTime.formatDateTime(dateTime, fromNow)}
      </span>
    );
  }
}

export default BxDateTime;
