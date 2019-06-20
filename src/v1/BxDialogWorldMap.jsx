import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import PowerOffIcon from '@material-ui/icons/PowerOff';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import Fab from '@material-ui/core/Fab';
import Popover from '@material-ui/core/Popover';
import {Connection} from '@solana/web3.js';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';

const mapApiKey =
  process.env.REACT_APP_MAP_API_KEY ||
  'AIzaSyArM4e0n53tWyK5drjXP03OmovvVJHk8OU';

class Node extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  handleTerminate = async () => {
    const {node} = this.props;
    try {
      const rpcUrl = `http://${node.rpc}`;
      console.log(rpcUrl);
      if (window.confirm('Are you sure you want to terminate this node?')) {
        const connection = new Connection(rpcUrl);
        const result = await connection.fullnodeExit();
        if (!result) {
          window.alert('Node declined to exit');
        } else {
          node.terminated = true;
        }
      }
    } catch (err) {
      window.alert(`Failed to terminate node: ${err}`);
    }
    this.handleClose();
  };

  render() {
    const {classes, isLeader, node, ...other} = this.props;
    const {anchorEl} = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <Fab
          size="small"
          diableRipple="true"
          color={isLeader ? 'secondary' : 'primary'}
          aria-owns={open ? 'simple-popper' : undefined}
          aria-haspopup="true"
          variant="contained"
          onClick={this.handleClick}
          {...other}
        >
          {node.terminated ? (
            <PowerOffIcon />
          ) : (
            <img
              src={
                open
                  ? '/solana-logo-blue.svg'
                  : isLeader
                  ? '/solana-logo-black.svg'
                  : '/solana-logo-teal.svg'
              }
              alt="Solana Logo"
              style={{width: '28px'}}
            />
          )}
        </Fab>
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Typography style={{padding: '15px'}}>
            <b>Node:</b> {node.pubkey}
            <br />
            <b>Gossip:</b> {node.gossip}
            <br />
            {node.voteAccount && (
              <div>
                <hr />
                <b>Stake:</b> {node.voteAccount.stake}
                <br />
                <b>Commission:</b>{' '}
                {(100 * (node.voteAccount.commission / 0xffffffff)).toFixed(3)}%
                <br />
                <b>Vote Account:</b> {node.voteAccount.votePubkey}
              </div>
            )}
            {node.rpc && !node.terminated && (
              <div style={{textAlign: 'center'}}>
                <p />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={this.handleTerminate}
                >
                  Terminate Node
                </Button>
              </div>
            )}
          </Typography>
        </Popover>
      </div>
    );
  }
}

Node.propTypes = {
  classes: PropTypes.object.isRequired,
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

export default class BxDialogWorldMap extends React.Component {
  static defaultProps = {
    center: {
      lat: 17,
      lng: -120.6743,
    },
    zoom: 0,
  };

  render() {
    const {classes, onClose, leaderId, nodes, ...other} = this.props;

    const sortedNodes = nodes.slice(0);
    sortedNodes.sort((a, b) => {
      if (a.pubkey === leaderId) {
        return 1;
      } else if (b.pubkey === leaderId) {
        return -1;
      } else {
        return 0;
      }
    });

    return (
      <Dialog
        onClose={onClose}
        aria-labelledby="simple-dialog-title"
        fullScreen
        {...other}
        TransitionComponent={Transition}
      >
        <Toolbar>
          <IconButton onClick={onClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" className={classes.flex}>
            Node Cluster Map
          </Typography>
        </Toolbar>
        <DialogContent>
          <div style={{height: '100%', width: '100%'}}>
            <Typography>{nodes.length} nodes</Typography>
            <GoogleMapReact
              bootstrapURLKeys={{key: mapApiKey}}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
            >
              {sortedNodes.map(node => {
                return (
                  <Node
                    key={node.pubkey}
                    node={node}
                    isLeader={node.pubkey === leaderId}
                    lat={node.lat}
                    lng={node.lng}
                    classes={classes}
                  />
                );
              })}
            </GoogleMapReact>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

BxDialogWorldMap.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};
