import categorySaga from 'features/category/categorySaga';
import productSaga from 'features/product/productSaga';
import productPriceSaga from 'features/productPrice/productPriceSaga';
import productStatusSaga from 'features/productStatus/productStatusSaga';
import { all } from 'redux-saga/effects';
import authSaga from '../features/auth/authSaga';
import memberSaga from '../features/Members/memberSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    memberSaga(),
    categorySaga(),
    productPriceSaga(),
    productSaga(),
    productStatusSaga(),
  ]);
}
