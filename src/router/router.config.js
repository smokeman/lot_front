import VueRouter from 'vue-router';
import Lottery from '../components/lottery/Lottery.vue'
import News from '../components/news/news.vue'
import Setting from '../components/setting/Setting.vue'

let routes = [
        { path: '/', redirect: '/setting', meta: { keepAlive: false, title: '抽奖' } },
        { path: '/lottery', component: Lottery, meta: { keepAlive: false, title: '抽奖' } },
        { path: '/news', component: News, meta: { keepAlive: false, title: '网易 - 头条新闻' } },
        { path: '/userset', component: Lottery },
        // { path: '/MouserData', component: MouserData },
        // { path: '/ranking', component: Rank },
        { path: '/setting', component: Setting ,meta: { keepAlive: false, title: '设置' }}
]

let router = new VueRouter({
        routes
})

router.afterEach($route => {
        document.title = $route.meta.title;
});

export default router