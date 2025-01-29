/**
 * Back End microservices endpoint list
 * call in services with `${endpoint.<key>}`
 */
export const endpoint = {
  auth: '/auth',
  master: '/api/master',
  planProd: '/api/plan-prod',
  prod: '/api/production',
  device: '/api/device',
};

export const DB_NAME = 'dcs';
export const DB_STORE_NAME = 'maka';
export const ROLE_VAR = 'role';
