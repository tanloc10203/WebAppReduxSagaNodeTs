import { FormLayout } from 'components/FormFields';
import { useParams } from 'react-router-dom';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { ProductPageAddEditListImgForm } from '../components/forms';
import { ProductImagesAttribute } from 'models';

export interface ProductPageAddEditListImgProps {}

export default function ProductPageAddEditListImg(props: ProductPageAddEditListImgProps) {
  const { productId, productImgId } = useParams();

  const isAddMode = !Boolean(productId);

  const handleOnSubmit = (values: ProductImagesAttribute) => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          console.log(values);
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
