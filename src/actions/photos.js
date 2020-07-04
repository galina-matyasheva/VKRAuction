import axios from 'axios';
import { BASE_API_URL } from '../utils/constants';
import { getErrors } from './errors';

export const beginAddPhoto = (photo) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append('photo', photo);

      const res = await axios.post(`${BASE_API_URL}/photos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }

      });
      photo.id = res.data._id;

    } catch (error) {
      window.alert("error image" + error);
      error.response && dispatch(getErrors(error.response.data));
    }
  };
};

export const startLoadPhotos = () => {
  return async (dispatch) => {
    try {
      const photos = await axios.get(`${BASE_API_URL}/photos`);
      dispatch(loadPhotos(photos.data));
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data));
    }
  };
};

export const startLoadProperties = () => {
  return async (dispatch) => {
    try {
      const properties = await axios.get(`${BASE_API_URL}/properties`);
      dispatch(loadProperties(properties.data));
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data));
    }
  };
};

export const loadPhotos = (photos) => ({
  type: 'LOAD_PHOTOS',
  photos
});

export const loadProperties = (properties) => ({
  type: 'LOAD_PROPERTIES',
  properties
});
