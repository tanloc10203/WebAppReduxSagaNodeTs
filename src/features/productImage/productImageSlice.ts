import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PayloadFetchCreateProductImg } from 'api/productImgApi';
import { RootState } from 'app/store';
import { FetchDataStateSlice, ListResponse, ProductImagesAttribute } from 'models';
import { toast } from 'react-toastify';

interface ProductImageState extends FetchDataStateSlice<ProductImagesAttribute> {}

const initialState: ProductImageState = {
  data: [],
  isFetching: false,
  error: '',
};

const productImageSlice = createSlice({
  name: 'productImage',
  initialState,
  reducers: {
    // CREATE
    fetchCreateProductImgStart(state, actions: PayloadAction<PayloadFetchCreateProductImg>) {
      state.isFetching = true;
    },
    fetchCreateProductImgSuccess(state) {
      state.isFetching = false;
    },
    fetchCreateProductImgFailed(state, actions: PayloadAction<string>) {
      state.isFetching = false;
      state.error = actions.payload;
      toast.error(state.error);
    },

    // GET
    fetchProductImgStart(state, actions: PayloadAction<number>) {
      state.isFetching = true;
    },
    fetchProductImgSuccess(
      state,
      { payload }: PayloadAction<ListResponse<ProductImagesAttribute>>
    ) {
      state.isFetching = false;
      state.data = payload.data as Array<ProductImagesAttribute>;
    },

    // UPDATE
    fetchUpdateProductImgStart(state, actions: PayloadAction<ProductImagesAttribute>) {
      state.isFetching = true;
    },
    fetchUpdateProductImgSuccess(state) {
      state.isFetching = false;
    },

    // DELETE
    fetchDeleteProductImgStart(state, actions: PayloadAction<number>) {
      state.isFetching = true;
    },
    fetchDeleteProductImgSuccess(state) {
      state.isFetching = false;
    },
  },
});

// Actions;
export const productImgActions = productImageSlice.actions;

// Selectors;
export const productImageSelectors = (state: RootState) => state.productImage;

// Reducer;
const productImageReducer = productImageSlice.reducer;

export default productImageReducer;
