import Vue from 'vue'
import VueRouter from 'vue-router'
import FastClick from 'fastclick'

import App from './App.vue'
import routers from './router/router.config.js'

import { AlertPlugin, ToastPlugin } from 'vux'

Vue.use(AlertPlugin)
Vue.use(ToastPlugin)

FastClick.attach(document.body)

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routers
})

new Vue({
    router,
    el: '#app',
    render: x => x(App),
    mounted() {

    }
})