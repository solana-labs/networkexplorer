import React, {useState} from 'react';
import {map, get} from 'lodash/fp';
import {
  TableBody,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from '@material-ui/core';

import HelpLink from '../../HelpLink';
import useStyles from './styles';

function desc(a, b, orderBy) {
  const getA = get(orderBy)(a);
  const getB = get(orderBy)(b);
  if (getB < getA) {
    return -1;
  }
  if (getB > getA) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = map((el, index) => [el, index])(array);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return map(el => el[0])(stabilizedThis);
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const EnhancedTableHead = props => {
  const classes = useStyles();
  const {fields, order, orderBy, onRequestSort, sortable} = props;

  const createSortHandler = property => event => {
    if (!sortable) return;
    onRequestSort(event, property);
  };

  return (
    <TableHead className={classes.head}>
      <TableRow>
        {map(
          headCell => (
            <TableCell
              key={headCell.id}
              align={headCell.align || 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                hideSortIcon={!sortable}
                active={orderBy === headCell.id}
                direction={order}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                <HelpLink text={headCell.text} term={headCell.term} />
              </TableSortLabel>
            </TableCell>
          ),
          fields,
        )}
      </TableRow>
    </TableHead>
  );
};

const EnhancedTable = props => {
  const classes = useStyles();
  const {data = [], fields, renderRow, initialSort = ''} = props;
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = React.useState(initialSort);
  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  return (
    <Table className={classes.root}>
      <EnhancedTableHead
        sortable={Boolean(initialSort)}
        classes={classes}
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
        fields={fields}
      />
      <TableBody>
        {map(renderRow)(stableSort(data, getSorting(order, orderBy)))}
      </TableBody>
    </Table>
  );
};

export default EnhancedTable;
