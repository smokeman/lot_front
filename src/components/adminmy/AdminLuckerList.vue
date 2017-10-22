<template>

    <div>
        <!--<x-header></x-header>-->
        <group>
            <!--<cell :title="$t('My Account')" :value="$t('Protected')" @click.native="onClick"></cell>
            <cell :title="$t('Money')" @click.native="onClick" :is-loading="!money" :value="money"></cell>
            <cell :title="$t('Withdraw')" disabled is-link></cell>-->
            
        </group>
        <group>
            <cell title="20171011">奖品:红酒</cell>
            <cell title="20170920">奖品:烟</cell>
            <!--<cell title="中奖纪录" is-link></cell>-->
            <!--<cell title="存酒单" is-link></cell>-->
            <!--<cell is-link title="我的存酒单列表" link="/my/winelist">存酒单</cell>-->
        </group>
    </div>

</template>

<script>
    // import owner from '../../api/owner.js'
    // import status from '../../api/status.js'
    // import dateformat from 'dateformat'
    import { XHeader,Group,Cell,XImg } from 'vux'

    export default {
        components: {
            XHeader,
            Group,
            Cell,
            XImg
        },
        data() {
            return {

            }
        },
        // watch:{
        //     'owner.stat':function(val,oldVal){
        //         // 如果是登录状态
        //         console.log("status"+val+","+oldVal)
        //         switch(val){
        //             case status.__begin:
        //                 console.log('111111111111')
        //                 break;
        //             case status.__login:
        //                 localStorage.setItem("mch_id", this.mch_id)
        //                 localStorage.setItem("mch_name", this.mch_name)
        //                 localStorage.setItem("nick", this.nick)
        //                 owner.init({
        //                     mch_id:this.mch_id,
        //                     mch_name:this.mch_name,
        //                     nick:this.nick,
        //                     usertype:1
        //                 })
        //                 break;
        //             case status.__new:
        //                 console.log(dateformat(new Date(new Date().getTime()+30000),'yyyy-mm-dd hh:mm:ss'))
        //                 break;
        //             case status.__ing:
        //                 // 倒计时计算
        //                 this.downtime = dateformat(new Date(new Date().getTime()+30000),"yyyy-mm-dd HH:MM:ss")
        //                 // console.log(this.downtime)
        //                 var item = {}
        //                 this.items.push(item)
        //                 this.sign = "抽奖开始"
        //                 owner.start(this.setting)
        //                 var _ = this
        //                 setTimeout(function(){
        //                     _.ending()
        //                 },30000)
        //                 // CHAT.start(this.setting)
        //                 // CHAT.isStart = true
        //                 // this.showTime = true
        //                 break;
        //             case status.__ending:
        //                 var _ = this
        //                 setTimeout(function(){
        //                     _.end()
        //                 },10000)
        //                 break;
        //             case status.__end:
        //                 break;
        //             default:
        //         }
        //     }
        // },
        mounted() {
            // owner.stat = status.__begin
        },
        methods: {
            // mchin() {
            //     owner.stat = status.__login
            //     // 仅为测试版用，正式版功能通过扫码进入
            // },
            // create() {
            //     // this.is__new = true
            //     owner.stat = status.__new
            // },
            // start() {
            //     owner.stat = status.__ing
            // },
            // ending(){
            //     owner.stat = status.__ending
            // },
            // end(){
            //     owner.stat = status.__end
            // }
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