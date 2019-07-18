import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';

class Bx2ValidatorIdentity extends Component {

  renderAvatar() {
    let {avatarUrl, name} = this.props.info;

    const avatarStyle = {
      marginRight: 10,
      border: '2px solid white',
      backgroundColor: 'black',
      color: 'white',
      borderRadius: 3,
      display: 'inline-block',
      verticalAlign: 'middle',
      width: 35,
      height: 35,
    };

    if (!avatarUrl) {
      const initials = name.split(' ').map(word => word[0]).join('');
      return (
        <Avatar alt="initials" style={avatarStyle}>
          {initials}
        </Avatar>
      );
    }

    return (
      <Avatar alt="avatar" src={avatarUrl} style={avatarStyle} />
    )
  }

  renderVerified() {
    const {verified, verifyUrl} = this.props.info;

    let verifiedIcon;
    if (verified && verifyUrl) {
      verifiedIcon = (
        <CheckCircleIcon
          color="secondary"
          style={{padding: '4px', verticalAlign: 'middle'}}
        />
      );
    } else {
      verifiedIcon = (
        <ErrorIcon
          color="error"
          style={{padding: '4px', verticalAlign: 'middle'}}
        />
      );
    }

    if (!verifyUrl) {
      return verifiedIcon;
    }

    return (
      <Link href={verifyUrl} title={'Click to verify validator'} target="_new">
        {verifiedIcon}
      </Link>
    );
  }

  renderName() {
    const {name, verified, website} = this.props.info;

    let color = 'secondary';
    if (!verified) {
      color = 'error';
    }

    const typography = (
      <Typography display="inline" variant="body1" color={color}>
        {name}
      </Typography>
    );

    if (!website) {
      return typography;
    }

    return (
      <Link
        color={color}
        href={website}
        title={"Click to view validator's website"}
        target="_new"
      >
        {typography}
      </Link>
    );
  }

  renderMissingInfo() {
    return (
      <>
        <Typography display="inline" variant="body1">
          Missing Info
        </Typography>
        <Link
          href={'https://solana-labs.github.io/book/testnet-participation.html#publishing-validator-info'}
          title={'Click to learn how validator info is published'}
          target="_new"
        >
          <InfoIcon
            fontSize="small"
            color="disabled"
            style={{padding: '5px', verticalAlign: 'middle'}}
          />
        </Link>
      </>
    );
  }

  render() {
    if (!this.props.info) {
      return this.renderMissingInfo();
    }

    return (
      <>
        {this.renderAvatar()}
        {this.renderName()}
        {this.renderVerified()}
      </>
    );
  }
}

Bx2ValidatorIdentity.propTypes = {
  info: PropTypes.object,
};

export default Bx2ValidatorIdentity;
