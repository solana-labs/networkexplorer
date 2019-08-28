// @flow
import React from 'react';
import cn from 'classnames';
import format from 'date-fns/format';
import {eq, lt} from 'lodash/fp';
import {observer} from 'mobx-react-lite';
import {TDS_ACTIVE_STAGE} from 'v2/constants';
import iconRight from 'v2/assets/icons/arrow-right-dark.png';

type StageProps = {
  className: string,
  activeClass: string,
  stage: {
    id: number,
    title: string,
    hidden: boolean,
    startDate: string,
    endDate: string,
  },
};

const Stage = ({className, activeClass, stage}: StageProps) => {
  if (stage.hidden) {
    return null;
  }
  const isActive = eq(stage.id, TDS_ACTIVE_STAGE);
  const isFinished = lt(stage.id, TDS_ACTIVE_STAGE);
  const stageDateStart = format(new Date(stage.startDate), 'P');
  const stageDateEnd = format(new Date(stage.endDate), 'P');

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
