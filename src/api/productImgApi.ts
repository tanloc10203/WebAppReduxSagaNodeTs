import { ListResponse, ProductImagesAttribute } from 'models';
import axiosClient from './axiosClient';

export interface PayloadFetchCreateProductImg {
  data: Array<ProductImagesAttribute>;
  productId: number;
}

const productImgApi = {
  name: '/product-image',

  create(payload: PayloadFetchCreateProductImg): Promise<ListResponse<ProductImagesAttribute>> {
    return axiosClient.post(productImgApi.name, payload);
  },

  getAll(productId: number): Promise<ListResponse<ProductImagesAttribute>> {
    return axiosClient.get(productImgApi.name + `/_productId=${productId}`);
  },

  getById(productImgId: number): Promise<ListResponse<ProductImagesAttribute>> {
    return axiosClient.get(`${productImgApi.name}/${productImgId}`);
  },

  update(payload: ProductImagesAttribute): Promise<ListResponse<ProductImagesAttribute>> {
    return axiosClient.patch(`${productImgApi.name}/${payload.id}`, payload);
  },

  delete(productImgId: number): Promise<ListResponse<ProductImagesAttribute>> {
    return axiosClient.delete(`${productImgApi.name}/${productImgId}`);
  },
};

export default productImgApi;
