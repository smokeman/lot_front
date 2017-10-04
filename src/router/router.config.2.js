import VueRouter from 'vue-router';
import Lottery from '../components/lottery/Lottery.vue'
import News from '../components/news/news.vue'
// import Lottery from '../components/Lottery.vue'

let routes = [
        { path: '/', titleredirect: '/lottery', meta: { keepAlive: false, title: '抽奖' } },
        { path: '/lottery', component: Lottery, meta: { keepAlive: false, title: '抽奖' } },
        { path: '/news', component: News, meta: { keepAlive: false, title: '网易 - 头条新闻' } },
        { path: '/userset', component: Lottery },
        // { path: '/MouserData', component: MouserData },
        // { path: '/ranking', component: Rank },
        { path: '/order', component: Lottery }
]

let router = new VueRouter({
        routes
})

router.afterEach($route => {
        document.title = $route.meta.title;
});

export default router