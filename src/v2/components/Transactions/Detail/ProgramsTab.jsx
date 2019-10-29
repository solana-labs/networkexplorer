// @flow
import React from 'react';
import {map} from 'lodash/fp';

import Program from './Program';

const ProgramsTab = ({transaction}: {transaction: Object}) => {
  const renderProgram = instruction => {
    return (
      <Program
        key={instruction.programId}
        id={instruction.programId}
        accounts={instruction.keys}
      />
    );
  };
  return <div>{map(renderProgram)(transaction.instructions)}</div>;
};

export default ProgramsTab;
