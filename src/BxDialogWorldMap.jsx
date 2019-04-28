import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import PowerOffIcon from '@material-ui/icons/PowerOff';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import Fab from '@material-ui/core/Fab';
import Popover from '@material-ui/core/Popover';
import {Connection} from '@solana/web3.js';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
            <b>Node:</b> {node.id}
            <br />
            <b>Gossip:</b> {node.gossip}
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

export default class BxDialogWorldMap extends React.Component {
  static defaultProps = {
    center: {
      lat: 0,
      lng: -120.6743,
    },
    zoom: 0,
  };

  render() {
    const {classes, onClose, leaderId, nodes, ...other} = this.props;

    const sortedNodes = nodes.slice(0);
    sortedNodes.sort((a, b) => {
      if (a.id === leaderId) {
        return 1;
      } else if (b.id === leaderId) {
        return -1;
      } else {
        return 0;
      }
    });

    return (
      <Dialog
        onClose={onClose}
        aria-labelledby="simple-dialog-title"
        fullScreen={true}
        {...other}
      >
        <DialogTitle id="simple-dialog-title">
          Node Cluster Map
          <IconButton
            aria-label="Close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div style={{height: '85vh', width: '100%'}}>
            <Typography>{nodes.length} nodes</Typography>
            <GoogleMapReact
              bootstrapURLKeys={{key: mapApiKey}}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
            >
              {sortedNodes.map(node => {
                return (
                  <Node
                    key={node.id}
                    node={node}
                    isLeader={node.id === leaderId}
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
