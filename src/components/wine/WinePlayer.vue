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
        <group v-if="status == 1">此处扫码枪
            <button v-on:click="scan">扫码</button>
        </group>
        <scroller v-if="status == 2" lock-x height="500px" ref="scroller">
            <div>
                <div v-for="ticket in ticketArr">
                    <form-preview :header-label="ticket.mch_name" header-value="距离过期还剩2天" :body-items="ticket.wineList" :footer-buttons="buttons2" name="demo"></form-preview>
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
        <group v-if="status == 3">
            请用户扫码确认
            请等待管理员确认，取酒进行中........
            <qrcode :value="url" type="img"></qrcode>
        </group>
        
        
        <!--<div>
            <x-button style="width:40%">保存</x-button>
            <x-button style="width:40%">重置</x-button>
        </div>-->
    </div>
</template>

<script>
    import {XButton,Cell,ButtonTab, ButtonTabItem,Divider,XInput,XNumber,Group,Qrcode,FormPreview,Scroller} from 'vux'
    // import actor from '../../api/actor.js'
    import axios from 'axios'
    import user from '../../api/user.js'
    import util from '../../api/util.js'

    var url = "http://127.0.0.1:4000"
    axios.defaults.baseURL = url

    export default {
        components:{
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
                url:"http://127.0.0.1:4000/wine/wine_getbyid?win_id=5",
                // actor,
                demo01:0,
                demo02:0,
                roundValue:0,
                status:0,
                ticketArr:[],
                // listArr:[],
                // list: [{
                //     label: '商品',
                //     value: '数量'
                // }, {
                //     label: '威士忌',
                //     value: '3'
                // }, {
                //     label: '百威',
                //     value: '2.5'
                // }],
                // list1: [{
                //     label: '商品',
                //     value: '数量'
                // }, {
                //     label: '威士忌1',
                //     value: '3'
                // }, {
                //     label: '百威1',
                //     value: '2.5'
                // }],
                buttons2: [{
                    style: 'primary',
                    text: '取酒',
                    onButtonClick: (name) => {
                    // alert(`clicking ${name}`)
                    this.status = 3
                    }
                }],
                wine_name:'',
                user,
                util
            }
        },
        watch:{
            'status':function(val,oldVal){
                switch(val){
                    case 2:
                        axios.get('/wine/wine_getArrByUser?openid='+'xxx')
                        .then((ret)=>{
                            console.log(ret.data)
                            var _ = this
                            var tmpObj = {}
                            ret.data.forEach((el,index)=>{
                                tmpObj = {}
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
                        // 订阅,事件处理完得到消息
                        user.socket.emit('subscribe',{
                            mch_id:1,
                            user_id:1,
                            openid:'xxxxx',
                            tag:'1'
                        })
                        // 监听通知
                        user.socket.on('notify',function(_data){
                            alert(_data)
                            // 收到通知后 取消订阅
                            user.socket.emit('cancelSubscribe',{tag:'1'})
                        })
                        break;
                    default:
                }
            }
        },
        methods:{
            scan(){
                axios.get('/wine/wine_update?wine_id=1')
                .then(()=>{
                    console.log('success')
                    // user.socket.emit("wine_notify")
                    user.socket.emit('notify',{tag:2},"保存成功")
                    
                })
            },
            push(){
                this.status = 1
            },
            pull(){
                this.status = 2
            },
            newList(){
                if(this.wineList.length == 0){
                    this.wineList.push({name:'',num:''})
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
                this.status ++
            },
            reset(){

            },
            // mount(){
                // actor.initWine({
                //     mch_id: 1,
                //     mch_name: '1912_酒吧',
                //     openid:'abcdefg',
                //     title: '',
                //     nick: 'smoke',
                // })
            // }
        },
        mounted(){
            
        }
    }
</script>