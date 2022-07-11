import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import {
  FilterPayload,
  ListResponse,
  PaginationParams,
  ProductAttribute,
  ProductStatusAttribute,
} from 'models';
import { toast } from 'react-toastify';

export interface FetchDataState<T> {
  error: string;
  isFetching: boolean;
  data: Array<T>;
  filters?: FilterPayload;
  pagination?: PaginationParams;
}

export interface DashboardSliceState {
  productStatus: FetchDataState<ProductStatusAttribute>;
  products: FetchDataState<ProductAttribute>;
}

const initialState: DashboardSliceState = {
  productStatus: {
    error: '',
    isFetching: false,
    data: [],
  },
  products: {
    error: '',
    isFetching: false,
    data: [],
    filters: {
      _limit: 5,
      _page: 1,
    },
    pagination: {
      _limit: 5,
      _page: 1,
      _totalRows: 15,
    },
  },
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // * FETCH PRODUCT STATUS
    fetchProductStatusStart(state) {
      state.productStatus.isFetching = true;
    },
    fetchProductStatusSucceed(state, action: PayloadAction<Array<ProductStatusAttribute>>) {
      state.productStatus.data = action.payload;
      state.productStatus.isFetching = false;
    },
    fetchProductStatusFailed(state, action: PayloadAction<string>) {
      state.productStatus.data = [];
      state.productStatus.error = action.payload;
      state.productStatus.isFetching = false;
      toast.error('GET PRODUCT STATUS: ' + state.productStatus.error);
    },

    // * FETCH CREATE PRODUCT
    fetchProductCreateStart(state, action: PayloadAction<ProductAttribute>) {
      state.products.isFetching = true;
    },
    fetchProductCreateSucceed(state) {
      state.products.isFetching = false;
      toast.success('Create new product is succeed.');
    },
    fetchProductCreateFailed(state, action: PayloadAction<string>) {
      state.products.error = action.payload;
      state.products.isFetching = false;
    },

    // * FETCH UPDATE PRODUCT
    fetchProductUpdateStart(state, action: PayloadAction<ProductAttribute>) {
      state.products.isFetching = true;
    },
    fetchProductUpdateSucceed(state) {
      state.products.isFetching = false;
      toast.success('Update product is succeed.');
    },
    fetchProductUpdateFailed(state, action: PayloadAction<string>) {
      state.products.error = action.payload;
      state.products.isFetching = false;
    },

    // * SET FILTER PRODUCT
    setFilterProduct(state, action: PayloadAction<FilterPayload>) {
      state.products.filters = action.payload;
    },

    // * FETCH PRODUCT
    fetchProductStart(state, action: PayloadAction<FilterPayload>) {
      state.products.isFetching = true;
    },
    fetchProductSucceed(state, { payload }: PayloadAction<ListResponse<ProductAttribute>>) {
      state.products.isFetching = false;
      state.products.data = payload.data as Array<ProductAttribute>;
      state.products.pagination = payload.pagination as PaginationParams;
    },
    fetchProductFailed(state, action: PayloadAction<string>) {
      state.products.error = action.payload;
      state.products.isFetching = false;
      state.products.data = [];
      toast.error(state.products.error);
    },
  },
});

// Actions
export const dashboardActions = dashboardSlice.actions;

export const productStatusSelector = (state: RootState) => state.dashboard.productStatus;
export const productStatusDataSelector = (state: RootState) => state.dashboard.productStatus.data;

export const productSelector = (state: RootState) => state.dashboard.products;

export const filterSelector = (state: RootState) =>
  state.dashboard.products.filters as FilterPayload;

export const paginationSelector = (state: RootState) =>
  state.dashboard.products.pagination as PaginationParams;

export const selectProductStatusOptions = createSelector(
  productStatusDataSelector,
  (productStatus) =>
    productStatus.map((item) => ({
      label: item.name,
      value: item.id,
    }))
);

// Reducer
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
