import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetAllCategoryApi } from 'api';
import { RootState } from 'app/store';
import {
  CategoryAttribute,
  FilterPayload,
  ProductAttribute,
  ProductStatusAttribute,
  PaginationParams,
  ListResponse,
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
  category: FetchDataState<CategoryAttribute>;
  productStatus: FetchDataState<ProductStatusAttribute>;
  products: FetchDataState<ProductAttribute>;
}

const initialState: DashboardSliceState = {
  category: {
    error: '',
    isFetching: false,
    data: [],
    filters: {
      _order: 'ASC',
      _name: 'id',
      _limit: 5,
      _page: 0,
      name_like: '',
      level: 1,
    },
    pagination: {
      _limit: 5,
      _page: 0,
      _totalRows: 15,
    },
  },
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
      _limit: 1,
      _page: 1,
    },
    pagination: {
      _limit: 1,
      _page: 1,
      _totalRows: 15,
    },
  },
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // * FETCH CREATE CATEGORY
    fetchCategoryCreateStart(state, action: PayloadAction<CategoryAttribute>) {
      state.category.isFetching = true;
    },
    fetchCategoryCreateSucceed(state) {
      state.category.isFetching = false;
    },
    fetchCategoryCreateFailed(state, action: PayloadAction<string>) {
      state.category.error = action.payload;
      state.category.isFetching = false;
    },

    // * FETCH EDIT CATEGORY
    fetchCategoryEditStart(state, action: PayloadAction<CategoryAttribute>) {
      state.category.isFetching = true;
    },
    fetchCategoryEditSucceed(state) {
      state.category.isFetching = false;
    },

    // * FETCH CATEGORY
    fetchCategoryStart(state, action: PayloadAction<GetAllCategoryApi>) {
      state.category.isFetching = true;
    },
    fetchCategorySucceed(state, action: PayloadAction<ListResponse<CategoryAttribute>>) {
      state.category.data = action.payload.data as Array<CategoryAttribute>;
      state.category.isFetching = false;
      state.category.pagination = action.payload?.pagination;
    },
    fetchCategoryFailed(state, action: PayloadAction<string>) {
      state.category.data = [];
      state.category.error = action.payload;
      state.category.isFetching = false;
      toast.error('GET CATEGORY: ' + state.category.error);
    },

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

    // * SET FILTER PRODUCT
    setFilterProduct(state, action: PayloadAction<FilterPayload>) {
      state.products.filters = action.payload;
    },

    // * SET FILTER CATEGORY
    setFilterCategory(state, action: PayloadAction<FilterPayload>) {
      state.category.filters = action.payload;
    },

    // * SET FILTER NAME LIKE ==> Use Debounce effect redux saga
    setFilterNameLike(state, action: PayloadAction<FilterPayload>) {},

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

// Selectors
export const categorySelector = (state: RootState) => state.dashboard.category;
export const categoryDataSelector = (state: RootState) => state.dashboard.category.data;

export const productStatusSelector = (state: RootState) => state.dashboard.productStatus;
export const productStatusDataSelector = (state: RootState) => state.dashboard.productStatus.data;

export const productSelector = (state: RootState) => state.dashboard.products;

export const filterSelector = (state: RootState) =>
  state.dashboard.products.filters as FilterPayload;

export const paginationSelector = (state: RootState) =>
  state.dashboard.products.pagination as PaginationParams;

// Create Selector
export const selectCategoryOptions = createSelector(categoryDataSelector, (category) =>
  category.map((item) => ({
    label: item.name,
    value: item.id,
  }))
);

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
