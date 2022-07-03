import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Member, PayloadFetchMember } from '../../models';
import { memberApi } from './../../api/memberApi';
import { ListResponse } from './../../models/common';
import { memberActions } from './memberSlice';

function* fetchAllMember(action: PayloadAction<PayloadFetchMember>) {
  try {
    const response: AxiosResponse<ListResponse<Member>> = yield call(memberApi.getAll, {
      accessToken: action.payload.accessToken,
      axiosJwt: action.payload.axiosJwt,
    });

    yield put(memberActions.fetchMemberSucceed(response.data.data as Array<Member>));
  } catch (error) {
    if (error instanceof AxiosError)
      yield put(memberActions.fetchMemberFailed(error.response?.data.message));
  }
}

export default function* memberSaga() {
  yield takeLatest(memberActions.fetchMemberStart, fetchAllMember);
}
