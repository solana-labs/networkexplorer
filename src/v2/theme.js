import {createMuiTheme} from '@material-ui/core';

const main = '#00FFAD';
const violet = '#5A00A7';

export default createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      dark: '#000',
      grey: '#242424',
      greyW1: '#424242',
      grey2: '#202020',
      grey3: '#979797',
      grey4: '#c4c4c4',
      grey5: '#505050',
      main,
      white: '#fff',
      greenDark: '#00a771',
      primaryLoader: '#202020',
      secondaryLoader: '#404040',
      violet,
      aqua: '#33f1ff',
      pink: '#f71ef4',
      blue: '#2069f6',
      yellow: '#ffc617',
    },
    secondary: {
      main: '#000',
    },
    background: {
      default: '#000000',
    },
  },
  typography: {
    fontFamily: ['Exo', 'sans-serif'],
    useNextVariants: true,
    h3: {
      fontWeight: 'bold',
      textTransform: 'uppercase',
      fontSize: 23,
      lineHeight: '31px',
      letterSpacing: 2.5,
    },
    h5: {
      fontWeight: 'bold',
      fontSize: 19,
      letterSpacing: 0.4,
    },
    button: {
      textTransform: 'uppercase',
      fontSize: 15,
      letterSpacing: 2.5,
      fontWeight: 'bold',
    },
  },
});

export const mapStyle = {
  fill: '#202020',
  stroke: '#fff',
  strokeWidth: 0.5,
  outline: 'none',
};

export const markerStyle = isLeader => ({
  default: {fill: isLeader ? violet : main},
  hover: {fill: isLeader ? violet : main},
  pressed: {fill: isLeader ? violet : main},
});
