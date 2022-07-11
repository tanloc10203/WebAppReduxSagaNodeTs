import authSaga from '../features/auth/authSaga';
import { all } from 'redux-saga/effects';
import memberSaga from '../features/Members/memberSaga';
import dashboardSaga from 'features/dashboard/dashboardSaga';
import productPriceSaga from 'features/productPrice/productPriceSaga';
import categorySaga from 'features/category/categorySaga';

export default function* rootSaga() {
  yield all([authSaga(), memberSaga(), dashboardSaga(), productPriceSaga(), categorySaga()]);
}
