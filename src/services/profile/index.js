/* eslint-disable import/prefer-default-export */
import { api } from '@/plugins/axios';
import { endpoint } from '@/utils/constant';

const url = `${endpoint.master}/notification`;

const read = (id) => api.post(`${url}/read/${id}`);

export { read };
