import { sentenceCase } from 'change-case';
import { filter } from 'lodash';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { Iconify, Label, Page, ScrollBar, SearchNotFound } from 'components/Common';
import { UserListHead, UserListToolbar, UserMoreMenu } from 'sections/@dashboard/user';
import { users as USERLIST, UsersMock } from '_mock';
import { useDebounce } from 'hooks';
import { HeadLabelState } from 'models';

// ----------------------------------------------------------------------

const TABLE_HEAD: Array<HeadLabelState> = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

type OrderByKey = keyof {
  [Key in keyof UsersMock as UsersMock[Key] extends UsersMock ? Key : never]: true;
};

function descendingComparator(a: UsersMock, b: UsersMock, orderBy: string): number {
  if (b[orderBy as OrderByKey] < a[orderBy as OrderByKey]) {
    return -1;
  }
  if (b[orderBy as OrderByKey] > a[orderBy as OrderByKey]) {
    return 1;
  }
  return 0;
}

function getComparator(order: 'asc' | 'desc', orderBy: string) {
  return order === 'desc'
    ? (a: UsersMock, b: UsersMock) => descendingComparator(a, b, orderBy)
    : (a: UsersMock, b: UsersMock) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(
  array: Array<UsersMock>,
  comparator: (a: UsersMock, b: UsersMock) => number,
  query: string
) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a: Array<number | UsersMock>, b: Array<number | UsersMock>) => {
    const order = comparator(a[0] as UsersMock, b[0] as UsersMock);
    if (order !== 0) return order;
    return (a[1] as number) - (b[1] as number);
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState<number>(0);

  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const [selected, setSelected] = useState<Array<UsersMock | string>>([]);

  const [orderBy, setOrderBy] = useState<string>('name');

  const [filterName, setFilterName] = useState<string>('');

  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const debounceValue = useDebounce(filterName);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: ChangeEvent<HTMLInputElement>, name: string) => {
    const selectedIndex = (selected as Array<string>).indexOf(name);
    let newSelected: Array<UsersMock> = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected as any, name as any);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat((selected as Array<UsersMock>).slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat((selected as Array<UsersMock>).slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        (selected as Array<UsersMock>).slice(0, selectedIndex),
        (selected as Array<UsersMock>).slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), debounceValue);

  const isUserNotFound = filteredUsers.length === 0;

  console.log({ page, rowsPerPage });

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New User
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <ScrollBar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, role, status, company, avatarUrl, isVerified } =
                        row as UsersMock;
                      const isItemSelected = selected.indexOf(name) !== -1;

                      console.log('check id', id);

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={name} src={avatarUrl} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{company}</TableCell>
                          <TableCell align="left">{role}</TableCell>
                          <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={(status === 'banned' && 'error') || 'success'}
                            >
                              {sentenceCase(status as string)}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <UserMoreMenu />
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
                        <SearchNotFound searchQuery={filterName} />
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
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
