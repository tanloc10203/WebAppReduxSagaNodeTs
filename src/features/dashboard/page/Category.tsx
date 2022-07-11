import { useAppDispatch, useAppSelector } from 'app/hooks';
import { categoryActions, categorySelector } from 'features/category/categorySlice';
import { FilterPayload } from 'models';
import { useEffect } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import CategoryPageAdd from './CategoryPageAdd';
import CategoryPageEdit from './CategoryPageEdit';
import CategoryPageMain from './CategoryPageMain';

export default function Category() {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector(categorySelector);

  useEffect(() => {
    const newFilters: FilterPayload = {
      ...(filters as FilterPayload),
    };
    dispatch(categoryActions.fetchCategoryStart({ params: newFilters }));
  }, [dispatch, filters]);

  return (
    <>
      <Routes>
        <Route index element={<CategoryPageMain />} />
        <Route path="add" element={<CategoryPageAdd />} />
        <Route path="add/:parentCatId" element={<CategoryPageAdd />} />
        <Route path="update/:categoryId" element={<CategoryPageEdit />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
      <Outlet />
    </>
  );
}
