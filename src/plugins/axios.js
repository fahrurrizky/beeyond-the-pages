import axios from 'axios';
import { getCk, delCk } from '../utils/cookies';

const baseURL = import.meta.env.PUBLIC_BASE_URL;
/**
 * Api instance plugin using axios
 */
const api = axios.create({
  baseURL,
});
api.interceptors.request.use(
  (config) => {
    // const configs = config;
    // const CERT = getCk('CERT');
    // if (CERT) {
    //   configs.headers.Authorization = `Bearer ${CERT}`;
    // } else {
    //   delCk('CERT');
    //   delete configs.headers.Authorization;
    // }
    return config;
  },
  (error) => {
    throw error;
  },
);
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    let err;
    if (error.response?.data instanceof Blob) {
      err = JSON.parse(await error.response.data.text());
    }
    if (error?.response?.data?.error === 'token is not defined') {
      window.location.reload();
    }
    switch (error.response?.status) {
      case 401:
        delCk('CERT');
        break;
      default:
        break;
    }
    throw err ?? error?.response?.data ?? error;
  },
);

export default {
  install: (app) => {
    const ctx = app;
    ctx.config.globalProperties.$api = api;
    ctx.$api = api;
  },
};

export { api, baseURL };
