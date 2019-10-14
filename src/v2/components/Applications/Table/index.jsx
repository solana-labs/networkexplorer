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
    label: 'Application Id',
    name: 'Application Id',
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

const ApplicationsTable = ({
  separate,
  applications,
}: {
  separate: boolean,
  applications: Array,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const showTable = useMediaQuery(theme.breakpoints.up('md'));

  const asTime = x => {
    return formatDistanceToNow(Date.parse(x), {addSuffix: true});
  };

  const renderRow = application => {
    return (
      <TableRow hover key={application.programId}>
        <TableCell>
          <Link to={`/applications/${application.programId}`}>
            {application.programId}
          </Link>
        </TableCell>
        <TableCell>
          <div>
            <TypeLabel type="other" label="TODO" />
          </div>
        </TableCell>
        <TableCell title={application.timestamp}>
          {asTime(application.timestamp)}
        </TableCell>
      </TableRow>
    );
  };

  const renderCard = application => {
    return (
      <div className={classes.card}>
        <ul>
          <li>
            <div className={classes.cardTitle}>Application id</div>
            <div>{application.programId}</div>
          </li>
          <li>
            <div className={classes.cardTitle}>Type</div>
            <div>
              TODO <TypeLabel type="other" label="other" />
            </div>
          </li>
          <li>
            <div className={classes.cardTitle}>Time</div>
            <div title={application.timestamp}>
              {asTime(application.timestamp)}
            </div>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      {showTable ? (
        <Table fields={fields} renderRow={renderRow} data={applications} />
      ) : (
        <div className={cn(classes.list, separate && classes.vertical)}>
          {map(renderCard)(applications)}
        </div>
      )}
    </div>
  );
};

export default observer(ApplicationsTable);
