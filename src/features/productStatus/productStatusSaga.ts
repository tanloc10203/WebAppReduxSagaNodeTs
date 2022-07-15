import { productStatusApi } from 'api';
import { AxiosError } from 'axios';
import { ListResponse, ProductStatusAttribute } from 'models';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { productStatusActions } from './productStatusSlice';

function* fetchProductStatus() {
  try {
    const response: ListResponse<ProductStatusAttribute> = yield call(productStatusApi.getAll);

    if (!response.error)
      yield put(
        productStatusActions.fetchProductStatusSucceed(
          response.data as Array<ProductStatusAttribute>
        )
      );
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status)
        yield put(productStatusActions.fetchProductStatusFailed(error.response.data?.message));
      yield put(productStatusActions.fetchProductStatusFailed(error.message));
    } else if (error instanceof Error) {
      yield put(productStatusActions.fetchProductStatusFailed(error.message));
    }
  }
}

function* watchFetchProductStatus() {
  yield takeLatest(productStatusActions.fetchProductStatusStart.type, fetchProductStatus);
}

export default function* productStatusSaga() {
  yield all([watchFetchProductStatus()]);
}
