import createSagaMiddleware from '@redux-saga/core';
import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import categoryReducer from 'features/category/categorySlice';
import dashboardReducer from 'features/dashboard/dashboardSlice';
import productPriceReducer from 'features/productPrice/productPriceSlice';
import authReducer from '../features/auth/authSlice';
import memberReducer from '../features/Members/memberSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const rootReducers = combineReducers({
  auth: authReducer,
  member: memberReducer,
  dashboard: dashboardReducer,
  productPrice: productPriceReducer,
  category: categoryReducer,
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
