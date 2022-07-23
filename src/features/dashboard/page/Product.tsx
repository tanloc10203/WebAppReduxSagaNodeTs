import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import ProductPageAddEdit from './ProductPageAddEdit';
import ProductPageAddEditListImg from './ProductPageAddEditListImg';
import ProductPageAddEditPrice from './ProductPageAddEditPrice';
import ProductPageImages from './ProductPageImages';
import ProductPageMain from './ProductPageMain';

export default function Product() {
  return (
    <>
      <Routes>
        <Route index element={<ProductPageMain />} />
        <Route path="add" element={<ProductPageAddEdit />} />
        <Route path="images/add/:productId" element={<ProductPageAddEditListImg />} />
        <Route path="images/update/:productImgId" element={<ProductPageAddEditListImg />} />
        <Route path="images/:productId" element={<ProductPageImages />} />
        <Route path="add/:productId" element={<ProductPageAddEdit />} />
        <Route path="update/price/:productId/:priceId" element={<ProductPageAddEditPrice />} />
        <Route path="update/price/:productId" element={<ProductPageAddEditPrice />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
      <Outlet />
    </>
  );
}
