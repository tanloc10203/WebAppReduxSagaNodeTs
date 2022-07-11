import { PayloadAction } from '@reduxjs/toolkit';
import { productApi, productStatusApi } from 'api';
import { AxiosError } from 'axios';
import { FilterPayload, ListResponse, ProductAttribute, ProductStatusAttribute } from 'models';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { history } from 'utils';
import { dashboardActions } from './dashboardSlice';

function* fetchProductStatus() {
  try {
    const response: ListResponse<ProductStatusAttribute> = yield call(productStatusApi.getAll);

    if (!response.error)
      yield put(
        dashboardActions.fetchProductStatusSucceed(response.data as Array<ProductStatusAttribute>)
      );
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status)
        yield put(dashboardActions.fetchProductStatusFailed(error.response.data?.message));
      yield put(dashboardActions.fetchProductStatusFailed(error.message));
    } else if (error instanceof Error) {
      yield put(dashboardActions.fetchProductStatusFailed(error.message));
    }
  }
}

function* fetchProductCreate({ payload }: PayloadAction<ProductAttribute>) {
  try {
    const response: ListResponse<ProductAttribute> = yield call(productApi.create, payload);

    if (!response.error) {
      const filters: FilterPayload = {
        _page: 1,
        _limit: 5,
      };
      yield put(dashboardActions.fetchProductCreateSucceed());
      yield put(dashboardActions.setFilterProduct(filters));
      history.push('/dashboard/products');
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status)
        yield put(dashboardActions.fetchProductCreateFailed(error.response.data?.message));
      else yield put(dashboardActions.fetchProductCreateFailed(error.message));
    } else if (error instanceof Error) {
      yield put(dashboardActions.fetchProductCreateFailed(error.message));
    }
  }
}

function* fetchProductUpdate({ payload }: PayloadAction<ProductAttribute>) {
  try {
    const response: ListResponse<ProductAttribute> = yield call(productApi.update, payload);

    if (!response.error) {
      const filters: FilterPayload = {
        _page: 1,
        _limit: 5,
      };
      yield put(dashboardActions.fetchProductUpdateSucceed());
      yield put(dashboardActions.setFilterProduct(filters));
      history.push('/dashboard/products');
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status)
        yield put(dashboardActions.fetchProductUpdateFailed(error.response.data?.message));
      else yield put(dashboardActions.fetchProductUpdateFailed(error.message));
    } else if (error instanceof Error) {
      yield put(dashboardActions.fetchProductUpdateFailed(error.message));
    }
  }
}

function* fetchProduct({ payload }: PayloadAction<FilterPayload>) {
  try {
    const response: ListResponse<ProductAttribute> = yield call(productApi.getAll, payload);

    if (!response.error) {
      yield put(dashboardActions.fetchProductSucceed(response));
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      if (error.response?.status)
        yield put(dashboardActions.fetchProductFailed(error.response.data?.message));
      else yield put(dashboardActions.fetchProductFailed(error.message));
    } else if (error instanceof Error) {
      yield put(dashboardActions.fetchProductFailed(error.message));
    }
  }
}

function* watchFetchProductCreate() {
  yield takeLatest(dashboardActions.fetchProductCreateStart.type, fetchProductCreate);
}

function* watchFetchProductUpdate() {
  yield takeLatest(dashboardActions.fetchProductUpdateStart.type, fetchProductUpdate);
}

function* watchFetchProductStatus() {
  yield takeLatest(dashboardActions.fetchProductStatusStart.type, fetchProductStatus);
}

function* watchFetchProduct() {
  yield takeLatest(dashboardActions.fetchProductStart.type, fetchProduct);
}

export default function* dashboardSaga() {
  yield all([
    watchFetchProduct(),
    watchFetchProductCreate(),
    watchFetchProductStatus(),
    watchFetchProductUpdate(),
  ]);
}
