import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const firstone = { template: '<div>firstone{{ $route.params.id }}</div>' }
const firsttwo = { template: '<div>firsttwo</div>' }
const second = { template: '<div>Second</div>' }
const Home = { template: '<div>Home</div>' }
const my = {
    template: `
    <div>
        <h2>组件</h2>
        <router-view></router-view>
    </div>
    `}

const router = new VueRouter({
    mode:'history',
    base:__dirname,
    routes:[
        {path:'/'},
        {path:'/params/:aaa/:bbb'},
        {path:'/params-regex/:id(\\d+)'}
    ]
})    
// const router = new VueRouter({
//     mode: 'history',
//     base: __dirname,
//     routes: [
//         { path: '/', name:"Home",components: {
//             default:Home,
//             left:firstone,
//             right:firsttwo
//         } },
//         {
//             path: '/my', name:"my",component: my, children: [
//                 { path: '/firstone', name:"firstone",component: firstone },
//                 { path: '/firsttwo', name:"firsttwo",component: firsttwo },

//             ]
//         },
//         { path: '/second／:aaa/:bbb', component: second },
//         { path: '/second-regex／:id(\\d+)', component: second },
//     ]
// })

// new Vue({
//     router,
//     template: `
//         <div id='r'>
//             <h1>导航</h1>
//             <p>{{ $route.name }}</p>
//             <ul>
//                 <li><router-link to="/">首页</router-link></li>
//                 <li><router-link to="/my">my</router-link></li>
//                 <li><router-link :to="{name:'firstone',params:{id:123}}">firstone</router-link></li>
//                 <li><router-link to="/firsttwo">firsttwo</router-link></li>
//                 <li><router-link to="/second">二</router-link></li>
//             </ul>
//             <div class="sadsa">
//                 <router-view></router-view>
//                 <router-view name="left"></router-view>
//                 <router-view name="right"></router-view>
//             </div>
//         </div>
//     `
// }).$mount('#app')
new Vue({
    router,
    template:`
        <div>
            <h1>Good</h1>
            <ul>
                <li><router-link to="/">/</router-link></li>
                <li><router-link to="/params/111/222">/params//111/222</router-link></li>
                <li><router-link to="/params-regex/222">222</router-link></li>
                <li><router-link to="/params-regex/aaa">aaa</router-link></li>
            </ul>
            <p>Show</p>
            <pre><code>
                {{ $route.params.aaa }}
                {{ JSON.stringify($route,null,2) }}
            </code></pre>
        </div>
    `
}).$mount('#app')

export default router