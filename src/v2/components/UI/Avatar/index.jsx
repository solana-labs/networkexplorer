// @flow
import React from 'react';
import BaseAvatar from '@material-ui/core/Avatar';
import theme from 'v2/theme';
import getColor from 'v2/utils/getColor';
import getAvatarIndex from 'v2/utils/getAvatarIndex';

import bg from './assets/bg.svg';

const bgPosition = [
  [20, -23],
  [43, -23],
  [21, -36],
  [31, -36],
  [43, -36],
  [21, -51],
  [31, -51],
  [43, -51],
  [21, -65],
  [43, -65],
];

const Avatar = ({
  avatarUrl = '',
  name = '',
  width = 33,
  height = 33,
  pubkey,
}: {
  avatarUrl: string,
  name: string,
  width: number,
  height: number,
  pubkey: string,
}) => {
  const initials = name.charAt(0);
  const [x, y] = bgPosition[getAvatarIndex(pubkey)];
  const avatarStyle = {
    backgroundColor: getColor('main')(theme),
    color: getColor('white')(theme),
    width,
    height,
    backgroundImage: `url(${bg})`,
    backgroundPosition: `${x}px ${y}px`,
  };

  return (
    <BaseAvatar src={avatarUrl} style={avatarStyle}>
      {!avatarUrl && initials}
    </BaseAvatar>
  );
};

export default Avatar;
