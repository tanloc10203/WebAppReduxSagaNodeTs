import { PayloadAction } from '@reduxjs/toolkit';
import { productPriceApi } from 'api';
import { AxiosError } from 'axios';
import { ListResponse, ProductPriceAttribute } from 'models';
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

function* watchFetchCreateProductPrice() {
  yield takeLatest(productPriceActions.fetchCreateStart.type, fetchCreateProductPrice);
}

export default function* productPriceSaga() {
  yield all([watchFetchCreateProductPrice()]);
}
