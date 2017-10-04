import Lottery from '../components/Lottery.vue'
// import Lottery from '../components/Lottery.vue'

export default [

        { path: '/', redirect: '/home' },
        { path: '/lottery', component: Lottery },
        { path: '/userdata', component: Lottery },
        { path: '/userset', component: Lottery },
        // { path: '/MouserData', component: MouserData },
        // { path: '/ranking', component: Rank },
        { path: '/order', component: Lottery }

]