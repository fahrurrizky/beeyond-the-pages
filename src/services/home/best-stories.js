import { api } from '../../plugins/axios';
import { endpoint } from '../../utils/constant';

const url = endpoint.home;

const listBestStories = () => api.get(`${url}/best-stories`);

export {
  listBestStories,
};
