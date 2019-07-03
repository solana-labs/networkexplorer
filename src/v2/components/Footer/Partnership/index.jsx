import {Typography} from '@material-ui/core';
import React from 'react';
import Button from 'v2/components/UI/Button';
import iconRight from 'v2/assets/icons/arrow-right.png';

import useStyles from './styles';

const Partnership = () => {
  const classes = useStyles();
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
      <Button color="primary" variant="contained">
        Partner with us
      </Button>
      <div className={classes.links}>
        <a href="https://forums.solana.com/">
          Discuss on forums
          <img src={iconRight} width={53} alt="" />
        </a>
        <a href="https://solana.com/">
          Website disclaimer
          <img src={iconRight} width={53} alt="" />
        </a>
      </div>
    </div>
  );
};

export default Partnership;
