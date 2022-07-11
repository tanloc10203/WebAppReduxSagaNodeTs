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

export default function CategoryPageAdd() {
  const { parentCatId } = useParams();

  const dispatch = useAppDispatch();

  const [parent, setParent] = useState<CategoryAttribute>();

  const isAddMode = !parentCatId;

  const initialValues: CategoryAttribute = {
    name: '',
  };

  useEffect(() => {
    if (parentCatId) {
      (async () => {
        const id = parseInt(parentCatId);
        if (id && id !== undefined) {
          try {
            const response: ListResponse<CategoryAttribute> = await categoryApi.getById(id);
            if (!response.error) setParent(response.data as CategoryAttribute);
          } catch (error) {
            if (error instanceof AxiosError) toast.error(error.message);
          }
        }
      })();
    }
  }, [parentCatId]);

  const handleOnSubmit = (values: CategoryAttribute) => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          let newValues = { ...values };

          if (!isAddMode) {
            if (parent) {
              newValues = {
                ...values,
                level: parent.level === null ? 1 : parent.level,
                parentCatId: parent.id,
              };
            }
          }

          dispatch(categoryActions.fetchCategoryCreateStart(newValues));
          resolve(true);
        }, 2000);
      } catch (error) {
        reject(error);
      }
    });
  };

  return (
    <FormLayout
      title={isAddMode ? 'Category: Add' : 'Category: Add Children'}
      titleHead={isAddMode ? 'Add New Category' : 'Add New Children Category'}
      icon={<CategoryIcon />}
    >
      <CategoryAddForm initialValues={initialValues} onSubmit={handleOnSubmit} />
    </FormLayout>
  );
}
