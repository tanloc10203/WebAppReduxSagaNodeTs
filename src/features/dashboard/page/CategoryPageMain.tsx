import { Button, Container, LinearProgress, Stack, Typography } from '@mui/material';
import { Iconify, Page } from 'components/Common';
import { Link as RouterLink } from 'react-router-dom';
// material
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { categorySelector, dashboardActions } from '../dashboardSlice';
import { CategoryTablePagination } from 'sections/@dashboard/category';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { FilterPayload } from 'models';

export default function CategoryPageMain() {
  const { isFetching, filters } = useAppSelector(categorySelector);
  const dispatch = useAppDispatch();

  const handleBack = () => {
    const { parentCatId, ...others } = filters as FilterPayload;
    const newFilters = {
      ...others,
      level: others.level - 1,
      _page: 0,
    };
    dispatch(dashboardActions.setFilterCategory(newFilters));
  };

  return (
    <Page title="Category">
      <Container>
        {(filters as FilterPayload).level > 1 && (
          <Button onClick={handleBack}>
            <KeyboardBackspaceIcon /> back
          </Button>
        )}
        {isFetching && <LinearProgress />}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Category
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/category/add"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Category
          </Button>
        </Stack>

        <CategoryTablePagination />
      </Container>
    </Page>
  );
}
