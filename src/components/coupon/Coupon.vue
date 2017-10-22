<template>
    <div class="box">
        <group title="优惠券设置">
            <x-input title="抵价金额" placeholder="抵价金额" v-model="price"></x-input>
            <x-input title="最低消费" placeholder="最低消费" v-model="low_price"></x-input>
            <x-input title="数量" placeholder="输入数量" v-model="num"></x-input>
            <datetime v-model="end_date" @on-change="change" title="失效日期"></datetime>
            <x-switch title="是否允许叠加" :inline-desc="value?'允许叠加':'不允许叠加'" v-model="value"></x-switch>
            <!--<x-button type="primary" plain @click.native="showPlugin"></x-button>-->
        </group>
        <group title="" v-if="status == 1 ">
            <x-button type="primary" @click.native="save">保存</x-button>
        </group>
        <group v-if="status == 0">
            {{errTag}}
        </group>
        <group title="优惠券列表">
            <div v-for="coupon in couponList">[{{coupon.coupon_code}}]满{{coupon.low_price}}减{{coupon.price}},截止日期{{coupon.end_date}}</div>
        </group>
    </div>
</template>

<script>
    import {XSwitch,Datetime,Clocker,XButton,Group,Scroller,Divider,XInput} from 'vux'
    // import axios from 'axios'
    // import qs from 'qs'
    // import ip from '../../api/ip.js'

    const nowStr = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + '-' + (new Date().getDate() +1)
    // axios.defaults.baseURL = "http://" + ip
    // axios.defaults.headers['Content-Type']="application/x-www-form-urlencoded"

    export default {
        components: {
            XSwitch,
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
                value:false,
                end_date:nowStr,
                price:null,
                low_price:null,
                num:null,
                status:1,
                errTag:'',
                couponList:[]
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
            // this.get()
        },
        methods: {
            save(){
                this.$axios.post("/coupon/save",{
                    mch_id:1,
                    mch_name:'1912',
                    price:this.price,
                    low_price:this.low_price,
                    num:this.num,
                    end_date:this.end_date,
                    pay_type:this.value?1:0
                })
                .then((ret)=>{
                    console.log(ret.data.coupon_id)
                    this.get()
                })

            },
            get(){
                this.$axios.get("/coupon/getByMchId?mch_id=1")
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