import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import ProductPageAddEdit from './ProductPageAddEdit';
import ProductPageMain from './ProductPageMain';
import ProductPageAddEditPrice from './ProductPageAddEditPrice';

export default function Product() {
  return (
    <>
      <Routes>
        <Route index element={<ProductPageMain />} />
        <Route path="add" element={<ProductPageAddEdit />} />
        <Route path="add/:productId" element={<ProductPageAddEdit />} />
        <Route path="update/price/:productId/:priceId" element={<ProductPageAddEditPrice />} />
        <Route path="update/price/:productId" element={<ProductPageAddEditPrice />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
      <Outlet />
    </>
  );
}
