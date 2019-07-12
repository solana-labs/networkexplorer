import {createMuiTheme} from '@material-ui/core';

export default createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      dark: '#000',
      grey: '#242424',
      grey2: '#202020',
      grey3: '#979797',
      grey4: '#c4c4c4',
      main: '#00FFAD',
      white: '#fff',
      greenDark: '#00a771',
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

export const markerStyle = {
  default: {fill: '#00FFAD'},
  hover: {fill: '#00FFAD'},
  pressed: {fill: '#00FFAD'},
};
