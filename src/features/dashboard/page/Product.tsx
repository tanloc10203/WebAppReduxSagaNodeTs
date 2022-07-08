import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import ProductPageAddEdit from './ProductPageAddEdit';
import ProductPageMain from './ProductPageMain';
import ProductPageUpdatePrice from './ProductPageUpdatePrice';

export default function Product() {
  return (
    <>
      <Routes>
        <Route index element={<ProductPageMain />} />
        <Route path="add" element={<ProductPageAddEdit />} />
        <Route path="add/:productId" element={<ProductPageAddEdit />} />
        <Route path="update/price/:productId" element={<ProductPageUpdatePrice />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
      <Outlet />
    </>
  );
}
