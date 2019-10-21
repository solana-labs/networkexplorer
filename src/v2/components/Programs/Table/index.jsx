// @flow

import React from 'react';
import {TableCell, TableRow} from '@material-ui/core';
import cn from 'classnames';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import {observer} from 'mobx-react-lite';
import {Link} from 'react-router-dom';
import {map} from 'lodash/fp';
import TypeLabel from 'v2/components/UI/TypeLabel';
import Table from 'v2/components/UI/Table';
import type {TableHeadProps} from 'v2/@types/table';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import useStyles from './styles';

const fields: TableHeadProps[] = [
  {
    label: 'Program Id',
    name: 'Program Id',
    text: '',
    term: '',
  },
  {
    label: 'Type',
    name: 'type',
    text: '',
    term: '',
  },
  {
    label: 'Time',
    name: 'time',
    text: '',
    term: '',
  },
];

const ProgramsTable = ({
  separate,
  programs,
}: {
  separate: boolean,
  programs: Array,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const showTable = useMediaQuery(theme.breakpoints.up('md'));

  const asTime = x => {
    return formatDistanceToNow(Date.parse(x), {addSuffix: true});
  };

  const renderRow = ({data: program}) => {
    return (
      <TableRow hover key={program.programId}>
        <TableCell>
          <Link to={`/programs/${program.programId}`}>
            {program.programId}
          </Link>
        </TableCell>
        <TableCell>
          <div>
            <TypeLabel type="other" label="TODO" />
          </div>
        </TableCell>
        <TableCell title={program.timestamp}>
          {asTime(program.timestamp)}
        </TableCell>
      </TableRow>
    );
  };

  const renderCard = program => {
    return (
      <div className={classes.card}>
        <ul>
          <li>
            <div className={classes.cardTitle}>Program id</div>
            <div>{program.programId}</div>
          </li>
          <li>
            <div className={classes.cardTitle}>Type</div>
            <div>
              TODO <TypeLabel type="other" label="other" />
            </div>
          </li>
          <li>
            <div className={classes.cardTitle}>Time</div>
            <div title={program.timestamp}>
              {asTime(program.timestamp)}
            </div>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      {showTable ? (
        <Table fields={fields} renderRow={renderRow} data={programs} />
      ) : (
        <div className={cn(classes.list, separate && classes.vertical)}>
          {map(renderCard)(programs)}
        </div>
      )}
    </div>
  );
};

export default observer(ProgramsTable);
