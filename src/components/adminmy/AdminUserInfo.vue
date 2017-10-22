<template>
    <div>
        <x-input title="用户名称" placeholder="" v-model="username"></x-input>
        <x-button style="width:95%" type="primary" @click.native="modify">修改</x-button>
        <div>
            <span>我的权限</span>
        </div>
        <div>
            <span style="position:relative;top:30px;left:15px">抽奖管理,优惠券管理,存酒管理</span>
            <x-button type="primary" style="position:relative;left:100px;width:25%">取消</x-button>
        </div>
    </div>
</template>

<script>
    import {XInput,XButton} from 'vux'
    
    export default {
        components:{
            XInput,
            XButton
        },
        data(){
            return {
                username:'测试员工'
            }
        },
        mounted(){
            this.username = localStorage.getItem("username")
            if(this.username == undefined){
                this.username = '测试员工'
            }
        },
        methods:{
            modify(){
                var openid = locationStorage.getItem("openid")
                this.$axios.post("/users/updateName",{username:this.username,openid:openid})
                .then((ret)=>{

                })
            }
        }
    }
</script>