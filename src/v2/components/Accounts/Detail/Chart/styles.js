import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  card: {
    backgroundColor: getColor('grey2')(theme),
  },
  graph: {
    textAlign: 'center',
    height: 220,
    padding: '20px 40px',
  },
  tooltip: {
    backgroundColor: '#fff',
    padding: 13,
    color: getColor('dark')(theme),
    textAlign: 'center',
  },
  tooltipDot: {
    position: 'absolute',
    width: 14,
    height: 14,
    background: getColor('main')(theme),
    borderRadius: '50%',
    border: `3px solid ${getColor('grey2')(theme)}`,
    bottom: -20,
    left: '50%',
    marginLeft: -7,
  },
  tooltipDate: {
    fontSize: 12,
    color: getColor('grey3')(theme),
  },
  tooltipTitle: {
    textTransform: 'uppercase',
  },
  rangeBtn: {
    textTransform: 'uppercase',
    color: getColor('grey4')(theme),
    width: 44,
    marginLeft: 4,
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    fontFamily: 'Exo, sans-serif',
    letterSpacing: 2.5,
  },
  rangeActive: {
    color: getColor('main')(theme),
    fontWeight: 'bold',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 35px',
    marginBottom: 30,
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 18,
  },
}));
