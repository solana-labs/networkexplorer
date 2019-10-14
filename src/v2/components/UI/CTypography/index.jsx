//@flow
import React from 'react';
import cn from 'classnames';

import useStyles from './styles';

type TypographyProps = {
  type?: 'caption',
  className?: string,
};

const CTypography = ({type = 'text', className, ...props}: TypographyProps) => {
  const classes = useStyles();
  const classNames = cn(classes.root, classes[type], className);
  return <div className={classNames} {...props} />;
};

export default CTypography;
