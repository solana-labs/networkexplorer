import React, {Component} from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from 'react-simple-maps';
import {makeStyles} from '@material-ui/core/styles';
import BxEntityLink from './Bx2EntityLink';
import BxHelpLink from './Bx2HelpLink';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import {Button, Grid} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Tooltip from '@material-ui/core/Tooltip';

function arrowGenerator(color) {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${color} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${color} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.95em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${color} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.95em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${color}`,
      },
    },
  };
}

const useStylesArrow = makeStyles(theme => ({
  tooltip: {
    position: 'relative',
  },
  arrow: {
    position: 'absolute',
    fontSize: 6,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
  popper: arrowGenerator(theme.palette.grey[700]),
}));

function ArrowTooltip(props) {
  const {arrow, ...classes} = useStylesArrow();
  const [arrowRef, setArrowRef] = React.useState(null);

  return (
    <Tooltip
      classes={classes}
      PopperProps={{
        popperOptions: {
          modifiers: {
            arrow: {
              enabled: Boolean(arrowRef),
              element: arrowRef,
            },
          },
        },
      }}
      {...props}
      title={
        <React.Fragment>
          {props.title}
          <span className={arrow} ref={setArrowRef}/>
        </React.Fragment>
      }
    />
  );
}

class Bx2PanelValidatorsOverview extends Component {
  makeMarker(node) {
    return {
      name: node.pubkey,
      coordinates: [node.lng, node.lat],
    };
  }

  renderValidators() {
    const {nodes} = this.props;

    // eslint-disable-next-line no-restricted-properties
    const totalSupplySOL = (this.props.supply / Math.pow(2, 34)).toFixed(
      2,
    );

    return (
      <div>
        <div style={{backgroundColor: 'white', marginLeft: 240, marginTop: 60}}>
          <ComposableMap>
            <ZoomableGroup>
              <Geographies geography={'/resources/world-50m-simplified.json'}>
                {(geographies, projection) => geographies.map((geography, i) => (
                  <Geography
                    key={`geo${i}`}
                    geography={geography}
                    projection={projection}
                  />
                ))}
              </Geographies>
              <Markers>
                {
                  nodes.map((node, i) => (
                    <Marker key={`mk${i}`} marker={this.makeMarker(node)}>
                      <ArrowTooltip
                        title={`Name: ${node.pubkey}\nStake: ${(node.voteAccount && node.voteAccount.stake) || 0} Lamports`}>
                        <circle
                          cx={0}
                          cy={0}
                          r={10}
                          style={{
                            stroke: 'rgb(21, 127, 94)',
                            fill: 'rgb(43, 254, 188)',
                            strokeWidth: 3,
                            opacity: 0.9,
                          }}
                        />
                      </ArrowTooltip>
                    </Marker>
                  ))
                }
              </Markers>
            </ZoomableGroup>
          </ComposableMap>
        </div>
        <p/>
        <div>
          <Grid container justify="center" spacing={1} className="sideBySide">
            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2" align="center">
                    Total Supply
                    <BxHelpLink text="Leader" term="leader"/>
                    <ArrowTooltip title="Add">
                      <Button>Arrow</Button>
                    </ArrowTooltip>
                  </Typography>
                  <Typography component="p" align="center">
                    {totalSupplySOL} SOL
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2" align="center">
                    Total Bonded Tokens
                    <BxHelpLink text="Leader" term="leader"/>
                  </Typography>
                  <Typography component="p" align="center">
                    (TODO) SOL
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2" align="center">
                    # Active Validators
                    <BxHelpLink text="Leader" term="leader"/>
                  </Typography>
                  <Typography component="p" align="center">
                    {this.props.nodes.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
        <Paper style={{marginTop: 10, marginLeft: 240}}>
          <Typography
            variant="h6"
            id="tableTitle"
            style={{textAlign: 'left', padding: '16px'}}
          >
            Validators
            <BxHelpLink text="Transaction" term="transaction"/>
            <br/>
            <Link component={RouterLink} to={'/v2/validators'}>See All</Link>
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <div>
                    Node Pubkey
                    <BxHelpLink text="Transaction" term="transaction"/>
                  </div>
                  <div>
                    Vote Pubkey
                    <BxHelpLink text="Account" term="account"/>
                  </div>
                </TableCell>
                <TableCell>
                  Stake
                  <BxHelpLink text="Program" term="program-id"/>
                </TableCell>
                <TableCell align="center">
                  Commission
                  <BxHelpLink text="Block Height" term="block-height"/>
                </TableCell>
                <TableCell align="right">
                  Uptime
                  <BxHelpLink text="Block Height" term="block-height"/>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.map(nodes, row => (
                <TableRow key={row.pubkey}>
                  <TableCell
                    component="th"
                    scope="row"
                    title={JSON.stringify(row, null, 2)}
                  >
                    <BxEntityLink prg_id={row.pubkey}/>
                    <br/>
                    <BxEntityLink
                      prg_id={row.voteAccount && row.voteAccount.votePubkey}
                    />
                  </TableCell>
                  <TableCell align="right" style={{verticalAlign: 'middle'}}>
                    {(row.voteAccount && row.voteAccount.stake) || 0} Lamports
                  </TableCell>
                  <TableCell align="center">TODO</TableCell>
                  <TableCell align="right">TODO</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }

  render() {
    const {nodes} = this.props;

    if (nodes) {
      return this.renderValidators();
    }

    return (
      <Paper>
        <Typography variant="h6" id="tableTitle" style={{textAlign: 'left'}}>
          (ERROR - No data.)
        </Typography>
      </Paper>
    );
  }
}

Bx2PanelValidatorsOverview.propTypes = {
  nodes: PropTypes.array.isRequired,
  supply: PropTypes.number.isRequired,
};

export default Bx2PanelValidatorsOverview;
