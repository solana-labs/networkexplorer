import {IconButton} from '@material-ui/core';
import React from 'react';
import SectionHeader from 'v2/components/UI/SectionHeader';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';

import useStyles from './styles';
const Disclaimer = ({onClose}) => {
  const classes = useStyles();
  const stopClick = e => e.stopPropagation();

  return (
    <div className={classes.popup} onClick={stopClick}>
      <IconButton onClick={onClose} className={classes.closeButton}>
        <CloseIcon className={classes.closeIcon} fontSize="large" />
      </IconButton>
      <SectionHeader title="Website disclaimer" />
      <p>
        Nothing in this website is an offer to sell, or the solicitation of an
        offer to buy, any tokens. Solana is publishing this website solely to
        receive feedback and comments from the public. If and when Solana offers
        for sale any tokens (or a Simple Agreement for Future Tokens), it will
        do so through definitive offering documents, including a disclosure
        document and risk factors. Those definitive documents also are expected
        to include an updated version of this website, which may differ
        significantly from the current version. If and when Solana makes such an
        offering in the United States, the offering likely will be available
        solely to accredited investors. Nothing in this website should be
        treated or read as a guarantee or promise of how Solana’s business or
        the tokens will develop or of the utility or value of the tokens. This
        website outlines current plans, which could change at its discretion,
        and the success of which will depend on many factors outside Solana’s
        control, including market-based factors and factors within the data and
        cryptocurrency industries, among others. Any statements about future
        events are based solely on Solana’s analysis of the issues described in
        this website. That analysis may prove to be incorrect.
      </p>
    </div>
  );
};

Disclaimer.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Disclaimer;
