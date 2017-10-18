<template>
    <div class="box">
        <x-button type="primary" @click.native="scan">模拟扫码</x-button>
        <group title="" v-if="status == 2 ">
            <div>
                <span>金额{{price}}最低消费{{low_price}}的券{{num}}张</span>
            </div>
            <x-button type="warning" @click.native="pay">消费确认</x-button>
        </group>
        <group>
            <div v-for="pay in payList">{{coupon_price}}*{{coupon_num}}={{coupon_sum}}</div>
        </group>
    </div>
</template>

<script>
    import {Datetime,Clocker,XButton,Group,Scroller,Divider,XInput} from 'vux'
    import axios from 'axios'
    import qs from 'qs'
    import user from '../../api/user.js'
    import ip from '../../api/ip.js'

    const nowStr = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + '-' + (new Date().getDate() +1)
    axios.defaults.baseURL = "http://" + ip
    axios.defaults.headers['Content-Type']="application/x-www-form-urlencoded"

    export default {
        components: {
            Datetime,
            Clocker,
            XButton,
            Group,
            Scroller,
            Divider,
            XInput,
            XButton
        },
        data() {
            return {
                payer:[],
                end_date:nowStr,
                price:0,
                low_price:0,
                num:0,
                status:1,
                errTag:'',
                payList:[]
            }
        },
        watch:{
            'end_time':function(val,odlVal){
                var arr = val.split('-')
                var curYear = new Date().getFullYear(),
                    curMonth = new Date().getMonth() + 1,
                    curDay = new Date().getDate()

                if(parseInt(arr[0]) >= curYear && parseInt(arr[1]) >= curMonth && parseInt(arr[2]) > curDay){
                    // 
                    this.status = 1
                }else{
                    this.status = 0
                    this.errTag = "优惠券日期必须大于当前日期"
                }
            }
        },
        mounted() {
            axios.get('/coupon/getPayList?mch_id=1&type=today')
            .then((ret)=>{
                payList.push({
                    coupon_price:ret.coupon_price,
                    coupon_num:ret.coupon_num,
                    coupon_sum:ret.coupon_num
                })
            })
        },
        methods: {
            scan(){
                this.status = 2
                axios.get('/coupon/getByAutoId?auto_id=4-5')
                .then((ret)=>{
                    this.price = ret.data.price
                    this.low_price = ret.data.low_price
                    this.num = ret.data.num
                })
            },
            pay(){
                axios.get("/coupon/pay?coupon_id=1&openid=ss")
                .then((ret)=>{
                    if(ret.data == "success"){
                        this.status = 1
                        user.socket.emit("notify",{tag:1},"消费成功")
                    }
                })
            },
            save(){
                axios.post("/coupon/save",qs.stringify({
                    mch_id:1,
                    mch_name:'1912',
                    price:this.price,
                    low_price:this.low_price,
                    num:this.num,
                    end_date:this.end_date
                }))
                .then((ret)=>{
                    console.log(ret.data.coupon_id)
                    this.get()
                })

            },
            get(){
                axios.get("/coupon/getByMchId?mch_id=1")
                .then((ret)=>{
                    console.log(ret)
                    console.log(ret.data)
                    this.couponList = []
                    ret.data.forEach((item)=>{
                        this.couponList.push(item)
                    })
                })
            },
            showPlugin(){

            },
            change(){

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