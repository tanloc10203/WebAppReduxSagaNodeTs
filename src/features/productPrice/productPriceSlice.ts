import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ProductPriceAttribute, FetchDataStateSlice } from 'models';
import { toast } from 'react-toastify';

const initialState: FetchDataStateSlice<ProductPriceAttribute> = {
  data: [],
  error: '',
  isFetching: false,
};

const productPriceSlice = createSlice({
  name: 'productPrice',
  initialState,
  reducers: {
    // * FETCH CREATE
    fetchCreateStart(state, actions: PayloadAction<ProductPriceAttribute>) {
      state.isFetching = true;
    },
    fetchCreateSucceed(state) {
      state.isFetching = false;
    },
    fetchCreateFailed(state, { payload }: PayloadAction<string>) {
      state.error = payload;
      state.isFetching = false;
      toast.error(state.error);
    },

    // * FETCH UPDATE
    fetchUpdateStart(state, actions: PayloadAction<ProductPriceAttribute>) {
      state.isFetching = true;
    },
    fetchUpdateSucceed(state) {
      state.isFetching = false;
    },
    fetchUpdateFailed(state, { payload }: PayloadAction<string>) {
      state.error = payload;
      state.isFetching = false;
      toast.error(state.error);
    },
  },
});

// Actions
export const productPriceActions = productPriceSlice.actions;

// Selectors
export const dataProductPriceSelector = (state: RootState) => state.productPrice.data;
export const errorProductPriceSelector = (state: RootState) => state.productPrice.error;
export const isFetchingProductPriceSelector = (state: RootState) => state.productPrice.isFetching;

// Reducer
const productPriceReducer = productPriceSlice.reducer;

export default productPriceReducer;