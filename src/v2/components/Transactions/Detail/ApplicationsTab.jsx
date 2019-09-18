// @flow
import React from 'react';
import {map} from 'lodash/fp';

import Application from './Application';

const ApplicationsTab = ({transaction}: {transaction: Object}) => {
  const renderApplication = instruction => {
    return (
      <Application id={instruction.programId} accounts={instruction.keys} />
    );
  };
  return <div>{map(renderApplication)(transaction.instructions)}</div>;
};

export default ApplicationsTab;
