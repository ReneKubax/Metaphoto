import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/externalapi',
});

export const getPhotos = async (params = {}) => {
  const response = await api.get('/photos', { params });
  return response.data;
};

export const getPhotoById = async (id: number) => {
  const response = await api.get(`/photos/${id}`);
  return response.data;
};
