import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Member, PayloadFetchMember } from '../../models';

export interface MemberState {
  members: Member[];
  isFetching: boolean;
  error: string;
}

const initialState: MemberState = {
  members: [],
  isFetching: false,
  error: '',
};

const memberSlice = createSlice({
  name: 'member',
  initialState: initialState,
  reducers: {
    fetchMemberStart(state, action: PayloadAction<PayloadFetchMember>) {
      state.isFetching = true;
    },
    fetchMemberSucceed(state, action: PayloadAction<Member[]>) {
      state.isFetching = false;
      state.members = action.payload;
    },
    fetchMemberFailed(state, action: PayloadAction<string>) {
      state.isFetching = false;
      state.members = [];
      state.error = action.payload;
    },
  },
});

// Actions
export const memberActions = memberSlice.actions;

// Selectors
export const membersSelector = (state: RootState) => state.member.members;
export const memberIsFetchingSelector = (state: RootState) => state.member.isFetching;
export const memberErrorSelector = (state: RootState) => state.member.error;

// Reducer
const memberReducer = memberSlice.reducer;
export default memberReducer;
