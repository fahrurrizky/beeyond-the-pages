import { DB_NAME, DB_STORE_NAME } from '@/utils/constant';
import {
  // idb aliases
  set as setDb,
  update as updateDb,
  get as getDb,
  del as delDb,
  clear as clearDb,
  // custom store
  createStore,
} from 'idb-keyval';

const customStore = createStore(DB_NAME, DB_STORE_NAME);

const set = (key, val, store = customStore) => setDb(key, val, store);

const update = (key, val, store = customStore) => updateDb(key, val, store);

const get = (key, store = customStore) => getDb(key, store);

const del = (key, store = customStore) => delDb(key, store);

const clear = (store = customStore) => clearDb(store);

export {
  // custom idb function
  set,
  update,
  get,
  del,
  clear,
};
