import { FilterPayload, ListResponse, ProductPriceAttribute } from 'models';
import axiosClient from './axiosClient';

const productPriceApi = {
  name: '/product-price',

  create(data: ProductPriceAttribute): Promise<ListResponse<ProductPriceAttribute>> {
    return axiosClient.post(productPriceApi.name, data);
  },

  update(data: ProductPriceAttribute): Promise<ListResponse<ProductPriceAttribute>> {
    return axiosClient.patch(productPriceApi.name + '/' + data.id, data);
  },

  getAll(params: FilterPayload): Promise<ListResponse<ProductPriceAttribute>> {
    return axiosClient.get(productPriceApi.name, { params });
  },

  getById(id: number): Promise<ListResponse<ProductPriceAttribute>> {
    return axiosClient.get(`${productPriceApi.name}/${id}`);
  },
};

export default productPriceApi;
