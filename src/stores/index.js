/* eslint-disable no-param-reassign */
import { createStore } from 'vuex';
import bootstrap from 'bootstrap/dist/js/bootstrap.min';

import { version } from '../../package.json';

export default createStore({
  state: {
    siteTitle: 'Maka Dashboard',
    siteCredit: 'STECHOQ',
    siteCreditUrl: 'https://stechoq.com',
    version,
    hideConfigButton: false,
    isPinned: false,
    showConfig: false,
    isRTL: false,
    color: '',
    sidebarType: 'bg-white',
    darkMode: false,
    isNavFixed: true,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    layout: 'default',
    bootstrap,
  },
  mutations: {
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    toggleMinimize(state) {
      const body = document.querySelector('#app').classList;
      state.isPinned = !state.isPinned;
      if (state.isPinned) {
        body.add('g-sidenav-pinned');
        body.add('g-sidenav-show');
        body.remove('g-sidenav-hidden');
      } else {
        body.add('g-sidenav-hidden');
        body.remove('g-sidenav-pinned');
        body.remove('g-sidenav-show');
      }
    },
    setSidebarType(state, payload) {
      state.sidebarType = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    },
    toggleDefaultLayout(state) {
      state.showNavbar = !state.showNavbar;
      state.showSidenav = !state.showSidenav;
      state.showFooter = !state.showFooter;
    },
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit('setSidebarType', payload);
    },
  },
  getters: {},
});
