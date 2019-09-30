// @flow

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import cn from 'classnames';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import {observer} from 'mobx-react-lite';
import {Link} from 'react-router-dom';
import {map} from 'lodash/fp';
import HelpLink from 'v2/components/HelpLink';
import TypeLabel from 'v2/components/UI/TypeLabel';
import type {TableHeadProps} from 'v2/@types/table';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import useStyles from './styles';

const tHeads: TableHeadProps[] = [
  {
    name: 'Application Id',
    text: '',
    term: '',
  },
  {
    name: 'type',
    text: '',
    term: '',
  },
  {
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
        <TableCell align="center">
          <Link
            to={`/applications/${application.programId}`}
            className={classes.name}
          >
            {application.programId}
          </Link>
        </TableCell>
        <TableCell>
          TODO <TypeLabel type="other" label="other" />
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

  const renderTH = ({name, width, ...rest}: TableHeadProps) => (
    <TableCell key={name} width={width}>
      {name}
      <HelpLink {...rest} />
    </TableCell>
  );

  return (
    <div className={classes.root}>
      {showTable ? (
        <Table>
          <TableHead className={classes.head}>
            <TableRow>{map(renderTH)(tHeads)}</TableRow>
          </TableHead>
          <TableBody
            classes={{
              root: classes.body,
            }}
          >
            {map(renderRow)(applications)}
          </TableBody>
        </Table>
      ) : (
        <div className={cn(classes.list, separate && classes.vertical)}>
          {map(renderCard)(applications)}
        </div>
      )}
    </div>
  );
};

export default observer(ApplicationsTable);
