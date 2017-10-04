<template>
    <button @click="handleClick" :style="styles">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        props:{
            title:{
                type:String,
                default:'#eeeeee'
            }
        },
        methods:{
            handleClick(e){
                this.$emit('click',e)
            }
        },
        computed:{
            styles(){
                return {
                    background:this.color
                }
            }
        }
    }
</script>
<style scoped>
    h1 a{
        color: #eeeeee;
        font-size: 24px;
    }
</style>