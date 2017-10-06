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
            请用户扫码确认
            <qrcode value="https://vux.li?x-page=demo_qrcode" type="img"></qrcode>
        </group>
        <group v-if="status == 3">
            此处扫码枪
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
                wine_name:'',
                show: false,

            }
        },
        methods:{
            push(){
                this.status = 1
            },
            pull(){
                this.status = 3
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
                if(this.wineList.length == 0 || this.wineList[0].name == '' || this.wineList[0].num == '' ){
                    this.showPlugin()
                }else{
                    this.status ++
                }
                // this.$vux.alert.show({
                //     title: 'VUX is Cool',
                //     content: 'ooo',
                //     onShow () {
                //     console.log('Plugin: I\'m showing')
                //     },
                //     onHide () {
                //     console.log('Plugin: I\'m hiding now')
                //     }
                // })
                
            },
            reset(){

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
            onHide () {
                console.log('on hide')
            },
            onShow () {
                console.log('on show')
            }
    }
</script>