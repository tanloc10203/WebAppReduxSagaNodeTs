import { FormLayout } from 'components/FormFields';
import { CategoryAttribute, ListResponse } from 'models';
import CategoryIcon from '@mui/icons-material/Category';
import { CategoryAddForm } from '../components/forms';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'app/hooks';
import { useEffect, useState } from 'react';
import { categoryApi } from 'api';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { dashboardActions } from '../dashboardSlice';

export interface CategoryPageEditProps {}

export default function CategoryPageEdit(props: CategoryPageEditProps) {
  const { categoryId } = useParams();

  const dispatch = useAppDispatch();

  const [category, setCategory] = useState<CategoryAttribute>();

  useEffect(() => {
    if (categoryId) {
      (async () => {
        const id = parseInt(categoryId);
        if (id && id !== undefined) {
          try {
            const response: ListResponse<CategoryAttribute> = await categoryApi.getById(id);
            if (!response.error) setCategory(response.data as CategoryAttribute);
          } catch (error) {
            if (error instanceof AxiosError) toast.error(error.message);
          }
        }
      })();
    }
  }, [categoryId]);

  const initialValues: CategoryAttribute = {
    name: '',
    ...category,
  } as CategoryAttribute;

  const handleOnSubmit = (values: CategoryAttribute) => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          dispatch(dashboardActions.fetchCategoryEditStart(values));
          resolve(true);
        }, 2000);
      } catch (error) {
        reject(error);
      }
    });
  };

  return (
    <FormLayout title="Category: Edit" titleHead="Edit Category" icon={<CategoryIcon />}>
      {Boolean(category) && (
        <CategoryAddForm initialValues={initialValues} onSubmit={handleOnSubmit} />
      )}
    </FormLayout>
  );
}
