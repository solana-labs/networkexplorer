// @flow
import React from 'react';
import {map} from 'lodash/fp';
import Mixpanel from 'v2/mixpanel';

import {ReactComponent as discord} from './assets/discord.svg';
import {ReactComponent as medium} from './assets/medium.svg';
import {ReactComponent as reddit} from './assets/reddit.svg';
import {ReactComponent as telegram} from './assets/telegram.svg';
import {ReactComponent as twitter} from './assets/twitter.svg';
import useStyles from './styles';

type Link = {
  link: string,
  icon: React$Node,
  name: string,
};

const links: Link[] = [
  {
    link: 'https://discordapp.com/invite/pquxPsq',
    icon: discord,
    name: 'discord',
  },
  {
    link: 'https://t.me/solanaio',
    icon: telegram,
    name: 'telegram',
  },
  {
    link: 'https://www.reddit.com/r/solana',
    icon: reddit,
    name: 'reddit',
  },
  {
    link: 'https://twitter.com/solana',
    icon: twitter,
    name: 'twitter',
  },
  {
    link: 'https://medium.com/solana-labs',
    icon: medium,
    name: 'medium',
  },
];
const Social = () => {
  const classes = useStyles();

  const handleLink = () => social => Mixpanel.track(`Visit ${social}`);

  const renderLink = ({name, link, icon: Icon}: Link) => (
    <a
      key={name}
      className={classes.link}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleLink(name)}
    >
      <Icon />
    </a>
  );

  return <div className={classes.list}>{map(renderLink)(links)}</div>;
};

export default Social;
