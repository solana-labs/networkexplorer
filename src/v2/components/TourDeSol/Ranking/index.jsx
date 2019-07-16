import React from 'react';
import {observer} from 'mobx-react-lite';
import {map} from 'lodash/fp';
import HelpLink from 'v2/components/HelpLink';
import NodesStore from 'v2/stores/nodes';
import {ReactComponent as BicycleIcon} from 'v2/assets/icons/bicycle.svg';

import useStyles from './styles';

const Ranking = () => {
  const classes = useStyles();
  const {
    cluster: {nodes},
  } = NodesStore;

  const renderNode = node => (
    <li className={classes.item}>
      <div className={classes.name}>{node.pubkey}</div>
      <div className={classes.bar}>
        <div className={classes.icon}>
          <BicycleIcon />
        </div>
      </div>
    </li>
  );

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        Top Validator Ranking
        <HelpLink text="" term="" />
      </div>
      <ul className={classes.list}>{map(renderNode)(nodes)}</ul>
    </div>
  );
};

Ranking.propTypes = {};

export default observer(Ranking);
