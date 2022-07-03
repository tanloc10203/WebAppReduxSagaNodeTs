import { CategoryAttribute, FilterPayload, ListResponse } from 'models';
import axiosClient from './axiosClient';

const categoryApi = {
  name: '/category',

  create(data: CategoryAttribute): Promise<ListResponse<CategoryAttribute>> {
    return axiosClient.post(categoryApi.name, data);
  },

  getAll(params: FilterPayload): Promise<ListResponse<CategoryAttribute>> {
    return axiosClient.get(categoryApi.name, { params });
  },

  getById(id: number): Promise<ListResponse<CategoryAttribute>> {
    return axiosClient.get(categoryApi.name + '/' + id);
  },

  update(data: CategoryAttribute): Promise<ListResponse<CategoryAttribute>> {
    return axiosClient.patch(categoryApi.name + '/' + data.id, data);
  },
};

export default categoryApi;
