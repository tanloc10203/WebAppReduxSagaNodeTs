import { FilterPayload, ListResponse, ProductAttribute } from 'models';
import axiosClient from './axiosClient';

const productApi = {
  name: '/product',

  create(data: ProductAttribute): Promise<ListResponse<ProductAttribute>> {
    return axiosClient.post(productApi.name, data);
  },

  update(data: ProductAttribute): Promise<ListResponse<ProductAttribute>> {
    return axiosClient.patch(productApi.name + '/' + data.id, data);
  },

  getAll(params: FilterPayload): Promise<ListResponse<ProductAttribute>> {
    return axiosClient.get(productApi.name, { params });
  },

  getById(id: number): Promise<ListResponse<ProductAttribute>> {
    return axiosClient.get(`${productApi.name}/${id}`);
  },

  getRandom(params?: FilterPayload): Promise<ListResponse<ProductAttribute>> {
    return axiosClient.get(productApi.name + '/collections', { params });
  },
};

export default productApi;
