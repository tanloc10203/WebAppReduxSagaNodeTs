import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { LinearProgress } from '@mui/material';
import productImgApi, { PayloadFetchCreateProductImg } from 'api/productImgApi';
import { useAppDispatch } from 'app/hooks';
import { FormLayout } from 'components/FormFields';
import { productImgActions } from 'features/productImage/productImageSlice';
import { ListResponse, ProductImagesAttribute } from 'models';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProductPageAddEditListImgForm } from '../components/forms';
import ProductPageEditImg from '../components/forms/ProductPageEditImgForm';

export interface ProductPageAddEditListImgProps {}

export default function ProductPageAddEditListImg(props: ProductPageAddEditListImgProps) {
  const { productId, productImgId } = useParams();

  const [selected, setSelected] = useState<ProductImagesAttribute>();

  const dispatch = useAppDispatch();

  const isAddMode = !Boolean(productId);

  useEffect(() => {
    if (!productImgId) return;

    (async () => {
      try {
        const response: ListResponse<ProductImagesAttribute> = await productImgApi.getById(
          +productImgId
        );

        if (!response.error) {
          setSelected(response.data as ProductImagesAttribute);
        }
      } catch (error) {
        toast.error('GET IMAGE ERROR');
        console.log(error);
      }
    })();
  }, [productImgId]);

  const handleOnSubmit = (values: PayloadFetchCreateProductImg) => {
    return new Promise((resolve, reject) => {
      try {
        dispatch(productImgActions.fetchCreateProductImgStart(values));
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleOnSubmitEdit = (values: ProductImagesAttribute) => {
    return new Promise((resolve, reject) => {
      try {
        dispatch(productImgActions.fetchUpdateProductImgStart(values));
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  return (
    <FormLayout
      title={isAddMode ? 'Product: Image Add' : 'Product: Image Edit'}
      titleHead={isAddMode ? 'Add New List Image Product' : 'Update List Image Product'}
      icon={<ProductionQuantityLimitsIcon />}
    >
      {Boolean(productImgId) && !Boolean(selected) && <LinearProgress />}
      {Boolean(selected) ? (
        <ProductPageEditImg
          data={selected as ProductImagesAttribute}
          onSubmit={handleOnSubmitEdit}
        />
      ) : (
        <ProductPageAddEditListImgForm
          productId={(productId as unknown as number) || -1}
          onSubmit={handleOnSubmit}
        />
      )}
    </FormLayout>
  );
}
