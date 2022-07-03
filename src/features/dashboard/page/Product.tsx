import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import ProductPageAddEdit from './ProductPageAddEdit';
import ProductPageMain from './ProductPageMain';

export default function Product() {
  return (
    <>
      <Routes>
        <Route index element={<ProductPageMain />} />
        <Route path="add" element={<ProductPageAddEdit />} />
        <Route path="add/:productId" element={<ProductPageAddEdit />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
      <Outlet />
    </>
  );
}
