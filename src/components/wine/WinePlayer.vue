<template>
    <div>
        <cell></cell>
        <!--<div>
            <x-button type="primary" plain style="border-radius:99px;width: 45%">存酒</x-button>
            <x-button type="primary" plain style="border-radius:99px;width: 45%">取酒</x-button>
        </div>-->
        <button-tab v-model="demo01">
            <button-tab-item @on-item-click="push()">存酒</button-tab-item>
            <button-tab-item @on-item-click="pull()">取酒</button-tab-item>
        </button-tab>
        <divider>————————————————————————————</divider>
        <!--<group>
            <x-input title="酒名" placeholder="输入酒名" v-model="wine_name"></x-input>
            <x-number title="数量" v-model="roundValue" button-style="round" :min="0" :max="5"><input type="text"></x-number>
            <button type="primary" plain style="border-radius:99px;width: 45%" v-on:click="newList">增加</button>
            <button type="primary" plain style="border-radius:99px;width: 45%">重置</button>
        </group>-->
        <group v-if="status == 1">
            <x-button type="primary" @click.native="scan">扫码</x-button>
        </group>
        <scroller v-if="status == 2" lock-x height="500px" ref="scroller">
            <div>
                <div v-for="ticket in ticketArr">
                    <form-preview :header-label="ticket.mch_name" header-value="距离过期还剩2天" :body-items="ticket.wineList" :footer-buttons="buttons2" name="ticket.wind_id"></form-preview>
                    </br>
                </div>
                
                <!--<form-preview header-label="单子" header-value="已过期" :body-items="list1" :footer-buttons="buttons2" name="demo"></form-preview>
                </br>
                <form-preview header-label="单子" header-value="已过期" :body-items="list1" :footer-buttons="buttons2" name="demo"></form-preview>
                </br>-->
            </div>
        <!--<scroller v-if="status == 2" lock-x scrollbar-y height="2000px" ref="scroller">-->
        <!--<group >-->
            <!--<button-tab v-model="demo02">
                <button-tab-item @on-item-click="save()">保存</button-tab-item>
                <button-tab-item @on-item-click="reset()">重置</button-tab-item>
            </button-tab>-->
            
            
        <!--</group>-->
        </scroller>
        <!--<divider></divider>-->
        <!--<group v-if="status == 3">
            请用户扫码确认
            请等待管理员确认，取酒进行中........
            <qrcode :value="url" type="img"></qrcode>
        </group>-->
        
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
    import {TransferDomDirective as TransferDom,XDialog,XButton,Cell,ButtonTab, ButtonTabItem,Divider,XInput,XNumber,Group,Qrcode,FormPreview,Scroller} from 'vux'
    import user from '../../api/user.js'
    import util from '../../api/util.js'

    export default {
        directives: {
            TransferDom
        },
        components:{
            XDialog,
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
                url:"",
                demo01:0,
                demo02:0,
                roundValue:0,
                status:0,
                ticketArr:[],
                buttons2: [{
                    style: 'primary',
                    text: '取酒',
                    onButtonClick: (name) => {
                        this.status = 3
                        this.tickid = name
                        this.url = "/wine/wine_getbyid?win_id=" + name
                    }
                }],
                wine_name:'',
                user,
                util,
                tickId:0,
                show:false
            }
        },
        watch:{
            'status':function(val,oldVal){
                switch(val){
                    case 2:
                        this.$axios.get('/wine/wine_getArrByUser?openid='+user.userinfo.openid)
                        .then((ret)=>{
                            var _ = this
                            var tmpObj = {}
                            ret.data.forEach((el,index)=>{
                                tmpObj = {}
                                tmpObj.wine_id = el.wine_id
                                tmpObj.mch_id = el.mch_id
                                tmpObj.mch_name = el.mch_name
                                tmpObj.openid = el.openid
                                tmpObj.nick = el.nick
                                tmpObj.wineList = util.strToJsonArr(el.wine_list)
                                _.ticketArr.push(tmpObj)
                            })
                        })
                        break;
                    case 3:
                        this.show = true
                        // 订阅,事件处理完得到消息
                        user.socket.emit('subscribe',{
                            mch_id:user.userinfo.mch_id,
                            openid:user.userinfo.openid,
                            tag:this.tickid
                        })
                        // 监听通知
                        user.socket.on('notify',function(_data){
                            alert(_data)
                            // 收到通知后 取消订阅
                            user.socket.emit('cancelSubscribe',{tag:this.tickid})
                        })
                        break;
                    default:
                }
            }
        },
        methods:{
            // step 1 初始化
            push(){
                this.status = 1
            },
            // step 2 scan
            scan(){
                wx.scanQRCode({
                needResult: 1,
                desc: 'scanQRCode desc',
                success: function (res) {
                    // alert(JSON.stringify(res));
                    this.$axios.get(res)
                    .then(()=>{
                        var tag_id = res.split("=")[1]
                        user.socket.emit('notify',{tag:tag_id},"存酒成功")
                    })
                }
                });
            },
            // 第一步 初始化
            pull(){
                this.status = 2
            }
        },
        mounted(){
            
        }
    }
</script>