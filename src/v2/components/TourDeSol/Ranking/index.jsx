import React from 'react';
import {observer} from 'mobx-react-lite';
import {get, map, maxBy, compose} from 'lodash/fp';
import HelpLink from 'v2/components/HelpLink';
import NodesStore from 'v2/stores/nodes';
import {ReactComponent as BicycleIcon} from 'v2/assets/icons/bicycle.svg';
import Avatar from 'v2/components/UI/Avatar';

import useStyles from './styles';

const Ranking = () => {
  const classes = useStyles();
  const {validators} = NodesStore;

  const maxVal = compose(
    get('stake'),
    maxBy('stake'),
  )(validators);

  const renderNode = node => {
    const position = (node.stake * 100) / maxVal;
    const {identity = {}, nodePubkey} = node;
    return (
      <li key={nodePubkey} className={classes.item}>
        <div className={classes.name}>
          <Avatar pubkey={nodePubkey} name={identity.name} avatarUrl={identity.avatarUrl} />
          {identity.name || nodePubkey}
        </div>
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
      <ul className={classes.list}>{map(renderNode)(validators)}</ul>
    </div>
  );
};

export default observer(Ranking);
