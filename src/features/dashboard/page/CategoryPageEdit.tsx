import CategoryIcon from '@mui/icons-material/Category';
import { categoryApi } from 'api';
import { useAppDispatch } from 'app/hooks';
import { AxiosError } from 'axios';
import { FormLayout } from 'components/FormFields';
import { categoryActions } from 'features/category/categorySlice';
import { CategoryAttribute, ListResponse } from 'models';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CategoryAddForm } from '../components/forms';

export default function CategoryPageEdit() {
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
          dispatch(categoryActions.fetchCategoryEditStart(values));
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
