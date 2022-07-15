import { PayloadAction } from '@reduxjs/toolkit';
import { categoryApi, GetAllCategoryApi } from 'api';
import { AxiosError } from 'axios';
import { CategoryAttribute, FilterPayload, ListResponse } from 'models';
import { toast } from 'react-toastify';
import { all, call, debounce, put, takeLatest } from 'redux-saga/effects';
import { history } from 'utils';
import { categoryActions } from './categorySlice';

function* fetchCategory({ payload }: PayloadAction<GetAllCategoryApi>) {
  try {
    const response: ListResponse<CategoryAttribute> = yield call(categoryApi.getAll, payload);

    if (!response.error) yield put(categoryActions.fetchCategorySucceed(response));
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status)
        yield put(categoryActions.fetchCategoryFailed(error.response.data?.message));
      yield put(categoryActions.fetchCategoryFailed(error.message));
    } else if (error instanceof Error) {
      yield put(categoryActions.fetchCategoryFailed(error.message));
    }
  }
}

function* fetchCategoryTree() {
  try {
    const response: ListResponse<CategoryAttribute> = yield call(categoryApi.getTree);

    if (!response.error) yield put(categoryActions.fetchCategoryTreeSucceed(response));
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status)
        yield put(categoryActions.fetchCategoryFailed(error.response.data?.message));
      yield put(categoryActions.fetchCategoryFailed(error.message));
    } else if (error instanceof Error) {
      yield put(categoryActions.fetchCategoryFailed(error.message));
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
      yield put(categoryActions.setFilterCategory(filter));
      yield put(categoryActions.fetchCategoryCreateSucceed());
      toast.success('Add category succeed.');
      history.push('/dashboard/category');
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status)
        yield put(categoryActions.fetchCategoryFailed(error.response.data?.message));
      else yield put(categoryActions.fetchCategoryFailed(error.message));
    } else if (error instanceof Error) {
      yield put(categoryActions.fetchCategoryFailed(error.message));
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
      yield put(categoryActions.setFilterCategory(filter));
      yield put(categoryActions.fetchCategoryEditSucceed());
      toast.success('Edit category succeed.');
      history.push('/dashboard/category');
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status)
        yield put(categoryActions.fetchCategoryFailed(error.response.data?.message));
      else yield put(categoryActions.fetchCategoryFailed(error.message));
    } else if (error instanceof Error) {
      yield put(categoryActions.fetchCategoryFailed(error.message));
    }
  }
}

function* handleSearchWithDebounce({ payload }: PayloadAction<FilterPayload>) {
  yield put(categoryActions.setFilterCategory(payload));
}

function* watchFetchCategory() {
  yield takeLatest(categoryActions.fetchCategoryStart.type, fetchCategory);
}

function* watchFetchCategoryTree() {
  yield takeLatest(categoryActions.fetchCategoryTreeStart.type, fetchCategoryTree);
}

function* watchFetchCategoryCreate() {
  yield takeLatest(categoryActions.fetchCategoryCreateStart.type, fetchCategoryCreate);
}

function* watchSetFilterNameLike() {
  yield debounce(500, categoryActions.setFilterNameLike.type, handleSearchWithDebounce);
}

function* watchFetchCategoryEdit() {
  yield takeLatest(categoryActions.fetchCategoryEditStart.type, fetchCategoryEdit);
}

export default function* categorySaga() {
  yield all([
    watchFetchCategoryTree(),
    watchFetchCategory(),
    watchFetchCategoryCreate(),
    watchSetFilterNameLike(),
    watchFetchCategoryEdit(),
  ]);
}
