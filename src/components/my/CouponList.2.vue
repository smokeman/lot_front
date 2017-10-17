<template>
<div id="demo_list_box" class="demo_list_box" style="position:absolute; width:100%;height:400px; overflow:scroll">
    <div v-for="i in 100">
        <span>{{i}}</span>
    </div>
    
    <!--<scroller lock-x>-->
    <!--<form-preview :header-label="'1'" header-value="¥2400.00" :body-items="list" :footer-buttons="buttons1"></form-preview>
    <br>
    <form-preview :header-label="'2'" header-value="¥2400.00" :body-items="list" :footer-buttons="buttons2" name="demo"></form-preview>
    <br>
    <form-preview :header-label="'3'" header-value="¥2400.00" :body-items="list"></form-preview>-->

    <!--</scroller>-->
  </div>
</template>

<script>
    import {Flexbox,FlexboxItem,Grid,Toast,TransferDomDirective as TransferDom,XDialog,XHeader,XButton,Cell,ButtonTab, ButtonTabItem,Divider,XInput,XNumber,Group,Qrcode,FormPreview,Scroller} from 'vux'
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
            FormPreview,
            Scroller
        },
        data(){
            return {
                list: [{
        label: '商品',
        value: '电动打蛋机'
      }, {
        label: '标题标题',
        value: '名字名字名字'
      }, {
        label: '标题标题',
        value: '很长很长的名字很长很长的名字很长很长的名字很长很长的名字很长很长的名字'
      }],
      buttons1: [{
        style: 'default',
        text: '辅助操作'
      }, {
        style: 'primary',
        text: '跳转到首页',
        link: '/'
      }],
      buttons2: [{
        style: 'primary',
        text: '点击事件',
        onButtonClick: (name) => {
          alert(`clicking ${name}`)
        }
      }],
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
        },
        activated () {
            // document.querySelector('#demo_list_box').scrollTop = this.demoTop
        },
        // computed: mapState({
        //     demoTop: state => state.vux.demoScrollTop,
        // })
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