import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { LinearProgress } from '@mui/material';
import { productApi } from 'api';
import { useAppDispatch } from 'app/hooks';
import { AxiosError } from 'axios';
import { FormLayout } from 'components/FormFields';
import { FilterPayload, ListResponse, ProductAttribute } from 'models';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProductAddEditForm } from '../components/forms';
import { dashboardActions } from '../dashboardSlice';

export default function ProductPageAddEdit() {
  const { productId } = useParams();

  const [selected, setSelected] = useState<ProductAttribute>();

  const isAddMode = !productId;

  const dispatch = useAppDispatch();

  useEffect(() => {
    const filters: FilterPayload = {} as FilterPayload;
    dispatch(dashboardActions.fetchProductStatusStart());
    dispatch(dashboardActions.fetchCategoryStart({ params: filters, notPrams: true }));
  }, [dispatch]);

  useEffect(() => {
    if (!productId) return;

    (async () => {
      try {
        const response: ListResponse<ProductAttribute> = await productApi.getById(+productId);
        if (!response.error) setSelected(response.data as ProductAttribute);
      } catch (error) {
        if (error instanceof AxiosError) toast.error(error.message);
      }
    })();
  }, [productId]);

  const initialValues: ProductAttribute = {
    name: '',
    description: '',
    categoryId: -1,
    statusPId: -1,
    ...selected,
  };

  const handleOnSubmit = (values: ProductAttribute) => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          if (isAddMode) {
            dispatch(dashboardActions.fetchProductCreateStart(values));
          } else {
            dispatch(dashboardActions.fetchProductUpdateStart(values));
          }
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
      {Boolean(productId) && !selected && <LinearProgress />}
      {(isAddMode || Boolean(selected)) && (
        <ProductAddEditForm initialValues={initialValues} onSubmit={handleOnSubmit} />
      )}
    </FormLayout>
  );
}
