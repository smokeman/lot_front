<template>
    <div class="box">
        <div class="item1">
            <group title="">
                <div v-if="CHAT.status == 0">
                    <div>请等待管理员开启</div>
                </div>
                
                <x-number :value="1" :min="1" :title="'请输入金额'" fillable></x-number>
                <x-input title="聊天内容" type="text" placeholder="" ref="txt" value=""></x-input>
                <div v-if="start">
                    <cell title="距离开奖时间">
                        <countdown slot="value" v-model="time2" :start="start" @on-finish="finish2"></countdown>
                        秒
                    </cell>
                </div>
                <div v-else>
                    <x-button type="primary" @click.native="insertMsg" plain style="border-radius:99px;width: 94%">参加</x-button>
                </div>
            
            <!--<x-input title="请确认6位数字" v-model="password2" type="text" placeholder="" :equal-with="password"></x-input>-->
            <!--<x-switch title="start" v-model="start"></x-switch>-->
                <div v-transfer-dom>
                    <x-dialog v-model="showScrollBox" class="dialog-demo">
                        <p class="dialog-title">中奖信息</p>
                        <div class="img-box" style="height:100px;padding:15px 0;overflow:scroll;-webkit-overflow-scrolling:touch;">
                            <x-table :cell-bordered="false" style="background-color:#fff;">
                                <thead>
                                    <tr>
                                        <th>名次</th>
                                        <th>昵称</th>
                                        <th>奖品</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>zed</td>
                                        <td>红酒</td>
                                    </tr>
                                </tbody>
                            </x-table>
                        </div>
                        <div @click="showScrollBox=false">
                            <span class="vux-close"></span>
                        </div>
                    </x-dialog>
                </div>

                <x-button v-show="false" type="primary" @click.native="$refs.scrollerEvent.reset({top:0})">reset</x-button>
            
            </group>
        </div>
        <div class="item2">
            <group>
            <!--<scroller lock-x scrollbar-y height="1000px" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="100">
                <div class="box2">
                    <p v-for="i in 20">placeholder {{i}}</p>

                    <load-more tip="loading"></load-more>
                </div>
            </scroller>-->
            <divider>参与记录</divider>
            <scroller lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
            <div class="box2 body-wrapper">
                <p v-for="msgObj in CHAT.msgArr">{{ msgObj.username }}说:{{ msgObj.msg }}</p>
                
                <!--<load-more tip="loading"></load-more>-->
            </div>
            </scroller>
            </group>
        </div>
        
    </div>
<!--<div id="ranking">-->
<!--<div class="rankBg">-->
<!--<header id="header">-->
<!--<img src="../assets/image/headlineimg.png"/>-->
<!--<mt-field label="金额" style="border:2px solid yellow" :placeholder="'请输入金额'" type="tel" :value="input_v"></mt-field>-->
<!--<button @click="itemset">参与</button>-->

<!--<alert v-model="show1" :title="999999"> tttttt</alert>-->
<!--</header>-->

<!--<div style="height:200px;border:2px solid black;overflow-x: hidden;">-->
<!--<view-box ref="viewBox" >
                    <div v-for="msgObj in CHAT.msgArr">
                        <OtherMsg :name="msgObj.name" :msg="msgObj.msg"></OtherMsg>
                    </div>
                </view-box>-->
<!--</div>-->
<!--<input type="text" name="" @keyup.enter="send(msg)" v-model="msg">
            <mt-field label="消息" style="border:2px solid yellow" :placeholder="''" type="tel" v-model="msg"></mt-field>
            <span @click="send(msg)">发送</span>-->

<!--<div id="rankcon" v-if="seen">
    <table class="amtable">
        <thead>
            <tr>
                <th class="am-text-left">名次</th>
                <th class="am-text-left">昵称</th>
                <th class="am-text-right">奖品</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="am-text-left"><span class="amiconbtn">1</span></td>
                <td class="am-text-left">zed</td>
                <td class="am-text-right">酒</td>
            </tr>
            <tr>
                <td class="am-text-left"><span class="amiconbtn">2</span></td>
                <td class="am-text-left">smoke</td>
                <td class="am-text-right">烟</td>
            </tr>
        </tbody>
    </table>
    <div id="sambutton">
        <div>点击查看即可查看您的排名</div>
        <button type="button" class="am-btn" @click="close">关闭</button>
    </div>
</div>-->
<!--<div v-if="timeCount">
    <span class="text" :style="{ backgroundColor: bgColor, color: color }">{{hour}}</span><span :style="{ color: bgColor }">:</span>
    <span
        class="text" :style="{ backgroundColor: bgColor, color: color }">{{minute}}</span><span :style="{ color: bgColor }">:</span><span class="text" :style="{ backgroundColor: bgColor, color: color }">{{second}}</span>
</div>-->
<!--<button @click="clickButton">点击</button>-->

<!--</div>-->
<!--</div>-->
</template>

<script>
    // import SelfMsg from './SelfMsg.vue'
    // import OtherMsg from './OtherMsg.vue'
    // import socket.io from 'socket.io'
    // import CHAT from '../api/client'
    // import { ViewBox } from 'vux'

    // import { alert, Group, XSwitch, Cell, TransferDomDirective as TransferDom } from 'vux'
    import { Divider,LoadMore,XNumber, XTable, Clocker, XInput, Group, XButton, Cell, Countdown, XSwitch, Scroller, XDialog, TransferDomDirective as TransferDom } from 'vux'
    import CHAT from '../../api/client'

    export default {
        directives: {
            TransferDom
        },
        props: {
            bgColor: {
                default: '#000000'
            },
            color: {
                default: '#FFFFFF'
            },
            // showScrollBox:{
            //     type:Boolean,
            //     default:false
            // }
        },
        components: {
            // OtherMsg,
            // AlertPlugin,
            // ToastPlugin,
            // alert
            Divider,
            LoadMore,
            XNumber,
            XTable,
            XInput,
            XButton,
            Group,
            Cell,
            Clocker,
            Countdown,
            XSwitch,
            Scroller,
            XDialog
        },
        data() {
            return {
                nick:'s',
                name:'zed',
                je:'',
                CHAT,
                showList1: true,
                scrollTop: 0,
                onFetching: false,
                bottomCount: 20,
                show: false,
                show2: false,
                showToast: false,
                showHideOnBlur: false,
                showScrollBox: false,
                showDialogStyle: false,
                goods: false,
                time: 3,
                time1: 15,
                time2: 5,
                value: '',
                start: false,
                title: 't',
                // input_v: "111",
                // msg: '666参与了进来',
                // CHAT,
                // curdate: 0,
                // msgObj:{
                //     name:'1',
                //     msg:'2'
                // },
                // seen: false,
                // timeCount: false,
                // hour: '00',
                // minute: '00',
                // second: '00',
                // count: this.date - new Date().getTime(),
                // interval: null,
                id: ''
            }
        },
        // sockets: {
        //     connect: function(){
        //         this.id=this.$socket.id
        //     },
        //     customEmit: function(val){
        //         console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
        //     }
        // },
        mounted() {
            // this.$nextTick(() => {
            // this.$refs.scrollerEvent.reset({top: 0})
            // })
            // this.$nextTick(() => {
            // this.$refs.scrollerBottom.reset({top: 0})
            // })
            // console.log(this.$refs.u.currentValue)
            console.log('111')
            // if (localStorage) {
            //     localStorage.setItem('name',localStorage.getItem('u'))
            //     localStorage.setItem('color','#d43937')
            //     localStorage.setItem('weichat','weichat')
            //     localStorage.setItem('userid','320705')
            // }
            
            // CHAT.init()
            // console.log(CHAT)
            // this.$sockets.emit('connect', val);
            // showScrollBox = false
            // this.$nextTick(() => {
            //     this.$refs.scrollerEvent.reset({top: 0})
            //     })
            //     this.$nextTick(() => {
            //     this.$refs.scrollerBottom.reset({top: 0})
            //     })
        },
        methods: {
            send(msg){
                CHAT.submit(msg)
                this.msg=''
                console.log(CHAT)
            },
            finish2(index) {
                this.showScrollBox = true
                this.start = false
                this.time = 5
                // this.goods = true
                console.log('1111')
                // showScrollBox = true
            },
            onScrollBottom () {
                if (this.onFetching) {
                    // do nothing
                } else {
                    this.onFetching = true
                    setTimeout(() => {
                    this.bottomCount += 10
                    this.$nextTick(() => {
                        this.$refs.scrollerBottom.reset()
                    })
                    this.onFetching = false
                    }, 2000)
                }
            },
            onScroll (pos) {
                this.scrollTop = pos.top
            },
            onCellClick () {
                window.alert('cell click')
            },
            onClickButton () {
                window.alert('click')
            },
            changeList () {
                this.showList1 = false
                this.$nextTick(() => {
                    this.$refs.scroller.reset({
                    top: 0
                    })
                })
            },
            change(val) {

            },
            insertMsg(){
                
                console.log('sdsdsdsdsdsdsd')
                // this.start = true
                this.send('  ' + this.$refs.txt.currentValue + '   时间:' + new Date().toLocaleString().slice(-7))
            }
        },
        computed: {}
    }
</script>

<style lang="less" scoped>
    @import '~vux/src/styles/close';

    .dialog-demo {
    .weui-dialog{
        border-radius: 8px;
        padding-bottom: 8px;
    }
    .dialog-title {
        line-height: 30px;
        color: #666;
    }
    .img-box {
        height: 350px;
        overflow: hidden;
    }
    .vux-close {
        margin-top: 8px;
        margin-bottom: 8px;
    }
    }

    /*div {
        height: 100%
    }*/

    .box {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .item1 {
        flex:1
    }

    .item2 {
        flex:2
    }

        /*#float {
            background-color: #ef6944;
            margin: 0 1.5rem;
            color: #fcde00;
            border-radius: 3px;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            padding: 2.5rem 2rem 0 2rem;
            position: relative;
            z-index: 2;
            margin-top: 5px;
        }
        #float:before {
            background-color: #fcde00;
            content: "排行榜";
            color: #ef6a44;
            position: absolute;
            top: -5px;
            width: 80%;
            left: 10%;
            text-align: center;
            border-radius: 0 0 4px 4px;
            -webkit-border-radius: 0 0 4px 4px;
            -moz-border-radius: 0 0 4px 4px;
            line-height: 2rem;
            z-index: 3;
        }
        #float:after {
            background-color: #d43937;
            position: absolute;
            width: 84%;
            height: 5px;
            top: -5px;
            left: 8%;
            border-radius: 8px 8px 0 0;
            content: "..";
            -webkit-border-radius: 8px 8px 0 0;
            -moz-border-radius: 8px 8px 0 0;
            text-align: center;
        } */
</style>