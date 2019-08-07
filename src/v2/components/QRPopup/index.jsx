import {Popover} from '@material-ui/core';
import React, {useState} from 'react';

import useStyles from './styles';

const QRPopup = () => {
  const classes = useStyles();
  const [qrEl, setQrEl] = useState(null);
  const handleQrOpen = event => setQrEl(event.currentTarget);
  const handleQrClose = () => setQrEl(null);
  return (
    <div>
      <button className={classes.qrBtn} onClick={handleQrOpen}>
        QR code
      </button>
      <Popover
        open={Boolean(qrEl)}
        onClose={handleQrClose}
        anchorEl={qrEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <img src="http://placehold.it/315" alt="" />
      </Popover>
    </div>
  );
};

export default QRPopup;
