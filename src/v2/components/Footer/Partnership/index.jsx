import React, {useState} from 'react';
import Button from 'v2/components/UI/Button';
import {Modal, Fade, Typography, Backdrop} from '@material-ui/core';
import iconRight from 'v2/assets/icons/arrow-right.png';
import Mixpanel from 'v2/mixpanel';

import Disclaimer from './Disclaimer';
import useStyles from './styles';

const Partnership = () => {
  const [isOpen, setOpen] = useState(false);
  const classes = useStyles();
  const handlePartner = () => Mixpanel.track('Clicked Partner with us');
  const handleDiscuss = () => Mixpanel.track('Clicked Discuss on Forums');
  const openDisclaimer = () => setOpen(true);
  const closeDisclaimer = () => setOpen(false);

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
          className={classes.link}
          href="https://forums.solana.com/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleDiscuss}
        >
          Discuss on forums
          <img src={iconRight} width={53} alt="" />
        </a>
        <button className={classes.link} onClick={openDisclaimer}>
          Website disclaimer
          <img src={iconRight} width={53} alt="" />
        </button>
      </div>
      <Modal
        open={isOpen}
        onClose={closeDisclaimer}
        closeAfterTransition
        BackdropComponent={Backdrop}
        className={classes.disclaimer}
        BackdropProps={{
          timeout: 300,
        }}
      >
        <Fade in={isOpen}>
          <Disclaimer onClose={closeDisclaimer} />
        </Fade>
      </Modal>
    </div>
  );
};

export default Partnership;
