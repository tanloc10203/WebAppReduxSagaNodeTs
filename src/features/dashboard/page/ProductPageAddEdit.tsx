import { useAppDispatch } from 'app/hooks';
import { FormLayout } from 'components/FormFields';
import { ProductAttribute } from 'models';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductAddEditForm } from '../components/forms';
import { dashboardActions } from '../dashboardSlice';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

export default function ProductPageAddEdit() {
  const { productId } = useParams();

  const isAddMode = !productId;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(dashboardActions.fetchProductStatusStart());
  }, [dispatch]);

  const initialValues: ProductAttribute = {
    name: '',
    description: '',
    categoryId: -1,
    statusPId: -1,
  };

  const handleOnSubmit = (values: ProductAttribute) => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          dispatch(dashboardActions.fetchProductCreateStart(values));
          resolve(true);
        }, 2000);
      } catch (error) {
        reject(error);
      }
    });
  };

  return (
    <FormLayout
      title={isAddMode ? 'Product: Add' : 'Product: Edit'}
      titleHead={isAddMode ? 'Add New Product' : 'Update Product'}
      icon={<ProductionQuantityLimitsIcon />}
    >
      <ProductAddEditForm initialValues={initialValues} onSubmit={handleOnSubmit} />
    </FormLayout>
  );
}
