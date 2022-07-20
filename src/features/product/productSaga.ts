import { PayloadAction } from '@reduxjs/toolkit';
import { productApi } from 'api';
import { AxiosError } from 'axios';
import {
  FilterPayload,
  ListResponse,
  ListResponseRandom,
  ParamGetRandom,
  ProductAttribute,
} from 'models';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { history } from 'utils';
import { productActions } from './productSlice';

function* fetchProductCreate({ payload }: PayloadAction<ProductAttribute>) {
  try {
    const response: ListResponse<ProductAttribute> = yield call(productApi.create, payload);

    if (!response.error) {
      const filters: FilterPayload = {
        _page: 1,
        _limit: 7,
      };
      yield put(productActions.fetchProductCreateSucceed());
      yield put(productActions.setFilterProduct(filters));
      history.push('/dashboard/products');
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status)
        yield put(productActions.fetchProductCreateFailed(error.response.data?.message));
      else yield put(productActions.fetchProductCreateFailed(error.message));
    } else if (error instanceof Error) {
      yield put(productActions.fetchProductCreateFailed(error.message));
    }
  }
}

function* fetchProductUpdate({ payload }: PayloadAction<ProductAttribute>) {
  try {
    const response: ListResponse<ProductAttribute> = yield call(productApi.update, payload);

    if (!response.error) {
      const filters: FilterPayload = {
        _page: 1,
        _limit: 7,
      };
      yield put(productActions.fetchProductUpdateSucceed());
      yield put(productActions.setFilterProduct(filters));
      history.push('/dashboard/products');
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status)
        yield put(productActions.fetchProductUpdateFailed(error.response.data?.message));
      else yield put(productActions.fetchProductUpdateFailed(error.message));
    } else if (error instanceof Error) {
      yield put(productActions.fetchProductUpdateFailed(error.message));
    }
  }
}

function* fetchProduct({ payload }: PayloadAction<FilterPayload>) {
  try {
    const response: ListResponse<ProductAttribute> = yield call(productApi.getAll, payload);

    if (!response.error) {
      yield put(productActions.fetchProductSucceed(response));
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status)
        yield put(productActions.fetchProductFailed(error.response.data?.message));
      else yield put(productActions.fetchProductFailed(error.message));
    } else if (error instanceof Error) {
      yield put(productActions.fetchProductFailed(error.message));
    }
  }
}

function* fetchRandomProduct({ payload }: PayloadAction<ParamGetRandom>) {
  try {
    const response: ListResponseRandom<ProductAttribute> = yield call(
      productApi.getRandom,
      payload
    );

    if (!response.error) {
      localStorage.setItem('dayGet', response.dayGet);
      yield put(productActions.fetchRandomProductSucceed(response));
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status)
        yield put(productActions.fetchRandomProductFailed(error.response.data?.message));
      else yield put(productActions.fetchRandomProductFailed(error.message));
    } else if (error instanceof Error) {
      yield put(productActions.fetchRandomProductFailed(error.message));
    }
  }
}

function* watchFetchProductCreate() {
  yield takeLatest(productActions.fetchProductCreateStart.type, fetchProductCreate);
}

function* watchFetchProductUpdate() {
  yield takeLatest(productActions.fetchProductUpdateStart.type, fetchProductUpdate);
}

function* watchFetchProduct() {
  yield takeLatest(productActions.fetchProductStart.type, fetchProduct);
}

function* watchFetchRandomProduct() {
  yield takeLatest(productActions.fetchRandomProductStart.type, fetchRandomProduct);
}

export default function* productSaga() {
  yield all([
    watchFetchProduct(),
    watchFetchProductCreate(),
    watchFetchProductUpdate(),
    watchFetchRandomProduct(),
  ]);
}
