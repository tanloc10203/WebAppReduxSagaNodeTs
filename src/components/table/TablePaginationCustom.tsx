import {
  Checkbox,
  Stack,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { SearchNotFound } from 'components/Common';
import { FilterPayload, HeadLabelState, PaginationParams } from 'models';
// material
import { Card, Table, TableContainer } from '@mui/material';
import { ScrollBar } from 'components/Common';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { CategoryListToolbar, CategoryMoreMenu } from 'sections/@dashboard/category';
import { getComparator, stableSort } from 'utils';
import TableHeadCustom from './TableHeadCustom';

interface T {
  [key: string]: any;
}

export interface TablePaginationCustomProps {
  tableHead: Array<HeadLabelState>;
  data: Array<T>;

  pagination: PaginationParams;
  filters: FilterPayload;

  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof any) => void;
  onChangePage: (event: unknown, newPage: number) => void;

  onChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void;
  onFilterByName: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function TablePaginationCustom(props: TablePaginationCustomProps) {
  const {
    tableHead,
    data,
    pagination,
    filters,
    onChangePage,
    onChangeRowsPerPage,
    onRequestSort,
    onFilterByName,
  } = props;

  const { _order, name_order, name_like } = filters;

  const { _page, _limit, _totalRows } = pagination;

  const [selected, setSelected] = useState<readonly string[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows = _page > 0 ? Math.max(0, (1 + _page) * _limit - _totalRows) : 0;

  const handleDelete = (event: MouseEvent<unknown>) => {
    console.log('check delete: ', event.currentTarget);
  };

  const rows = stableSort(
    data as unknown as readonly { [x: string]: string | number }[],
    getComparator(_order?.toLowerCase() as 'asc' | 'desc', name_order as string)
  );

  const isUserNotFound = data.length === 0;

  return (
    <Card>
      <CategoryListToolbar
        numSelected={selected.length}
        filterName={name_like as string}
        onFilterName={onFilterByName}
        onDelete={handleDelete}
      />

      <ScrollBar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableHeadCustom
              headLabel={tableHead}
              numSelected={selected.length}
              order={_order?.toLowerCase() as 'asc' | 'desc'}
              orderBy={name_order}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={onRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {rows.slice(0, _limit).map((row, index) => {
                const { id, name, slug, level } = row;
                const isItemSelected = isSelected(name as string);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    key={name}
                    tabIndex={-1}
                    role="checkbox"
                    selected={isItemSelected}
                    aria-checked={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onChange={(event) => handleClick(event, name as string)}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2" noWrap textTransform="capitalize">
                          {name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">{slug}</TableCell>
                    <TableCell align="left">{id}</TableCell>

                    <TableCell align="right">
                      <CategoryMoreMenu categoryId={id as number} level={level as number} />
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

            {isUserNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={name_like as string} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </ScrollBar>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={_totalRows}
        rowsPerPage={_limit}
        page={_page}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
      />
    </Card>
  );
}
