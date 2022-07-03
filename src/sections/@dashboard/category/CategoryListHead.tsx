import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { CategoryAttribute, HeadLabelState } from 'models';
import { ChangeEvent, MouseEvent } from 'react';

export interface CategoryListHeadProps {
  order?: 'asc' | 'desc';
  orderBy?: string;
  rowCount: number;
  headLabel: Array<HeadLabelState>;
  numSelected: number;
  onRequestSort?: (event: React.MouseEvent<unknown>, property: keyof CategoryAttribute) => void;
  onSelectAllClick?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

export function CategoryListHead(props: CategoryListHeadProps) {
  const { order, orderBy, rowCount, headLabel, numSelected, onRequestSort, onSelectAllClick } =
    props;
  const createSortHandler = (property: keyof CategoryAttribute) => (event: MouseEvent<unknown>) => {
    onRequestSort?.(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>

        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell?.alignRight ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id as keyof CategoryAttribute)}
            >
              {headCell?.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
