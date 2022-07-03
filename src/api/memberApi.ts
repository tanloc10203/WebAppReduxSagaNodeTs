import { AxiosResponse } from 'axios';
import { ListResponse, Member } from '../models';
import { PayloadFetchMember } from './../models/common';

export const memberApi = {
  getAll({
    accessToken,
    axiosJwt,
  }: PayloadFetchMember): Promise<AxiosResponse<ListResponse<Member>>> {
    return axiosJwt.get('/member', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    });
  },
};
