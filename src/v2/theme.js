import {createMuiTheme} from '@material-ui/core';

export default createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      dark: '#000',
      grey: '#242424',
      grey2: '#202020',
      grey3: '#979797',
      main: '#00FFAD',
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
    button: {
      textTransform: 'uppercase',
      fontSize: 15,
      letterSpacing: 2.5,
      fontWeight: 'bold',
    },
  },
});
