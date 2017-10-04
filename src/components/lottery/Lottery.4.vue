<template>
    <div class="box">
        <div class="item1">
            <group title="">
                <!--眉头-->
                <div>
                    <div>酒吧id:
                        <input type="text" v-model="mch_id">
                        <button v-on:click="denglu">登陆</button>
                        <span v-if="ACTOR.status === status.LOGIN">已登陆</span>
                        <span v-if="ACTOR.status === status.ING">进行中</span>
                    </div>
                    <div>酒吧名称: <input type="text" v-model="mch_name"></div>
                    <div>昵   称:<input type="text" v-model="nick" /></div>
                </div>
                
                <!--等待界面ACTOR.status === status.BEGIN-->
                <div v-if="ACTOR.status == 0">
                    <div>请等待管理员开启</div>
                </div>

                <!--提示加入-->
                <div v-if="ACTOR.status === status.ING">
                    <div>抽奖金额:{{ACTOR.setting.price}}</div>
                    <div>抽奖人数:{{ACTOR.setting.luck_num}}</div>
                    <div>奖品:{{ACTOR.setting.prize}}</div>
                    <x-button type="primary" @click.native="join" plain style="border-radius:99px;width: 94%">参加</x-button>
                </div>

                <!--已参与活动-->
                <div v-if="ACTOR.status === status.JOINED" style="margin-left:60px;font-size: 25px">
                    <clocker time="2017-10-03 12:58:00" slot="value">距离开奖剩余
                    <span class="day">%_M1</span>
                    <span class="day">%_M2</span>分
                    <span class="day">%_S1</span>
                    <span class="day">%_S2</span>秒
                    </clocker>
                </div>

                <!--<div v-transfer-dom>
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
                </div>-->

                <!--<x-button v-show="false" type="primary" @click.native="$refs.scrollerEvent.reset({top:0})">reset</x-button>-->
            
            </group>
        </div>
        <div class="item2">
            <group>

            <divider>参与记录</divider>
            <!--<scroller lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">-->
            <div class="box2 body-wrapper">
                <!--<p v-for="msgObj in CHAT.msgArr">{{ msgObj.username }}说:{{ msgObj.msg }}</p>-->
                <p v-for="player in ACTOR.userArr">{{ player.nick }}加入了抽奖</p>
            </div>
            </scroller>
            </group>
        </div>
        
    </div>
</template>

<script>

    // import { alert, Group, XSwitch, Cell, TransferDomDirective as TransferDom } from 'vux'
    import { Divider,LoadMore,XNumber, XTable, Clocker, XInput, Group, XButton, Cell, Countdown, XSwitch, Scroller, XDialog, TransferDomDirective as TransferDom } from 'vux'
    // import CHAT from '../../api/client'
    import status from '../../api/status.js'
    import ACTOR from '../../api/actor.js'

    export default {
        directives: {
            TransferDom
        },
        props: {
            // showScrollBox:{
            //     type:Boolean,
            //     default:false
            // }
        },
        components: {
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
                user:{},
                nick:'',
                name:'zed',
                ACTOR,
                status,
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
                id: '',
                mch_id:1,
                mch_name:'1912酒吧',
                title:''
            }
        },
        watch:{
            'ACTOR.status':function(val,oldVal){
                console.log(val+'_'+oldVal)
            }
            // 'ACTOR.status':function(val,oldVal){
            //     // 如果是登录状态
            //     console.log("status"+val+","+oldVal)
            //     switch(val){
            //         case status.BEGIN:
            //             console.log('111111111111')
            //             break;
            //         case status.LOGIN:
            //             console.log(222)
            //             localStorage.setItem("mch_id", this.mch_id)
            //             localStorage.setItem("mch_name", this.mch_name)
            //             localStorage.setItem("nick", this.nick)
            //             ACTOR.init({
            //                 mch_id:this.mch_id,
            //                 mch_name:this.mch_name,
            //                 nick:this.nick,
            //                 usertype:2
            //             })
            //             break;
            //         case status.NEW:

            //             break;
            //         case status.ING:
            //             // this.isNew = false
            //             var item = {}
            //             // item.sj = '序号 抽奖时间 状态'
            //             this.items.push(item)
            //             // alert('开启成功')
            //             this.sign = "抽奖开始"
            //             ACTOR.join(this.Setting)
            //             // CHAT.start(this.Setting)
            //             // CHAT.isStart = true
            //             this.showTime = true
            //             break;
            //         case status.JONDED:
            //             break;
            //         case status.ENDING:
            //             break;
            //         case status.END:
            //             break;
            //         default:
            //     }
            // }
        },
        mounted() {
            ACTOR.status = status.BEGIN
        },
        methods: {
            denglu(){
                alert('dsd')
                // ACTOR.status = status.LOGIN
            },
            join(){

            }
        }
            // mchin(){
            //     if(this.title =='已登陆'){
            //         alert('已登陆')
            //         return
            //     }
            //     // 仅为测试版用，正式版功能通过扫码进入
            //     // if(!localStorage){
            //         localStorage.setItem("mch_id",this.mch_id)
            //         localStorage.setItem("mch_name",this.mch_name)
            //         localStorage.setItem("nick",this.user.nick)
            //     // }
            // },
            // send(msg){
            //     // CHAT.submit(msg)
            //     // this.msg=''
            //     // console.log(CHAT)
            // },
            // finish(index) {
            //     this.showScrollBox = true
            //     this.start = false
            //     this.time = 5
            //     // this.goods = true
            //     console.log('1111')
            //     // showScrollBox = true
            // },
            // onScrollBottom () {
            //     if (this.onFetching) {
            //         // do nothing
            //     } else {
            //         this.onFetching = true
            //         setTimeout(() => {
            //         this.bottomCount += 10
            //         this.$nextTick(() => {
            //             this.$refs.scrollerBottom.reset()
            //         })
            //         this.onFetching = false
            //         }, 2000)
            //     }
            // },
            // onScroll (pos) {
            //     this.scrollTop = pos.top
            // },
            // onCellClick () {
            //     window.alert('cell click')
            // },
            // onClickButton () {
            //     window.alert('click')
            // },
            // changeList () {
            //     this.showList1 = false
            //     this.$nextTick(() => {
            //         this.$refs.scroller.reset({
            //         top: 0
            //         })
            //     })
            // },
            // change(val) {

            // },
            // partin(){
                
                // CHAT.join(this.user)
                // this.start = true
                // CHAT.status = 2
            // }
            // insertMsg(){
                
            //     console.log('sdsdsdsdsdsdsd')
            //     // this.start = true
            //     this.send('  ' + this.$refs.txt.currentValue + '   时间:' + new Date().toLocaleString().slice(-7))
            // }
        // },
        // computed: {}
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