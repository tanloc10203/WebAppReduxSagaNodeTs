import { ListResponse, ProductStatusAttribute } from 'models';
import axiosClient from './axiosClient';

const productStatusApi = {
  name: '/product-status',

  getAll(): Promise<ListResponse<ProductStatusAttribute>> {
    return axiosClient.get(productStatusApi.name);
  },
};

export default productStatusApi;
