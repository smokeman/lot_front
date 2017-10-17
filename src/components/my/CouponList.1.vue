<template>
    <div>
    <flexbox :gutter="0">
      <flexbox-item  v-for="i in choosed" :key="i" :span="1 / ( choosed.length + 2)"><div class="flex-demo">{{i}}</div></flexbox-item>
      <!--<flexbox-item :span="1/6"><div class="flex-demo">2</div></flexbox-item>
      <flexbox-item :span="1/8"><div class="flex-demo">3</div></flexbox-item>
      <flexbox-item :span="1/8"><div class="flex-demo">4</div></flexbox-item>-->
      <flexbox-item v-if="choosed.length >0" :span="1 / ( choosed.length + 2)"><div class="flex-demo"><button>总价:{{choosedSum}}</button></div></flexbox-item>
      <flexbox-item v-if="choosed.length >0" :span="1 / ( choosed.length + 2)"><div class="flex-demo"><button>使用</button></div></flexbox-item>
    </flexbox>
        <!--<x-header></x-header>-->
    <scroller lock-x height="200px">
      <div class="box2">
        <p v-for="i in 20">placeholder {{ i + '' + i }}</p>
        <!--<p v-for="i in 10" v-if="!showList1">placeholder {{ i }}</p>-->
        <!--<x-button style="margin:10px 0;" type="primary" @click.native="onClickButton">1111</x-button>
        <group>
          <cell @click.native="onCellClick" title="Title" value="Value"></cell>
        </group>-->
      </div>
    </scroller>
        <scroller lock-x scrollbar-y height="200px" ref="scroller">
            <div class="box2">
                <!--<div v-if="qrcode != '' ">
                    <qrcode :value="qrcode" type="img"></qrcode>
                </div>-->
                <!--:footer-buttons="buttons2" -->
                <!--<p v-for="i in 20" >placeholder {{ i + '' + i }}</p>-->
                <!--<div v-for="coupon in couponList">
                    <form-preview :header-label=" '店名:' + coupon.mch_name" :header-value="'剩余:' +coupon.remain +'天'" :body-items="coupon.detail" :footer-buttons="coupon.pay_type == 0 ? collect : collectMore" :name="coupon.pay_type == 0 ? coupon.id : coupon.id + ',' + coupon.detail[0].value" >
                        
                    </form-preview>
                    
                </div>-->
                <!--<buttons v-on:click="get">显示</buttons>-->
                <x-button v-if="old == false" type="primary" plain style="border-radius:20px;width:90%" @click.native="show_old">显示过期优惠券</x-button>

                <!--<div v-if="old == true">
                <form-preview header-label="1912酒吧" header-value="已过期" :body-items="list1" name="demo"></form-preview>
                </br>
                <form-preview header-label="1912酒吧" header-value="已过期" :body-items="list1" name="demo"></form-preview>
                </br>
                </div>-->
            </div>
        </scroller>
        <div v-transfer-dom >
            <x-dialog style="position:relative;top:-100px;" v-model="show" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
                <p style="color:#fff;text-align:center;" @click="show = false">
                <!--<span style="font-size:30px;">HELLO WORLD</span>-->
                <qrcode :value="qrcode" type="img" style="max-width:100%"></qrcode>
                <br>
                <br>
                <x-icon type="ios-close-outline" style="fill:#fff;"></x-icon>
                </p>
            </x-dialog>
        </div>
        <!--<div v-transfer-dom>
            <x-dialog v-model="show" class="dialog-demo">
                <div class="img-box">
                <qrcode :value="qrcode" type="img" style="max-width:100%"></qrcode>
                </div>
                <div @click="show=false">
                <span class="vux-close"></span>
                </div>
            </x-dialog>
        </div>-->
    </div>
</template>

<script>
    import {Flexbox,FlexboxItem,Grid,Toast,TransferDomDirective as TransferDom,XDialog,XHeader,XButton,Cell,ButtonTab, ButtonTabItem,Divider,XInput,XNumber,Group,Qrcode,FormPreview,Scroller} from 'vux'
    import axios from 'axios'
    import util from '../../api/util.js'
    import user from '../../api/user.js'

    axios.defaults.baseURL = "http://127.0.0.1:4000"
    axios.defaults.headers['Content-Type']="application/x-www-form-urlencoded"

    export default {
        directives: {
            TransferDom
        },
        components:{
            Flexbox,
            FlexboxItem,
            Grid,
            Toast,
            XDialog,
            XHeader,
            Cell,
            XButton,
            ButtonTab,
            ButtonTabItem,
            Divider,
            XInput,
            XNumber,
            Group,
            Qrcode,
            FormPreview,
            Scroller
        },
        data(){
            return {
                choosed:[],
                choosedSum:0,
                show:false,
                showId:"",
                qrcode:'',
                couponList:[],
                demo01:0,
                demo02:0,
                roundValue:0,
                status:0,
                couponList:[],
                collect: [{
                    style: 'primary',
                    text: '使用',
                    onButtonClick: (name) => {
                    // alert(`clicking ${name}`)
                        this.qrcode = name + ""
                        console.log(this.qrcode)
                        console.log(name)
                        this.show = true
                        // 订阅事件
                        var _ = this
                        user.socket.emit("subscribe",{
                            mch_id:1,
                            user_id:1,
                            openid:'ss',
                            tag:name
                        })
                        user.socket.on('notify',function(_data){
                            _.show = false
                            _.showPosition('top')
                            _.$vux.alert.show({
                                title: '提示',
                                content: _data,
                                onShow () {
                                    console.log('Plugin: I\'m showing')
                                },
                                onHide () {
                                    console.log('Plugin: I\'m hiding now')
                                }
                            })
                            user.socket.emit('cancelSubscribe',{tag:name})
                        })
                    }
                }],
                collectMore: [{
                        style: 'default',
                        text: '选择',
                        onButtonClick:(name) => {
                            var price = name.split(",")[1].slice(0,-1)
                            this.choosed.push(price)
                            this.choosedSum += parseInt(price)
                            // alert(price)
                        }
                    },{
                        style: 'primary',
                        text: '使用',
                        onButtonClick: (name) => {
                        // alert(`clicking ${name}`)
                            var name = name.split(",")[0]
                            this.qrcode = name + ""
                            console.log(this.qrcode)
                            console.log(name)
                            this.show = true
                            // 订阅事件
                            var _ = this
                            user.socket.emit("subscribe",{
                                mch_id:1,
                                user_id:1,
                                openid:'ss',
                                tag:name
                            })
                            user.socket.on('notify',function(_data){
                                _.show = false
                                _.showPosition('top')
                                _.$vux.alert.show({
                                    title: '提示',
                                    content: _data,
                                    onShow () {
                                        console.log('Plugin: I\'m showing')
                                    },
                                    onHide () {
                                        console.log('Plugin: I\'m hiding now')
                                    }
                                })
                                user.socket.emit('cancelSubscribe',{tag:name})
                            })
                        }
                }],
                wine_name:'',
                old:false,
            }
        },
        mounted(){
            console.log(1)
            axios.get("/coupon/getByUserId?openid=ss")
            .then((ret)=>{
                console.log(ret)
                console.log(ret.data)
                this.couponList = []
                ret.data.forEach((item)=>{
                    item.detail = []
                    item.detail.push({
                        label: '抵价金额',
                        value: item.price + '元'
                    })
                    item.detail.push({
                        label: '最低消费',
                        value: item.low_price + '元'
                    })
                    item.remain = util.getRemain(item.end_date)
                    this.couponList.push(item)
                })
            })
        },
        methods:{
            showPosition (position) {
                this.position = position
                this.showPositionValue = true
            },
            show_old(){
                this.old = true
            },
            push(){
                this.status = 1
            },
            pull(){
                this.status = 2
            },
            save(){
                this.status ++
            },
        }
    }
</script>

<style lang="less" scoped>
@import '~vux/src/styles/close';

.flex-demo {
  text-align: center;
  color: #fff;
  background-color: lightcoral;
  border-radius: 4px;
  background-clip: padding-box;
}

.grid-center {
  display: block;
  text-align: center;
  color: #666;
}

.dialog-demo {
  .weui-dialog {
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    height: 200px;
    overflow: hidden;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
</style>