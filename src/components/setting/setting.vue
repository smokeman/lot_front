<template>

    <div>
        <div>
            <div>酒吧id:
                <input type="text" v-model="mch_id">
                <button v-on:click="mchin">登陆</button>
                <span v-if="owner.stat === status.__login">已登陆</span>
                <span v-if="owner.stat === status.__ing">进行中</span>
            </div>
            <div>酒吧名称: <input type="text" v-model="mch_name"></div>
            昵称<input type="text" v-model="nick" />
        </div>
        <div v-if="owner.stat === status.__new">
            <div>奖品名称<input type="text" v-model="setting.prize"></div>
            <div>抽奖人数<input type="text" v-model="setting.luck_num"></div>
            <div>参与条件<input type="text" v-model="setting.price"></div>
            <div>抽奖时间
                <input name="a" type="radio" v-model="setting.luck_time" value="3">3分钟
                <input name="a" type="radio" v-model="setting.luck_time" value="5">5分钟
            </div>
            
        </div>
        <div v-if="owner.stat === status.__ing" style="margin-left:60px;font-size: 25px">
            <clocker :time="downtime" slot="value">
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
        <div v-if="owner.stat === status.__login"><button v-on:click="create">新增</button></div>
        <div v-if="owner.stat === status.__new"><button v-on:click="start">开始</button></div>
        <div v-if="owner.stat === status.__ending">等待开奖中</div>
        <div v-if="owner.stat === status.__end">
            中奖人是
            <div v-for="lucker in owner.luckerArr">{{lucker.nick}}</div>
            <button v-on:click="create">新增</button>
        </div>
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
                <tr v-if="owner.stat === owner.__ing">
                    <td>*</td>
                    <td>{{ setting.price }}</td>
                    <td>{{ setting.prize }}</td>
                    <td>进行中</td>
                </tr>
                <tr v-for="list in owner.listArr">
                    <td>{{ list.code }}</td>
                    <td>{{ list.price }}</td>
                    <td>{{ list.prize }}</td>
                    <td>已结束</td>
                </tr>
            </tbody>
        </x-table>
<!--<div>获奖者:{{CHAT.lucker.nick }}</div>
        <div>商户状态{{CHAT.status}}</div>-->
<!--{{ setting }}-->
</div>

</template>

<script>
    import owner from '../../api/owner.js'
    import status from '../../api/status.js'
    import dateformat from 'dateformat'
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
                owner,
                status,
                dateformat,
                downtime:'',
                setting: {
                    price: 5,
                    luck_num: 2,
                    prize: 's',
                    mch_id: 1,
                    mch_name: '1912',
                    oper: 111,
                    luck_time:3,
                    status: 1
                }, //设置参数
                mch_id: 1,
                mch_name: '1912酒吧',
                title: '',
                nick: 'smoke',
                sign: "",
                showTime:false
            }
        },
        watch:{
            'owner.stat':function(val,oldVal){
                // 如果是登录状态
                console.log("status"+val+","+oldVal)
                switch(val){
                    case status.__begin:
                        console.log('111111111111')
                        break;
                    case status.__login:
                        localStorage.setItem("mch_id", this.mch_id)
                        localStorage.setItem("mch_name", this.mch_name)
                        localStorage.setItem("nick", this.nick)
                        owner.init({
                            mch_id:this.mch_id,
                            mch_name:this.mch_name,
                            nick:this.nick,
                            usertype:1
                        })
                        break;
                    case status.__new:
                        console.log(dateformat(new Date(new Date().getTime()+30000),'yyyy-mm-dd hh:mm:ss'))
                        break;
                    case status.__ing:
                        // 倒计时计算
                        this.downtime = dateformat(new Date(new Date().getTime()+30000),"yyyy-mm-dd HH:MM:ss")
                        // console.log(this.downtime)
                        var item = {}
                        this.items.push(item)
                        this.sign = "抽奖开始"
                        owner.start(this.setting)
                        var _ = this
                        setTimeout(function(){
                            _.ending()
                        },30000)
                        // CHAT.start(this.setting)
                        // CHAT.isStart = true
                        // this.showTime = true
                        break;
                    case status.__ending:
                        var _ = this
                        setTimeout(function(){
                            _.end()
                        },10000)
                        break;
                    case status.__end:
                        break;
                    default:
                }
            }
        },
        mounted() {
            owner.stat = status.__begin
        },
        methods: {
            mchin() {
                owner.stat = status.__login
                // 仅为测试版用，正式版功能通过扫码进入
            },
            create() {
                // this.is__new = true
                owner.stat = status.__new
            },
            start() {
                owner.stat = status.__ing
            },
            ending(){
                owner.stat = status.__ending
            },
            end(){
                owner.stat = status.__end
            }
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