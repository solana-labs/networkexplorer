// @flow
import React from 'react';
import {observer} from 'mobx-react-lite';
import {map} from 'lodash/fp';
import HelpLink from 'v2/components/HelpLink';
import {ReactComponent as BicycleIcon} from 'v2/assets/icons/bicycle.svg';
import ValidatorName from 'v2/components/UI/ValidatorName';
import useStyles from './styles';

const Ranking = ({activeValidators}: {activeValidators: Array}) => {
  const classes = useStyles();

  const renderNode = node => {
    const {name, pubkey, avatarUrl, slot, activatedStake, score} = node;
    const title = `SLOT: ${slot} | STAKE: ${activatedStake.toFixed(
      8,
    )} | SCORE: ${score}`;

    return (
      <li key={pubkey} className={classes.item}>
        <div className={classes.name}>
          <ValidatorName pubkey={pubkey} name={name} avatar={avatarUrl} />
        </div>
        <div className={classes.bar}>
          <div
            className={classes.icon}
            style={{left: `calc(${score}% - 26px)`}}
          >
            <BicycleIcon title={title} />
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
      <ul className={classes.list}>{map(renderNode)(activeValidators)}</ul>
    </div>
  );
};

export default observer(Ranking);
