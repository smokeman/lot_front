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
            <table style="width:100%">
                <thead>
                    <tr>
                        <th style="width:28%">酒名</th>
                        <th style="width:28%">数量</th>
                        <th style="width:10%">
                            <!--<button type="primary">新增</button>-->
                            <x-button type="primary" plain style="border-radius:20px;" @click.native="newList">+</x-button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="wine in wineList">
                        <td style="width:28%"><input type="text" v-model="wine.name"></td>
                        <td style="width:28%">
                            <input type="number" v-model="wine.num">
                        </td>
                        <td style="width:10%"></td>
                    </tr>
                    <!--<tr>
                        <td class="am-text-left"><span class="amiconbtn">1</span></td>
                        <td class="am-text-left">zed</td>
                        <td class="am-text-right">酒</td>
                    </tr>
                    <tr>
                        <td class="am-text-left"><span class="amiconbtn">2</span></td>
                        <td class="am-text-left">smoke</td>
                        <td class="am-text-right">烟</td>
                    </tr>-->
                </tbody>
            </table>
        </group>
        <divider></divider>
        <group v-if="status == 2">
            请用户扫码确认
            <qrcode value="https://vux.li?x-page=demo_qrcode" type="img"></qrcode>
        </group>
        <group v-if="status == 3">
            此处扫码枪
        </group>
        <!--<div>
            <x-button style="width:40%">保存</x-button>
            <x-button style="width:40%">重置</x-button>
        </div>-->
    </div>
</template>

<script>
    import {XButton,Cell,ButtonTab, ButtonTabItem,Divider,XInput,XNumber,Group,Qrcode} from 'vux'
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