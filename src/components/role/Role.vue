<template>
    <div>
        <checklist title="权限列表" :options="objectList" v-model="objectListValue" @on-change="change"></checklist>
        <x-button type="primary" @click.native="grant">生成授权</x-button>
        <div>请要授权的员工扫码</div>
        <!--<div v-if="show">
            <qrcode :value="qrcode" type="img" style="max-width:100%"></qrcode>
            请要授权的员工扫码
        </div>-->
        <div>
            <div><span style="position:relative;top:30px;left:15px">张三 ［存酒管理］</span><x-button type="primary" style="position:relatve;left:100px;width:25%">取消</x-button></div>
            <div><span style="position:relative;top:30px;left:15px">李四 ［优惠券发放、抽奖管理］</span><x-button type="primary" style="position:relatve;left:100px;width:25%" >取消</x-button></div>
        </div>
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
    </div>
</template>

<script>

    import {Qrcode,Group, Checklist, Cell, Divider, XButton,TransferDomDirective as TransferDom,XDialog} from 'vux'
    import user from '../../api/user.js'

    export default {
        directives: {
            TransferDom
        },
        data(){
            return {
                objectList: [{key: '31', value: '抽奖管理员'}, {key: '32', value: '存酒管理员'}, {key: '33', value: '优惠券发放'}],
                objectListValue: ['31', '32', '33'],
                qrcode:'',
                show:false,
                user
            }
        },
        components:{
            XDialog,
            Qrcode,
            Group, 
            Checklist, 
            Cell, 
            Divider, 
            XButton
        },
        mount(){
        },
        methods:{
            change (val) {
                console.log('change', val)

            },
            grant(){
                var role = ""
                this.objectListValue.forEach((el,index)=>{
                    role += el + ","
                })
                role = role.slice(0,-1)
                this.qrcode = "/user/grantTo?mch_id="+user.userinfo.mch_id+"&role="+role
                this.show = true
                
            }
        }
    }
</script>