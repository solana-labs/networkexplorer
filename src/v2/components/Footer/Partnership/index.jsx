import {Typography} from '@material-ui/core';
import React from 'react';
import Button from 'v2/components/UI/Button';
import iconRight from 'v2/assets/icons/arrow-right.png';
import Mixpanel from 'v2/mixpanel';

import useStyles from './styles';

const Partnership = () => {
  const classes = useStyles();

  const handlePartner = () => Mixpanel.track('Clicked Partner with us');

  const handleDiscuss = () => Mixpanel.track('Clicked Discuss on Forums');

  return (
    <div>
      <Typography className={classes.title} variant="h5">
        Partnership
      </Typography>
      <Typography className={classes.desc}>
        Looking to scale your business?
        <br />
        Let’s build something together.
      </Typography>
      <Button
        color="primary"
        variant="contained"
        href="https://solana.com/partnerships/"
        target="_blank"
        onClick={handlePartner}
      >
        Partner with us
      </Button>
      <div className={classes.links}>
        <a
          href="https://forums.solana.com/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleDiscuss}
        >
          Discuss on forums
          <img src={iconRight} width={53} alt="" />
        </a>
        <a href="https://solana.com/" target="_blank" rel="noopener noreferrer">
          Website disclaimer
          <img src={iconRight} width={53} alt="" />
        </a>
      </div>
    </div>
  );
};

export default Partnership;
