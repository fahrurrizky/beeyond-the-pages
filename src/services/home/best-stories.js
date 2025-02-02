import { api } from '../../plugins/axios';
import { endpoint } from '../../utils/constant';

const url = endpoint.mocki;

const listBestStories = () => api.get(`${url}`);

export {
  listBestStories,
};
