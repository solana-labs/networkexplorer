import React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import {observer} from 'mobx-react-lite';
import {Link} from 'react-router-dom';
import {map} from 'lodash/fp';
import NodesStore from 'v2/stores/nodes';

import useStyles from './styles';

const ValidatorsTable = () => {
  const classes = useStyles();
  const theme = useTheme();
  const showTable = useMediaQuery(theme.breakpoints.up('md'));
  const {
    cluster: {nodes},
  } = NodesStore;
  const renderRow = row => {
    return (
      <TableRow hover key={row.pubkey}>
        <TableCell align="center">
          <div className={classes.name}>
            <span />
            {row.pubkey}
          </div>
        </TableCell>
        <TableCell>total sol</TableCell>
        <TableCell>Commission</TableCell>
        <TableCell>Uptime</TableCell>
      </TableRow>
    );
  };
  const renderCard = card => {
    return (
      <div className={classes.card}>
        <div className={classes.name}>
          <span />
          {card.pubkey}
        </div>
        <Grid container>
          <Grid item xs={4} zeroMinWidth>
            <div className={classes.cardTitle}>Total sol</div>
            <div>Total sol</div>
          </Grid>
          <Grid item xs={4} zeroMinWidth>
            <div className={classes.cardTitle}>Commission</div>
            <div>Commission</div>
          </Grid>
          <Grid item xs={4} zeroMinWidth>
            <div className={classes.cardTitle}>Uptime</div>
            <div>Uptime</div>
          </Grid>
        </Grid>
      </div>
    );
  };
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography>Validators</Typography>
        <Typography variant="h5">129,948</Typography>
        <Link to="validators/all" className={classes.link}>
          See all &gt;
        </Link>
      </div>
      {showTable ? (
        <Table>
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell align="center">Name/Moniker</TableCell>
              <TableCell>Total Sol</TableCell>
              <TableCell>Commission</TableCell>
              <TableCell>Uptime</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            classes={{
              root: classes.body,
            }}
          >
            {map(renderRow)(nodes)}
          </TableBody>
        </Table>
      ) : (
        <div className={classes.list}>{map(renderCard)(nodes)}</div>
      )}
    </div>
  );
};

export default observer(ValidatorsTable);
