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
        <group v-if="status == 1">此处扫码枪</group>
        <scroller v-if="status == 2" lock-x height="500px" ref="scroller">
            <div>
                <form-preview header-label="1912酒吧" header-value="距离过期还剩2天" :body-items="list" :footer-buttons="buttons2" name="demo"></form-preview>
                </br>
                <form-preview header-label="单子" header-value="已过期" :body-items="list1" :footer-buttons="buttons2" name="demo"></form-preview>
                </br>
                <form-preview header-label="单子" header-value="已过期" :body-items="list1" :footer-buttons="buttons2" name="demo"></form-preview>
                </br>
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
            <qrcode value="https://vux.li?x-page=demo_qrcode" type="img"></qrcode>
        </group>
        
        
        <!--<div>
            <x-button style="width:40%">保存</x-button>
            <x-button style="width:40%">重置</x-button>
        </div>-->
    </div>
</template>

<script>
    import {XButton,Cell,ButtonTab, ButtonTabItem,Divider,XInput,XNumber,Group,Qrcode,FormPreview,Scroller} from 'vux'
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
                demo01:0,
                demo02:0,
                roundValue:0,
                status:0,
                list: [{
                    label: '商品',
                    value: '数量'
                }, {
                    label: '威士忌',
                    value: '3'
                }, {
                    label: '百威',
                    value: '2.5'
                }],
                list1: [{
                    label: '商品',
                    value: '数量'
                }, {
                    label: '威士忌1',
                    value: '3'
                }, {
                    label: '百威1',
                    value: '2.5'
                }],
                buttons2: [{
                    style: 'primary',
                    text: '取酒',
                    onButtonClick: (name) => {
                    // alert(`clicking ${name}`)
                    this.status = 3
                    }
                }],
                wine_name:'',
            }
        },
        methods:{
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

            }
        }
    }
</script>