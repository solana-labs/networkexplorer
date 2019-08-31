import React from 'react';
import {observer} from 'mobx-react-lite';
import {Link} from 'react-router-dom';
import HelpLink from 'v2/components/HelpLink';
import NodesStore from 'v2/stores/nodes';
import {ReactComponent as BicycleIcon} from 'v2/assets/icons/bicycle.svg';
import Avatar from 'v2/components/UI/Avatar';
import {map} from 'lodash/fp';
import _ from 'lodash';

import useStyles from './styles';

const Ranking = ({stageDurationBlocks = null, currentSlot = null}) => {
  const classes = useStyles();
  const {validators} = NodesStore;

  let firstStake = (validators && validators[0].activatedStake) || 0;

  const [minVal, maxVal] = _(validators).reduce(
    (a, x) => {
      let stake = x.activatedStake;
      return [Math.min(a[0], stake), Math.max(a[1], stake)];
    },
    [firstStake, firstStake],
  );

  const maxValF = maxVal * 1.0; // the maximum observed stake
  const minValF = minVal * 1.0; // the minimum observed stake
  const spreadF = maxValF - minValF; // the spread between min and max

  // FIXME: demo mode: use clock if block isn't present
  const currentBlock = currentSlot || new Date().getTime() % 60000;
  const maxBlock = stageDurationBlocks || 60000;

  // the node's position based on block count only
  const nonWeightedPosition = (currentBlock * 1.0) / (maxBlock * 1.0);
  // maximum weight factor
  const maxFactor = spreadF !== 0 ? 0.1 : 0.05;
  // synthetic function for 'closeness' : sin(), which is max at middle of race
  const weightFactor = Math.sin(nonWeightedPosition * Math.PI) * maxFactor;

  const renderNode = node => {
    // node position adjustment is based on stake, or random if no spread
    let nodePosF =
      spreadF !== 0
        ? (node.activatedStake * 1.0 - minValF) / spreadF
        : Math.random();
    const weightShare = nodePosF * weightFactor;
    let weightedPosition = (nonWeightedPosition + weightShare) * 100.0;
    weightedPosition = Math.max(Math.floor(weightedPosition), 0);
    weightedPosition = Math.min(Math.ceil(weightedPosition), 100);
    let position = weightedPosition;

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
