import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { PayloadFetchCreateProductImg } from 'api/productImgApi';
import { useAppDispatch } from 'app/hooks';
import { FormLayout } from 'components/FormFields';
import { productImgActions } from 'features/productImage/productImageSlice';
import { ProductImagesAttribute } from 'models';
import { useParams } from 'react-router-dom';
import { ProductPageAddEditListImgForm } from '../components/forms';

export interface ProductPageAddEditListImgProps {}

export default function ProductPageAddEditListImg(props: ProductPageAddEditListImgProps) {
  const { productId, productImgId } = useParams();

  const dispatch = useAppDispatch();

  const isAddMode = !Boolean(productId);

  const handleOnSubmit = (values: PayloadFetchCreateProductImg) => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          console.log(values);

          dispatch(productImgActions.fetchCreateProductImgStart(values));
          resolve(true);
        }, 2000);
      } catch (error) {
        reject(error);
      }
    });
  };

  const initialValues: Omit<ProductImagesAttribute, 'productId'> = {
    urlImg: '',
  };

  return (
    <FormLayout
      title={isAddMode ? 'Product: Image Add' : 'Product: Image Edit'}
      titleHead={isAddMode ? 'Add New List Image Product' : 'Update List Image Product'}
      icon={<ProductionQuantityLimitsIcon />}
    >
      {/* {Boolean(productId) && !selected && <LinearProgress />}
  {(isAddMode || Boolean(selected)) && (
  )} */}
      <ProductPageAddEditListImgForm
        productId={(productId as unknown as number) || -1}
        initialValues={initialValues}
        onSubmit={handleOnSubmit}
      />
    </FormLayout>
  );
}
