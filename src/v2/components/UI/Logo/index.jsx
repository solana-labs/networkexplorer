// @flow
import React from 'react';

import logo from './assets/logo.svg';
import logoVertical from './assets/logo_vertical.svg';

type LogoProps = {
  vertical?: boolean,
};

const Logo = ({vertical = false}: LogoProps) => (
  <div>
    <img src={vertical ? logoVertical : logo} alt="Solana" />
  </div>
);

export default Logo;
