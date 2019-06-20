import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class Bx2BlankComponent extends React.Component {
  render() {
    return (
      <Paper style={{marginTop: '80px', marginLeft: '240px', padding: '12px'}}>
        <Typography variant="h6">{this.props.message}</Typography>
      </Paper>
    );
  }
}

Bx2BlankComponent.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Bx2BlankComponent;
