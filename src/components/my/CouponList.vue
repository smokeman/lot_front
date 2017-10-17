<template>
    <div>
        <!--眉头计算-->
        <flexbox :gutter="0">
            <flexbox-item  v-for="ticket in choosed" :span="1 / ( choosed.length + 2)"><div class="flex-demo">{{ticket.price}}</div></flexbox-item>
            <!--<flexbox-item  v-for="i in Object.keys(chooseObj).length" :key="i" :span="1 / 8"><div class="flex-demo">{{i}}</div></flexbox-item>-->
            <flexbox-item v-if="showTitle" :span="1 / ( choosed.length + 2)"><div class="flex-demo"><button>总价:{{choosedSum}}</button></div></flexbox-item>
            <flexbox-item v-if="showTitle" :span="1 / ( choosed.length + 2)"><div class="flex-demo"><button v-on:click="use">使用</button></div></flexbox-item>
        </flexbox>
        <!--优惠券列表-->
        <div class="box2" style="position:absolute; width:100%;height:75%;overflow:scroll">
            <div v-for="coupon in couponList">
                <form-preview :check-item="checkItem" :header-label=" '店名:' + coupon.mch_name" :header-value="'剩余:' +coupon.remain +'天'" :body-items="coupon.detail" :has-check="coupon.pay_type && (lockPrice == 0 || lockPrice == coupon.detail[0].value) && (lockMchId == 0 || lockMchId == coupon.mch_id )" :footer-buttons="collect" :name="coupon" > 
                </form-preview>
            </div>
            <x-button v-if="old == false" type="primary" plain style="border-radius:20px;width:90%" @click.native="show_old">显示过期优惠券</x-button>
        </div>
        <!--二维码-->
        <div v-transfer-dom >
            <x-dialog style="position:relative;top:-100px;" v-model="show" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
                <p style="color:#fff;text-align:center;" @click="show = false">
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
    import {Flexbox,FlexboxItem,Grid,Toast,TransferDomDirective as TransferDom,XDialog,XHeader,XButton,Cell,ButtonTab, ButtonTabItem,Divider,XInput,XNumber,Group,Qrcode,Scroller} from 'vux'
    import FormPreview from '../../common/com/form-preview'
    import axios from 'axios'
    import util from '../../api/util.js'
    import user from '../../api/user.js'
    import { mapState, mapActions } from 'vuex'

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
            FormPreview
        },
        data(){
            return {
                lockPrice:0,
                lockMchId:0,
                choosedId:[],
                choosed:[],
                choosedSum:0,
                chooseObj:{},
                showTitle:false,
                show:false,
                showId:"",
                qrcode:'',
                demo01:0,
                demo02:0,
                roundValue:0,
                status:0,
                couponList:[],
                checkItem:{
                    onItemClick:(v,name) => {

                        if(v == 1){

                            // 选中
                            console.log('选中')
                            if(this.lockPrice == 0){
                                this.lockPrice = name.detail[0].value
                                this.lockMchId = name.mch_id
                            }

                            this.showTitle = true
                            if(!this.chooseObj.hasOwnProperty(name.id)){
                                this.chooseObj[name.id] = {}
                            }
                            
                            this.chooseObj[name.id].id = name.id
                            this.chooseObj[name.id].price = name.detail[0].value
                            this.chooseObj[name.id].low_price = name.detail[1].value

                            console.log(Object.keys(this.chooseObj).length)
                            console.log(Object.keys(this.chooseObj))
                        }
                        if(v == 0){
                            console.log('取消')
                            delete this.chooseObj[name.id]
                            console.log("obj's len is"+Object.keys(this.chooseObj).length)
                            if(Object.keys(this.chooseObj).length == 0){
                                this.showTitle = false
                                this.lockPrice = 0
                                this.lockMchId = 0
                            }
                        }

                        console.log(this.chooseObj)
                        this.choosed = []
                        this.choosedSum = 0
                        Object.keys(this.chooseObj).forEach((el,i)=>{
                            this.choosedSum += parseInt(this.chooseObj[el].price.slice(0,-1))
                            this.choosed.push(this.chooseObj[el])
                        })
                        console.log(this.choosed)
                        
                    }
                },
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
                        text: "选择",
                        onButtonClick:(name) => {

                            var price = name.split(",")[1].slice(0,-1)
                            this.choosedId.push(name.split(",")[0])
                            this.choosed.push(price)
                            this.choosedSum += parseInt(price)
                            
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
                
                axios.get("/coupon/getByUserId?openid=ss")
                .then((ret)=>{
                    // console.log(ret)
                    // console.log(ret.data)
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
                use(){
                    var sum = "";
                    this.choosedId.forEach((el)=>{
                        sum += "-" + el
                    })
                    console.log(sum)
                    // console.log(this.qrcode)
                    // console.log(name)
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
            },
        }
    </script>
    <!--style="position:absolute; width:100%;height:400px; overflow:scroll"-->
<style lang="less" scoped>
@import '~vux/src/styles/close';

.demo-list-box {
    position:absolute;
    width:100%;
    height:400px;
    overflow:scroll;
}

/*.demo-list-box {
  margin-bottom: 10px;
  background-color: #fff;
  width: 100%;
  height:400px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}*/

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