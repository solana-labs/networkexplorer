// @flow
import React from 'react';
import BaseAvatar from '@material-ui/core/Avatar';
import theme from 'v2/theme';
import getColor from 'v2/utils/getColor';

const Avatar = ({
  avatarUrl = '',
  name = '',
  width = 33,
  height = 33,
}: {
  avatarUrl: string,
  name: string,
}) => {
  const initials = name.charAt(0);
  const avatarStyle = {
    backgroundColor: getColor('main')(theme),
    color: getColor('white')(theme),
    width,
    height,
  };

  return (
    <BaseAvatar src={avatarUrl} style={avatarStyle}>
      {!avatarUrl && initials}
    </BaseAvatar>
  );
};

export default Avatar;
