import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000/externalapi',
});

/**
 * Retrieves photos from the API with the specified parameters.
 *
 * @param {Object} [params={}] - The parameters to be passed to the API.
 * @return {Promise<any>} A promise that resolves to the data returned by the API.
 */
export const getPhotos = async (params = {}) => {
  const response = await api.get('/photos', { params });
  return response.data;
};

/**
 * Retrieves a photo by its ID from the API.
 *
 * @param {number} id - The ID of the photo.
 * @return {Promise<any>} A promise that resolves to the data of the photo.
 */
export const getPhotoById = async (id: number) => {
  const response = await api.get(`/photos/${id}`);
  return response.data;
};
