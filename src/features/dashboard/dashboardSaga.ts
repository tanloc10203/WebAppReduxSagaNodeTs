import { PayloadAction } from '@reduxjs/toolkit';
import { categoryApi, productApi, productStatusApi, GetAllCategoryApi } from 'api';
import { AxiosError } from 'axios';
import {
  CategoryAttribute,
  FilterPayload,
  ListResponse,
  ProductAttribute,
  ProductStatusAttribute,
} from 'models';
import { toast } from 'react-toastify';
import { all, call, debounce, put, takeLatest } from 'redux-saga/effects';
import { history } from 'utils';
import { dashboardActions } from './dashboardSlice';

function* fetchCategory({ payload }: PayloadAction<GetAllCategoryApi>) {
  try {
    const response: ListResponse<CategoryAttribute> = yield call(categoryApi.getAll, payload);

    if (!response.error) yield put(dashboardActions.fetchCategorySucceed(response));
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status)
        yield put(dashboardActions.fetchCategoryFailed(error.response.data?.message));
      yield put(dashboardActions.fetchCategoryFailed(error.message));
    } else if (error instanceof Error) {
      yield put(dashboardActions.fetchCategoryFailed(error.message));
    }
  }
}

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
      yield put(dashboardActions.fetchProductCreateSucceed());
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

function* fetchCategoryCreate({ payload }: PayloadAction<CategoryAttribute>) {
  try {
    const response: ListResponse<CategoryAttribute> = yield call(categoryApi.create, payload);

    if (!response.error) {
      const filter: FilterPayload = {
        _limit: 5,
        _page: 0,
      };
      yield put(dashboardActions.setFilterCategory(filter));
      yield put(dashboardActions.fetchCategoryCreateSucceed());
      toast.success('Add category succeed.');
      history.push('/dashboard/category');
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status)
        yield put(dashboardActions.fetchCategoryCreateFailed(error.response.data?.message));
      else yield put(dashboardActions.fetchCategoryCreateFailed(error.message));
    } else if (error instanceof Error) {
      yield put(dashboardActions.fetchCategoryCreateFailed(error.message));
    }
  }
}

function* fetchCategoryEdit({ payload }: PayloadAction<CategoryAttribute>) {
  try {
    const response: ListResponse<CategoryAttribute> = yield call(categoryApi.update, payload);

    if (!response.error) {
      const filter: FilterPayload = {
        _limit: 5,
        _page: 0,
        level: 1,
      };
      yield put(dashboardActions.setFilterCategory(filter));
      yield put(dashboardActions.fetchCategoryEditSucceed());
      toast.success('Edit category succeed.');
      history.push('/dashboard/category');
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status)
        yield put(dashboardActions.fetchCategoryCreateFailed(error.response.data?.message));
      else yield put(dashboardActions.fetchCategoryCreateFailed(error.message));
    } else if (error instanceof Error) {
      yield put(dashboardActions.fetchCategoryCreateFailed(error.message));
    }
  }
}

function* handleSearchWithDebounce({ payload }: PayloadAction<FilterPayload>) {
  yield put(dashboardActions.setFilterCategory(payload));
}

function* watchFetchCategory() {
  yield takeLatest(dashboardActions.fetchCategoryStart.type, fetchCategory);
}

function* watchFetchProductCreate() {
  yield takeLatest(dashboardActions.fetchProductCreateStart.type, fetchProductCreate);
}

function* watchFetchProductStatus() {
  yield takeLatest(dashboardActions.fetchProductStatusStart.type, fetchProductStatus);
}

function* watchFetchProduct() {
  yield takeLatest(dashboardActions.fetchProductStart.type, fetchProduct);
}

function* watchFetchCategoryCreate() {
  yield takeLatest(dashboardActions.fetchCategoryCreateStart.type, fetchCategoryCreate);
}

function* watchSetFilterNameLike() {
  yield debounce(500, dashboardActions.setFilterNameLike.type, handleSearchWithDebounce);
}

function* watchFetchCategoryEdit() {
  yield takeLatest(dashboardActions.fetchCategoryEditStart.type, fetchCategoryEdit);
}

export default function* dashboardSaga() {
  yield all([
    watchFetchCategory(),
    watchFetchProductStatus(),
    watchFetchProductCreate(),
    watchFetchProduct(),
    watchFetchCategoryCreate(),
    watchSetFilterNameLike(),
    watchFetchCategoryEdit(),
  ]);
}
