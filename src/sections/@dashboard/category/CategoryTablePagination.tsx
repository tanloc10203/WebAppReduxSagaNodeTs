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
import { CategoryAttribute, FilterPayload, HeadLabelState, PaginationParams } from 'models';
// material
import { Card, Table, TableContainer } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { ScrollBar } from 'components/Common';
import { categoryActions, categorySelector } from 'features/category/categorySlice';
import { ChangeEvent, MouseEvent, useState } from 'react';
import {
  CategoryListHead,
  CategoryListToolbar,
  CategoryMoreMenu,
} from 'sections/@dashboard/category';
import { getComparator, stableSort } from 'utils';

export interface CategoryTablePaginationProps {}

const TABLE_HEAD: Array<HeadLabelState> = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'slug', label: 'Slug', alignRight: false },
  { id: 'id', label: 'CatID', alignRight: false },
  { id: '' },
];

export function CategoryTablePagination(props: CategoryTablePaginationProps) {
  const { data, filters, pagination } = useAppSelector(categorySelector);

  const { _order, name_order, name_like } = filters as FilterPayload;

  const { _page, _limit, _totalRows } = pagination as PaginationParams;

  const dispatch = useAppDispatch();

  const [selected, setSelected] = useState<readonly string[]>([]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof CategoryAttribute
  ) => {
    const isAsc = name_order === property && _order === 'ASC';
    dispatch(
      categoryActions.setFilterCategory({
        ...filters,
        _order: isAsc ? 'DESC' : 'ASC',
        name_order: property,
      } as FilterPayload)
    );
  };

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

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(categoryActions.setFilterCategory({ ...filters, _page: newPage } as FilterPayload));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      categoryActions.setFilterCategory({
        ...filters,
        _page: 0,
        _limit: parseInt(event.target.value, 10),
      })
    );
  };

  const handleFilterByName = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      categoryActions.setFilterNameLike({
        ...filters,
        name_like: event.target.value,
        _page: 0,
      } as FilterPayload)
    );
  };

  const handleDelete = (event: MouseEvent<unknown>) => {
    console.log('check delete: ', event.currentTarget);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows = _page > 0 ? Math.max(0, (1 + _page) * _limit - _totalRows) : 0;

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
        onFilterName={handleFilterByName}
        onDelete={handleDelete}
      />

      <ScrollBar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <CategoryListHead
              headLabel={TABLE_HEAD}
              numSelected={selected.length}
              order={_order?.toLowerCase() as 'asc' | 'desc'}
              orderBy={name_order}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
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
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}
