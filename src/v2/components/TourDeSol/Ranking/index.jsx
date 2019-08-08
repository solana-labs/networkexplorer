import React from 'react';
import {observer} from 'mobx-react-lite';
import {Link} from 'react-router-dom';
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
        <Link to={`/validators/${nodePubkey}`} className={classes.name}>
          <Avatar pubkey={nodePubkey} avatarUrl={identity.avatarUrl} />
          <span>{identity.name || nodePubkey}</span>
        </Link>
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
