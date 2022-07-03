import { FilterPayload, ProductAttribute } from 'models';
import axiosClient from './axiosClient';

const productApi = {
  name: '/product',

  create(data: ProductAttribute) {
    return axiosClient.post(productApi.name, data);
  },

  update(data: ProductAttribute) {
    return axiosClient.patch(productApi.name + '/' + data.id, data);
  },

  getAll(params: FilterPayload) {
    return axiosClient.get(productApi.name, { params });
  },
};

export default productApi;
