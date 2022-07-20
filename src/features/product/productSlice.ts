import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import {
  FetchDataStateSlice,
  FilterPayload,
  ListResponse,
  PaginationParams,
  ProductAttribute,
} from 'models';
import { toast } from 'react-toastify';

const initialState: FetchDataStateSlice<ProductAttribute> = {
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
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // * FETCH CREATE PRODUCT
    fetchProductCreateStart(state, action: PayloadAction<ProductAttribute>) {
      state.isFetching = true;
    },
    fetchProductCreateSucceed(state) {
      state.isFetching = false;
      toast.success('Create new product is succeed.');
    },
    fetchProductCreateFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isFetching = false;
      toast.error(state.error);
    },

    // * FETCH UPDATE PRODUCT
    fetchProductUpdateStart(state, action: PayloadAction<ProductAttribute>) {
      state.isFetching = true;
    },
    fetchProductUpdateSucceed(state) {
      state.isFetching = false;
      toast.success('Update product is succeed.');
    },
    fetchProductUpdateFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isFetching = false;
      toast.error(state.error);
    },

    // * SET FILTER PRODUCT
    setFilterProduct(state, action: PayloadAction<FilterPayload>) {
      state.filters = action.payload;
    },

    // * FETCH PRODUCT
    fetchProductStart(state, action: PayloadAction<FilterPayload>) {
      state.isFetching = true;
    },
    fetchProductSucceed(state, { payload }: PayloadAction<ListResponse<ProductAttribute>>) {
      state.isFetching = false;
      state.data = payload.data as Array<ProductAttribute>;
      state.pagination = payload.pagination as PaginationParams;
    },
    fetchProductFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isFetching = false;
      state.data = [];
      toast.error(state.error);
    },

    // * FETCH RANDOM PRODUCT
    fetchRandomProductStart(state) {
      state.isFetching = true;
    },
    fetchRandomProductSucceed(state, { payload }: PayloadAction<ListResponse<ProductAttribute>>) {
      state.isFetching = false;
      state.data = payload.data as Array<ProductAttribute>;
    },
    fetchRandomProductFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isFetching = false;
      state.data = [];
      toast.error(state.error);
    },
  },
});

// Actions
export const productActions = productSlice.actions;

// Selectors
export const productSelector = (state: RootState) => state.product;

export const filterSelector = (state: RootState) => state.product.filters as FilterPayload;

export const paginationSelector = (state: RootState) =>
  state.product.pagination as PaginationParams;

// Reducers
const productReducer = productSlice.reducer;

export default productReducer;
