import { FileResponse } from 'models';
import axiosClient from './axiosClient';

const uploadImgApi = {
  post(file: File): Promise<FileResponse> {
    const formData = new FormData();
    formData.append('files', file);
    return axiosClient.post('admin/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default uploadImgApi;
