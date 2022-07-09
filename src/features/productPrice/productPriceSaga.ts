import { PayloadAction } from '@reduxjs/toolkit';
import { productPriceApi } from 'api';
import { AxiosError } from 'axios';
import { dashboardActions } from 'features/dashboard/dashboardSlice';
import { FilterPayload, ListResponse, ProductPriceAttribute } from 'models';
import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { history } from 'utils';
import { productPriceActions } from './productPriceSlice';

function* fetchCreateProductPrice({ payload }: PayloadAction<ProductPriceAttribute>) {
  try {
    const response: ListResponse<ProductPriceAttribute> = yield call(
      productPriceApi.create,
      payload
    );

    if (!response.error) {
      const filters: FilterPayload = {
        _page: 1,
        _limit: 5,
      };
      yield put(dashboardActions.setFilterProduct(filters));
      yield put(productPriceActions.fetchCreateSucceed());
      toast.success('Cập nhật giá thành công');
      history.push('/dashboard/products');
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status)
        yield put(productPriceActions.fetchCreateFailed(error.response.data?.message));
      else yield put(productPriceActions.fetchCreateFailed(error.message));
    } else if (error instanceof Error) {
      yield put(productPriceActions.fetchCreateFailed(error.message));
    }
  }
}

function* fetchUpdateProductPrice({ payload }: PayloadAction<ProductPriceAttribute>) {
  try {
    const response: ListResponse<ProductPriceAttribute> = yield call(
      productPriceApi.update,
      payload
    );

    if (!response.error) {
      const filters: FilterPayload = {
        _page: 1,
        _limit: 5,
      };
      yield put(productPriceActions.fetchCreateSucceed());
      yield put(dashboardActions.setFilterProduct(filters));
      toast.success('Cập nhật giá thành công');
      history.push('/dashboard/products');
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status)
        yield put(productPriceActions.fetchCreateFailed(error.response.data?.message));
      else yield put(productPriceActions.fetchCreateFailed(error.message));
    } else if (error instanceof Error) {
      yield put(productPriceActions.fetchCreateFailed(error.message));
    }
  }
}

function* watchFetchCreateProductPrice() {
  yield takeLatest(productPriceActions.fetchCreateStart.type, fetchCreateProductPrice);
}

function* watchFetchUpdateProductPrice() {
  yield takeLatest(productPriceActions.fetchUpdateStart.type, fetchUpdateProductPrice);
}

export default function* productPriceSaga() {
  yield all([watchFetchCreateProductPrice(), watchFetchUpdateProductPrice()]);
}
