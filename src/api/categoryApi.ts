import { CategoryAttribute, FilterPayload, ListResponse } from 'models';
import axiosClient from './axiosClient';

export interface GetAllCategoryApi {
  params: FilterPayload;
  notPrams?: boolean;
}

const categoryApi = {
  name: '/category',

  create(data: CategoryAttribute): Promise<ListResponse<CategoryAttribute>> {
    return axiosClient.post(categoryApi.name, data);
  },

  getAll({ params, notPrams }: GetAllCategoryApi): Promise<ListResponse<CategoryAttribute>> {
    if (notPrams) return axiosClient.get(categoryApi.name);
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
