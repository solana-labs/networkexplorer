import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  card: {
    background: getColor('grey2')(theme),
    padding: '14px 35px',
    height: '100%',
  },
  graph: {
    textAlign: 'center',
    height: 89,
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
  values: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  val: {
    fontSize: 60,
    fontWeight: 'bold',
    color: getColor('main')(theme),
    margin: '20px 0',
  },
  changes: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
}));
