import axios, { AxiosInstance } from 'axios';
import { error } from 'console';
import config from '../../../config';

const baseURL = config.apiBaseUrl;
const uriRestaurate = '/rest/restaurantes';
const errorDominio = 'Erro ao consultar restaurante';

export const getRestaurante = async (name: string) => {
  const params = {
    restauranteUrl: name,
  };

  try {
    return await axios.get(baseURL + uriRestaurate, { params });
  } catch (error) {
    console.error(errorDominio);
    console.log(error);
  }
};
