<template>
    <div id="ranking">
       <div class="rankBg">
        <header id="header">
                <!--<img src="../assets/image/headlineimg.png"/>-->
                <!--<mt-field label="金额" style="border:2px solid yellow" :placeholder="'请输入金额'" type="tel" :value="input_v"></mt-field>-->
                <button @click="itemset">参与</button>
                <button @click="itemset">参与</button>
                <button @click="itemset">参与</button>
                <button @click="itemset">参与</button>
                <button @click="itemset">参与</button>
                <button @click="itemset">参与</button>
                <button @click="itemset">参与</button>
                <button @click="itemset">参与</button>
                <button @click="itemset">参与</button>
                <button @click="itemset">参与</button>
                <button @click="itemset">参与</button>
                <button @click="itemset">参与</button>
                <!--<alert v-model="show1" :title="999999"> tttttt</alert>-->
         </header>
                <button @click="itemset">参与</button>
                <button @click="itemset">参与</button>
                <button @click="itemset">参与</button>
                <button @click="itemset">参与</button>
         
            <div style="height:200px;border:2px solid black;overflow-x: hidden;">
                <!--<view-box ref="viewBox" >
                    <div v-for="msgObj in CHAT.msgArr">
                        <OtherMsg :name="msgObj.name" :msg="msgObj.msg"></OtherMsg>
                    </div>
                </view-box>-->
            </div>
            <!--<input type="text" name="" @keyup.enter="send(msg)" v-model="msg">
            <mt-field label="消息" style="border:2px solid yellow" :placeholder="''" type="tel" v-model="msg"></mt-field>
            <span @click="send(msg)">发送</span>-->
            
            <div id="rankcon" v-if="seen">
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
            </div>
            <div v-if="timeCount">
                <span class="text" :style="{ backgroundColor: bgColor, color: color }">{{hour}}</span><span :style="{ color: bgColor }">:</span><span
                class="text" :style="{ backgroundColor: bgColor, color: color }">{{minute}}</span><span :style="{ color: bgColor }">:</span><span
                class="text" :style="{ backgroundColor: bgColor, color: color }">{{second}}</span>
            </div>
            <!--<button @click="clickButton">点击</button>-->
            
        </div>
    </div>
</template>

<style scoped>
    #ranking {
        height: 100%;
        }
        .rankBg{
            position:absolute;
        
            height: 100%;  
            width: 100%;        
        }
    #header img {
        display: block;
        max-width: 100%;
        width: 100%;
        height: auto;
    }
    #rankcon {
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
    #rankcon:before {
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
    #rankcon:after {
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
    } 
    .amtable {
        width: 100%;
        line-height: 2rem;
    }

    table {
        max-width: 100%;
        background-color: transparent;
        empty-cells: show;
        
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    .amtable thead {
        color: #fff;
        border-bottom: 1px solid #fcde00;
        font-size: .9rem;
    }
    .am-text-left {
        text-align: left !important;
    }
    .am-text-right {
        text-align: right !important;
    }
    .amtable tbody tr {
        border-bottom: 1px solid #ee613e;
        font-size: .8rem;
    }
    .amiconbtn {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        font-size: .7rem;
        line-height: 1rem;
        border-radius: 50%;
        background-color: #fcde00;
        color: #ef6944 !important;
        text-align: center;
    }
    #sambutton {
        text-align: center;
        padding: 1rem 0;
    }
    #sambutton div {
        color: #fff;
        font-size: 0.4rem;
        padding-bottom: 0.5rem;
    }
    #sambutton button {
        background-color: #fcdf00;
        color: #931510;
        border: 2px solid #931510;
        border-radius: 8px;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        padding: .4rem 1rem;
        font-size: 0.6rem;
    }
    .text {
        background-color: #000000;
        color: #ffffff;
        padding: 3px 2px;
        border-radius: 2px;
    }
</style>

<script>
// import { MessageBox,AlertPlugin,ToastPlugin,Alert } from 'mint-ui'
// import SelfMsg from './SelfMsg.vue'
// import OtherMsg from './OtherMsg.vue'
// import socket.io from 'socket.io'
// import CHAT from '../api/client'
// import { ViewBox } from 'vux'

// Vue.use(AlertPlugin)
// Vue.use(ToastPlugin)
// import { alert, Group, XSwitch, Cell, TransferDomDirective as TransferDom } from 'vux'
export default {
    props: {
      date: {
        default: new Date()
      },
      bgColor: {
        default: '#000000'
      },
      color: {
        default: '#FFFFFF'
      }
    },
    components:{
        // OtherMsg,
        // AlertPlugin,
        // ToastPlugin,
        // alert
    },
    data () {
      return {
        title:'t',
        input_v:"111",
        msg:'666参与了进来',
        // CHAT,
        curdate:0,
        // msgObj:{
        //     name:'1',
        //     msg:'2'
        // },
        seen:false,
        timeCount:false,
        hour: '00',
        minute: '00',
        second: '00',
        count: this.date - new Date().getTime(),
        interval: null,
        id:''
      }
    },
    sockets:{
        // connect: function(){
        //     this.id=this.$socket.id
        //     },
        // customEmit: function(val){
        //     console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
        //     }
    },
    mounted () {
        // CHAT.init()
        // console.log(CHAT)
        // this.$socket.emit('connect', val);
    },
    methods: {
    //   send(msg){
    //     CHAT.submit(msg)
    //     // this.msg=''
    //     // MessageBox('d','d')
    //     console.log(CHAT)
    //   },
      start () {
          var _this = this;
        _this.interval = setInterval(() => {
          _this.count = (parseInt(_this.hour)*60*60+parseInt(_this.minute)*60+parseInt(_this.second))*1000 - 1000
          if (_this.count <= 0) {
            _this.second = '00'
            clearInterval(_this.interval)
            _this.timeDown()
            return
          }
          _this.hour = parseInt(_this.count / (60 * 60 * 1000)) + ''
          if (_this.hour < 10) {
            _this.hour = '0' + _this.hour
          }
          let n = _this.count % (60 * 60 * 1000)
          _this.minute = parseInt(n / (60 * 1000)) + ''
          if (_this.minute < 10) {
            _this.minute = '0' + _this.minute
          }
          let n2 = n % (60 * 1000)
          _this.second = parseInt(n2 / 1000) + ''
          if (_this.second < 10) {
            _this.second = '0' + _this.second
          }
        //   _this.count = _this.count - 1000
        }, 1000)
      },
      timeDown () {
        this.$emit('timeDown')
        this.seen = true
        this.timeCount = false
      },
      itemset(){
        //   MessageBox('提示','参与成功')
    //     this.$vux.alert.show({
    //     title: 'VUX is Cool',
    //     content: this.$t('Do you agree?'),
    //     onShow () {
    //       console.log('Plugin: I\'m showing')
    //     },
    //     onHide () {
    //       console.log('Plugin: I\'m hiding now')
    //     }
    //   })
    //       this.send(this.input_v)
    //       this.second = "05"
    //       this.timeCount = true
    //       this.start()
      },
      close(){
        this.seen = false
        this.timeCount = false
      }
    //   clickButton: function(val){
    //         // $socket is socket.io-client instance
    //         this.$socket.emit('emit_method', val);
    //   }
    },
    computed: {}
}
</script>
