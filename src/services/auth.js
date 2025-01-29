import { api } from '@/plugins/axios';
import { endpoint } from '@/utils/constant';

const url = endpoint.auth;
const urlMaster = endpoint.master;

const register = (body) => api.post(`${url}/register`, body);
const login = (body) => api.post(`${url}/login`, body);
const logout = () => api.post(`${url}/logout`);

const listRole = () => api.get(`${urlMaster}/role-activity/list-role`);
const listActivity = () => api.get(`${urlMaster}/role-activity/list-activity-role`);

export { register, login, logout, listRole, listActivity };
