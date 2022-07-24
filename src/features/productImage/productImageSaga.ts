import { PayloadAction } from '@reduxjs/toolkit';
import productImgApi, { PayloadFetchCreateProductImg } from 'api/productImgApi';
import { AxiosError } from 'axios';
import { ListResponse, ProductImagesAttribute } from 'models';
import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { history } from 'utils';
import { productImgActions } from './productImageSlice';

interface ListResponseCreate extends ListResponse<ProductImagesAttribute> {
  productId: number;
}

// * CREATE
function* fetchCreate({ payload }: PayloadAction<PayloadFetchCreateProductImg>) {
  try {
    const response: ListResponseCreate = yield call(productImgApi.create, payload);

    if (!response.error) {
      toast.success('Thêm ảnh thành công');
      history.push(`/dashboard/products/images/${response.productId}`);
      yield put(productImgActions.fetchCreateProductImgSuccess());
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status)
        yield put(productImgActions.fetchCreateProductImgFailed(error.response.data?.message));
      else yield put(productImgActions.fetchCreateProductImgFailed(error.message));
    } else if (error instanceof Error) {
      yield put(productImgActions.fetchCreateProductImgFailed(error.message));
    }
  }
}

function* watchFetchCreate() {
  yield takeLatest(productImgActions.fetchCreateProductImgStart.type, fetchCreate);
}

// * GET
function* fetchGet({ payload }: PayloadAction<number>) {
  try {
    const response: ListResponseCreate = yield call(productImgApi.getAll, payload);

    if (!response.error) {
      yield put(productImgActions.fetchProductImgSuccess(response));
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status)
        yield put(productImgActions.fetchCreateProductImgFailed(error.response.data?.message));
      else yield put(productImgActions.fetchCreateProductImgFailed(error.message));
    } else if (error instanceof Error) {
      yield put(productImgActions.fetchCreateProductImgFailed(error.message));
    }
  }
}

function* watchFetchGet() {
  yield takeLatest(productImgActions.fetchProductImgStart.type, fetchGet);
}

// * UPDATE
function* fetchUpdate({ payload }: PayloadAction<ProductImagesAttribute>) {
  try {
    const response: ListResponse<ProductImagesAttribute> = yield call(
      productImgApi.update,
      payload
    );

    if (!response.error) {
      toast.success('Cập nhật ảnh thành công');
      history.push(`/dashboard/products/images/${payload.productId}`);
      yield put(productImgActions.fetchUpdateProductImgSuccess());
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status)
        yield put(productImgActions.fetchCreateProductImgFailed(error.response.data?.message));
      else yield put(productImgActions.fetchCreateProductImgFailed(error.message));
    } else if (error instanceof Error) {
      yield put(productImgActions.fetchCreateProductImgFailed(error.message));
    }
  }
}

function* watchFetchUpdate() {
  yield takeLatest(productImgActions.fetchUpdateProductImgStart.type, fetchUpdate);
}

// * DELETE
function* fetchDelete({ payload }: PayloadAction<ProductImagesAttribute>) {
  try {
    const response: ListResponseCreate = yield call(productImgApi.delete, payload.id as number);

    if (!response.error) {
      yield put(productImgActions.fetchDeleteProductImgSuccess());
      toast.success(`Bạn đã xóa thành công`);
      yield put(productImgActions.fetchProductImgStart(payload.productId));
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status)
        yield put(productImgActions.fetchCreateProductImgFailed(error.response.data?.message));
      else yield put(productImgActions.fetchCreateProductImgFailed(error.message));
    } else if (error instanceof Error) {
      yield put(productImgActions.fetchCreateProductImgFailed(error.message));
    }
  }
}

function* watchFetchDelete() {
  yield takeLatest(productImgActions.fetchDeleteProductImgStart.type, fetchDelete);
}

export default function* productImageSaga() {
  yield all([watchFetchCreate(), watchFetchGet(), watchFetchUpdate(), watchFetchDelete()]);
}
