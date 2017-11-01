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
            <cell title="我的优惠券" is-link link="my/couponlist">查看</cell>
            <cell title="中奖纪录" is-link link="/my/luckerlist">查看</cell>
            <!--<cell title="存酒单" is-link></cell>-->
            <cell is-link title="我的存酒单列表" link="/my/winelist">查看</cell>
        </group>
    </div>

</template>

<script>
    // import owner from '../../api/owner.js'
    // import status from '../../api/status.js'
    // import dateformat from 'dateformat'
    import { Group,Cell,XImg } from 'vux'
    import user from '../../api/user.js'

    export default {
        components: {
            Group,
            Cell,
            XImg
        },
        data() {
            return {
                img:'',
                openid:'',
                nick:''
            }
        },
        mounted() {
            this.img = user.head
            this.openid = user.openid
            this.nick = user.nick
        },
        methods: {
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