import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetAllCategoryApi } from 'api';
import { RootState } from 'app/store';
import { CategoryAttribute, FetchDataStateSlice, FilterPayload, ListResponse } from 'models';
import { toast } from 'react-toastify';

interface CategoryState extends FetchDataStateSlice<CategoryAttribute> {
  dataTree: Array<CategoryAttribute>;
  dataProduct: Array<CategoryAttribute>;
}

const initialState: CategoryState = {
  error: '',
  isFetching: false,
  data: [],
  dataTree: [],
  dataProduct: [],
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
};

const categorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {
    // * FETCH CATEGORY
    fetchCategoryStart(state, action: PayloadAction<GetAllCategoryApi>) {
      state.isFetching = true;
    },
    fetchCategorySucceed(state, action: PayloadAction<ListResponse<CategoryAttribute>>) {
      state.data = action.payload.data as Array<CategoryAttribute>;
      state.isFetching = false;
      state.pagination = action.payload?.pagination;
    },
    fetchCategoryFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isFetching = false;
      toast.error('GET CATEGORY: ' + state.error);
    },

    // * FETCH CATEGORY TREE
    fetchCategoryTreeStart(state) {
      state.isFetching = true;
    },
    fetchCategoryTreeSucceed(state, action: PayloadAction<ListResponse<CategoryAttribute>>) {
      state.dataTree = action.payload.data as Array<CategoryAttribute>;
      state.isFetching = false;
    },

    // * FETCH CATEGORY PRODUCT
    fetchCatProductStart(state) {
      state.isFetching = true;
    },
    fetchCatProductSucceed(state, action: PayloadAction<ListResponse<CategoryAttribute>>) {
      state.dataProduct = action.payload.data as Array<CategoryAttribute>;
      state.isFetching = false;
    },

    // * FETCH CREATE CATEGORY
    fetchCategoryCreateStart(state, action: PayloadAction<CategoryAttribute>) {
      state.isFetching = true;
    },
    fetchCategoryCreateSucceed(state) {
      state.isFetching = false;
    },

    // * FETCH EDIT CATEGORY
    fetchCategoryEditStart(state, action: PayloadAction<CategoryAttribute>) {
      state.isFetching = true;
    },
    fetchCategoryEditSucceed(state) {
      state.isFetching = false;
    },

    // * SET FILTER NAME LIKE ==> Use Debounce effect redux saga
    setFilterNameLike(state, action: PayloadAction<FilterPayload>) {},

    // * SET FILTER CATEGORY
    setFilterCategory(state, action: PayloadAction<FilterPayload>) {
      state.filters = action.payload;
    },
  },
});

// Actions
export const categoryActions = categorySlice.actions;

// Selectors
export const categorySelector = (state: RootState) => state.category;
export const categoryDataSelector = (state: RootState) => state.category.data;
export const categoryDataTreeSelector = (state: RootState) => state.category.dataTree;
export const selectCategoryOptions = createSelector(categoryDataSelector, (category) =>
  category.map((item) => ({
    label: item.name,
    value: item.id,
  }))
);

// Reducers
const categoryReducer = categorySlice.reducer;
export default categoryReducer;
