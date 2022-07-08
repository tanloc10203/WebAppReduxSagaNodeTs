import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { FetchDataState } from 'features/dashboard/dashboardSlice';
import { ProductPriceAttribute } from 'models';

const initialState: FetchDataState<ProductPriceAttribute> = {
  data: [],
  error: '',
  isFetching: false,
};

const productPriceSlice = createSlice({
  name: 'productPrice',
  initialState,
  reducers: {
    fetchCreateStart(state, actions: PayloadAction<ProductPriceAttribute>) {
      state.isFetching = true;
    },
    fetchCreateSucceed(state) {
      state.isFetching = false;
    },
    fetchCreateFailed(state, { payload }: PayloadAction<string>) {
      state.error = payload;
      state.isFetching = false;
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
