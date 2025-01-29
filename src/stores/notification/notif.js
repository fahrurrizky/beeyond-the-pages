import { defineStore, acceptHMRUpdate } from 'pinia';
import * as sv$notif from '@service/notification/index';

// eslint-disable-next-line import/prefer-default-export
export const st$notif = defineStore({
  id: 'notif',
  state: () => ({
    list: {
      status: null,
      data: [],
    },
    status: true,
  }),
  getters: {
    g$list: ({ list }) => (list?.data)?.map((item) => ({ ...item })).reverse(),
  },
  actions: {
    async a$list(msg) {
      this.status = null;
      try {
        this.list = {
          status: true,
          data: msg,
        };
      } catch (e) {
        this.list = {
          status: false,
          data: [],
        };
        throw e?.message ?? e;
      }
      setTimeout(() => {
        this.status = true;
      }, 1);
    },

    async a$read(id) {
      try {
        await sv$notif.read(id);
      } catch (e) {
        throw e?.message ?? e;
      }
    },
  },
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(st$notif, import.meta.hot));
