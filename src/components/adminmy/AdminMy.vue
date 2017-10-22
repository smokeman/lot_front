<template>

    <div>
        <group>
            <!--<cell :title="$t('My Account')" :value="$t('Protected')" @click.native="onClick"></cell>
            <cell :title="$t('Money')" @click.native="onClick" :is-loading="!money" :value="money"></cell>
            <cell :title="$t('Withdraw')" disabled is-link></cell>-->
            <div style="margin-left:100px">
                <!--<x-img style="width: 50px;height:50px;" src="https://o5omsejde.qnssl.com/demo/test1.jpg"></x-img>-->
                <x-img style="width: 50px;height:50px;" :src="img"></x-img>
                {{nick}}
            </div>
        </group>
        <group>
            <cell :title="'名称［'+username+'］'" is-link link="/adminmy/adminuserinfo">改名</cell>
            <cell title="优惠券纪录" is-link link="/adminmy/admincouponlist">查看</cell>
            <cell title="中奖纪录" is-link link="/adminmy/adminluckerlist">查看</cell>
            <!--<cell title="存酒单" is-link></cell>-->
            <cell is-link title="存酒单列表" link="/my/winelist">查看</cell>
            <x-button type="primary" @click.native="scan">扫码枪</x-button>
        </group>
    </div>

</template>

<script>
    // import owner from '../../api/owner.js'
    // import status from '../../api/status.js'
    // import dateformat from 'dateformat'
    import { Group,Cell,XImg,XButton } from 'vux'

    export default {
        components: {
            Group,
            Cell,
            XImg,
            XButton
        },
        data() {
            return {
                img:'',
                openid:'',
                nick:'',
                username:'测试员工'
            }
        },
        mounted() {
            this.img = localStorage.getItem("img")
            this.openid = localStorage.getItem("openid")
            this.nick = localStorage.getItem("nick")
            if(this.img == undefined){
                this.img = "http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ericye6VnJHHcOyUEWPFhxUINAdBW34V60AF1klnRGoicTiaNpibeupB2HTGhOnOkwVG9zj4k2vNOIsTg/0"
            }
            // this.openid = localStorage.getItem("openid")
            // owner.stat = status.__begin
            // var userStr = document.querySelector("#name").innerHTML
            // this.userInfo = JSON.parse(userStr)
        },
        methods: {
            scan(){
                wx.scanQRCode({
                needResult: 1,
                desc: 'scanQRCode desc',
                success: function (res) {
                    alert(JSON.stringify(res));
                }
                });
            }
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