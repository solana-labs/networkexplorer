// @flow
import React from 'react';
import {map} from 'lodash/fp';

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
    link: '#',
    icon: discord,
    name: 'discord',
  },
  {
    link: '#',
    icon: telegram,
    name: 'telegram',
  },
  {
    link: '#',
    icon: reddit,
    name: 'reddit',
  },
  {
    link: '#',
    icon: twitter,
    name: 'twitter',
  },
  {
    link: '#',
    icon: medium,
    name: 'medium',
  },
];
const Social = () => {
  const classes = useStyles();
  const renderLink = ({name, link, icon: Icon}: Link) => (
    <a key={name} className={classes.link} href={link}>
      <Icon />
    </a>
  );

  return <div className={classes.list}>{map(renderLink)(links)}</div>;
};

export default Social;
