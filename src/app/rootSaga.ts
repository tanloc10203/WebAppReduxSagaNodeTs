import authSaga from '../features/auth/authSaga';
import { all } from 'redux-saga/effects';
import memberSaga from '../features/Members/memberSaga';
import dashboardSaga from 'features/dashboard/dashboardSaga';

export default function* rootSaga() {
  yield all([authSaga(), memberSaga(), dashboardSaga()]);
}
