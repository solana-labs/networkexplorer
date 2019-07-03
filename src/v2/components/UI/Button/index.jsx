// @flow
import React from 'react';
import {Button as BaseButton} from '@material-ui/core';
import cn from 'classnames';

import useStyles from './styles';

type ButtonProps = {
  color: string,
  fullWidth?: boolean,
};

const Button = ({color, fullWidth = false, ...props}: ButtonProps) => {
  const classes = useStyles();
  return (
    <div
      className={cn(
        classes.outline,
        classes[color],
        fullWidth && classes.fullWidth,
      )}
    >
      <BaseButton
        className={classes.root}
        fullWidth={fullWidth}
        color={color}
        {...props}
      />
    </div>
  );
};

export default Button;
