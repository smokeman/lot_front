<template>
    <div>
        <!--<x-header></x-header>-->
        <scroller lock-x height="500px" ref="scroller">
            <div>
                <!--:footer-buttons="buttons2" -->
                <form-preview header-label="1912酒吧" header-value="距离过期还剩2天" :body-items="list" name="demo"></form-preview>
                </br>
                <x-button v-if="old == false" type="primary" plain style="border-radius:20px;width:90%" @click.native="show_old">显示过期优惠券</x-button>
                <div v-if="old == true">
                <form-preview header-label="1912酒吧" header-value="已过期" :body-items="list1" name="demo"></form-preview>
                </br>
                <form-preview header-label="1912酒吧" header-value="已过期" :body-items="list1" name="demo"></form-preview>
                </br>
                </div>
            </div>
        </scroller>
    </div>
</template>

<script>
    import {XHeader,XButton,Cell,ButtonTab, ButtonTabItem,Divider,XInput,XNumber,Group,Qrcode,FormPreview,Scroller} from 'vux'
    export default {
        components:{
            XHeader,
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
                    label: '金额',
                    value: '100元'
                }, {
                    label: '最低消费',
                    value: '500'
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
                old:false,
            }
        },
        methods:{
            show_old(){
                this.old = true
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

            }
        }
    }
</script>