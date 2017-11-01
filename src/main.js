// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
// import VueResource from 'vue-resource';
// import VueScroller from 'vue-scroller';
// import VueLazyLoad from 'vue-lazyload';
require('es6-promise').polyfill()
// import './lib/css/animate.css';

import { ToastPlugin,AlertPlugin } from 'vux'
import Vuex from 'vuex'
// import store from './vuex/store.js'

import api from 'axios'

Vue.prototype.$axios = api;

Vue.use(Vuex)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
// Vue.config.productionTip = false;
Vue.use(VueRouter);
// Vue.use(VueResource);
// Vue.use(VueScroller);
// Vue.use(VueLazyLoad);
FastClick.attach(document.body)
/* eslint-disable no-new */

let store = new Vuex.Store({})

store.registerModule('vux', {
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: 'forward'
  },
  mutations: {
    updateDemoPosition (state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
  },
  actions: {
    updateDemoPosition ({commit}, top) {
      commit({type: 'updateDemoPosition', top: top})
    }
  }
})

Vue.use(store)

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App,store }
});

