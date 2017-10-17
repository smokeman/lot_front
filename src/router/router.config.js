import VueRouter from 'vue-router';
import Lottery from '../components/lottery/Lottery.vue'
import News from '../components/news/news.vue'
import Setting from '../components/setting/setting.vue'
import My from '../components/my/My.vue'
import WineList from '../components/my/WineList.vue'
import LuckerList from '../components/my/LuckerList.vue'
import CouponList from '../components/my/CouponList.vue'
import Coupon from '../components/coupon/Coupon.vue'
import CouponPay from '../components/coupon/CouponPay.vue'
import WineMch from '../components/wine/WineMch.vue'
import WinePlayer from '../components/wine/WinePlayer.vue'
import ok from '../components/wine/ok.vue'

let routes = [
        { path: '/', redirect: '/setting', meta: { keepAlive: false, title: '抽奖' } },
        { path: '/lottery', component: Lottery, meta: { keepAlive: false, title: '抽奖' } },
        { path: '/wine_mch', component: WineMch, meta: { keepAlive: false, title: '存酒商家' } },
        { path: '/wine_player', component: WinePlayer, meta: { keepAlive: false, title: '存酒玩家' } },
        { path: '/wine_ok', component: ok, meta: { keepAlive: false, title: '存酒完成' } },
        // { path: '/news', component: News, meta: { keepAlive: false, title: '网易 - 头条新闻' } },
        { path: '/userset', component: Lottery },
        // { path: '/MouserData', component: MouserData },
        // { path: '/ranking', component: Rank },
        { path: '/setting', component: Setting ,meta: { keepAlive: false, title: '设置' }},
        { path: '/my', component: My ,meta: { keepAlive: false, title: '我的' }},
        { path: '/my/winelist', component: WineList ,meta: { keepAlive: false, title: '我的' }},
        { path: '/my/luckerlist', component: LuckerList ,meta: { keepAlive: false, title: '我的' }},
        { path: '/my/couponlist', component: CouponList ,meta: { keepAlive: false, title: '我的' }},
        { path: '/coupon', component: Coupon ,meta: { keepAlive: false, title: '优惠券发放' }},
        { path: '/coupon_pay', component: CouponPay ,meta: { keepAlive: false, title: '优惠券处理' }}
        
]

let router = new VueRouter({
        routes
})

router.afterEach($route => {
        document.title = $route.meta.title;
});

export default router