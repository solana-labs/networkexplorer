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
import TableCard from 'v2/components/UI/TableCard';

import useStyles from './styles';

const fields: TableHeadProps[] = [
  {
    label: 'Program Id',
    id: 'id',
    text: '',
    term: '',
  },
  {
    label: 'Type',
    id: 'type',
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

  const renderRow = ({data: program}) => {
    return (
      <TableRow hover key={program.id}>
        <TableCell>
          <Link to={`/programs/${program.id}`}>{program.id}</Link>
        </TableCell>
        <TableCell>
          <div>
            <TypeLabel type="other" label="TODO" />
          </div>
        </TableCell>
      </TableRow>
    );
  };

  const renderCard = program => {
    const {id} = program;
    const data = [
      {
        label: 'Program id',
        value: id,
      },
      {
        label: 'Type',
        value: (
          <div>
            TODO <TypeLabel type="other" label="other" />
          </div>
        ),
      },
    ];
    return <TableCard data={data} key={id} />;
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
