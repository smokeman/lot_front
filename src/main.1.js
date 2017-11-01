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

import axios from 'axios'
import qs from 'qs'
let axiosIns = axios.create({});

// if (process.env.NODE_ENV == 'dev') {
    // axiosIns.defaults.baseURL = 'http://127.0.0.1:4001';
// } else if (process.env.NODE_ENV == 'debug') {
    axiosIns.defaults.baseURL = 'chat.ha.aoxing.aoxingtec.cn';
// } else if (process.env.NODE_ENV == 'production') {
//     axiosIns.defaults.baseURL = 'http://www.aoxingtec.cn';
// }

// 跨域带cookie
// Access-Control-Allow-Credentials: true 
axiosIns.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
axiosIns.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
// axiosIns.defaults.headers['Content-Type']="application/x-www-form-urlencoded"
axiosIns.defaults.responseType = 'json';
axiosIns.defaults.transformRequest = [function (data) {
    //数据序列化
    return qs.stringify(data);
}
];
axiosIns.defaults.validateStatus = function (status) {
    return true;
};
axiosIns.interceptors.request.use(function (config) {
    //配置config
    config.headers.Accept = 'application/json';
    // config.headers.System = 'vue';
    // let token = Vue.localStorage.get('token');
    // if(token){
    //     config.headers.Token = token;
    // }
    return config;
});
axiosIns.interceptors.response.use(function (response) {
    let data = response.data;
    let status = response.status;
    if (status === 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
});

let ajaxMethod = ['get', 'post'];
let api = {};
ajaxMethod.forEach((method)=> {
    //数组取值的两种方式
    api[method] = function (uri, data, config) {
        return new Promise(function (resolve, reject) {
            axiosIns[method](uri, data, config).then((response)=> {
                /*根据后台数据进行处理
                 *1 code===200   正常数据+错误数据     code!==200   网络异常等
                 *2 code===200   正常数据     code!==200   错误数据+网络异常等
                 * 这里使用的是第一种方式
                 * ......
                 */
                if (response.data.StatusCode) {
                    //toast封装：  参考ele-mint-ui
                    Toast({
                        message: response.data.Message,
                        position: 'top',
                        duration: 2000
                    });
                    if (response.data.Message === '未登录') {
                        Toast({
                            message: response.data.Message,
                            position: '',
                            duration: 2000
                        });
                        //使用vue实例做出对应行为  change state or router
                        //instance.$store.commit('isLoginShow',true);
                    }
                } else {
                    resolve(response);
                }
            }).catch((response)=> {
                //reject response
                //alert('xiuxiu，限你10分钟到我面前来,不然...');
            })
        })
    }
});

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

