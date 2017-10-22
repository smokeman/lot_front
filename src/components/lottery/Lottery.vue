<template>
    <div class="box">
        <div class="item1">
            <!--眉头-->
            <div>
                <div>酒吧id:
                    <input type="text" v-model="mch_id">
                    <button v-on:click="scan">扫码桌面二维码</button>
                    <span v-if="actor.stat === status.__login">已登陆</span>
                    <span v-if="actor.stat === status.__joined">进行中</span>
                </div>
                <div>酒吧名称: <input type="text" v-model="mch_name"></div>
                昵称<input type="text" v-model="nick" />
            </div>
            <!--登陆后-->
            <div v-if="actor.stat === status.__login">
                等待管理员开启
            </div>
            <div v-if="actor.stat === status.__end_wait">
                本轮正在开奖中,请等待下一轮
            </div>
            <!--提示加入-->
            <div v-if="actor.stat === status.__ing">
                <div>奖品名称<input type="text" v-model="actor.setting.prize"></div>
                <div>抽奖人数<input type="text" v-model="actor.setting.luck_num"></div>
                <div>参与条件<input type="text" v-model="actor.setting.price"></div>
                <div>抽奖时间
                    <input type="text" v-model="actor.setting.luck_time">
                </div>
                <x-button type="primary" @click.native="join" plain style="border-radius:99px;width: 94%">参加</x-button>
            </div>
            <!--加入后-->
            <div v-if="actor.stat === status.__joined" style="margin-left:60px;font-size: 25px">
                <clocker :time="actor.downtime" slot="value">
                    距离开奖剩余
                <span class="day">%_M1</span>
                <span class="day">%_M2</span>分
                <span class="day">%_S1</span>
                <span class="day">%_S2</span>秒
                </clocker>
            </div>
            <div v-if="actor.stat === status.__ending">等待开奖中</div>
            <div v-if="actor.stat === status.__end">中奖人是
                <div v-for="lucker in actor.luckerArr">{{lucker.nick}}</div>
            </div>
        </div>
        <div class="item2">
            <group>
                <divider>参与记录</divider>
                <div class="box2 body-wrapper">
                    <p v-for="player in actor.userArr">{{ player.nick }}加入了抽奖</p>
                </div>
            </group>
        </div>
    </div>
</template>

<script>
    import {Clocker,XButton,Group,Scroller,Divider} from 'vux'
    import status from '../../api/status.js'
    import actor from '../../api/actor.js'
    import dateformat from 'dateformat'
    // import axios from 'axios'
    import user from '../../api/user.js'
    // import ip from '../../api/ip.js'

    // axios.defaults.baseURL = "http://" + ip
    // axios.defaults.headers['Content-Type']="application/x-www-form-urlencoded"

    export default {
        components: {
            Clocker,
            XButton,
            Group,
            Scroller,
            Divider
        },
        data() {
            return {
                status1:0,
                mch_id: 1,
                mch_name: '1912酒吧',
                title: '',
                nick: '',
                downtime:'',
                m:null,
                actor,
                status
            }
        },
        watch:{
            'actor.stat':function(val,oldVal){
                // 如果是登录状态
                console.log("stat"+val+","+oldVal)
                switch(val){
                    case status.__begin:
                        // console.log('111111111111')
                        

                        break;
                    case status.__login:
                        
                        // localStorage.setItem("mch_id", this.mch_id)
                        // localStorage.setItem("mch_name", this.mch_name)
                        // localStorage.setItem("nick", this.nick)
                        // actor.init({
                        //     mch_id:this.mch_id,
                        //     mch_name:this.mch_name,
                        //     nick:this.nick,
                        //     usertype:2
                        // })
                        break;
                    case status.__ing:
                        // this.isNew = false
                        // var item = {}
                        // item.sj = '序号 抽奖时间 状态'
                        // this.items.push(item)
                        // alert('开启成功')
                        // this.sign = "抽奖开始"
                        // OWNER.start(this.Setting)
                        // CHAT.start(this.Setting)
                        // CHAT.isStart = true
                        // this.showTime = true
                        break;
                    case status.__joined:
                        actor.join()
                        actor.getSecond()
                        setTimeout(function(){
                            actor.stat = status.__ending
                        },30000 - actor.second)
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
            actor.stat = status.__begin
        },
        methods: {
            scan(){
                var _ = this
                wx.scanQRCode({
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                        success: function (res) {
                            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                            
                            var url = ""
                            // 必须以这个路由路径开头－才算扫这个码
                            // 1、扫桌面商户
                            if(result.indexOf('/merchant/getById') == 0){
                                _.$axios.get(result)
                                .then((ret)=>{
                                    user.mch_id = result
                                    user.mch_name = ret.mch_name
                                    actor.stat = status.__login
                                })
                            }
                            // 2、扫老板授权
                            if(result.indexOf('/user/grantBoss') == 0){
                                url = result+"&openid="+user.userinfo.openid
                                _.$axios.get(url)
                                .then((ret)=>{
                                    if(ret.data.info == 'success'){
                                        alert("授权成功")
                                    }
                                })
                                .catch((error)=>{
                                    alert("error")
                                })
                            }
                            
                        }
                });
                
                console.log("__login")
            },
            join(){
                actor.stat = status.__joined
                console.log("__joined")
            },
            ending(){
                actor.stat = status.__ending
                console.log("__ending")
            },
            end(){
                actor.stat = status.__end
                console.log("__end")
            }
        }
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

</style>