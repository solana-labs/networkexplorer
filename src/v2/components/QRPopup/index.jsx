//@flow
import {Popover} from '@material-ui/core';
import QRCode from 'qrcode.react';
import React, {useState} from 'react';

import useStyles from './styles';

const QRPopup = ({url = ''}: {url: string}) => {
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
        classes={{paper: classes.popup}}
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
        <QRCode
          value={url}
          style={{width: '120px', height: '120px', display: 'block'}}
        />
      </Popover>
    </div>
  );
};

export default QRPopup;
