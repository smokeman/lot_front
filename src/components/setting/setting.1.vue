<template>

    <div>
        <div>
            酒吧名称:"123酒吧""
        </div>
        <div>
            金额<input type="text" v-model="Setting.low_price">
        </div>
        <div>人数<input type="text" v-model="Setting.all_count"></div>
        <div>奖品名称<input type="text" v-model="Setting.prize"></div>
        <div><button v-on:click="add">开始</button>
        </div>

        <div v-for="item in items">{{ item.sj }}</div>
        <div>{{CHAT.lucker.nick }}</div>
        <div>{{CHAT.status}}</div>
        {{ Setting }}
    </div>

</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    import CHAT from '../../api/client.js'

    export default {
        data(){
            return {
                a:'',
                items:[],
                CHAT,
                Setting:{
                    low_price:1,
                    all_count:1,
                    prize:'s',
                    mch_id:1,
                    mch_name:'1912',
                    oper:111,
                    status:1
                }, //设置参数
            }
        },
        methods:{
            add(){
                var item = {}
                item.sj = '序号 抽奖时间 状态'
                this.items.push(item)
                alert('开启成功')
                CHAT.start(this.Setting)
                // axios.post('/lottery_add',qs.stringify({mch_id:1,mch_name:'1912',oper:'zed',prize:'goods',low_price:6}))
                // axios.post('/lottery_add',{mch_id:1,mch_name:'1912',oper:'zed',prize:'goods',low_price:6})
                // .then((ret)=>{
                //     // console.log(ret)
                //     CHAT.start()
                    
                // })
                // .catch((error)=>{
                //     console.log(error)
                // })
                
            }
        },
        mounted(){
            if (localStorage) {
                // localStorage.setItem('name','this.$refs.u.currentValue')
                localStorage.setItem('name','zed')
                localStorage.setItem('color','#d43937')
                localStorage.setItem('weichat','weichat')
                localStorage.setItem('userid','320705')
            }
            console.log('111')
            CHAT.init()
        }
    };
</script>

<style lang="less" scoped>
    input{
        border: 1px solid black
    }
</style>