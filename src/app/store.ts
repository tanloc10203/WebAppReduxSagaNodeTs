import createSagaMiddleware from '@redux-saga/core';
import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import categoryReducer from 'features/category/categorySlice';
import productReducer from 'features/product/productSlice';
import productPriceReducer from 'features/productPrice/productPriceSlice';
import productStatusReducer from 'features/productStatus/productStatusSlice';
import authReducer from '../features/auth/authSlice';
import memberReducer from '../features/Members/memberSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const rootReducers = combineReducers({
  auth: authReducer,
  member: memberReducer,
  productPrice: productPriceReducer,
  category: categoryReducer,
  product: productReducer,
  productStatus: productStatusReducer,
});

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV === 'development',
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
