/* eslint-disable no-param-reassign */
import { createStore } from 'vuex';

import { version } from '../../package.json';

export default createStore({
  state: {
    siteTitle: 'Beyond The Pages',
    siteCredit: 'Shoftime',
    siteCreditUrl: 'https://www.shoftime.tech',
    version,
  },
  mutations: {
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit('setSidebarType', payload);
    },
  },
  getters: {},
});
