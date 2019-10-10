// @flow
import React from 'react';
import cn from 'classnames';
import format from 'date-fns/format';
import {eq, lt} from 'lodash/fp';
import {observer} from 'mobx-react-lite';
import iconRight from 'v2/assets/icons/arrow-right-dark.png';

type StageProps = {
  className: string,
  activeClass: string,
  activeStage: number,
  stage: {
    id: number,
    title: string,
    hidden: boolean,
    isTbd: boolean,
    startDate: string,
    endDate: string,
  },
};

const Stage = ({className, activeClass, stage, activeStage}: StageProps) => {
  if (stage.hidden) {
    return null;
  }
  const isActive = eq(stage.id, activeStage);
  const isFinished = lt(stage.id, activeStage);
  const stageDateStart = stage.isTbd
    ? 'SOON'
    : format(new Date(stage.startDate), 'P');
  const stageDateEnd = stage.isTbd
    ? 'SOON'
    : format(new Date(stage.endDate), 'P');

  return (
    <li className={cn(className, isActive && activeClass)}>
      <div>
        {stage.title} {isActive && '(LIVE!)'}
        {isActive && <img src={iconRight} width={47} height={13} alt="" />}
        <br />
        {isFinished && <span>(finished {stageDateEnd})</span>}
        {!isActive && !isFinished && <span>(coming {stageDateStart})</span>}
      </div>
    </li>
  );
};

export default observer(Stage);
