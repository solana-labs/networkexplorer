import React from 'react';
import PropTypes from 'prop-types';

class Bx2BlankComponent extends React.Component {
  render() {
    return (
      <div className="flex-auto">
        <div className="pa4 pa6-l mb6 bg-black--50">{this.props.message}</div>
      </div>
    );
  }
}

Bx2BlankComponent.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Bx2BlankComponent;
