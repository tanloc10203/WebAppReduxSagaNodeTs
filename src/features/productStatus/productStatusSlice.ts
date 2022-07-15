import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { FetchDataStateSlice, ProductStatusAttribute } from 'models';
import { toast } from 'react-toastify';

const initialState: FetchDataStateSlice<ProductStatusAttribute> = {
  error: '',
  isFetching: false,
  data: [],
};

const productStatusSlice = createSlice({
  name: 'productStatus',
  initialState,
  reducers: {
    // * FETCH PRODUCT STATUS
    fetchProductStatusStart(state) {
      state.isFetching = true;
    },
    fetchProductStatusSucceed(state, action: PayloadAction<Array<ProductStatusAttribute>>) {
      state.data = action.payload;
      state.isFetching = false;
    },
    fetchProductStatusFailed(state, action: PayloadAction<string>) {
      state.data = [];
      state.error = action.payload;
      state.isFetching = false;
      toast.error('GET PRODUCT STATUS: ' + state.error);
    },
  },
});

// Actions
export const productStatusActions = productStatusSlice.actions;

export const productStatusSelector = (state: RootState) => state.productStatus;
export const productStatusDataSelector = (state: RootState) => state.productStatus.data;

export const selectProductStatusOptions = createSelector(
  productStatusDataSelector,
  (productStatus) =>
    productStatus.map((item) => ({
      label: item.name,
      value: item.id,
    }))
);

// Reducer
const productStatusReducer = productStatusSlice.reducer;
export default productStatusReducer;
