import { Button, Container, Pagination, Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Iconify, Page } from 'components/Common';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ProductFilterSidebar, ProductList, ProductSort } from 'sections/@dashboard/products';
import {
  dashboardActions,
  filterSelector,
  paginationSelector,
  productSelector,
} from '../dashboardSlice';

export default function ProductPageMain() {
  const [openFilter, setOpenFilter] = useState(false);
  const dispatch = useAppDispatch();
  const filters = useAppSelector(filterSelector);
  const { data, isFetching } = useAppSelector(productSelector);
  const pagination = useAppSelector(paginationSelector);

  useEffect(() => {
    dispatch(dashboardActions.fetchProductStart(filters));
  }, [dispatch, filters]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleChangePagination = (event: ChangeEvent<unknown>, page: number) => {
    dispatch(dashboardActions.setFilterProduct({ ...filters, _page: page }));
  };

  return (
    <Page title="Products">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Products
          </Typography>

          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/products/add"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Product
          </Button>
        </Stack>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              isOpenFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList loading={isFetching} products={data} />

        <Stack alignItems="flex-end">
          <Stack spacing={2} mt={3}>
            <Pagination
              count={Math.ceil(pagination._totalRows / pagination._limit)}
              page={filters._page}
              color="primary"
              onChange={handleChangePagination}
            />
          </Stack>
        </Stack>
      </Container>
    </Page>
  );
}
