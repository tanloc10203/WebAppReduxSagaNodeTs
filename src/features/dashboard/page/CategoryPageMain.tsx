import { Button, Container, LinearProgress, Stack, Typography } from '@mui/material';
import { Iconify, Page } from 'components/Common';
import { Link as RouterLink } from 'react-router-dom';
// material
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { categoryActions, categorySelector } from 'features/category/categorySlice';
import { FilterPayload } from 'models';
import { CategoryTablePagination } from 'sections/@dashboard/category';

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
    dispatch(categoryActions.setFilterCategory(newFilters));
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
