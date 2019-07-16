import React from 'react';
import {observer} from 'mobx-react-lite';
import {get, map, maxBy, compose} from 'lodash/fp';
import HelpLink from 'v2/components/HelpLink';
import NodesStore from 'v2/stores/nodes';
import {ReactComponent as BicycleIcon} from 'v2/assets/icons/bicycle.svg';

import useStyles from './styles';

const Ranking = () => {
  const classes = useStyles();
  const {
    cluster: {voting},
  } = NodesStore;

  const maxVal = compose(
    get('stake'),
    maxBy('stake'),
  )(voting);

  const renderNode = node => {
    const position = (node.stake * 100) / maxVal;
    return (
      <li key={node.nodePubkey} className={classes.item}>
        <div className={classes.name}>{node.nodePubkey}</div>
        <div className={classes.bar}>
          <div
            className={classes.icon}
            style={{left: `calc(${position}% - 26px)`}}
          >
            <BicycleIcon />
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        Top Validator Ranking
        <HelpLink text="" term="" />
      </div>
      <ul className={classes.list}>{map(renderNode)(voting)}</ul>
    </div>
  );
};

export default observer(Ranking);
