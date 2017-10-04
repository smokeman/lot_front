<template>

    <div>
        <div>
            <div>酒吧id:
                <input type="text" v-model="mch_id">
                <button v-on:click="mchin">登陆</button> {{title}} {{sign}}
            </div>
            <div>酒吧名称: <input type="text" v-model="mch_name"></div>
            昵称<input type="text" v-model="nick" />
        </div>
        <div v-if="isNew">
            <div>奖品名称<input type="text" v-model="Setting.prize"></div>
            <div>抽奖人数<input type="text" v-model="Setting.luck_num"></div>
            <div>参与条件<input type="text" v-model="Setting.price"></div>
            <div>抽奖时间
                <input name="a" type="radio">3分钟
                <input name="a" type="radio">5分钟
            </div>
            
        </div>
        <div v-if="showTime" style="margin-left:60px;font-size: 25px">
            <clocker time="2017-09-29 23:00:00" slot="value">
            <!--<span class="day">%_D1</span>
            <span class="day">%_D2</span>天
            <span class="day">%_H1</span>
            <span class="day">%_H2</span>时-->距离开奖剩余
            <span class="day">%_M1</span>
            <span class="day">%_M2</span>分
            <span class="day">%_S1</span>
            <span class="day">%_S2</span>秒
            </clocker>
        </div>
        <div v-if="!isNew"><button v-if="!showTime" v-on:click="create">新增</button></div>
        <div v-if="isNew"><button v-on:click="start">开始</button></div>

        <div v-for="item in items">{{ item.sj }}</div>

        <x-table :cell-bordered="false" style="background-color:#fff;">
            <thead>
                <tr>
                    <th>序号</th>
                    <th>金额</th>
                    <th>奖品</th>
                    <th>状态</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="CHAT.isStart">
                    <td>*</td>
                    <td>{{ Setting.price }}</td>
                    <td>{{ Setting.prize }}</td>
                    <td>进行中</td>
                </tr>
                <tr v-for="list in CHAT.listArr">
                    <td>{{ list.code }}</td>
                    <td>{{ list.price }}</td>
                    <td>{{ list.prize }}</td>
                    <td>已结束</td>
                </tr>
            </tbody>
        </x-table>
<!--<div>获奖者:{{CHAT.lucker.nick }}</div>
        <div>商户状态{{CHAT.status}}</div>-->
<!--{{ Setting }}-->
</div>

</template>

<script>
    // import axios from 'axios'
    // import qs from 'qs'
    import CHAT from '../../api/client.js'
    import { XTable, Clocker } from 'vux'

    export default {
        components: {
            XTable,
            Clocker
        },
        data() {
            return {
                a: '',
                items: [],
                CHAT,
                Setting: {
                    price: 5,
                    luck_num: 2,
                    prize: 's',
                    mch_id: 1,
                    mch_name: '1912',
                    oper: 111,
                    status: 1
                }, //设置参数
                isNew: false,
                mch_id: 1,
                mch_name: '1912酒吧',
                title: '',
                nick: 'smoke',
                sign: "",
                showTime:false
            }
        },
        methods: {
            mchin() {
                if (this.title == '已登陆') {
                    alert('已登陆')
                    return
                }
                // 仅为测试版用，正式版功能通过扫码进入
                // if(!localStorage){
                localStorage.setItem("mch_id", this.mch_id)
                localStorage.setItem("mch_name", this.mch_name)
                localStorage.setItem("nick", this.nick)
                // }
                CHAT.init(1)
                this.title = '已登陆'
            },
            create() {
                this.isNew = true
            },
            start() {
                this.isNew = false
                var item = {}
                // item.sj = '序号 抽奖时间 状态'
                this.items.push(item)
                // alert('开启成功')
                this.sign = "抽奖开始"
                CHAT.start(this.Setting)
                CHAT.isStart = true
                this.showTime = true
            }


        },
        mounted() {
            // if (localStorage) {
            // localStorage.setItem('name','this.$refs.u.currentValue')
            // localStorage.setItem('name','zed')
            // localStorage.setItem('color','#d43937')
            // localStorage.setItem('weichat','weichat')
            // localStorage.setItem('userid','320705')
            // }

            // 应开放此处
            // if(!localStorage){
            //     localStorage.setItem("mch_id",this.mch_id)
            //     localStorage.setItem("mch_name",this.mch_name)
            // }
            // CHAT.init()
        }
    };
</script>

<style lang="less" scoped>
    input{
        border: 1px solid black
    }
    .day {
        background-color:#000;
        color:#fff;
        text-align:center;
        display:inline-block;
        padding:0 3px;
        border-radius:3px;
    }
</style>