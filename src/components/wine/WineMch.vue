<template>
    <div>
        <cell></cell>
        <!--<div>
            <x-button type="primary" plain style="border-radius:99px;width: 45%">存酒</x-button>
            <x-button type="primary" plain style="border-radius:99px;width: 45%">取酒</x-button>
        </div>-->
        <button-tab v-model="demo01">
            <button-tab-item @on-item-click="push()">存酒</button-tab-item>
            <button-tab-item @on-item-click="pull()">取酒扫码</button-tab-item>
        </button-tab>
        <divider>————————————————————————————</divider>
        <!--<group>
            <x-input title="酒名" placeholder="输入酒名" v-model="wine_name"></x-input>
            <x-number title="数量" v-model="roundValue" button-style="round" :min="0" :max="5"><input type="text"></x-number>
            <button type="primary" plain style="border-radius:99px;width: 45%" v-on:click="newList">增加</button>
            <button type="primary" plain style="border-radius:99px;width: 45%">重置</button>
        </group>-->
        <group v-if="status == 1">
            <button-tab v-model="demo02">
                <button-tab-item @on-item-click="save()">保存</button-tab-item>
                <button-tab-item @on-item-click="reset()">重置</button-tab-item>
            </button-tab>
            <cell></cell>
            <div>
                <flexbox>
                    <flexbox-item :span="1/9">
                    </flexbox-item>
                    <flexbox-item :span="3/9">
                        <div>酒名</div>
                    </flexbox-item>
                    <flexbox-item :span="3/9">
                        <div>数量</div>
                    </flexbox-item>
                    <flexbox-item :span="1/9">
                        <x-button type="primary" plain style="border-radius:10px;" @click.native="newList">＋</x-button>
                    </flexbox-item>
                    <flexbox-item :span="1/9">
                    </flexbox-item>
                </flexbox>
            </div>
            <div>
                <flexbox v-for="wine in wineList">
                    <!--<flexbox-item :span="0/9">
                    </flexbox-item>-->
                    <flexbox-item :span="4/9">
                        <x-input placeholder="输入酒名" v-model="wine.name"></x-input>
                    </flexbox-item>
                    <flexbox-item :span="4/9">
                        <!--<x-input placeholder="输入数量" v-model="wine.num"></x-input>-->
                        <x-number :min="0" :step="0.1" v-model="wine.num" fillable></x-number>
                    </flexbox-item>
                    <flexbox-item :span="1/9">
                    </flexbox-item>
                </flexbox>
            </div>
        </group>
        <divider></divider>
        <group v-if="status == 2">
            请用户扫码确认1
            <!--<qrcode value="" type="img"></qrcode>-->
            <qrcode :value="qrcode" type="img"></qrcode>
        </group>
        <group v-if="status >= 3">
            此处扫码枪
            <button v-on:click="scan">模拟扫码</button>
        </group>
        <group v-if="status == 4">
            <div v-for="wine in wineGet">{{wine.name}} * {{wine.num}} </div>
            <button v-on:click="pullDo">取酒处理</button>
        </group>
        <!--<alert title="提示" content="内容不能为空" onShow="alert"></alert>-->
        <div v-transfer-dom>
            <!--<alert v-model="show" title="提示" @on-show="onShow" @on-hide="onHide">内容不能为空</alert>-->
        </div>
        <!--<div>
            <x-button style="width:40%">保存</x-button>
            <x-button style="width:40%">重置</x-button>
        </div>-->
    </div>
</template>

<script>
    import {Alert,Flexbox,FlexboxItem,XButton,Cell,ButtonTab, ButtonTabItem,Divider,XInput,XNumber,Group,Qrcode,TransferDomDirective as TransferDom} from 'vux'
    import wx from 'weixin-js-sdk'
    // import wine from '../../api/wine.js'
    import status from '../../api/status.js'
    import axios from 'axios'
    import qs from 'qs'
    // import owner from '../../api/owner.js'
    import user from '../../api/user.js'

    const url = "http://127.0.0.1:4000"
    axios.defaults.baseURL = "http://127.0.0.1:4000"

    export default {
        directives: {
            TransferDom
        },
        components:{
            Alert,
            Flexbox,
            FlexboxItem,
            Cell,
            XButton,
            ButtonTab,
            ButtonTabItem,
            Divider,
            XInput,
            XNumber,
            Group,
            Qrcode
        },
        data(){
            return {
                demo01:0,
                demo02:0,
                roundValue:0,
                status:0,
                wineList:[],
                wineGet:[],
                wine_name:'',
                show: false,
                qrcode:'',
                wx
            }
        },
        methods:{
            pullDo(){
                axios.post("/wine/wine_do",qs.stringify({wine_id:5}))
                .then((ret)=>{
                    // 通知用户
                    user.socket.emit("notify",{tag:'1'},"取酒完成")
                    
                })
            },
            scan(){
                axios.get("/wine/wine_getbyid?wine_id=5")
                .then((ret)=>{
                    var winArr = ret.data.wine_list
                    console.log(winArr)
                    var tmpArr = []
                    var tmpObj
                    winArr.split(',').forEach((item,index)=>{
                        if(index % 2 == 0){
                            tmpObj = {}
                            tmpObj["name"] = item
                            tmpArr.push(tmpObj)
                        }else{
                            tmpObj["num"] = item
                        }
                    })
                    this.wineGet = tmpArr
                    this.status = 4
                })
            },
            push(){
                this.status = 1
                
            },
            pull(){
                this.status = 3
                wx.scanQRCode({
                needResult: 1,
                desc: 'scanQRCode desc',
                success: function (res) {
                    alert(JSON.stringify(res));
                }
                });
            },
            newList(){
                if(this.wineList.length == 0){
                    this.wineList.push({name:'',num:1})
                }
                if(this.wineList[this.wineList.length - 1].name == undefined){
                    console.log('名不能未定义')
                    return
                }
                if(this.wineList[this.wineList.length - 1].name == ''){
                    console.log('名不能为空')
                    return
                }
                if(this.wineList[this.wineList.length - 1].num == undefined){
                    console.log('数量不能为定义')
                    return
                }
                if(this.wineList[this.wineList.length - 1].num == 0){
                    console.log('数量不能空')
                    return
                }
                this.wineList.push({name:'',num:0})
                // if(this.wineList.length > 0){
                //     var len = this.wineList.length - 1
                //     if(this.wineList[len].name == '' || this.wineList[len].num == 0){
                //         return
                //     }
                // }else{
                    
                // }
            },
            save(){
                axios.defaults.baseURL = "http://127.0.0.1:4000"
                // axios.defaults.headers.common['Authorization'] = 
                axios.defaults.headers['Content-Type']="application/x-www-form-urlencoded"
                // axios.defaults.headers['Content-Type']="application/json"
                if(this.wineList.length == 0 || this.wineList[0].name == '' || this.wineList[0].num == '' ){
                    this.showPlugin()
                }else{
                    let _wine_info = {
                        user_info:{oper:'abcde123456',nick:'smoke',mch_id:1},
                        wine_list:this.wineList
                    }
                    axios.post('/wine/wine_save',qs.stringify(_wine_info))
                    .then((ret)=>{
                        console.log(ret.data.wine_id)
                        this.qrcode = url + "/wine_update?wine_id=" + ret.data.wine_id
                        this.status = 2
                        var _ = this

                        user.socket.emit("subscribe",{
                            mch_id:1,
                            user_id:1,
                            openid:'xxx',
                            tag:2
                        })

                        user.socket.on('notify',function(_data){
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
                            user.socket.emit('cancelSubscribe',{tag:2})
                        })

                    })
                }
            },
            reset(){
                console.log(1)
                console.log(wx)
            },
            showPlugin () {
                this.$vux.alert.show({
                        title: '提示',
                        content: '内容不能为空',
                        onShow () {
                            console.log('Plugin: I\'m showing')
                        },
                        onHide () {
                            console.log('Plugin: I\'m hiding now')
                        }
                    })
            },
        },
        watch:{
            'status.wine_owner':function(val,oldVal){
                switch(val){
                    case __begin:
                        break;
                    case __new:

                        break;
                    case __saveing:

                        break;
                    case __saved:

                        break;
                    case __scaned:

                        break;
                    case __pulled:

                        break;
                    case __end:
                        break;
                    default:
                }
            }
        },
        mounted(){
            
            // wx.config({
            //     debug: false,
            //     appId: 'wx4fe135a46ae46e63',
            //     timestamp: 1507448301,
            //     nonceStr: 'A2GPKTyesx56LBR3',
            //     signature: '7aa56f1438603913c8cf4d5d7049add2e8ab7b37',
            //     jsApiList: [
            //         'checkJsApi',
            //         'onMenuShareTimeline',
            //         'onMenuShareAppMessage',
            //         'onMenuShareQQ',
            //         'onMenuShareWeibo',
            //         'onMenuShareQZone',
            //         'hideMenuItems',
            //         'showMenuItems',
            //         'hideAllNonBaseMenuItem',
            //         'showAllNonBaseMenuItem',
            //         'translateVoice',
            //         'startRecord',
            //         'stopRecord',
            //         'onVoiceRecordEnd',
            //         'playVoice',
            //         'onVoicePlayEnd',
            //         'pauseVoice',
            //         'stopVoice',
            //         'uploadVoice',
            //         'downloadVoice',
            //         'chooseImage',
            //         'previewImage',
            //         'uploadImage',
            //         'downloadImage',
            //         'getNetworkType',
            //         'openLocation',
            //         'getLocation',
            //         'hideOptionMenu',
            //         'showOptionMenu',
            //         'closeWindow',
            //         'scanQRCode',
            //         'chooseWXPay',
            //         'openProductSpecificView',
            //         'addCard',
            //         'chooseCard',
            //         'openCard'
            //     ]
            // });
        }
            // onHide () {
            //     console.log('on hide')
            // },
            // onShow () {
            //     console.log('on show')
            // }
        }
</script>